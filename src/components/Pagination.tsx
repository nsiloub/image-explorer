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
export default function Pagination({ dataResult, setCurrentPage, currentPage, resultsPerPage}: MyPaginationProps): ReactJsxElm {    
    const [dynamicPagesNumbersArr, setDynamicPagesNumbersArr] = useState<(string | number)[]>([]);

    const leftArrow = document.querySelector<HTMLButtonElement>('.pagination_left');
    const rightArrow =  document.querySelector<HTMLButtonElement>('.pagination_right');
    const paginationElm = document.querySelector<HTMLDivElement>(".pagination");

    const numberOfRuslts = dataResult.totalAccessibleImages;
    const numberOfPages = Math.round(numberOfRuslts / resultsPerPage);
    

    useEffect(() => {
        
        // When the current page is the first page
        if(currentPage === 1 ) { 
            leftArrow?.classList.add("collapse");
            setDynamicPagesNumbersArr([1, 2, "...", numberOfPages]);         
        };

        // when the current page is the last page
        if(currentPage === numberOfPages){
            rightArrow?.classList.add("collapse");
            setDynamicPagesNumbersArr([1, "...", numberOfPages-1, numberOfPages]);
        };

        // when the current page is the second page
        if(currentPage === 2){
            setDynamicPagesNumbersArr([...[1, currentPage, currentPage+1, "...", numberOfPages]]);
        };

        // when the current page is the second last page
        if(currentPage === numberOfPages-1){
            setDynamicPagesNumbersArr([1, "...", currentPage-1, currentPage, numberOfPages]);
        }
        
        // when current is not the second, neither the second last
        if(currentPage > 2 && currentPage < numberOfPages-1){
            const arr = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", numberOfPages];
            setDynamicPagesNumbersArr([...arr]);
        };


        // when there are only 1 page
        if(numberOfPages === 0 || numberOfPages === 1){
            paginationElm?.classList.add("collapse");
        };

        // when the number of pages is only between 2 abd 3
        if(numberOfPages  > 1 && numberOfPages <= 3) {
            const arr =  [];
            for(let i=1; i<numberOfPages; i++){
                arr.push(i)
            }
            setDynamicPagesNumbersArr([...arr]);
        }

        return () => {

            setDynamicPagesNumbersArr([]);
            leftArrow?.classList.remove("collapse");
            rightArrow?.classList.remove("collapse");
            paginationElm?.classList.remove("collapse");
     
    
    
    
        }
    }, [dataResult, currentPage]);
    
    const numbersAndSeparators: ReactJsxElm[] = dynamicPagesNumbersArr.map((elm, ind) => {
            return <li key={ind}>
                {
                    typeof elm == "string" ? 
                        <div>{elm}</div>: 
                    typeof elm == "number" ? 
                        <button className="pagination_numbers_btn" 
                        onClick={handlePageNumberBtnClick}>{elm}</button>:
                    null
                }
            </li>
    })

    function handlePageNumberBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const clickedNumberBtn = e.target as HTMLButtonElement;
        setCurrentPage(Number(clickedNumberBtn.innerHTML));
    };

    return (
        <div className="pagination">
            <button className="pagination_left" onClick={() => setCurrentPage(currentPage -1)}>
                <p className="pagination_arrows">{"«"}</p>
            </button>
            <ul className="pagination_numbers">
                {numbersAndSeparators}
            </ul>
            <button className="pagination_right" onClick={() => setCurrentPage(currentPage +1)}>
                <p className="pagination_arrows">{"»"}</p>
            </button>
        </div>
    )
}