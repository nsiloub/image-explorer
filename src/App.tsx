import Filter from "./components/Filter";
import "./App.css";
import FocusedImage from "./components/FocusedImage";
import Footer from "./components/Footer";
import CardsList from "./components/CardsLists";
import { useEffect, useState } from "react";

type ReactJsxElm = React.JSX.Element;

function Logo(): ReactJsxElm {
  return(
    <div className="logo">
      <h1>IMAGE EXPLORER</h1>
    </div>
  )
}

function ResultsMsg(): ReactJsxElm {
  return(
    <section className="message">
      <p><strong>7</strong> Images Found For the term <strong>Your Term</strong></p>
    </section>
  )
};


function FilterableGallery(): ReactJsxElm {
  const [category, setCategory] = useState<string>("Categories")
  const [searchValue, setSearchValue] = useState<string>("");
  const [pageRerenderedByUser, setPageRerenderedByUser] = useState(false);

  useEffect(() => {

    // I had To use observables, because this useEffect wasn't 
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


  return (
    <div className="filterable-gallery">
      <FocusedImage />
      <header className="logo-and-filter">
        <Logo />
        <Filter category={category} changeCategory={setCategory} searchValue={searchValue} changeSearchValue={setSearchValue} reRenderedByUser={pageRerenderedByUser}/>
      </header>
      <main>
        <ResultsMsg />
        {/* <CardsList /> */}
        <button className="load-more">Load More</button>
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
