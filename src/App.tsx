import { useState, createContext, useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
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
import Layout1 from "./Layouts/Layout1";
import CheckoutSuccess from "./components/Checkout/CheckoutSuccess";
import { AppDispatch, useAppSelector } from "./redux/store/store";
import { useDispatch } from "react-redux";
import { fetchCoursesAsync } from "./redux/reducers/courses.reducer";
import { fetchCartCoursesAsync } from "./redux/reducers/cart.reducer";
import { showNotification } from "./utils/ToastNotification";
import { fetchBoughtCoursesAsync } from "./redux/reducers/boughtCourses.reducer";
import { fetchWishlistCoursesAsync } from "./redux/reducers/wishlist.reducer";
import MyWishlist from "./components/MyWishlist/MyWishlist";

export const AppContext = createContext<any>(null);

function App() {
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState<boolean>(false);
  const userData: UserData = JSON.parse(localStorage.getItem("user")!);
  const [user, setUser] = useState<UserData | null>(userData ? userData : null);
  const [isUserLoggedIn, setUserLoggedin] = useState<boolean>(
    user ? true : false
  );
  const dispatch = useDispatch<AppDispatch>();
  const { courses } = useAppSelector((store) => store.courses);
  const { cartCourses, error } = useAppSelector((store) => store.cartCourses);
  const { boughtCourses } = useAppSelector((store) => store.boughtCourses);
  const { wishlistCourses } = useAppSelector((store) => store.wishlistCourses);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCoursesAsync(user!));
    }
    if (cartCourses.length === 0 && isUserLoggedIn === true) {
      dispatch(fetchCartCoursesAsync(user!));
    }
    if (boughtCourses.length === 0 && isUserLoggedIn === true) {
      dispatch(fetchBoughtCoursesAsync(user!));
    }
    if (wishlistCourses.length === 0 && isUserLoggedIn === true) {
      dispatch(fetchWishlistCoursesAsync(user!));
    }
  }, []);

  if (error !== null) {
    showNotification("error", error.toString());
  }
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
          isCheckoutSuccess,
          setIsCheckoutSuccess,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout1 />}>
            <Route path="" element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="coursedetails/:id" element={<CourseDetails />} />
            <Route
              path="instructordetails/:id"
              element={<InstructorDetails />}
            />
            {isUserLoggedIn ? (
              <>
                <Route path="cart" element={<ShoppingCart />} />
                <Route path="mylearnings" element={<MyLearnings />} />
                <Route path="mywishlist" element={<MyWishlist />} />
              </>
            ) : (
              ""
            )}
            <Route path="search/:text" element={<SearchScreen />} />
            <Route path="*" element={<HomePage />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
