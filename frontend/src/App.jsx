import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "./components/pages/Intro";
import AllNews from "./components/news/AllNews";
import CategoryNews from "./components/news/CategoryNews";
import CountryNews from "./components/news/CountryNews";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Privacy from "./components/pages/Privacy";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/news/*" element={<DashboardLayout />}>
          <Route path="all-news" element={<AllNews />} />
          <Route path="category-news/:category" element={<CategoryNews />} />
          <Route path="country-news/:iso" element={<CountryNews />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
