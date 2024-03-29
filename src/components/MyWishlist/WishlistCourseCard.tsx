import { FC, useContext } from "react";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { ICartCourse, ICourse } from "../../utils/interface";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { deleteCourseFromWishlistAsync } from "../../redux/reducers/wishlist.reducer";
import { AppContext } from "../../App";
import { addToCartAsync } from "../../redux/reducers/cart.reducer";

const WishlistCourseCard: FC<{ course: ICourse; course_id?: string }> = (
  props
) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  //removing course to wishlist
  const removeFromWishlistHandler = () => {
    dispatch(
      deleteCourseFromWishlistAsync({
        user,
        _id: props.course._id!,
      })
    );
  };

  const moveToCartHandler = () => {
    dispatch(addToCartAsync({ user, courseDetails: props?.course }));
    dispatch(
      deleteCourseFromWishlistAsync({
        user,
        _id: props.course._id!,
      })
    );
  };

  return (
    <>
      <div
        key={props.course?._id}
        onClick={() => {
          navigate(`/coursedetails/${props.course_id}`);
        }}
        className="course__card me-4 col"
      >
        <div className="course__card-img">
          <img src={props.course?.course_thumbnail} alt="" />
        </div>
        <div className="description ">
          <h3 className="description--title fw-bold my-2 fs-3">
            {props.course?.title}
          </h3>
          <div className="description--instructor-name fs-5 mb-2 ">
            {props.course?.instructor_name}
          </div>
          <div className="description--rating d-flex align-item-center mb-2 fw-bold fs-4">
            <span className="rating_num me-2 pt-1">{props.course?.rating}</span>

            <StarRatings
              rating={props.course?.rating}
              starDimension="14px"
              starSpacing="0px"
              starRatedColor="orange"
              numberOfStars={5}
            />
            <span className="num_reviews pt-2 fw-normal fs-5 ms-2">
              ({props.course?.num_reviews})
            </span>
          </div>
          <div className="description--price mb-2 fw-bold ">
            ₹{props.course?.discounted_price}
            <span className="fw-normal fs-5 ms-1">
              ₹{props.course?.original_price}
            </span>
          </div>
        </div>
        <div className="tag__bestseller">{props.course?.tag}</div>
      </div>
      <div className="d-flex align-items-center mt-2">
        <div
          onClick={moveToCartHandler}
          className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3 me-4"
        >
          <button className="fw-bold">Move to cart</button>
        </div>

        <div
          onClick={removeFromWishlistHandler}
          className="add_to_wishlist-btn d-flex justify-content-center align-items-center mb-3"
        >
          <AiFillHeart color="black" />
        </div>
      </div>
    </>
  );
};

export default WishlistCourseCard;
