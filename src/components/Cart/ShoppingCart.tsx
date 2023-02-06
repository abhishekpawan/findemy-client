import CartCourse from "./ShoppingCartCourse";
import "./shoppingcart.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import ShopingCartLoader from "./ShopingCartLoader";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../redux/store/store";
import {
  addToCartAsync,
  deleteCourseFromCartAsync,
  selectStatus,
} from "../../redux/reducers/cart.reducer";
import { useDispatch } from "react-redux";
import WishlistCartCourse from "./WishlistCartCourse";
import { deleteCourseFromWishlistAsync } from "../../redux/reducers/wishlist.reducer";

const ShoppingCart = () => {
  const { user } = useContext(AppContext);
  const dispatch = useDispatch<AppDispatch>();
  const { cartCourses } = useAppSelector((store) => store.cartCourses);
  const { wishlistCourses } = useAppSelector((store) => store.wishlistCourses);
  // Get the current `status`:
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let totalOriginalPrice: number = 0;
  let totalDiscountedPrice: number = 0;

  for (let i = 0; i < cartCourses.length; i++) {
    totalOriginalPrice = totalOriginalPrice + cartCourses[i]?.original_price;
    totalDiscountedPrice =
      totalDiscountedPrice + cartCourses[i]?.discounted_price;
  }

  let totalPercentageOff =
    100 - Math.round((totalDiscountedPrice / totalOriginalPrice) * 100);

  //removing course from cart
  const onDeleteHandler = (_id: string) => {
    dispatch(deleteCourseFromCartAsync({ _id, user }));
  };

  return (
    <>
      {status === "loading" ? (
        <ShopingCartLoader />
      ) : (
        <>
          {cartCourses.length === 0 ? (
            <EmptyCart />
          ) : (
            <main className="cart container p-4">
              <div className="row">
                <h1 className="fw-bold">Shopping Cart</h1>
                <h3 className="fw-bold fs-4 mt-4 mb-3">
                  {cartCourses.length}
                  {cartCourses.length > 1 ? " Courses" : " Course "}
                  in Cart
                </h3>
                <div className="col-12 col-lg-9">
                  {cartCourses?.map((cartCourse) => {
                    return (
                      <CartCourse
                        onDeleteHandler={onDeleteHandler}
                        key={cartCourse._id}
                        cartCourse={cartCourse}
                      />
                    );
                  })}
                </div>
                <div className="col-12 col-lg-3">
                  <div className="total-prices d-flex flex-column ms-lg-4">
                    <div className="fw-bold mb-3">Total</div>
                    <div className="fw-bold fs-1 mb-2">
                      ₹{totalDiscountedPrice}
                    </div>
                    <div className="mb-2 fs-5 text-decoration-line-through">
                      ₹{totalOriginalPrice}
                    </div>
                    <div className="mb-3 fs-5">{totalPercentageOff}% off</div>
                    <Link
                      to="/checkout"
                      className="checkout-btn d-flex justify-content-center align-items-center "
                    >
                      <button className="fw-bold ">Checkout</button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          )}
        </>
      )}

      {status === "loading" ? (
        <ShopingCartLoader />
      ) : (
        <>
          {wishlistCourses.length === 0 ? (
            ""
          ) : (
            <main className="cart container p-4">
              <div className="row">
                <h1 className="fw-bold">Your Wishlist</h1>
                <h3 className="fw-bold fs-4 mt-4 mb-3">
                  {wishlistCourses.length}
                  {wishlistCourses.length > 1 ? " Courses" : " Course "}
                  in Wishlist
                </h3>
                <div className="col-12">
                  {wishlistCourses?.map((wishlistCourse) => {
                    return (
                      <WishlistCartCourse
                        key={wishlistCourse._id}
                        cartCourse={wishlistCourse}
                        wishListCourse={wishlistCourse}
                      />
                    );
                  })}
                </div>
              </div>
            </main>
          )}
        </>
      )}
    </>
  );
};

export default ShoppingCart;
