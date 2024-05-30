import "../styles/Filter.css"
type ReactJsxElm = React.JSX.Element;

function Categories(): ReactJsxElm {
    let title: string = "Categories";
    function handleClick(): void {
        const dropdownIcon =  document.querySelector<HTMLSpanElement>("#dropdown-icon");
        if(dropdownIcon) {
            dropdownIcon.style.transform= "rotate(180deg)";

        }
        
    }
    return(
        <div className="categories-container">
            <button className="button dropdown-button" onClick={handleClick}>
                <div>
                    <p className="dropdown_title">{title}</p>
                    <span className="dropdown_icon" id="dropdown-icon">
                        <img src="src/assets/chevron-down-solid.svg" alt="drop down icon" />
                    </span>
                </div>
                
            </button>
            <div className="menu-container">
                <div className="categories">
                    <ul className="categories_list">
                        <li><button className="button .category_list_title">backgrounds</button></li>
                        <li><button className="button .category_list_title">fashion</button></li>
                        <li><button className="button .category_list_title">nature</button></li>
                        <li><button className="button .category_list_title">science</button></li>
                        <li><button className="button .category_list_title">education</button></li>
                        <li><button className="button .category_list_title">feelings</button></li>
                        <li><button className="button .category_list_title">health</button></li>
                        <li><button className="button .category_list_title">people</button></li>
                        <li><button className="button .category_list_title">religion</button></li>
                        <li><button className="button .category_list_title">places</button></li>
                        <li><button className="button .category_list_title">animals</button></li>
                        <li><button className="button .category_list_title">industry</button></li>
                        <li><button className="button .category_list_title">computer</button></li>
                        <li><button className="button .category_list_title">food</button></li>
                        <li><button className="button .category_list_title">sports</button></li>
                        <li><button className="button .category_list_title">transportation</button></li>
                        <li><button className="button .category_list_title">travel</button></li>
                        <li><button className="button .category_list_title">buildings</button></li>
                        <li><button className="button .category_list_title">business</button></li>
                        <li><button className="button .category_list_title">music</button></li>
                    </ul>
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

export default function Filter(): ReactJsxElm {
    return (
        <div className="filter">
            <Categories />
            <Search />
        </div>
    )
}
