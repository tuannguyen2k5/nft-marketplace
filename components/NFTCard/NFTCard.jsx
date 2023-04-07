import React,{useState} from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { Button } from '../componentsindex';

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";
const NFTCard = ({NFTData}) => {
    const CardArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  return (
    <div className={Style.NFTCard}>
      {CardArray.map((el, i) => (
          <div className={Style.NFTCard_box} key={i + 1}>
            <div className={Style.NFTCard_box_img}>
              <Image
                src={el}
                alt="NFT images"
                width={200}
                height={200}
                className={Style.NFTCard_box_img_img}
              />
            </div>
            <p>NFT Name</p>
            <p>0.01ETH</p>
            <Button btnName="Buy NFT"/>
          </div>
      ))}
    </div>
  )
}

export default NFTCard