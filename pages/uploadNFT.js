import React, { useEffect, useState, useContext, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
//INTERNAL IMPORT
import Style from "../styles/uploadNFT.module.css";
import { Button } from "@/components/componentsindex";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "@/context/NFTMarketPlaceContext";

const uploadNFT = () => {
    const { createNFT } = useContext(NFTMarketplaceContext)
    const [fileUrl, setFileUrl] = useState(null)
    const [file, setFile] = useState()
    const [formInput, setFormInput] = useState({ price: '', name: '', description: '' })
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { setFile(file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    return (

        <div className={Style.uploadNFT}>
            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                    <p>
                        You can set preferred display name, create your profile URL and
                        manage other personal settings.
                    </p>
                </div>

                <div className={Style.uploadNFT_box_title}>
                    <h2>Image, Video, Audio, or 3D Model</h2>
                    <p>
                        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
                        GLB, GLTF. Max size: 100 MB
                    </p>
                </div>
                <div className={Style.uploadNFT_box_form}>
                    <input
                        placeholder="Asset Name"
                        className="mt-8 border rounded p-4"
                        onChange={e => setFormInput({ ...formInput, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Asset Description"
                        className="mt-2 border rounded p-4"
                        onChange={e => setFormInput({ ...formInput, description: e.target.value })}
                    />
                    <input
                        placeholder="Asset Price in Eth"
                        className="mt-2 border rounded p-4"
                        onChange={e => setFormInput({ ...formInput, price: e.target.value })}
                    />
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                    {
                        fileUrl && (
                            <img className="rounded mt-4" width="350" src={fileUrl} />
                        )
                    }
                    <Button btnName="Create NFT" handleClick={async () => createNFT(formInput.name, formInput.price, formInput.description, file)} />
                </div>
            </div>
        </div>
    );
};

export default uploadNFT;