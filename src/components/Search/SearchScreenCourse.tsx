import courseData from "../../data/courses.json";
import StarRatings from "react-star-ratings";

const SearchScreenCourse = () => {
  return (
    <div className="course pb-4 mb-4 d-flex flex-column flex-sm-row">
      <div className="thumbnail me-0 me-sm-3 mb-4 mb-lg-0">
        <img src={courseData[0].thumbnail} alt="" />
      </div>
      <div className="d-flex justify-content-between container-fluid p-0">
        <div className="description me-md-4 d-flex flex-column">
          <div className="title fw-bold fs-2">{courseData[0].title}</div>
          <div className="short-description fs-4">
            {courseData[0].body.short_description}
          </div>
          <div className="instructor-name mt-2 fs-5">
            by {courseData[0].instructor}
          </div>
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
          <div className="course_details mt-1 fs-5 ">
            <span className="me-2">21 hours</span>
            <span className="me-2">110 lectures</span>
            <span className="me-2">{courseData[0].level}</span>
          </div>
          <div className={`tag__${courseData[0].tag}`}>{courseData[0].tag}</div>
        </div>
        <div className="price d-flex flex-column align-items-end">
          <span className="mb-2 fw-bold fs-1">
            ₹{courseData[0].discounted_price}
          </span>

          <span className="normal-price fs-5 text-decoration-line-through">
            ₹{courseData[0].price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchScreenCourse;
