import courseData from "../../data/courses.json";
import StarRatings from "react-star-ratings";
import { BsPatchExclamationFill } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";
import CourseDetailsCard from "./CourseDetailsCard";
import { CourseDetailsInstructorDetails } from "../Instructor/CourseDetailsInstructorDetails";

const CourseDetails = () => {
  return (
    <main className="course__details d-flex flex-column">
      <div className="course__details__body__container">
        <div className="course__details__body">
          <div className="course__details__body-wrapper">
            <div className="course__details-img d-flex d-lg-none pb-4">
              <img src={courseData[0].thumbnail} alt="" />
            </div>
            <div className="course__details-title">
              <h1 className="fw-bold mb-3 ">{courseData[0].title} </h1>
            </div>
            <div className="course__details-short-desc fw-normal fs-4 mb-3">
              Learn A-Z everything about Python, from the basics, to advanced
              topics like Python GUI, Python Data Analysis, and more!
            </div>
            <div className="course__details-rating d-flex align-items-center fw-bold fs-4 mb-2 ">
              <div className="tag__bestseller me-3">Bestseller</div>
              <span className="rating_num pt-2 me-2">
                {courseData[0].rating}
              </span>
              <StarRatings
                rating={courseData[0].rating}
                starDimension="14px"
                starSpacing="0px"
                starRatedColor="orange"
                numberOfStars={5}
              />
              <span className="num_reviews pt-2 fw-normal mx-2 text-decoration-underline">
                ({courseData[0].num_reviews} ratings)
              </span>
              {/* <span className="num_students fw-normal ms-2 ">
                {courseData[0].num_students} students
              </span> */}
            </div>
            <div className="course__details-instructor mb-3">
              Created by <a>{courseData[0].instructor}</a>
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
                  ₹{courseData[0].discounted_price}
                </div>
                <div className="price me-3 text-decoration-line-through">
                  ₹{courseData[0].price}
                </div>
                <div className="percentage">
                  {Math.round(
                    (courseData[0].discounted_price / courseData[0].price) * 100
                  )}
                  % off
                </div>
              </div>
              <div className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3">
                <button className="fw-bold">Add to cart</button>
              </div>
              <div className="buy_now-btn d-flex justify-content-center align-items-center mb-4">
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
          <CourseDetailsCard />
        </div>
      </div>
      <div className="course__details__desc">
        <div className="course__details__desc-wrapper">
          <div className="learning-points">
            <h2 className="fw-bold mb-4">What you'll learn</h2>
            <div className="row">
              {courseData[0].body.learning_points.map((learningPoint) => {
                return (
                  <div
                    key={learningPoint.charCodeAt(0)}
                    className="item d-flex p-3 col-12 col-md-6"
                  >
                    <div>
                      <AiOutlineCheck />
                    </div>
                    <span>{learningPoint}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="requirements mb-5">
            <h2 className="fw-bold mb-4">Requirements</h2>
            <ul>
              {courseData[0].body.requirements.map((requirement) => {
                return <li key={requirement.charCodeAt(0)}>{requirement}</li>;
              })}
            </ul>
          </div>
          <div className="description mb-5">
            <h2 className="fw-bold mb-4">Description</h2>
            {courseData[0].body.description}
          </div>
          <CourseDetailsInstructorDetails />
        </div>
      </div>
    </main>
  );
};

export default CourseDetails;
