import { FC, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import {
  addToBoughtCoursesAsync,
  fetchBoughtCoursesAsync,
} from "../../redux/reducers/boughtCourses.reducer";
import { removeCourseFromCartAfterPurchase } from "../../redux/reducers/cart.reducer";
import { AppDispatch } from "../../redux/store/store";
import { ICartCourse } from "../../utils/interface";
import { showNotification } from "../../utils/ToastNotification";
import { CardDetails } from "./Checkout";
import CheckoutCourse from "./CheckoutCourse";

const CheckoutCompleteModal: FC<{
  cartCourses: ICartCourse[];
  cardDetails: CardDetails;
  cardDetailsIsValid: boolean;
  setCardDetailsIsValid(state: boolean): void;
  totalPrice: number;
}> = (props) => {
  const navigate = useNavigate();

  const { user, setIsCheckoutSuccess } = useContext(AppContext);
  const dispatch = useDispatch<AppDispatch>();

  const checkoutSuccessHandler = () => {
    let totalBoughtCourses = [];
    for (const course of props.cartCourses) {
      totalBoughtCourses.push({ ...course, bought: true });
    }
    dispatch(addToBoughtCoursesAsync({ user, totalBoughtCourses }));
    dispatch(removeCourseFromCartAfterPurchase());
    dispatch(fetchBoughtCoursesAsync(user!));
    navigate("success", { replace: true });
    setIsCheckoutSuccess(true);
  };

  const checkoutFailHandler = () => {
    showNotification("error", "Checkout failed! Please try again.");
  };

  return (
    <Modal
      show={props.cardDetailsIsValid}
      onHide={() => props.setCardDetailsIsValid(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="fw-bold my-5">Dummy Checkout Complete</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container checkout-complete ">
          <div className="row">
            <div className="col-12 col-lg-6  mt-4 mt-lg-0">
              <p className="fs-2 fw-bold">Payment Method: Card</p>
              <div className="mt-4">
                <p> Name on Card: {props.cardDetails?.nameOnCard}</p>
                <p> Card Number: {props.cardDetails?.cardNumber}</p>
                <p> CVV: {props.cardDetails?.cvv}</p>
                <p> Expiry Date: {props.cardDetails?.expiryDate}</p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <p className="fs-2 fw-bold">User Details</p>
              <div className="mt-4">
                <p> Name: {user.name}</p>
                <p> Email: {user.email}</p>
              </div>
            </div>
            <div className="col-12 col-lg-12">
              <p className="fw-bold mt-5 fs-2">Courses in cart:</p>
              {props?.cartCourses.map((cartCourse: ICartCourse) => {
                return (
                  <CheckoutCourse
                    key={cartCourse?._id}
                    course_thumbnail={cartCourse?.course_thumbnail}
                    title={cartCourse?.title}
                    discounted_price={cartCourse?.discounted_price}
                    original_price={cartCourse?.original_price}
                  />
                );
              })}
              <p className="fw-bold fs-2">
                Total Amount to be paid: ₹{props.totalPrice}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-5">
            <h2 className="fw-bold">
              Do You want this checkout to be Success or Fail?
            </h2>
            <div className="mt-5 d-flex justify-content-center ">
              <button
                onClick={() => {
                  checkoutSuccessHandler();
                  props.setCardDetailsIsValid(false);
                }}
                className="success fw-bold d-flex align-items-center justify-content-center"
              >
                Success
              </button>
              <button
                onClick={() => {
                  checkoutFailHandler();
                  props.setCardDetailsIsValid(false);
                }}
                className="fail fw-bold d-flex align-items-center justify-content-center"
              >
                Fail
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutCompleteModal;
