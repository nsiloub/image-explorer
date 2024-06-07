import "../styles/Pagination.css"

type ReactJsxElm = React.JSX.Element;

export default function Pagination(): ReactJsxElm {
    
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    const pageNumbersBtnList: ReactJsxElm[] = numbers.map((number) => {       
        return <li key={number}>
            <button className="pagination_numbers_btn">
                {number}
            </button>
        </li>
    });
    return (
        <div className="pagination">
            <button className="pagination_left">
                <p className="pagination_arrows">{"«"}</p>
            </button>
            <ul className="pagination_numbers">
                {pageNumbersBtnList}
            </ul>
            <button className="pagination_right">
                <p className="pagination_arrows">{"»"}</p>
            </button>
        </div>
    )
}