import React from 'react'
import Image from 'next/image'
import images from '../../img'
import Style from './HeroSection.module.css'
import { Button } from '../componentsindex'
const HeroSection = () => {
    return (
        <div className={Style.heroSection}>
            <div className={Style.heroSection_box}>
                <div className={Style.heroSection_box_left}>
                    <h1>Discover the most outstanding NTFs 🖼️</h1>
                    <p>Discover the most outstanding NTFs in all topics of life. Creative
            your NTFs and sell them</p>
                    <Button btnName="Start your search"></Button>
                </div>
                <div className={Style.heroSection_box_right}>
                    <Image src={images.hero} alt="hero section" width={600} height={600}/>
                </div>
            </div>
        </div>
    )
}

export default HeroSection