
type ReactJsxElm =  React.JSX.Element;

function ImageCard(): ReactJsxElm {
    return(
        <div className="card">
            <div className="card_clickAnim">
                <div className="card_clickAnim_screen"></div>
                <div className="card_clickAnim_cursor"></div>
            </div>
            <div className="card_photo">
                <img src="src/assets/wp2665214.jpg" alt="" />
            </div>
            <div className="card_tags">
                <p>#tag1 #tag2 #tag3</p>
            </div>
            <div className="card_about">
                <p>Image uploaded by {"{UPLOADER}"}</p>
            </div>
            <div className="card_stats">
                <span className="cardstats_views">
                    <img  src="src/assets/eye-solid 2.svg" alt="views Icon" className="cardstats_views_icon"/>
                    <p>6546</p>
                </span>
                <span className="cardstats_likes">
                    <img src="src/assets/thumbs-up-solid 2.svg" alt="Likes icon" className="cardstats_views_likes"/>
                    <p>456</p>
                </span>
                <span className="cardstats_comments">
                    <img src="src/assets/comment-solid 2.svg" alt="Comments icon" className="cardstats_views_comments"/>
                    <p>834</p> 
                </span>
                <span className="cardstats_downloads">
                    <img src="src/assets/download-solid 2.svg" alt="Comments icon" className="cardstats_views_downloads"/>
                    <p>943</p>  
                </span>
            </div>
        </div>
    )
};


export default function CardsList(): ReactJsxElm {
    const ArrOfCards: ReactJsxElm[] = []
    ArrOfCards.push(
        ImageCard(), ImageCard(), ImageCard(), ImageCard(), 
        ImageCard(), ImageCard(), ImageCard(), ImageCard(),
        ImageCard(), ImageCard(), ImageCard(), ImageCard()
    )
    return (
        <ol>
            {ArrOfCards}
        </ol>
    )
};