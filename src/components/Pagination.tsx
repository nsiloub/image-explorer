import { Dispatch, useEffect, useState } from "react";
import "../styles/Pagination.css";
import { DataResult } from "../App";

type ReactJsxElm = React.JSX.Element;

type MyPaginationProps = {
    currentPage: number,
    dataResult: DataResult,
    resultsPerPage: number,
    setCurrentPage: Dispatch<number>
}
export default function Pagination({ dataResult, resultsPerPage, setCurrentPage, currentPage}: MyPaginationProps): ReactJsxElm {
    
    const leftArrow = document.querySelector<HTMLButtonElement>('.pagination_left');
    const rightArrow =  document.querySelector<HTMLButtonElement>('.pagination_right');
    const paginationElm = document.querySelector<HTMLDivElement>(".pagination");

    const numberOfPages = Math.round(dataResult.totalAccessibleImages / resultsPerPage);
  
    const staticNumbersArr: number[] = [];
    for(let i=1; i <= numberOfPages; i++) {
        staticNumbersArr.push(i);
    }
    console.log(staticNumbersArr);

    // Effect for dynamizing the pages arra
    useEffect(() => {
        
        // When the results occupy just one page
        if(dataResult.totalAccessibleImages <= resultsPerPage) {
            paginationElm?.classList.add("collapse");
        };

        // when the current page is the
        // first element page of the results pages
        if(currentPage === staticNumbersArr[0]){
            leftArrow?.classList.add("collapse");
        };

        // When the current page is the last
        // element of the results pages
        if(currentPage === staticNumbersArr[staticNumbersArr.length-1]) {
            rightArrow?.classList.add("collapse");
        }


        return () => {

            if(dataResult.totalAccessibleImages <= resultsPerPage) {
                paginationElm?.classList.remove("collapse");
            }; 
            if(currentPage === staticNumbersArr[0]){
                leftArrow?.classList.remove("collapse");
            };
            if(currentPage === staticNumbersArr[staticNumbersArr.length-1]) {
                rightArrow?.classList.remove("collapse");
            }   
        }

    }, [dataResult, currentPage, staticNumbersArr]);
    
    const pageNumbersBtnList: ReactJsxElm[] = staticNumbersArr.map((number) => {       
        return <li key={number}>
            <button className="pagination_numbers_btn" onClick={handlePageNumberBtnClick}>
                {number}
            </button>
        </li>
    });

    function handlePageNumberBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const clickedNumberBtn = e.target as HTMLButtonElement;
        setCurrentPage(Number(clickedNumberBtn.innerHTML));
    };
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