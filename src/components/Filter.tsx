import { Dispatch, useState, useEffect, useMemo } from "react";
import "../styles/Filter.css";
import "../styles/Filter.css"
import { useObserveSizesAndUpdateBooleanStates } from "../helpers/customHooks";
type ReactJsxElm = React.JSX.Element;



type MyCategoriesProps = {
    selectedCategory: MyFilterProps["category"],
    changeCategory: MyFilterProps['changeCategory']
}

function Categories({selectedCategory, changeCategory}: MyCategoriesProps): ReactJsxElm {
    
    const [dropdownHidden, setDropdownHidden] = useState(true);
    const [dropdownFocusCounter, setDropdownFocusCounter] = useState(0);

    const [smallFilter, setSmallFilter] = useState(matchMedia("(max-width: 330px)").matches);


    const dropdownIcon =  document.querySelector<HTMLSpanElement>(".category-component_dropdown-btn_icon");
    const menuWrapper = document.querySelector<HTMLDivElement>(".categories-component_menu-wrapper");
    const dropDownBtn = document.querySelector<HTMLButtonElement>('.category-component_dropdown-btn');

    useEffect(() => {

        dropDownBtn?.addEventListener("focus", handleDropDownFocus);
        function handleDropDownFocus(): void {
            setDropdownHidden(false);
        };

        window.addEventListener("mousedown", handleClickedAway);
        function handleClickedAway(e: Event): void {

            
            const clickedTarget = e.target as HTMLElement;
            const classList = clickedTarget.classList;

            if(classList.contains("category-menu_list_title")) {
                changeCategory(clickedTarget.innerHTML);
            };
            if(!classList.contains("refocus-dropdown")){
                setDropdownHidden(true);
                
                setDropdownFocusCounter(0)
            };
            if(classList.contains("refocus-dropdown")) {
                setDropdownHidden(false);

                setDropdownFocusCounter(dropdownFocusCounter + 1);     
            }
        };

        if(dropdownFocusCounter % 2 === 0) {
            setDropdownHidden(true)
        } else {
            setDropdownHidden(false)
        }
    

        return () => {
            window.removeEventListener("mousedown", handleClickedAway);
            dropDownBtn?.removeEventListener("focus", handleDropDownFocus);
        }
    }, [dropdownHidden, dropdownFocusCounter, dropDownBtn, changeCategory]);
   

    switch(dropdownHidden) {
        case true:
            dropdownIcon?.classList.remove("category-component_dropdown-btn_icon--flip");
            menuWrapper?.classList.remove("categories-component_menu-wrapper--show");         
            break;
        case false:
            dropdownIcon?.classList.add("category-component_dropdown-btn_icon--flip");
            menuWrapper?.classList.add("categories-component_menu-wrapper--show");
            break;
    }
    
    const categoriesNames: string[] = "backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music".split(", ");

    const categoriesList: ReactJsxElm[] = categoriesNames.map((category,) => {
        category = category.charAt(0).toLocaleUpperCase() + category.slice(1);
        return <li 
            key={category}>
                <button className="button category-menu_list_title refocus-dropdown">
                    {category}
                </button>
        </li>
    });

    // Effect for switching the state of smallFilter
    useObserveSizesAndUpdateBooleanStates("max-width", "330px", setSmallFilter)
    
    
    let buttonContent: ReactJsxElm = <div className="dropdown-btn_big refocus-dropdown">
        <p className="category-component_dropdown-btn_title refocus-dropdown">{selectedCategory}</p>
        <span className="category-component_dropdown-btn_icon refocus-dropdown">
            <img src="src/assets/chevron-down-solid.svg" alt="drop down icon" className="refocus-dropdown"/>
        </span>
    </div>
    if(smallFilter) {
        buttonContent = <div className="dropdown-btn_small refocus-dropdown">
            <img src="src/assets/filter.svg" alt="filter icon" className="refocus-dropdown" />
        </div>
    }
    
    return(
        <div className="categories-component refocus-dropdown">
            <button className="button category-component_dropdown-btn refocus-dropdown">
                {buttonContent}
            </button>
            <div className="categories-component_menu-wrapper refocus-dropdown">
                <div className="categories-component_menu refocus-dropdown">
                    <ul className="refocus-dropdown">
                        <button className="button category-menu_list_title refocus-dropdown">
                            All Images
                        </button>
                        {categoriesList}
                    </ul>
                </div>
            </div>
        </div>

    )
};

type MySearcProps = {
    category: MyFilterProps["category"],
    changeSearchValue: MyFilterProps["changeSearchValue"],
};
function Search({category, changeSearchValue, }: MySearcProps): ReactJsxElm {
    const  [searchBarIsFocused, setSearchBarIsFocused] = useState(false);
    const [clearSearchBtnFocused, setClearSearchBtnFocused] = useState(false);



    const description: string = `Search for ${category} images`;
    const searchBar = document.querySelector<HTMLInputElement>("#searchbar")
    const clearSearchBtn = document.querySelector<HTMLButtonElement>(".search-component_X-btn");
    const searchBarIcon = document.querySelector<HTMLImageElement>(".search-component_search-icon")



    // Functionalities for hiding and showint the 
    // search icon or clear button;
    useEffect(() => {
        
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
                        searchBar.value = "";
                        changeSearchValue("")
                    }
                } else {
                    setClearSearchBtnFocused(false);
                }
            }
        };



        return () => {
            searchBar?.removeEventListener('focus', handleSearchBarFocused);
            searchBar?.removeEventListener("blur", handleSearchBarBlured);
            window.removeEventListener("mousedown", handleMouseDown);


        }
    }, [changeSearchValue, clearSearchBtn, searchBar] );

    // Hiding Or Showing search icon and clear button accordingly
    useMemo(() => {
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

    }, [clearSearchBtn?.classList, searchBar?.value.length, searchBarIcon?.classList, searchBarIsFocused])


    // For automatically applying the search value after a certain time
    useEffect(() => {
        searchBar?.addEventListener("keyup", handleUserKeyUped);
        function handleUserKeyUped(e: Event): void {
            const target = e.target as HTMLInputElement

            const delay = 1500;

            let sendTextTimeout: number | undefined = undefined;

            if (sendTextTimeout) {
                clearTimeout(sendTextTimeout);
            }

            sendTextTimeout = window.setTimeout(() => {
                changeSearchValue(target.value);
            }, delay);
        };

    }, [changeSearchValue, searchBar]);
    
    
    return(
        <div className="search-component">
            <input  type="text" className="search-component_bar" id="searchbar" placeholder={description} />
            <img className="search-component_search-icon" src="src/assets/magnifying-glass-solid 3.svg" alt="" />
            <button className="search-component_X-btn" tabIndex={1}>X</button>
        </div>
    )
};


export type MyFilterProps = {
    category: string,
    changeCategory: Dispatch<string>,
    changeSearchValue: Dispatch<string>,
    className: string
}


export default function Filter({category, changeCategory, changeSearchValue, className}: MyFilterProps): ReactJsxElm {

    return (
        <div className={`filter ${className}`}>
            <Categories selectedCategory={category} changeCategory={changeCategory} />
            <Search category={category} changeSearchValue={changeSearchValue}/>
        </div>
    )
}
