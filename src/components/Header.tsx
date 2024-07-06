import { Dispatch, useEffect, useState } from "react";
import { appColors } from "../helpers/variables";
import Filter from "./Filter";
import { LogoIcon } from "./Icons";
import "../styles/Header.css";
import { useObserveSizesAndUpdateBooleanStates } from "../helpers/customHooks";

type ReactJsxElm = React.JSX.Element;

type MyHeaderProps = {
    category: string,
    changeCategory: Dispatch<string>,
    searchValue: string,
    changeSearchValue: Dispatch<string>,
};
  
export default function Header({ category, changeCategory, changeSearchValue, searchValue} : MyHeaderProps): ReactJsxElm {

    const [windowIsWide, setWindowIsWide] = useState(true);
    const [windowIsExtraSmall, setWindowIsExtraSmall] = useState(false);
    const [headerIsFixed, setHeaderIsFixed] = useState(false);
    const [logoIsShown, setLogoIsShown] = useState(true);
    const [backIconIsShown, setBackIconIsShown] = useState(false);
    const [filterIconIsShown, setFilterIconIsShown] = useState(false);
    const [infoIconIsShown, setInfoIconIsShown] = useState(false);
    const [filterElmIsShown, setFilterElmIsShown] = useState(false);
    const [infoGroupIsShown, setInfoGroupIsShown] = useState(false);


    useObserveSizesAndUpdateBooleanStates("min-width", "530px", setWindowIsWide );
    useObserveSizesAndUpdateBooleanStates("max-width", "330px", setWindowIsExtraSmall );


    // Effect to fix the header and add styles
    // Css's sticky property wasn't working accross multiple
    // browsers, so i had to use some JS/TS for that
    useEffect(() => {
        const header = document.querySelector<HTMLElement>("header");
        
        const intersectionObserver = new IntersectionObserver((entries) => {
            if(entries[0].intersectionRatio <= 0) {
                setHeaderIsFixed(true);
            }

        });
        header && intersectionObserver.observe(header);
        return () => {
            intersectionObserver.disconnect()
        }

    }, [headerIsFixed]);


    return (
        <header className={ 
            !headerIsFixed ? "header--not-fixed" : "header--fixed" 
        }>

            <LogoIcon className="header_logo-icon" mainColor={headerIsFixed ? appColors["dark-elements-color"] : appColors["extra-light-color"]}/>

            {headerIsFixed && <button className="header_back-icon">
                <img src="src/assets/go-back-icon.svg" alt="Go Back Icon" />
            </button>}

            {windowIsExtraSmall && headerIsFixed && <button className="header_info-icon">
                <img src="src/assets/infoIcon.svg" alt="Info icon" />
            </button>}

            {<div className="header_info-group">
                <a href="#aboutus">About Us</a>
                <a href="#contacts">Contacts</a>
                <button><img src="https://avatars.githubusercontent.com/u/71090230?s=400&u=a0e3cf64f7329d3bbad75547e25b67724e0d10c7&v=4" alt="account picrture" /></button>
            </div>}

            {!headerIsFixed && <p className="header_apptitle">Image Explorer</p>}

            <Filter className={`header_filter ${headerIsFixed ? "header--fixed_filter" : "header--not-fixed_filter"}`} category={category} changeCategory={changeCategory} changeSearchValue={changeSearchValue}/>
        </header>        
    )
}