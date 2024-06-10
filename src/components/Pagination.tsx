import { Dispatch } from "react";
import "../styles/Pagination.css"

type ReactJsxElm = React.JSX.Element;

type MyPaginationProps = {
    numberOfPages: number,
    currentPage: number,
    minimumIsReached: boolean,
    maximumIsReached: boolean,
    setCurrentPage: Dispatch<number>
}
export default function Pagination({numberOfPages, setCurrentPage, currentPage, maximumIsReached, minimumIsReached}: MyPaginationProps): ReactJsxElm {
    
    numberOfPages === 0 && (numberOfPages = 1); // to have atleast 1 page instead of 0 page;
    const numbersArr: number[] = [];
    for(let i=1; i <= numberOfPages; i++) {
        numbersArr.push(i);
    }
    console.log(numbersArr);

    const pageNumbersBtnList: ReactJsxElm[] = numbersArr.map((number) => {       
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