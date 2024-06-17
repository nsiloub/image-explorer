import { Dispatch, useState } from "react";
import "../styles/FocusedImage.css"

import { DataResult } from "../App";

type ReactJsxElm = React.JSX.Element;
type MyFocusedImageProps = {
    imageIsFocused: boolean,
    setImageIsFocused: Dispatch<boolean>,

    clickedPhoto: {imgUrl: string, likes: number},
}
export default function FocusedImage({imageIsFocused, setImageIsFocused, clickedPhoto}: MyFocusedImageProps): ReactJsxElm {

    function handleCollapseBtnClick():void {
        setImageIsFocused(false);
    };
    const overlayCollapseClassList = imageIsFocused ? "" : "collapse"

    return(
        <div className={`overlay-container ${overlayCollapseClassList}`}>
            <div className="focused-img">
                <button className="focused-img_collapse-btn" onClick={handleCollapseBtnClick}>
                    <img src="src/assets/circle-xmark-regular 2.svg" alt="Collapse Icon" />
                </button>
                <p className="focused-img_msg focused-img_children">Do You Enjoy This Image ?</p>
                <div className="focused-img_photo focused-img_children">
                    <img src={clickedPhoto.imgUrl} alt="The Clicked Photo" />
                </div>
                <button className="focused-img_like-btn focused-img_children">
                    <img src="src/assets/thumbs-up-solid (for-focused).svg" alt="" />
                    <p className="focused-img_like-btn_txt">Like</p>
                </button>
            </div>
        </div>
    )
};