import { useState, createContext, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/Homepage/HomePage";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login&Singup/Login";
import Signup from "./components/Login&Singup/Signup";
import CourseDetails from "./components/Course/CourseDetails";
import InstructorDetails from "./components/Instructor/InstructorDetails";
import ShoppingCart from "./components/Cart/ShoppingCart";
import SearchScreen from "./components/Search/SearchScreen";
import MyLearnings from "./components/MyLearnings/MyLearnings";
import Checkout from "./components/Checkout/Checkout";

import "./App.css";
import { UserData } from "./utils/interface";

export const AppContext = createContext<any>(null);

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
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/coursedetails/:id" element={<CourseDetails />} />
          <Route
            path="/instructordetails/:id"
            element={<InstructorDetails />}
          />
          {isUserLoggedIn ? (
            <>
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/mylearnings" element={<MyLearnings />} />{" "}
              <Route path="/checkout" element={<Checkout />} />{" "}
            </>
          ) : (
            ""
          )}
          <Route path="/search" element={<SearchScreen />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </>
  );
}

export default App;
