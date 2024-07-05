import { Dispatch, useEffect, useState } from "react";
import { appColors } from "../helpers/variables";
import Filter from "./Filter";
import "../styles/Header.css"
import { LogoIcon } from "./Icons";
import { useObserveSizesAndUpdateStates } from "../helpers/customHooks";

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
    
    
    
    useObserveSizesAndUpdateStates("min-width", "530px", setWindowIsWide );
    useObserveSizesAndUpdateStates("max-width", "330px", setWindowIsExtraSmall );
    


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
            
            {<ul className="header_info-group">
                <li><a href="#aboutus">About Us</a></li>
                <li><a href="#contacts">Contacts</a></li>
                <li><button><img src="https://avatars.githubusercontent.com/u/71090230?s=400&u=a0e3cf64f7329d3bbad75547e25b67724e0d10c7&v=4" alt="account picrture" /></button></li>
            </ul>}

            {!headerIsFixed && <p className="header_apptitle">Image Explorer</p>}

            <Filter className="header_filter" category={category} changeCategory={changeCategory} changeSearchValue={changeSearchValue}/>
        </header>        
    )
}