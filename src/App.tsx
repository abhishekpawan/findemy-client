import { useState, createContext, useRef } from "react";
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
type UserData = {
  id: string;
  name: string;
  email: string;
  token: string;
};

function App() {
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);
  const userData: UserData = JSON.parse(localStorage.getItem("user")!);
  const [user, setUser] = useState<UserData | null>(userData ? userData : null);
  const [isUserLoggedIn, setUserLoggedin] = useState<boolean>(
    user ? true : false
  );
  // const notificationMessage = useRef<string>("");

  return (
    <>
      <AppContext.Provider
        value={{
          isFooterVisible,
          setIsFooterVisible,
          isUserLoggedIn,
          setUserLoggedin,
          user,
          setUser,
          // notificationMessage,
          // showNotification,
        }}
      >
        <Header />
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/coursedetails/:id" element={<CourseDetails />} />
          <Route path="/instructordetails" element={<InstructorDetails />} />
          {isUserLoggedIn ? (
            <Route path="/cart" element={<ShoppingCart />} />
          ) : (
            ""
          )}
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
