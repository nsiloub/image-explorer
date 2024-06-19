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

function Branding(): ReactJsxElm {
  function displayLogoOrTitle(): ReactJsxElm {
    return (
      <>
        <h1 className="branding_title">Image Explorer</h1>
        <a href="#">
          <div className="branding_logo">
            <div>iE</div>
          </div>
        </a>
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
  const [category, setCategory] = useState<string>("Categories")
  const [searchValue, setSearchValue] = useState<string>("");

  const [pageNumberToDisplay, setPageNumberToDisplay] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [clickedPhotoObj, setClickedPhotoObj] = useState({likes: 0, imgUrl: "",});
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
      // data ? setDataIsLoading(false) : setDataIsLoading(true);
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

  return (
    <div className="filterable-gallery">
      <FocusedImage imageIsFocused={imgIsFocused} setImageIsFocused={setImgIsFocused} clickedPhoto={clickedPhotoObj}/>
      <header className="branding-and-filter">
        <Branding />
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
