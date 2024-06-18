import { Dispatch } from "react";
import "../styles/FocusedImage.css"


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

    async function handleDownloadBtnClick(): Promise<void> {
        const image = await fetch(clickedPhoto.imgUrl);
        console.log("original url = ", clickedPhoto.imgUrl);

        const nameSplit = clickedPhoto.imgUrl.split("/");
        const duplicateName = nameSplit.pop()
        
        const imageBlob = await image.blob();
        const imageLocalUrl = URL.createObjectURL(imageBlob)
        console.log("new url = ", imageLocalUrl);

        const anchorElm = document.createElement("a");
        anchorElm.href = imageLocalUrl;
        anchorElm.download = "" + duplicateName + "";

        document.body.appendChild(anchorElm)
        anchorElm.click();
        document.body.removeChild(anchorElm);
    }

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
                <button className="focused-img_download-btn focused-img_children" onClick={handleDownloadBtnClick}>
                    {/* <img src="src/assets/download-solid 2.svg" alt="" /> */}
                    <p className="focused-img_download-btn_txt">Download It</p>
                </button>
            </div>
        </div>
    )
};