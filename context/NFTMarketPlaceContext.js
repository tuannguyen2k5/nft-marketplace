import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import Router from 'next/router'
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constant'

const pinataSDK = require("@pinata/sdk")
const path = require("path")

const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)
export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = ({ children }) => {

    const titleData = "Discover, collect, and sell NFTs";

    //------USESTAT
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    // const router = useRouter();

    //upload to pitana


    const connectingWithSmartContract = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // Prompt user for account connections
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log("Account:", await signer.getAddress());
            const contractMarketplace = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signer);
            return contractMarketplace
        } catch (error) {
            console.log("Something went wrong when connecting")
        }
    }
    //---CHECK IF WALLET IS CONNECTD
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // console.log(accounts[0]);
            } else {
                setError("No Account Found");
                setOpenError(true);
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getBalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getBalance);
            setAccountBalance(bal);
        } catch (error) {
            setError("Something wrong while connecting to wallet");
            setOpenError(true);
        }
    }
    useEffect(() => {
        checkIfWalletConnected();
    }, []);
    const createNFT = async (name, price, description, image) => {
        if (!name || !description || !price || !image)
            return setError("Data Is Missing"), setOpenError(true);
        try {
            const url = await storeImages(image);
            const tokenUrl = await storeTokenUriMetadata(name, price, description, url)
            await createSale(tokenUrl, price);
            Router.push("/");
        } catch (error) {
            setError("Error while creating NFT");
            setOpenError(true);
        }
    };
    const storeImages = async function (fileImg) {
        console.log(pinata)
        console.log(process.env.PINATA_API_KEY)

        if (fileImg) {

            try {
                const formData = new FormData();
                formData.append("file", fileImg);

                const metadata = JSON.stringify({
                    name: `${fileImg.name}`,
                });
                formData.append('pinataMetadata', metadata);

                const options = JSON.stringify({
                    cidVersion: 0,
                })
                formData.append('pinataOptions', options);
                try {
                    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                        maxBodyLength: "Infinity",
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                            'pinata_api_key': "4686c54b31eedd8ba565",
                            'pinata_secret_api_key': "51046c83487c19b4343475501b239db39d9348b185747fee0f55511981f4a9fd",
                        }
                    });
                    const ImgHash = `ipfs://${res.data.IpfsHash}`;
                    return ImgHash
                } catch (error) {
                    console.log(error);
                }
                //Take a look at your Pinata Pinned section, you will see a new file added to you list.   

            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
        }
    }
    const storeTokenUriMetadata = async function (name, price, description, ImgHash) {
        try {
            var data = JSON.stringify({
                "name": name,
                "price": price,
                "description": description,
                "image": ImgHash
            });

            const resJSON = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
                data: data,
                headers: {
                    'pinata_api_key': "4686c54b31eedd8ba565",
                    'pinata_secret_api_key': "51046c83487c19b4343475501b239db39d9348b185747fee0f55511981f4a9fd",
                },
            });
            console.log(resJSON.data)
            const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
            return tokenURI
        } catch (error) {
            console.log("JSON to IPFS: ")
            console.log(error);
        }

    }
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            console.log(url, formInputPrice, isReselling, id);
            const price = ethers.utils.parseUnits(formInputPrice, "ether");

            const contractMarketplace = await connectingWithSmartContract();
            const listingPrice = await contractMarketplace.getListingPrice();

            const transaction = !isReselling
                ? await contractMarketplace.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contractMarketplace.resellToken(url, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            setError("error while creating sale");
            setOpenError(true);
            console.log(error);
        }
    };
    const fetchMarketNFT = async () => {
        try {
            const contractMarketplace = await connectingWithSmartContract();
            const data = await contractMarketplace.fetchMarketItems()
            console.log(data)
            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                        const tokenURI = await contractMarketplace.tokenURI(tokenId);

                        // const {
                        //     data: { image, name, description },
                        // } = await axios.get(tokenURI);
                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        );

                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            // image,
                            // name,
                            // description,
                            tokenURI,
                        };
                    }
                )
            );
            console.log(items);
            return items;

        } catch (error) {
            setError("error while creating sale");
            setOpenError(true);
            console.log(error);
        }
    }
    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                setOpenError,
                connectingWithSmartContract,
                createSale,
                createNFT,
                fetchMarketNFT
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    );
}
