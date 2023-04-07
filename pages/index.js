import React, { useContext, useEffect } from "react";
import Style from "../styles/index.module.css";
import { HeroSection, Service, BigNFTSlider, NFTCard } from "@/components/componentsindex";
import { NFTMarketplaceContext } from "@/context/NFTMarketPlaceContext";
const Home = () => {
  const { connectingWithSmartContract,fetchMarketNFT } = useContext(NFTMarketplaceContext)
  useEffect(() => {
    connectingWithSmartContract();
    fetchMarketNFT();
  }, []);
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <NFTCard />
      {/* <BigNFTSlider/> */}
    </div>
  );
};

export default Home;
