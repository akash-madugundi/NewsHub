import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "./components/pages/Intro";
import AllNews from "./components/news/AllNews";
import CategoryNews from "./components/news/CategoryNews";
import CountryNews from "./components/news/CountryNews";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Privacy from "./components/pages/Privacy";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-out" element={<SignIn />} />
        </Route>

        <Route path="/news/*" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
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
