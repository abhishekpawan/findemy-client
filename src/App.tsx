import { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/Homepage/HomePage";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login&Singup/Login";
import Signup from "./components/Login&Singup/Signup";
import CourseDetails from "./components/Course/CourseDetails";

import "./App.css";
import InstructorDetails from "./components/Instructor/InstructorDetails";
import ShoppingCart from "./components/Cart/ShoppingCart";
import SearchScreen from "./components/Search/SearchScreen";

export const AppContext = createContext<any>(null);

function App() {
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);

  return (
    <>
      <AppContext.Provider
        value={{
          isFooterVisible,
          setIsFooterVisible,
        }}
      >
        <Header />
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/coursedetails" element={<CourseDetails />} />
          <Route path="/instructordetails" element={<InstructorDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
        {/* </div> */}
      </AppContext.Provider>
    </>
  );
}

export default App;
