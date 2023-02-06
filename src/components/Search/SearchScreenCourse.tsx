import courseData from "../../data/courses.json";
import StarRatings from "react-star-ratings";
import { FC, useContext, useEffect, useState } from "react";
import { ICartCourse, ICourse } from "../../utils/interface";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/ToastNotification";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store/store";
import { AppContext } from "../../App";
import { addToCartAsync } from "../../redux/reducers/cart.reducer";

const SearchScreenCourse: FC<{ searchedCourse: ICourse }> = (props) => {
  const navigate = useNavigate();
  const { isUserLoggedIn, user } = useContext(AppContext);
  const dispatch = useDispatch<AppDispatch>();
  const { cartCourses } = useAppSelector((store) => store.cartCourses);
  const { boughtCourses } = useAppSelector((store) => store.boughtCourses);
  let courseExistInCart;
  const [isCourseAddedToCart, setCourseAddedToCart] = useState<boolean>(false);
  let courseIsPurchased;
  const [isCoursePurchased, setCoursePurchased] = useState<boolean>(false);

  //checking if course is added to cart
  courseExistInCart = cartCourses.filter((cartCourse: ICartCourse) => {
    return cartCourse.course_id === props.searchedCourse?._id;
  });

  //checking if course is already purchased
  courseIsPurchased = boughtCourses.filter((boughtCourse: ICartCourse) => {
    return boughtCourse.course_id === props.searchedCourse?._id;
  });

  useEffect(() => {
    if (courseExistInCart.length > 0) {
      setCourseAddedToCart(true);
    }
    if (courseIsPurchased.length > 0) {
      setCoursePurchased(true);
    }
  }, [courseExistInCart, courseIsPurchased]);

  //adding course to cart
  const addToCartHandler = () => {
    if (isUserLoggedIn === false) {
      showNotification(
        "info",
        "Please Log in or Sign up first to add the course in your cart!"
      );
    } else {
      dispatch(addToCartAsync({ user, courseDetails: props.searchedCourse }));
      setCourseAddedToCart(true);
    }
  };
  return (
    <div
      key={props?.searchedCourse._id}
      className="course pb-4 mb-4 d-flex flex-column flex-sm-row"
    >
      <div
        onClick={() => navigate(`/coursedetails/${props?.searchedCourse._id}`)}
        className="thumbnail me-0 me-sm-3 mb-4 mb-lg-0"
      >
        <img src={props.searchedCourse?.course_thumbnail} alt="" />
      </div>
      <div className="d-flex justify-content-between container-fluid p-0">
        <div
          onClick={() =>
            navigate(`/coursedetails/${props?.searchedCourse._id}`)
          }
          className="description me-md-4 d-flex flex-column"
        >
          <div className="title fw-bold fs-2">
            {props.searchedCourse?.title}
          </div>
          <div className="short-description fs-4">
            {props.searchedCourse?.short_description}
          </div>
          <div className="instructor-name mt-2 fs-5">
            by {props.searchedCourse?.instructor_name}
          </div>
          <div className="rating d-flex align-item-center mb-2 fw-bold fs-4">
            <span className="rating_num me-2 pt-1">
              {props.searchedCourse?.rating}
            </span>

            <StarRatings
              rating={props.searchedCourse?.rating}
              starDimension="14px"
              starSpacing="0px"
              starRatedColor="orange"
              numberOfStars={5}
            />
            <span className="num_reviews pt-2 fw-normal fs-5 ms-2">
              ({props.searchedCourse?.num_reviews} ratings)
            </span>
          </div>
          <div className="course_details mt-1 fs-5 ">
            <span className="me-2">21 hours</span>
            <span className="me-2">110 lectures</span>
            <span className="me-2">{props.searchedCourse?.level}</span>
          </div>
          <div className={`tag__${props.searchedCourse?.tag}`}>
            {props.searchedCourse?.tag}
          </div>
        </div>
        <div className="price d-flex flex-column justify-content-between">
          {isCoursePurchased ? (
            <>
              <div className="fs-3 fw-bold text-center my-4">
                You have enrolled in this Course!
              </div>
              <div className="fs-4 text-center mb-4">Start Learning Now!</div>
            </>
          ) : (
            <>
              <div className=" d-flex flex-column align-items-end">
                <span className="mb-2 fw-bold fs-1">
                  ₹{props.searchedCourse?.discounted_price}
                </span>

                <span className="normal-price fs-5 text-decoration-line-through">
                  ₹{props.searchedCourse?.original_price}
                </span>
              </div>
              {isCourseAddedToCart ? (
                <div
                  onClick={() => navigate("/cart")}
                  className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3"
                >
                  <button className="fw-bold">Go to Cart</button>
                </div>
              ) : (
                <div
                  onClick={addToCartHandler}
                  className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3"
                >
                  <button className="fw-bold">Add to cart</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreenCourse;
