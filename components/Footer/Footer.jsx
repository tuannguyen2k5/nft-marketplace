import React from 'react';
import Image from 'next/image';
//INTERNAL IMPORT
import Style from './Footer.module.css';
import images from "../../img";
import { Discover, HelpCenter } from '../NavBar';
//----IMPORT ICON
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
    TiArrowSortedDown,
    TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from 'react-icons/ri';

const Footer = () => {
    return (
        <div className={Style.footer}>
            <div className={Style.footer_box}>
            <div className={Style.footer_box_social}>
                <Image src={images.logo} alt="footer logo" />
                <div className={Style.footer_box_info}>
                    <p>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
                </div>
                <div className={Style.footer_social}>
                    <a href="#">
                        <TiSocialFacebook />
                    </a>
                    <a href="#">
                        <TiSocialLinkedin />
                    </a>
                    <a href="#">
                        <TiSocialTwitter />
                    </a>
                    <a href="#">
                        <TiSocialYoutube />
                    </a>
                    <a href="#">
                        <TiSocialInstagram />
                    </a>
                </div>
            </div>
            <div className={Style.footer_box_discover}>
                <h3>Discover</h3>
                <Discover />
            </div>
            <div className={Style.footer_box_help}>
                <h3>Help Center</h3>
                <HelpCenter />
            </div>
            <div className={Style.subscribe}>
                <h3>Subscribe</h3>
                <div className={Style.subscribe_box}>
                    <input type="email" name="email" id="email" placeholder='Enter your email' />
                    <RiSendPlaneFill className={Style.subscribe_box_send} />
                </div>
                <div className={Style.subcribe_box_info}>
                    <p>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default Footer