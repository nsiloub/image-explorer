import Filter from "./components/Filter";
import "./App.css";
import './styles/Branding.css';
import FocusedImage from "./components/FocusedImage";
import Footer from "./components/Footer";
import CardList from "./components/CardList";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import LoadingCardList from "./components/LoadingCardList";

type ReactJsxElm = React.JSX.Element;

type MyBrandingProps = {
  logoIsShown: boolean,
};
function Branding( {logoIsShown}: MyBrandingProps ): ReactJsxElm {


  function displayLogoOrTitle(): ReactJsxElm {
    if(logoIsShown) {
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

type MyResultsMsgProps = {
  numberOfRuslts: number, 
  searchTerm: string,
  selectedCategory: string
}
function ResultsMsg({numberOfRuslts, searchTerm, selectedCategory}: MyResultsMsgProps): ReactJsxElm {
  return(
    <section className="result-msg-container">
      <p className="result-msg-container_msg"><strong>
        {numberOfRuslts}
        </strong> Images Found For the term <strong>
          {searchTerm}
          </strong> in the <strong>{selectedCategory}</strong> Category</p>
    </section>
  )
};

export type DataResult = {
  totalImageFound: number,
  totalAccessibleImages: number,
  arrOfResults: {
    comments: number,
    downloads: number,
    id: string,
    likes: number,
    views: number,
    tags: string,
    webformatURL: string,
    user: string
  }[]
}

function FilterableGallery(): ReactJsxElm {
  const [showLogo, setShowLogo] = useState(false);
  
  const [category, setCategory] = useState<string>("Categories")
  const [searchValue, setSearchValue] = useState<string>("");

  const [pageNumberToDisplay, setPageNumberToDisplay] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [clickedPhotoObj, setClickedPhotoObj] = useState({imgUrl: "",});
  const [imgIsFocused, setImgIsFocused] = useState(false);

  const [dataIsLoading, setDataIsLoading]   = useState(true);
  const [dataResult, setDataResult] = useState<DataResult>({
    totalAccessibleImages: 0,
    totalImageFound: 0,
    arrOfResults: []
  });



  const pixabayAPIKey = import.meta.env.VITE_PIXABAY_API_KEYS
  
  let categoryToSend = ""
  if(category === "Categories" || category === "All Images") {
    categoryToSend = ""
  } else {
    categoryToSend = `&category=${category.toLowerCase()}`
  }
  const url = `https://pixabay.com/api/?key=${
    pixabayAPIKey}${categoryToSend
    }&q=${encodeURI(searchValue)}&page=${pageNumberToDisplay
    }&per_page=${resultsPerPage}`;
  
  useEffect(() => {
    fetchData(url);

    return () => {
      setDataResult({
        totalAccessibleImages: 0,
        totalImageFound: 0,
        arrOfResults: []
      }); 

      setDataIsLoading(true);
    }
  }, [url])
  
  async function fetchData(myurl: string): Promise<void> {
    try {
      const data = (await axios.get(myurl)).data;
      
      setDataResult({
        totalImageFound: data.total,
        totalAccessibleImages: data.totalHits,
        arrOfResults: data.hits
      })
      data && setDataIsLoading(false);
    } catch(e) {
      console.log("Error while fetching data: ", e);
    }
  };

  

  function displayContentOrLoadings(): ReactNode {
    let mainContentToDisplay: ReactJsxElm = <></>;


    if(dataIsLoading) {
      mainContentToDisplay = <>
        <LoadingCardList />    
      </>
    };
    if(!dataIsLoading && dataResult.arrOfResults?.length > 0) {
      mainContentToDisplay = <>
        <ResultsMsg searchTerm={searchValue} numberOfRuslts={7} selectedCategory={category}/>
        <CardList setClickedPhotoObj={setClickedPhotoObj} data={dataResult.arrOfResults} setImageIsFocused={setImgIsFocused}/>
        <Pagination  dataResult={dataResult} resultsPerPage={resultsPerPage} setCurrentPage={setPageNumberToDisplay} currentPage={pageNumberToDisplay} />
      </>
    };
    if(!dataIsLoading && dataResult.arrOfResults?.length === 0) {
      mainContentToDisplay = <>
        <ResultsMsg searchTerm={searchValue} numberOfRuslts={0} selectedCategory={category}/>
      </>
    }

    return mainContentToDisplay;
  }

  // Show Or Hide Logo/Title; And Stick the header
  // Sticking the header was not working properly accross
  // different browsers with simple CSS stick/fixed Properties
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("header");

    window.addEventListener("scroll", handleHeaderFix);

    function handleHeaderFix(): void {
      setShowLogo(window.scrollY >= 200); // show/Hide Logo

      // stick the header 
      if(window.scrollY >= 1)  {
        header?.classList.add("header--fixed")
      } else {
        header?.classList.remove("header--fixed");
      }
    };
    return () => {
      window.removeEventListener("scroll", handleHeaderFix);
    }
  }, []);

  return (
    <div className="filterable-gallery">
      <FocusedImage imageIsFocused={imgIsFocused} setImageIsFocused={setImgIsFocused} clickedPhoto={clickedPhotoObj}/>
      <header className={showLogo ? "header--rowable" : "header--on-coloumn"}>
        <Branding logoIsShown={showLogo} />
        <Filter category={category} changeCategory={setCategory} searchValue={searchValue} changeSearchValue={setSearchValue}/>
      </header>
      <main>
        {displayContentOrLoadings()}
      </main>
      <Footer />
    
    </div>
  )
}





function App() {
  return (
    <>
      <FilterableGallery />
    </>
  )
}

export default App
