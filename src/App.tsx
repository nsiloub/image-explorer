import Filter from "./components/Filter";
import "./App.css";
import FocusedImage from "./components/FocusedImage";
import Footer from "./components/Footer";
import CardsList from "./components/CardsList";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";

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
    } catch(e) {
      throw(e)
    }
  };

  return (
    <div className="filterable-gallery">
      <FocusedImage />
      <header className="logo-and-filter">
        <TitleOrLogo />
        <Filter category={category} changeCategory={setCategory} searchValue={searchValue} changeSearchValue={setSearchValue} reRenderedByUser={pageRerenderedByUser}/>
      </header>
      <main>
        <ResultsMsg searchTerm={searchValue} numberOfRuslts={7} selectedCategory={category}/>
        <CardsList setClickedPhotId={setClickedPhotId}/>
        {/* <button className="load-more">Load More</button> */}
        <Pagination />
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
