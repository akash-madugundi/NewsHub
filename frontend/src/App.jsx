import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import AdminSignIn from "./components/auth/AdminSignIn";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddNews from "./components/main/AddNews";
import Home from "./components/main/Home";
import ReadLater from "./components/main/ReadLater";
import Profile from "./components/main/Profile";
import AllNews from "./components/news/AllNews";
import CategoryNews from "./components/news/CategoryNews";
import CountryNews from "./components/news/CountryNews";
import EditorialNews from "./components/news/EditorialNews";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Privacy from "./components/pages/Privacy";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />}></Route>
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="admin" element={<AdminSignIn />} />
          <Route path="sign-out" element={<SignIn />} />
        </Route>

        <Route path="/news/*" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Home />} />
          <Route path="read-later" element={<ReadLater />} />
          <Route path="profile" element={<Profile />} />
          <Route path="all-news" element={<AllNews />} />
          <Route path="category-news/:category" element={<CategoryNews />} />
          <Route path="country-news/:iso" element={<CountryNews />} />
          <Route path="editorial-news" element={<EditorialNews />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>

        <Route path="/admin/*" element={
            <ProtectedRoute>
              <DashboardLayout isAdmin={true}/>
            </ProtectedRoute>
          }>
          <Route index element={<Home isAdmin={true}/>} />
          <Route path="add-news" element={<AddNews/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="all-news" element={<AllNews/>} />
          <Route path="category-news/:category" element={<CategoryNews/>} />
          <Route path="country-news/:iso" element={<CountryNews/>} />
          <Route path="editorial-news" element={<EditorialNews />} />
          <Route path="about" element={<About/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="privacy" element={<Privacy/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
