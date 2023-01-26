import CartCourse from "./ShoppingCartCourse";

import "./shoppingcart.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { showNotification } from "../../utils/ToastNotification";
import { ICartCourse } from "../../utils/interface";
import ShopingCartLoader from "./ShopingCartLoader";
import EmptyCart from "./EmptyCart";

const ShoppingCart = () => {
  const { user } = useContext(AppContext);
  const [cartCourses, setcartCourses] = useState<ICartCourse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCartCourses = async () => {
      try {
        let response = await fetch(
          `http://localhost:3001/cart/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        let data = await response.json();
        if (data.success == true) {
          setcartCourses(data.cartCourse);
          setLoading(false);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
        setLoading(false);
      }
    };
    getCartCourses();
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

  const onDeleteHandler = (course_id: string) => {
    const deleteCourseFromCart = async () => {
      try {
        let response = await fetch(`http://localhost:3001/cart/${course_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id }),
        });
        let data = await response.json();
        if (data.success == true) {
          setcartCourses(
            cartCourses.filter((cartDetail) => {
              return cartDetail._id != course_id;
            })
          );
          showNotification(
            "success",
            "Course successfully removed from your cart!"
          );
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
      }
    };
    deleteCourseFromCart();
  };

  return (
    <>
      {isLoading ? (
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
                  {cartCourses.length} Courses in Cart
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
                    <div className="checkout-btn d-flex justify-content-center align-items-center ">
                      <button className="fw-bold ">Checkout</button>
                    </div>
                  </div>
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
