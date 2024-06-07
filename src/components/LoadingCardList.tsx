import "../styles/LoadingCardList.css";

type ReactJsxElm = React.JSX.Element;


function LoadingCard(): ReactJsxElm {
    return (
        <>
            <div className="loading-card_photo" >
            </div>
            <div className="loading-card_infos">
                <div className="loading-card_infos_tags line">
                </div>
                <div className="loading-card_infos_about line">
                </div>
                <div className="loading-card_stats">
                    <span className="loading-cardstats">
                        <div className="circle _cardstats_icon"></div>
                        <div className="line _cardstats_text"></div>
                    </span>
                    <span className="loading-cardstats">
                        <div className="circle _cardstats_icon"></div>
                        <div className="line _cardstats_text"></div>
                    </span>
                    <span className="loading-cardstats">
                        <div className="circle _cardstats_icon"></div>
                        <div className="line _cardstats_text"></div>
                    </span>
                    <span className="loading-cardstats">
                        <div className="circle _cardstats_icon"></div>
                        <div className="line _cardstats_text"></div>
                    </span>
                </div>
            </div>
        </>
    )
}

export default function LoadingCardList(): ReactJsxElm {
    const numbersOfCards = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "13a", "14a", "15a", "16a", "17a", "18a", "19a", "20a"];
    const ArrOfCards = numbersOfCards.map((num) => {
        return (
            <li className="_loading-card" key={num}><LoadingCard /></li>
        )
    })
    return (
        <ul className="loading-card-list">
            {ArrOfCards}
        </ul>
    )
};