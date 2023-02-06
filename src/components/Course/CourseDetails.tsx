import { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { useNavigate, useParams } from "react-router-dom";
import { BsPatchExclamationFill } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { AiOutlineCheck, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CourseDetailsCard from "./CourseDetailsCard";
import { CourseDetailsInstructorDetails } from "../Instructor/CourseDetailsInstructorDetails";
import CourseDetailsLoader from "./CourseDetailsLoader";
import { AppContext } from "../../App";
import { showNotification } from "../../utils/ToastNotification";
import { ICartCourse, ICourse } from "../../utils/interface";
import { AppDispatch, useAppSelector } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import {
  addToCartAsync,
} from "../../redux/reducers/cart.reducer";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  addToWishlistAsync,
  deleteCourseFromWishlistAsync,
} from "../../redux/reducers/wishlist.reducer";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isUserLoggedIn, user } = useContext(AppContext);
  const [courseDetails, setCourseDetails] = useState<ICourse>();
  let courseExistInCart: ICourse[];
  const [isCourseAddedToCart, setCourseAddedToCart] = useState<boolean>(false);
  let courseIsPurchased: ICourse[];
  const [isCoursePurchased, setCoursePurchased] = useState<boolean>(false);
  let courseExistInWishlist: ICourse[];
  const [isCourseAddedToWishlist, setCourseAddedToWishlist] =
    useState<boolean>(false);
  const { courses } = useAppSelector((store) => store.courses);
  const { cartCourses } = useAppSelector((store) => store.cartCourses);
  const { boughtCourses } = useAppSelector((store) => store.boughtCourses);
  const { wishlistCourses } = useAppSelector((store) => store.wishlistCourses);
  const dispatch = useDispatch<AppDispatch>();
  const [isScrollingStart, setIsScrollingStart] = useState<Boolean>(false);
  const [isSpinning, setSpining] = useState<boolean>(true);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 34, color: "purple" }} spin />
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSpining(true);
    setCourseDetails(
      courses.find((course) => {
        return course._id === id?.toString();
      })
    );
  }, [courseDetails, courses]);

  //checking if course is added to cart
  courseExistInCart = cartCourses.filter((cartCourse: ICartCourse) => {
    return cartCourse.course_id === courseDetails?._id;
  });

  //checking if course is already purchased
  courseIsPurchased = boughtCourses.filter((boughtCourse: ICartCourse) => {
    return boughtCourse.course_id === courseDetails?._id;
  });

  //checking if course is added to wishlist
  courseExistInWishlist = wishlistCourses.filter(
    (wishlistCourses: ICartCourse) => {
      return wishlistCourses.course_id === courseDetails?._id;
    }
  );

  useEffect(() => {
    if (courseExistInCart.length > 0) {
      setCourseAddedToCart(true);
      setSpining(false);
    } else {
    }
    if (courseIsPurchased.length > 0) {
      setCoursePurchased(true);
      setSpining(false);
    }
    if (courseExistInWishlist.length > 0) {
      setCourseAddedToWishlist(true);
      setSpining(false);
    } else {
      setCourseAddedToWishlist(false);
    }
  }, [courseExistInCart, courseIsPurchased, courseExistInWishlist]);

  useEffect(() => {
    setTimeout(() => {
      if (courseDetails?._id) {
        setSpining(false);
      }
    }, 1000);
  }, [courseExistInCart, courseIsPurchased, courseExistInWishlist]);

  //adding course to cart
  const addToCartHandler = () => {
    setSpining(true);
    if (isUserLoggedIn === false) {
      setSpining(false);
      showNotification(
        "info",
        "Please Log in or Sign up first to add the course in your cart!"
      );
    } else if (courseExistInWishlist.length > 0) {
      dispatch(
        deleteCourseFromWishlistAsync({
          user,
          _id: courseExistInWishlist[0]._id!,
        })
      );
      dispatch(addToCartAsync({ user, courseDetails: courseDetails! }));
    } else {
      dispatch(addToCartAsync({ user, courseDetails: courseDetails! }));
    }
  };

  const buyNowHandler = () => {
    setSpining(true);
    if (isUserLoggedIn === false) {
      setSpining(false);
      showNotification(
        "info",
        "Please Log in or Sign up first to buy the course!"
      );
    } else if (courseExistInWishlist.length > 0) {
      dispatch(
        deleteCourseFromWishlistAsync({
          user,
          _id: courseExistInWishlist[0]._id!,
        })
      );
      dispatch(addToCartAsync({ user, courseDetails: courseDetails! }));
      navigate("/cart");
    } else {
      dispatch(addToCartAsync({ user, courseDetails: courseDetails! }));
      navigate("/cart");
    }
  };

  //adding course to wishlist
  const addToWishlistHandler = () => {
    setSpining(true);
    if (isUserLoggedIn === false) {
      setSpining(false);
      showNotification(
        "info",
        "Please Log in or Sign up first to add the course in your wishlist!"
      );
    } else {
      dispatch(addToWishlistAsync({ user, courseDetails: courseDetails! }));
    }
  };

  //removing course to wishlist
  const removeFromWishlistHandler = () => {
    setSpining(true);
    if (isCourseAddedToWishlist === true && courseExistInWishlist.length > 0) {
      dispatch(
        deleteCourseFromWishlistAsync({
          user,
          _id: courseExistInWishlist[0]._id!,
        })
      );
      setCourseAddedToWishlist(false);
      setSpining(false);
    }
  };

  const percentage: number =
    100 -
    Math.round(
      (courseDetails?.discounted_price! / courseDetails?.original_price!) * 100
    );

  window.onscroll = function () {
    let scrollLimit = 80;
    if (window.scrollY >= scrollLimit) {
      setIsScrollingStart(true);
    } else {
      setIsScrollingStart(false);
    }
  };

  return (
    <>
      {courseDetails?._id ? (
        <main className="course__details d-flex flex-column">
          <div
            className={` ${
              isScrollingStart ? "onScroll " : ""
            } scroll-course-header`}
          >
            <h3 className="fw-bold m-0">{courseDetails?.title} </h3>
            <div className="course__details-rating d-flex align-items-center fw-bold fs-5 mb-2 ">
              <span className="rating_num pt-2 me-2">
                {courseDetails?.rating}
              </span>
              <StarRatings
                rating={courseDetails?.rating}
                starDimension="14px"
                starSpacing="0px"
                starRatedColor="orange"
                numberOfStars={5}
              />
              <span className="num_reviews pt-2 fw-normal mx-2 text-decoration-underline">
                ({courseDetails?.num_reviews} ratings)
              </span>
              <span className="num_students fw-normal pt-2 ms-2 ">
                {courseDetails?.num_students} students
              </span>
            </div>
          </div>
          <div className="course__details__body__container">
            <div className="course__details__body">
              <div className="course__details__body-wrapper">
                <div className="course__details-img d-flex d-lg-none pb-4">
                  <img src={courseDetails?.course_thumbnail} alt="" />
                </div>
                <div className="course__details-title">
                  <h1 className="fw-bold mb-3 ">{courseDetails?.title} </h1>
                </div>
                <div className="course__details-short-desc fw-normal fs-4 mb-3">
                  {courseDetails?.short_description}
                </div>
                <div className="course__details-rating d-flex align-items-center fw-bold fs-4 mb-2 ">
                  <div className={`tag__${courseDetails?.tag} me-3 `}>
                    {courseDetails?.tag}
                  </div>
                  <span className="rating_num pt-2 me-2">
                    {courseDetails?.rating}
                  </span>
                  <StarRatings
                    rating={courseDetails?.rating}
                    starDimension="14px"
                    starSpacing="0px"
                    starRatedColor="orange"
                    numberOfStars={5}
                  />
                  <span className="num_reviews pt-2 fw-normal mx-2 text-decoration-underline">
                    ({courseDetails?.num_reviews} ratings)
                  </span>
                </div>
                <div className="course__details-instructor mb-3">
                  Created by
                  <a href="#course__details_instructor">
                    {`  ${courseDetails?.instructor_name}`}
                  </a>
                </div>
                <div className="course__details-last-update d-flex align-items-center ">
                  <span className="date me-3 ">
                    <BsPatchExclamationFill /> Last updated 07/2022
                  </span>
                  <span className="language">
                    <TbWorld /> English
                  </span>
                </div>
                <div className="course__details__card-details d-block d-lg-none pt-1 ">
                  {isCoursePurchased ? (
                    <>
                      <div className="fs-3 fw-bold text-center my-4">
                        You have enrolled in this Course!
                      </div>
                      <div className="fs-4 text-center mb-4">
                        Start Learning Now!
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="price-details d-flex align-items-center">
                        <div className="discounted-price fw-bold  py-2 me-3">
                          ₹{courseDetails?.discounted_price}
                        </div>
                        <div className="price me-3 text-decoration-line-through">
                          ₹{courseDetails?.original_price}
                        </div>
                        <div className="percentage">{percentage}% off</div>
                      </div>
                      {isCourseAddedToCart ? (
                        <div
                          onClick={() => navigate("/cart")}
                          className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3"
                        >
                          <button className="fw-bold">Go to Cart</button>
                        </div>
                      ) : (
                        <Spin indicator={antIcon} spinning={isSpinning}>
                          <>
                            <div className="d-flex justify-content-center align-items-center">
                              <div
                                onClick={addToCartHandler}
                                className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3 me-4"
                              >
                                <button className="fw-bold">Add to cart</button>
                              </div>
                              {isCourseAddedToWishlist ? (
                                <div
                                  onClick={removeFromWishlistHandler}
                                  className="add_to_wishlist-btn d-flex justify-content-center align-items-center mb-3"
                                >
                                  <AiFillHeart color="white" />
                                </div>
                              ) : (
                                <div
                                  onClick={addToWishlistHandler}
                                  className="add_to_wishlist-btn d-flex justify-content-center align-items-center mb-3"
                                >
                                  <AiOutlineHeart />
                                </div>
                              )}
                            </div>

                            <div
                              onClick={buyNowHandler}
                              className="buy_now-btn d-flex justify-content-center align-items-center mb-4"
                            >
                              <button className="fw-bold">Buy now</button>
                            </div>
                          </>
                        </Spin>
                      )}
                      <div className="fs-4 text-center mb-4">
                        30-Day Money-Back Guarantee <br /> <br />
                        Full Lifetime Access
                      </div>
                    </>
                  )}

                  <div className="apply_coupon  d-flex align-items-center justify-content-between py-4">
                    <a>Share</a>
                    <a>Gift this course</a>
                    <a>Apply Coupon</a>
                  </div>
                </div>
              </div>
              <CourseDetailsCard
                isCoursePurchased={isCoursePurchased}
                isCourseAddedToCart={isCourseAddedToCart}
                course_thumbnail={courseDetails?.course_thumbnail}
                discounted_price={courseDetails?.discounted_price}
                original_price={courseDetails?.original_price}
                addToCartHandler={addToCartHandler}
                buyNowHandler={buyNowHandler}
                isSpinning={isSpinning}
                isCourseAddedToWishlist={isCourseAddedToWishlist}
                addToWishlistHandler={addToWishlistHandler}
                removeFromWishlistHandler={removeFromWishlistHandler}
              />
            </div>
          </div>
          <div className="course__details__desc">
            <div className="course__details__desc-wrapper">
              <div className="learning-points">
                <h2 className="fw-bold mb-4">What you'll learn</h2>
                <div className="row">
                  {courseDetails?.learning_point?.map(
                    (learningPoint: string, index) => {
                      return (
                        <div
                          key={index}
                          className="item d-flex p-3 col-12 col-md-6"
                        >
                          <div>
                            <AiOutlineCheck />
                          </div>
                          <span className="ms-4">{learningPoint}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="requirements mb-5">
                <h2 className="fw-bold mb-4">Requirements</h2>
                <ul>
                  {courseDetails?.requirements?.map((requirement: string) => {
                    return (
                      <li key={requirement.charCodeAt(0)}>{requirement}</li>
                    );
                  })}
                </ul>
              </div>
              <div className="description mb-5">
                <h2 className="fw-bold mb-4">Description</h2>
                {courseDetails?.description}
              </div>
              <CourseDetailsInstructorDetails
                instructor_id={courseDetails?.instructor_id}
              />
            </div>
          </div>
        </main>
      ) : (
        <CourseDetailsLoader />
      )}
    </>
  );
};

export default CourseDetails;
