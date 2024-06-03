import { Dispatch, useState, useEffect } from "react";
import "../styles/Filter.css"
type ReactJsxElm = React.JSX.Element;



type MyCategoriesProps = {
    selectedCategory: MyFilterProps["category"],
    changeCategory: MyFilterProps['changeCategory']
}

function Categories({selectedCategory, changeCategory}: MyCategoriesProps): ReactJsxElm {
    const [counter, setCounter] = useState<number>(0);

    let dropdownHidden: boolean = true;
    counter % 2 === 0 ? dropdownHidden = true : dropdownHidden = false;
    const dropdownIcon =  document.querySelector<HTMLSpanElement>(".category-component_dropdown-btn_icon");
    const menuWrapper = document.querySelector<HTMLDivElement>(".categories-component_menu-wrapper");
    
    if(!dropdownHidden) {
        dropdownIcon?.classList.add("category-component_dropdown-btn_icon--flip");
        menuWrapper?.classList.add("categories-component_menu-wrapper--show");
        
        
    } else {
        dropdownIcon?.classList.remove("category-component_dropdown-btn_icon--flip");
        menuWrapper?.classList.remove("categories-component_menu-wrapper--show");         

    }
    function handleDropdownToggle(): void {
        setCounter(counter + 1);
    }

    const categoriesButtonsList = document.querySelectorAll<HTMLButtonElement>(".category_list_title");

    useEffect(() => {
        function handleClick(event: Event): void {
            const targetedButton = event.target as HTMLButtonElement;
            changeCategory(targetedButton.innerHTML);
        }

        categoriesButtonsList.forEach((button) => {
            button.addEventListener("click", handleClick);
        });

        return () => {
            categoriesButtonsList.forEach((button) => {
                button.removeEventListener("click", handleClick);
           })
        };
    }, [dropdownHidden])

    const categoriesNames: string[] = "backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music".split(", ");

    const categoriesList: ReactJsxElm[] = categoriesNames.map((category,) => {
        category = category.charAt(0).toLocaleUpperCase() + category.slice(1);
        return <li 
            key={category}>
                {/* <button className="button category_list_title" onClick={ handleCategoryTitleClick}> */}
                <button className="button category_list_title">
                    {category}
                </button>
        </li>
    });

    return(
        <div className="categories-component">
            <button className="button category-component_dropdown-btn" onClick={handleDropdownToggle}>
                <div>
                    <p className="category-component_dropdown-btn_title">{selectedCategory}</p>
                    <span className="category-component_dropdown-btn_icon">
                        <img src="src/assets/chevron-down-solid.svg" alt="drop down icon" />
                    </span>
                </div>
                
            </button>
            <div className="categories-component_menu-wrapper">
                <div className="categories-component_menu">
                    <ul>{categoriesList}</ul>
                </div>
            </div>
        </div>

    )
};

type MySearcProps = {
    category: MyFilterProps["category"],
    changeSearchValue: MyFilterProps["changeSearchValue"];
};
function Search({category, changeSearchValue}: MySearcProps): ReactJsxElm {
    const [pageRerenderedByUser, setPageRerenderedByUser] = useState(false);
    const  [searchBarIsFocused, setSearchBarIsFocused] = useState(false);
    const [clearSearchBtnFocused, setClearSearchBtnFocused] = useState(false);



    let description: string = `Search for ${category} images`;
    const searchBar = document.querySelector<HTMLInputElement>("#searchbar")
    const clearSearchBtn = document.querySelector<HTMLButtonElement>(".search-component_X-btn");
    const searchBarIcon = document.querySelector<HTMLImageElement>(".search-component_search-icon")




    useEffect(() => {
        
        // I had To use observables, because this useEffect wasn't 
        // getting triggered by simple event listeners or handlers
        // when user either reloaded, navigated(forward-backward) the page,...

        const pageRenderedByUserObserver: PerformanceObserver = new PerformanceObserver((list) => {
    
            // Chromium, and Brave don't support The "navigation" event, only firefox;
            if(
                list.getEntriesByType("paint").length > 0 || 
                list.getEntriesByType("navigation").length > 0 
            ) {
                setSearchBarIsFocused(false);
                setPageRerenderedByUser(true);
                setSearchBarIsFocused(false);
            }
        });
    
        pageRenderedByUserObserver.observe( { entryTypes: ["paint", "navigation"] });
    

        function handleSearchBarFocused(): void {
            setSearchBarIsFocused(true);
        };
        searchBar?.addEventListener("focus", handleSearchBarFocused);


        function handleSearchBarBlured(): void {
            setSearchBarIsFocused(false);
        };
        searchBar?.addEventListener("blur", handleSearchBarBlured);


        window.addEventListener("mousedown", handleMouseDown);
        function handleMouseDown(event: Event): void {
            if(clearSearchBtn){

                const clickedTarget = event.target as HTMLElement;

                if(clearSearchBtn === clickedTarget) {

                    setClearSearchBtnFocused(true);
                    if(searchBar) {
                        searchBar.value = ""
                    }
                } else {
                    setClearSearchBtnFocused(false);
                }
            }
        };



        return () => {
            pageRenderedByUserObserver.disconnect( );
            setPageRerenderedByUser(false);

            searchBar?.removeEventListener('focus', handleSearchBarFocused);
            searchBar?.removeEventListener("blur", handleSearchBarBlured);
            window.removeEventListener("mousedown", handleMouseDown);


        }
    }, [pageRerenderedByUser, searchBarIsFocused, clearSearchBtnFocused] );

    // Hiding Or Showing search icon and clear button accordingly
    if(!searchBarIsFocused) {
        searchBarIcon?.classList.remove("hide");
        clearSearchBtn?.classList.add("hide");
    };
    if(searchBarIsFocused) {
        clearSearchBtn?.classList.remove("hide");
        searchBarIcon?.classList.add("hide");
    };
    if(searchBar?.value.length && searchBar?.value.length > 0) {
        clearSearchBtn?.classList.remove("hide");
        searchBarIcon?.classList.add("hide");
    };
    
    return(
        <div className="search-component">
            <input  type="text" className="search-component_bar" id="searchbar" placeholder={description} />
            <img className="search-component_search-icon" src="src/assets/magnifying-glass-solid 3.svg" alt="" />
            <button className="search-component_X-btn" tabIndex={1}>X</button>
        </div>
    )
};


type MyFilterProps = {
    category: string,
    changeCategory: Dispatch<string>,
    searchValue: string,
    changeSearchValue: Dispatch<string>
}

export default function Filter({category, changeCategory, changeSearchValue}: MyFilterProps): ReactJsxElm {
    
    return (
        <div className="filter">
            <Categories selectedCategory={category} changeCategory={changeCategory}/>
            <Search category={category} changeSearchValue={changeSearchValue}/>
        </div>
    )
}
