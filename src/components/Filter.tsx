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
    const dropdownIcon =  document.querySelector<HTMLSpanElement>("#dropdown-icon");
    const menuWrapper = document.querySelector<HTMLDivElement>(".menu-wrapper");
    
    if(!dropdownHidden) {
        dropdownIcon?.classList.add("dropdown_icon--flip");
        menuWrapper?.classList.add("menu-wrapper--show");
        
        
    } else {
        dropdownIcon?.classList.remove("dropdown_icon--flip");
        menuWrapper?.classList.remove("menu-wrapper--show");         

    }
    function handleDropdownToggle(): void {
        setCounter(counter + 1);
    }

    const categoriesButtonsList = document.querySelectorAll<HTMLButtonElement>(".category_list_title");

    useEffect(() => {
        categoriesButtonsList.forEach((button) => {
            button.addEventListener("click", handleClick);

            function handleClick(event: Event): void {
                const targetedButton = event.target as HTMLButtonElement;
                changeCategory(targetedButton.innerHTML);
            }
        });

        return () => {
            categoriesButtonsList.forEach((button) => {
                button.removeEventListener("click", () =>{
                    changeCategory("lool")
                });
           })
        };
    }, [dropdownHidden])

    const categoriesNames: string[] = "backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music".split(", ");

    const categoriesList: ReactJsxElm[] = categoriesNames.map((category,) => {
        return <li 
            key={category}>
                {/* <button className="button category_list_title" onClick={ handleCategoryTitleClick}> */}
                <button className="button category_list_title">
                    {category}
                </button>
        </li>
    });

    return(
        <div className="categories-container">
            <button className="button dropdown-button" onClick={handleDropdownToggle}>
                <div>
                    <p className="dropdown_title">{selectedCategory}</p>
                    <span className="dropdown_icon" id="dropdown-icon">
                        <img src="src/assets/chevron-down-solid.svg" alt="drop down icon" />
                    </span>
                </div>
                
            </button>
            <div className="menu-wrapper">
                <div className="categories">
                    <ul>{categoriesList}</ul>
                </div>
            </div>
        </div>

    )
};

function Search(): ReactJsxElm {
    let description: string = `Search For //CATEGORY//`;
    function searcValue() {
        const searchbar = document.querySelector<HTMLInputElement>("#searchbar");
        if(searchbar) {
            searchbar.value = ""
        }

    } 

    return(
        <div className="search-container">
            <input type="text" className="search_bar" id="searchbar" placeholder={description} />
            <button className="search_clear" onClick={searcValue}>X</button>
        </div>

    )
};


type MyFilterProps = {
    category: string,
    changeCategory: Dispatch<string>
}

export default function Filter({category, changeCategory}: MyFilterProps): ReactJsxElm {
    return (
        <div className="filter">
            <Categories selectedCategory={category} changeCategory={changeCategory}/>
            <Search />
        </div>
    )
}
