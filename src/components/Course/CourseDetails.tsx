import StarRatings from "react-star-ratings";
import { BsPatchExclamationFill } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";
import CourseDetailsCard from "./CourseDetailsCard";
import { CourseDetailsInstructorDetails } from "../Instructor/CourseDetailsInstructorDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { showNotification } from "../ToastNotification/ToastNotification";
import { ICourse } from "../Homepage/HomePage";
import CourseDetailsLoader from "./CourseDetailsLoader";
import { AppContext } from "../../App";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isUserLoggedIn, user } = useContext(AppContext);
  const [courseDetails, setCourseDetails] = useState<ICourse>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCourseDetail = async () => {
      try {
        let response = await fetch(`http://localhost:3001/courses/${id}`);
        let data = await response.json();
        if (data.success == true) {
          setCourseDetails(data.course);
          setLoading(false);
        }
      } catch (error: any) {
        showNotification("error", error.toString());
      }
    };
    getCourseDetail();
  }, []);

  const addCourseToCart = async () => {
    const CourseDataForCart = {
      ...courseDetails,
      course_id: courseDetails?._id,
      user_id: user.id,
    };
    try {
      const response = await fetch("http://localhost:3001/cart/add", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        method: "Post",
        body: JSON.stringify(CourseDataForCart),
      });

      const data = await response.json();
      if (data.success === true) {
        showNotification("success", "Course added to cart!");
      } else {
        throw new Error(data.message);
      }
      // console.log(body);
    } catch (error: any) {
      showNotification("error", error.message.toString());
    }
  };

  const addToCartHandler = () => {
    if (isUserLoggedIn === false) {
      showNotification(
        "info",
        "Please Log in or Sign up first to add the course in your cart!"
      );
    } else {
      addCourseToCart();
    }
  };

  const buyNowHandler = () => {
    if (isUserLoggedIn === false) {
      showNotification(
        "info",
        "Please Log in or Sign up first to buy the course!"
      );
    } else {
      addCourseToCart();
      navigate("/cart");
    }
  };

  // const percentage: number = Math.round(
  //   (courseDetails?.discounted_price / courseDetails?.original_price) * 100
  // );

  return (
    <>
      {isLoading ? (
        <CourseDetailsLoader />
      ) : (
        <main className="course__details d-flex flex-column">
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
                  {/* <span className="num_students fw-normal ms-2 ">
                {courseData[0].num_students} students
              </span> */}
                </div>
                <div className="course__details-instructor mb-3">
                  Created by{" "}
                  <a href="#course__details_instructor">
                    {courseDetails?.instructor_name}
                  </a>
                </div>
                <div className="course__details-last-update d-flex align-items-center ">
                  <span className="date ">
                    <BsPatchExclamationFill /> Last updated 07/2022
                  </span>
                  <span className="language">
                    <TbWorld /> English
                  </span>
                </div>

                <div className="course__details__card-details d-block d-lg-none pt-1 ">
                  <div className="price-details d-flex align-items-center">
                    <div className="discounted-price fw-bold  py-2 me-3">
                      ₹{courseDetails?.discounted_price}
                    </div>
                    <div className="price me-3 text-decoration-line-through">
                      ₹{courseDetails?.original_price}
                    </div>
                    <div className="percentage">{80}% off</div>
                  </div>

                  <div
                    onClick={addToCartHandler}
                    className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3"
                  >
                    <button className="fw-bold">Add to cart</button>
                  </div>
                  <div
                    onClick={buyNowHandler}
                    className="buy_now-btn d-flex justify-content-center align-items-center mb-4"
                  >
                    <button className="fw-bold">Buy now</button>
                  </div>
                  <div className="fs-4 text-center mb-4">
                    30-Day Money-Back Guarantee <br /> <br />
                    Full Lifetime Access
                  </div>

                  <div className="apply_coupon  d-flex align-items-center justify-content-between py-4">
                    <a>Share</a>
                    <a>Gift this course</a>
                    <a>Apply Coupon</a>
                  </div>
                </div>
              </div>
              <CourseDetailsCard
                course_thumbnail={courseDetails?.course_thumbnail}
                discounted_price={courseDetails?.discounted_price}
                original_price={courseDetails?.original_price}
                addToCartHandler={addToCartHandler}
                buyNowHandler={buyNowHandler}
              />
            </div>
          </div>
          <div className="course__details__desc">
            <div className="course__details__desc-wrapper">
              <div className="learning-points">
                <h2 className="fw-bold mb-4">What you'll learn</h2>
                <div className="row">
                  {courseDetails?.learning_point?.map((learningPoint) => {
                    return (
                      <div
                        key={learningPoint.charCodeAt(0)}
                        className="item d-flex p-3 col-12 col-md-6"
                      >
                        <div>
                          <AiOutlineCheck />
                        </div>
                        <span className="ms-4">{learningPoint}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="requirements mb-5">
                <h2 className="fw-bold mb-4">Requirements</h2>
                <ul>
                  {courseDetails?.requirements?.map((requirement) => {
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
      )}
    </>
  );
};

export default CourseDetails;
