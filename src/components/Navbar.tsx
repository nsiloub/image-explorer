import Filter from "./Filter";
import "../styles/Navbar.css";
import { MyHeaderProps } from "./Header";
import { Dispatch, useEffect, useMemo, useState } from "react";


type ReactJsxElm = React.JSX.Element;

type MyNavbarProps = MyHeaderProps & {
    headerIsFixed: boolean,
    setHeaderIsFixed: Dispatch<boolean>,
    searchBarIsFocused: boolean,
    displayFilterElmCounter: number,
    setDisplayFilterElmCounter: Dispatch<number>
};
export default function NavBar(props: MyNavbarProps): ReactJsxElm {
    
    // The classList can be changed by the component that
    // Calls the LogoElm
    function LogoElm({classList} : {classList: string}): ReactJsxElm {
        classList.length < 1 ? classList = "navbar_logo-alone" : classList; // changes or defaults to the predefined
        return (
            <a href="#" className={classList}>
                <img src="src/assets/logo.svg" alt="" />
            </a>
        )
    };
    
    function Infos({classList} : {classList: string}): ReactJsxElm {
        classList.length < 1 ? classList = "navbar_infos-alone" : classList; // changes or defaults to the predefined

        return <ul className={classList}>
            <li><a href="#aboutus">About Us</a></li>
            <li><a href="#contacts">Contacts</a></li>
            <li><button><img src="https://avatars.githubusercontent.com/u/71090230?s=400&u=a0e3cf64f7329d3bbad75547e25b67724e0d10c7&v=4" alt="account picrture" /></button></li>
        </ul>
    };
    
    function DefaultContentInNavbar(): ReactJsxElm {
        return (
            <div className="navbar_default">
                <LogoElm classList="navbar_default_logo"/>
                <Infos classList="navbar_default_infos" />
            </div>
        )
    }

    function NothingIsFocusedInNavbar(): ReactJsxElm {
        function handleSearchBtnClick(): void {
            props.setDisplayFilterElmCounter(props.displayFilterElmCounter + 1);
        }

        return (
            <div className="navbar_searchbar-nofocus">
                <LogoElm classList="navbar_searchbar-nofocus_logo"/>
                <button className="navbar_searchbar-nofocus_searchbtn" onClick={handleSearchBtnClick}>
                    <img src="src/assets/single-search-logo.svg"
                    alt="Search Icon" />
                </button>
                <button className="navbar_searchbar-nofocus_menubtn">
                    <img src="src/assets/bars-solid.svg" alt="Menu Icon" />
                </button>
            </div>
        )
    }


    // state that contains the changing content of the Navbar
    const [navbarContent, setNavbarContent] = useState(<DefaultContentInNavbar />)



    // function displayReactiveContent(): ReactJsxElm{
    //     let elemToDisplay = <></>


    //     function NoFocusedElm(): ReactJsxElm  {
    //         return (
    //         <div className="navbar_noFocusedElm">
    //             <button className="navbar_noFocusedElm_searchBtn">
    //             <img src="src/assets/single-search-logo.svg"
    //             alt="Search Icon" />
    //             </button>
    //             <button className="navbar_noFocusedElm_menuBtn">
    //             <img src="src/assets/bars-solid.svg" alt="Menu Icon" />
    //             </button>
    //         </div>
    //         )
    //     }

    //     function FocusedSearchBar(): ReactJsxElm {
    //         return (
    //         <div className="navbar_focusedSearchBar">
    //             <button className="focusedSearchBar_goBackBtn">
    //             <img src="src/assets/go-back-icon.svg" alt="" />
    //             </button>
    //             <Filter category={category} changeCategory={changeCategory} changeSearchValue={changeSearchValue} />
    //         </div>
    //         )
    //     };

    //     function AppInfo(): ReactJsxElm {
    //         return (
    //         <div className="navbar_appinfo">
    //             <button className="focusedSearchBar_goBackBtn">
    //             <img src="src/assets/go-back-icon.svg" alt="" />
    //             </button>
    //             <Infos />
    //         </div>
    //         )
    //     }

    //     //on first load (default), if header is not fixed;
    //     elemToDisplay = <Infos />; 

    //     //if header is fixed and searchBar is NOT focused
    //     elemToDisplay = NoFocusedElm();
    
    //     // if searchbar is focused and header is fixed
    //     elemToDisplay = FocusedSearchBar()
    
    //     // If the infos are focused, and the header is fixed;
    //     elemToDisplay = AppInfo()

    //     return elemToDisplay
    // }


    console.log();
    // Effect to fix the header and add styles
    // Css's sticky property wasn't working accross multiple
    // browsers, so i had to use some JS/TS for that
    useEffect(() => {
        const header = document.querySelector<HTMLElement>("header");
        const appTitle = document.querySelector<HTMLElement>(".header_apptitle");
        const navbarElm  = document.querySelector<HTMLElement>(".navbar");
        
        const intersectionObserver = new IntersectionObserver((entries) => {
            if(entries[0].intersectionRatio <= 0) {
                props.setHeaderIsFixed(true);
            } else{
                // setHeaderIsFixed(false)
            }

        });
        header && intersectionObserver.observe(header);
        return () => {
            intersectionObserver.disconnect()
        }

    }, [props.headerIsFixed, props.setHeaderIsFixed]);

    
    // handling the case where searchbar is 
    // focused while header is fixed
    
    useMemo(() => {
        const searchbarInputElmValue = document.querySelector<HTMLInputElement>(".search-component_bar")?.value;
        if(props.headerIsFixed ) {
            if(!props.searchBarIsFocused || searchbarInputElmValue ) {
                
                //Change the navbarContent
                setNavbarContent(<NothingIsFocusedInNavbar />); 
                
                //! To Implement: Preset a temporary input value corresponding
                //  to the recent user's search, using the "searchbarInputElmValue" state' value
                // console.log("got some value = ", searchbarInputElmValue);
                // console.log("recent search value = ", props.searchValue)


            }
        }

        return () => {
            setNavbarContent(<DefaultContentInNavbar />)
        }
    }, [props.headerIsFixed, props.searchBarIsFocused, props.displayFilterElmCounter, props.setDisplayFilterElmCounter, props.searchValue]);



    return (
    <div className="navbar">
        {navbarContent}
        {/* <Filter category={category} changeCategory={changeCategory} changeSearchValue={changeSearchValue}/> */}
    </div>
    )
}
