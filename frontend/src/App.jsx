import { BrowserRouter, Route, Routes, useParams  } from "react-router-dom";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import CategoryNews from "./components/CategoryNews";
import CountryNews from "./components/CountryNews";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Welcome to NewsHub!!!</h1>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/all-news" element={<AllNews />} />
          <Route path="/category-news/:category" element={<CategoryNews />} />
          <Route path="/country-news/:iso" element={<CountryNews />} />
        </Routes>
        {/* <Footer />   */}
      </BrowserRouter>
    </div>
  );
}

export default App;
