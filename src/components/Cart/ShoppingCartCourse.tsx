import courseData from "../../data/courses.json";
import { BsTagFill } from "react-icons/bs";
import StarRatings from "react-star-ratings";
const CartCourse = () => {
  return (
    <div className="course d-flex flex-column flex-md-row">
      <div className="thumbnail me-0 me-md-3">
        <img src={courseData[0].thumbnail} alt="" />
        <div className="mt-3 d-block d-md-none">
          <h3 className="title fw-bold fs-2 mt-3">{courseData[0].title}</h3>

          <div className="instructot fw-normal fs-4">
            by {courseData[0].instructor}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between container-fluid">
        <div className="description ">
          <div className="d-none d-md-block">
            <h3 className="title fw-bold fs-3">{courseData[0].title}</h3>

            <div className="instructot fw-normal fs-5">
              by {courseData[0].instructor}
            </div>
          </div>
          <div className={`tag__${courseData[0].tag}`}>{courseData[0].tag}</div>

          <div className="rating d-flex align-item-center mb-2 fw-bold fs-4">
            <span className="rating_num me-2 pt-1">{courseData[0].rating}</span>

            <StarRatings
              rating={courseData[0].rating}
              starDimension="14px"
              starSpacing="0px"
              starRatedColor="orange"
              numberOfStars={5}
            />
            <span className="num_reviews pt-2 fw-normal fs-5 ms-2">
              ({courseData[0].num_reviews} ratings)
            </span>
          </div>
          <div className="course_details fs-5 d-md-block d-none">
            <span className="me-2">21 hours</span>
            <span className="me-2">110 lectures</span>
            <span className="me-2">{courseData[0].level}</span>
          </div>
          <div className="price d-flex d-md-none align-items-center">
            <span className="mb-2 fw-bold fs-1">
              ₹{courseData[0].discounted_price}
            </span>

            <span className="normal-price fs-5 mx-2 text-decoration-line-through">
              ₹{courseData[0].price}
            </span>
            <div>
              <BsTagFill />
            </div>
          </div>
        </div>

        <div className="course_details fs-5 d-block d-md-none">
          <span className="me-2">21 hours</span>
          <span className="me-2">110 lectures</span>
          <span className="me-2">{courseData[0].level}</span>
        </div>
        <div className="d-flex">
          <div className="actions fs-5 fs- d-flex flex-md-column align-items-end mt-3 mt-md-1 me-md-5">
            <a className="me-3 me-md-0 mb-md-3" href="">
              Remove
            </a>
            <a className="me-3 me-md-0 mb-md-3" href="">
              Save for Later
            </a>
            <a href="">Move to Wishlist</a>
          </div>
          <div className="price d-none d-md-flex flex-column align-items-end ">
            <span className="mb-2 fw-bold fs-1">
              ₹{courseData[0].discounted_price}
            </span>

            <span className="normal-price fs-5 mx-2 text-decoration-line-through">
              ₹{courseData[0].price}
            </span>
            <div>
              <BsTagFill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCourse;
