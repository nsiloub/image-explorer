import { Dispatch, useState } from "react";
import Filter from "./Filter";
import "../styles/Header.css";
import NavBar from './Navbar';

type ReactJsxElm = React.JSX.Element;
export type MyHeaderProps = {
    category: string,
    changeCategory: Dispatch<string>,
    changeSearchValue: Dispatch<string>,
    logoIsShown: boolean
};

export default function Header(props: MyHeaderProps): ReactJsxElm {
    const [headerIsFixed, setHeaderIsFixed] = useState(false);
    console.log("headerIsFixed = ",  headerIsFixed)
    
    function Title(): ReactJsxElm {
      const displayContent = headerIsFixed ? <></> : <p className="header_apptitle">Image Explorer</p>
      return <>
        {displayContent}
      </>
    }
      

    return (
      <header className={props.logoIsShown ? "header--rowable" : "header--on-coloumn"}>

        <NavBar category={props.category} changeCategory={props.changeCategory} changeSearchValue={props.changeSearchValue} logoIsShown={props.logoIsShown} headerIsFixed={headerIsFixed} setHeaderIsFixed={setHeaderIsFixed} />
        <Title />
        <Filter category={props.category} changeCategory={props.changeCategory} changeSearchValue={props.changeSearchValue}/>
      </header>
    )
};