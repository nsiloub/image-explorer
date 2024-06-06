import { Dispatch } from "react";
import "../styles/CardsList.css"


type ReactJsxElm =  React.JSX.Element;

type MyImageCardProps = {
    setClickedPhotId: MyCardsListProps["setClickedPhotId"];
}
function ImageCard({setClickedPhotId}: MyImageCardProps): ReactJsxElm {
    const uploader = "UPLOADER";
    const tags = "#tag1 #tag2 #tag3";
    const uploadedBy = `Uploaded by ${uploader}`;
    const views = 6546;
    const likes = 456;
    const comments = 834;
    const downloads = 943;
    const imageId = "image123"

    function handlePhotoClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const target = e.target as HTMLButtonElement
        setClickedPhotId(target.id);
        console.log("image clicked: ", target.id)
    };
    return(
        <>
            <div className="card_clickAnim">
                <div className="card_clickAnim_screen"></div>
                <div className="card_clickAnim_cursor"></div>
            </div>
            <button className="card_photo card_data" id={imageId} onClick={handlePhotoClick} >
                <img src="src/assets/wp2665214.jpg" alt="" />
            </button>
            <div className="card_tags card_data">
                <p>{tags}</p>
            </div>
            <div className="card_about card_data">
                <p>{uploadedBy}</p>
            </div>
            <div className="card_stats">
                <span className="cardstats_views cardstats">
                    <img  src="src/assets/eye-solid 2.svg" alt="views Icon" className="cardstats_views_icon"/>
                    <p>{views}</p>
                </span>
                <span className="cardstats_likes cardstats">
                    <img src="src/assets/thumbs-up-solid 2.svg" alt="Likes icon" className="cardstats_views_likes"/>
                    <p>{likes}</p>
                </span>
                <span className="cardstats_comments cardstats">
                    <img src="src/assets/comment-solid 2.svg" alt="Comments icon" className="cardstats_views_comments"/>
                    <p>{comments}</p> 
                </span>
                <span className="cardstats_downloads cardstats">
                    <img src="src/assets/download-solid 2.svg" alt="Comments icon" className="cardstats_views_downloads"/>
                    <p>{downloads}</p>  
                </span>
            </div>
        </>
    )
};

type MyCardsListProps = {
    // data: [],
    setClickedPhotId: Dispatch<string>,
}
export default function CardsList({setClickedPhotId}: MyCardsListProps): ReactJsxElm {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const ArrOfCards: ReactJsxElm[] = cards.map((card) => {
        return <li key={card} className="card"><ImageCard setClickedPhotId={setClickedPhotId}/></li>
    });


    return (
        <ol className="card-list">
            {ArrOfCards}
        </ol>
    )
};