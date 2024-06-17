import "../styles/FocusedImage.css"

type ReactJsxElm = React.JSX.Element;

export default function FocusedImage(): ReactJsxElm {
    const clickedPhoto = "src/assets/wp2665214.jpg";
    
    return(
        <div className="overlay-container">
            <div className="focused-img">
                <div className="focused-img_collapse-btn">
                    <img src="src/assets/circle-xmark-regular 2.svg" alt="Collapse Icon" />
                </div>
                <p className="focused-img_msg focused-img_children">Do You Enjoy This Image ?</p>
                <div className="focused-img_photo focused-img_children">
                    <img src={clickedPhoto} alt="The Clicked Photo" />
                </div>
                <button className="focused-img_like-btn focused-img_children">
                    <img src="src/assets/thumbs-up-solid (for-focused).svg" alt="" />
                    <p className="focused-img_like-btn_txt">Like</p>
                </button>
            </div>
        </div>
    )
};