import Filter from "./Filter";
import "../styles/Navbar.css";
import { MyHeaderProps } from "./Header";


type ReactJsxElm = React.JSX.Element;

type MyNavbarProps = MyHeaderProps;
export default function NavBar(props: MyNavbarProps): ReactJsxElm {
    function displayReactiveContent(): ReactJsxElm{
    let elemToDisplay = <></>

    function Infos(): ReactJsxElm {
        
        return (
        <ul className="navbar_infos">
            <li>About Us</li>
            <li>Contacts</li>
            <li><img src="https://avatars.githubusercontent.com/u/71090230?s=400&u=a0e3cf64f7329d3bbad75547e25b67724e0d10c7&v=4" alt="account picrture" /></li>
        </ul>
        )
    };

    // function NoFocusedElm(): ReactJsxElm  {
    //     return (
    //     <div className="navbar_noFocusedElm">
    //         <button className="navbar_noFocusedElm_searchBtn">
    //         <img src="src/assets/single-search-logo.svg"
    //         alt="Search Icon" />
    //         </button>
    //         <button className="navbar_noFocusedElm_menuBtn">
    //         <img src="src/assets/bars-solid.svg" alt="Menu Icon" />
    //         </button>
    //     </div>
    //     )
    // }

    // function FocusedSearchBar(): ReactJsxElm {
    //     return (
    //     <div className="navbar_focusedSearchBar">
    //         <button className="focusedSearchBar_goBackBtn">
    //         <img src="src/assets/go-back-icon.svg" alt="" />
    //         </button>
    //         <Filter category={category} changeCategory={changeCategory} changeSearchValue={changeSearchValue} />
    //     </div>
    //     )
    // };

    // function AppInfo(): ReactJsxElm {
    //     return (
    //     <div className="navbar_appinfo">
    //         <button className="focusedSearchBar_goBackBtn">
    //         <img src="src/assets/go-back-icon.svg" alt="" />
    //         </button>
    //         <Infos />
    //     </div>
    //     )
    // }

    //on first load (default), if header is not fixed;
    elemToDisplay = <Infos />; 

//     //if header is fixed and searchBar is NOT focused
//     elemToDisplay = NoFocusedElm();
// 
//     // if searchbar is focused and header is fixed
//     elemToDisplay = FocusedSearchBar()
// 
//     // If the infos are focused, and the header is fixed;
    // elemToDisplay = AppInfo()

    return (
        elemToDisplay
    )
    }
    return (
    <div className="navbar">
        <a href="#" className="branding_logo">
            <img src="src/assets/logo.svg" alt="" />
        </a>
        {displayReactiveContent()}
        <Filter category={props.category} changeCategory={props.changeCategory} changeSearchValue={props.changeSearchValue}/>
    </div>
    )
}
