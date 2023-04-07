import React,{useState} from 'react'
import Style from "./Filter.module.css"
import { FaFilter,FaAngleDown,FaAngleUp,FaWallet,FaMusic } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdVerified } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
const Filter = () => {
    const [filter,setFilter] = useState(true)
    const [image,setImage] = useState(true)
    const [video,setVideo] = useState(true)
    const [music,setMusic] = useState(true)
  return (
    <div className={Style.filter}>
        <div className={Style.filter_box}>
            <div className={Style.filter_box_left}>
                <button onClick={() =>{}}>NFTs</button>
                <button onClick={() =>{}}>Arts</button>
                <button onClick={() =>{}}>Musics</button>
                <button onClick={() =>{}}>Sports</button>
                <button onClick={() =>{}}>Photography</button>
            </div>
            <div className={Style.filter_box_right}>
                <div className={Style.filter_box_right_box} onClick={() =>openFilter()}>
                    <FaFilter/>
                    <span>Filter</span>{filter ? <FaAngleDown/> : <FaAngleUp/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Filter