import { Dispatch } from "react";
import "../styles/CardList.css"
import { DataResult } from "../App";


type ReactJsxElm =  React.JSX.Element;


type MyCardsListProps = {
    setClickedPhotId: Dispatch<string>,
    data: DataResult["arrOfResults"];
}
export default function CardList({setClickedPhotId, data}: MyCardsListProps): ReactJsxElm {
    const arrayOfCards: ReactJsxElm[] = data.map((card) => {

        function handlePhotoClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
            const target = e.target as HTMLButtonElement
            setClickedPhotId(target.id);
            console.log("image clicked: ", target.id);
        };    

        return <li key={card.id} className="card">
            <div className="card_clickAnim">
                <div className="card_clickAnim_screen"></div>
                <div className="card_clickAnim_cursor"></div>
            </div>
            <button className="card_photo card_data"  onClick={handlePhotoClick} >
                <img src={card.webformatURL} alt="" id={card.id}/>
            </button>
            <div className="card_tags card_data">
                <p>{card.tags}</p>
            </div>
            <div className="card_about card_data">
                <p>Photo By: {card.user}</p>
            </div>
            <div className="card_stats">
                <span className="cardstats_views cardstats">
                    <img  src="src/assets/eye-solid 2.svg" alt="views Icon" className="cardstats_views_icon"/>
                    <p>{card.views}</p>
                </span>
                <span className="cardstats_likes cardstats">
                    <img src="src/assets/thumbs-up-solid 2.svg" alt="Likes icon" className="cardstats_views_likes"/>
                    <p>{card.likes}</p>
                </span>
                <span className="cardstats_comments cardstats">
                    <img src="src/assets/comment-solid 2.svg" alt="Comments icon" className="cardstats_views_comments"/>
                    <p>{card.comments}</p> 
                </span>
                <span className="cardstats_downloads cardstats">
                    <img src="src/assets/download-solid 2.svg" alt="Comments icon" className="cardstats_views_downloads"/>
                    <p>{card.downloads}</p>  
                </span>
            </div>
        </li>
    })


    return (
        <ol className="card-list">
            {arrayOfCards}
        </ol>
    )
};