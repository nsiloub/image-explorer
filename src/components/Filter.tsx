import { Dispatch, useState, useEffect } from "react";
import "../styles/Filter.css"
type ReactJsxElm = React.JSX.Element;



type MyCategoriesProps = {
    selectedCategory: MyFilterProps["category"],
    changeCategory: MyFilterProps['changeCategory']
    pageRerenderedByUser: MyFilterProps["reRenderedByUser"];
}

function Categories({selectedCategory, changeCategory, pageRerenderedByUser}: MyCategoriesProps): ReactJsxElm {
    
    const [dropdownHidden, setDropdownHidden] = useState(true);
    const [focusCounter, setFocusCounter] = useState(0);

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
                
                setFocusCounter(0)
            };
            if(classList.contains("refocus-dropdown")) {
                setDropdownHidden(false);

                setFocusCounter(focusCounter + 1);     
            }
        };

        if(focusCounter % 2 === 0) {
            setDropdownHidden(true)
        } else {
            setDropdownHidden(false)
        }
    

        return () => {
            window.removeEventListener("mousedown", handleClickedAway);
            dropDownBtn?.removeEventListener("focus", handleDropDownFocus);
        }
    }, [dropdownHidden, pageRerenderedByUser, focusCounter]);
   

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

    return(
        <div className="categories-component refocus-dropdown">
            <button className="button category-component_dropdown-btn refocus-dropdown">
                <div className="dropdown_title-and-icon-container refocus-dropdown">
                    <p className="category-component_dropdown-btn_title refocus-dropdown">{selectedCategory}</p>
                    <span className="category-component_dropdown-btn_icon refocus-dropdown">
                        <img src="src/assets/chevron-down-solid.svg" alt="drop down icon" className="refocus-dropdown"/>
                    </span>
                </div>
                
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
    reRenderedByUser: MyFilterProps["reRenderedByUser"],
};
function Search({category, changeSearchValue, reRenderedByUser}: MySearcProps): ReactJsxElm {
    const pageRerenderedByUser = reRenderedByUser;
    const  [searchBarIsFocused, setSearchBarIsFocused] = useState(false);
    const [clearSearchBtnFocused, setClearSearchBtnFocused] = useState(false);



    let description: string = `Search for ${category} images`;
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
    changeSearchValue: Dispatch<string>,
    reRenderedByUser: boolean,
}

export default function Filter({category, changeCategory, changeSearchValue, reRenderedByUser}: MyFilterProps): ReactJsxElm {
    
    return (
        <div className="filter">
            <Categories selectedCategory={category} changeCategory={changeCategory} pageRerenderedByUser={reRenderedByUser}/>
            <Search category={category} changeSearchValue={changeSearchValue} reRenderedByUser={reRenderedByUser}/>
            <div className="filter_sameness-illusion"></div>
        </div>
    )
}
