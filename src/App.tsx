import Filter from "./components/Filter";
import "./App.css";
import FocusedImage from "./components/FocusedImage";
import Footer from "./components/Footer";
import CardList from "./components/CardList";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import LoadingCardList from "./components/LoadingCardList";

type ReactJsxElm = React.JSX.Element;

function TitleOrLogo(): ReactJsxElm {
  return(
    <div>
      <h1 className="appTitle">IMAGE EXPLORER</h1>
      <div className="logo"></div>
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


function FilterableGallery(): ReactJsxElm {
  const [category, setCategory] = useState<string>("Categories")
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageRerenderedByUser, setPageRerenderedByUser] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [clickedPhotId, setClickedPhotId] = useState("");
  
  const [dataIsLoading, setDataIsLoading]   = useState(true);
  const [dataResult, setDataResult] = useState<DataResult>({
    totalAccessibleImages: 0,
    totalImageFound: 0,
    arrOfResults: []
  });

  type DataResult = {
    totalImageFound: number,
    totalAccessibleImages: number,
    arrOfResults: {
      comments: number,
      downloads: number,
      id: number,
      likes: number,
      views: number,
      webformatURL: string,
      user: string
    }[]
  }

  useEffect(() => {

    // I had To use observables, because some useEffect weren't 
    // getting triggered by simple event listeners or handlers
    // when user either reloaded, navigated(forward-backward) the page,...

    const pageRenderedByUser_Observer: PerformanceObserver = new PerformanceObserver((list) => {
    
      // Chromium, and Brave don't support The "navigation" event, only firefox;
      if(
          list.getEntriesByType("paint").length > 0 || 
          list.getEntriesByType("navigation").length > 0 
      ) {
          setPageRerenderedByUser(true);
      }
    });
    pageRenderedByUser_Observer.observe( { entryTypes: ["paint", "navigation"] });
  
    return () => {
      pageRenderedByUser_Observer.disconnect( );
      
      setPageRerenderedByUser(false);
    }
  })


  const pixabayAPIKey = import.meta.env.VITE_PIXABAY_API_KEYS
  
  let categoryToSend = ""
  if(category === "Categories" || category === "All Images") {
    categoryToSend = ""
  } else {
    categoryToSend = `&category=${category}`
  }
  const url = `https://pixabay.com/api/?key=${
    pixabayAPIKey}${categoryToSend
    }&q=${encodeURI(searchValue)}&page=${pageNumber
    }&per_page=${resultsPerPage}`;
  

  useEffect(() => {
    fetchData(url);

    return () => {

    }
  }, [url])
  
  async function fetchData(myurl: string): Promise<void> {
    try {
      const data = (await axios.get(myurl)).data;
      
      console.log(data);

      setDataResult({
        totalImageFound: data.total,
        totalAccessibleImages: data.totalHits,
        arrOfResults: data.hits
      })
      // setDataResult();
      data ? setDataIsLoading(false) : setDataIsLoading(true);
    } catch(e) {
      throw(e)
    }
  };

  

  function displayContentOrLoadings(): ReactNode {
    let mainContentToDisplay: ReactJsxElm = <></>;


    if(dataIsLoading) {
      console.log("Display Loading");
      mainContentToDisplay = <>
        <LoadingCardList />    
      </>
    };
    if(!dataIsLoading && dataResult.arrOfResults?.length > 0) {
      console.log("not loading, return : display Resultmsg, cardList and Pagination")
      mainContentToDisplay = <>
        <ResultsMsg searchTerm={searchValue} numberOfRuslts={7} selectedCategory={category}/>
        <CardList setClickedPhotId={setClickedPhotId}/>
        <Pagination />
      </>
    };
    if(!dataIsLoading && dataResult.arrOfResults?.length === 0) {
      console.log("not loading, no results");
      mainContentToDisplay = <>
        <ResultsMsg searchTerm={searchValue} numberOfRuslts={0} selectedCategory={category}/>
      </>
    }

    return mainContentToDisplay;
  }

  return (
    <div className="filterable-gallery">
      <FocusedImage />
      <header className="logo-and-filter">
        <TitleOrLogo />
        <Filter category={category} changeCategory={setCategory} searchValue={searchValue} changeSearchValue={setSearchValue} reRenderedByUser={pageRerenderedByUser}/>
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
