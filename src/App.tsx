import Filter from "./components/Filter";
import "./App.css";
import FocusedImage from "./components/FocusedImage";
import Footer from "./components/Footer";
import CardsList from "./components/CardsLists";

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
  return (
    <>
      <FocusedImage />
      <header className="logo-and-filter">
        <Logo />
        <Filter />
      </header>
      <main>
        <ResultsMsg />
        <CardsList />
        <button className="load-more">Load More</button>
      </main>
      <Footer />
    
    </>
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
