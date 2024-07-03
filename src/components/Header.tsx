import { Dispatch } from "react";
import { appColors } from "../helpers/variables";
import Filter from "./Filter";
import { LogoIcon } from "./Icons";

type MyHeaderProps = {
    category: string,
    changeCategory: Dispatch<string>,
    searchValue: string,
    changeSearchValue: Dispatch<string>,
};
  
export default function header({ category, changeCategory, changeSearchValue, searchValue} : MyHeaderProps): ReactJsxElm {

return (
    <header>
    
    <LogoIcon mainColor={appColors["extra-light-color"]}/>
    <button className="">
        <img src="src/assets/go-back-icon.svg" alt="" />
    </button>
    <button>
        <img src="src/assets/infoIcon.svg" alt="Info icon" />
    </button>
    <ul className="">
        <li><a href="#aboutus">About Us</a></li>
        <li><a href="#contacts">Contacts</a></li>
        <li><button><img src="https://avatars.githubusercontent.com/u/71090230?s=400&u=a0e3cf64f7329d3bbad75547e25b67724e0d10c7&v=4" alt="account picrture" /></button></li>
    </ul>
    <p className="header_apptitle">Image Explorer</p>
    <Filter category={category} changeCategory={changeCategory} changeSearchValue={changeSearchValue}/>
    </header>
)
}