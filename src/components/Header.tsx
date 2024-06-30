import { Dispatch } from "react";
import Filter from "./Filter";
import "../styles/Header.css";
import "../styles/Branding.css"
import NavBar from "./Navbar";

type ReactJsxElm = React.JSX.Element;
export type MyHeaderProps = {
    category: string,
    changeCategory: Dispatch<string>,
    changeSearchValue: Dispatch<string>,
    logoIsShown: boolean
};

export default function Header(props: MyHeaderProps): ReactJsxElm {
    
    function Branding( ): ReactJsxElm {

      function displayLogoOrTitle(): ReactJsxElm {
          if(props.logoIsShown) {
          return <a href="#">
              <div className="branding_logo">
              <img src="src/assets/logo.svg" alt="" />
              </div>
          </a>

          }
          return (
          <>
              <p className="branding_title">Image Explorer</p>
          </>
          )
      }

      
      
    return(
        <div className="branding">
        {displayLogoOrTitle()}
        </div>
      )
    }
      

    return (
      <header className={props.logoIsShown ? "header--rowable" : "header--on-coloumn"}>

        <NavBar category={props.category} changeCategory={props.changeCategory} changeSearchValue={props.changeSearchValue} logoIsShown={props.logoIsShown}/>
        <Branding />
        {/* <Filter category={props.category} changeCategory={props.changeCategory} changeSearchValue={props.changeSearchValue}/> */}
      </header>
    )
};