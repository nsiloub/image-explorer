import { Dispatch, useMemo, useState } from "react";
import "../styles/Pagination.css";
import { DataResult } from "../App";

type ReactJsxElm = React.JSX.Element;

type MyPaginationProps = {
    currentPage: number,
    dataResult: DataResult,
    resultsPerPage: number,
    setCurrentPage: Dispatch<number>,
}
export default function Pagination({ dataResult, setCurrentPage, currentPage, resultsPerPage}: MyPaginationProps): ReactJsxElm {    
    const numberOfRuslts = dataResult.totalAccessibleImages;
    const numberOfPages = Math.round(numberOfRuslts / resultsPerPage) === 0 ? 1 : Math.round(numberOfRuslts / resultsPerPage);

    const [staticPagesNumbersArr, setStaticPagesNumbersArr] = useState<({separator: string, key: string} | number)[]>([1, 2, {separator: "...", key: "sep1"}, numberOfPages]);
    const [dynamicPagesNumbersArr, setDynamicPagesNumbersArr] = useState<ReactJsxElm[]>([])
    const paginationElm = document.querySelector<HTMLDivElement>(".pagination");
    
    
    // when there are only 1 page
    if( numberOfPages <= 1){
        paginationElm?.classList.add("collapse");
    } else {
        paginationElm?.classList.remove("collapse");
    };

    // to change the static array to the right pagination numbers
    useMemo(() => {
        // when current pages is not the second nor the second-last
        if(numberOfPages > 3 && currentPage > 2 && currentPage < numberOfPages-1) {
            const arr: typeof staticPagesNumbersArr = [1, {separator: "...", key: "separator_1"}, currentPage-1, currentPage, currentPage + 1, {separator: "...", key: "separator_2"}, numberOfPages];
            setStaticPagesNumbersArr([...arr]);
        };

        // When the currentpage is the second last
        if(numberOfPages > 3 && currentPage === numberOfPages-1 ) {
            setStaticPagesNumbersArr([1, {separator: "...", key: "separator_1"}, currentPage, numberOfPages]);
        }

        // when current page is the second
        if(numberOfPages > 3 && currentPage === 2 ) {
            setStaticPagesNumbersArr([1, currentPage, currentPage + 1, {separator: "...", key: "separator_1"}, numberOfPages]);
        }

        // when page is the last
        if(numberOfPages > 3 && currentPage === numberOfPages ) {
            setStaticPagesNumbersArr([1, {separator: "...", key: "separator_1"}, currentPage - 1, currentPage]);
        }

        // when current page is the first
        if(numberOfPages > 3 && currentPage === 1 ) {
            setStaticPagesNumbersArr([1, 2, {separator: "...", key: "sep1"}, numberOfPages]);
        }



        
    }, [currentPage, numberOfPages])

    // Update the dynamic array of page numbers from the static arr
    useMemo(() => {
        setDynamicPagesNumbersArr( () => {
            return staticPagesNumbersArr.map((elm) => {
                let elmKey: string | number | null = null;
                let highlight = ""

                if(typeof elm === "number") {
                    elmKey = elm;

                    highlight = elm === currentPage ? "highlight-number": "";
                };
                if(typeof elm === "object") {
                    elmKey = elm.key;
                }
                return <li key={elmKey}>
                    {
                        typeof elm === "object" ? 
                            <div>{elm.separator}</div>: 
                        typeof elm == "number" ? 
                            <button className={`pagination_numbers_btn ${highlight}`} 
                            onClick={handlePageNumberBtnClick}>{elm}</button>:
                        null
                    }
                </li>
            })}
        )
        function handlePageNumberBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
            const clickedNumberBtn = e.target as HTMLButtonElement;
            setCurrentPage(Number(clickedNumberBtn.innerHTML));
        }
    }, [staticPagesNumbersArr, currentPage, setCurrentPage]);

    // Hide And show the arrows
    const leftArrCollapseClasse = currentPage < 2 ? "collapse": "";
    const rightArrowCollapseClasse = currentPage > numberOfPages - 1 ? "collapse" : "";

    return (
        <div className="pagination">
            <button className={`pagination_left ${leftArrCollapseClasse}`} onClick={() => setCurrentPage(currentPage -1)}>
                <p className="pagination_arrows">{"«"}</p>
            </button>
            <ul className="pagination_numbers">
                {dynamicPagesNumbersArr}
            </ul>
            <button className={`pagination_right ${rightArrowCollapseClasse}`} onClick={() => setCurrentPage(currentPage +1)}>
                <p className="pagination_arrows">{"»"}</p>
            </button>
        </div>
    )
}