import { BsTagFill } from "react-icons/bs";
import StarRatings from "react-star-ratings";
import { FC, useContext } from "react";
import { ICartCourse, ICourse } from "../../utils/interface";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { deleteCourseFromWishlistAsync } from "../../redux/reducers/wishlist.reducer";
import { addToCartAsync } from "../../redux/reducers/cart.reducer";

const WishlistCartCourse: FC<{
  cartCourse: ICartCourse;
  wishListCourse: ICourse;
}> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AppContext);

  // removing course form wishlist
  const removerFromWishlistHandler = (_id: string) => {
    dispatch(deleteCourseFromWishlistAsync({ _id, user }));
  };
  // moving course from wishlist to cart
  const moveToCartHandler = () => {
    dispatch(addToCartAsync({ user, courseDetails: props?.wishListCourse }));
    dispatch(
      deleteCourseFromWishlistAsync({
        user,
        _id: props.cartCourse?._id!,
      })
    );
  };

  return (
    <div
      key={props.cartCourse?._id}
      className="course d-flex flex-column flex-md-row"
    >
      <div
        onClick={() =>
          navigate(`/coursedetails/${props.cartCourse?.course_id}`)
        }
        className="thumbnail me-0 me-md-3"
      >
        <img src={props.cartCourse?.course_thumbnail} alt="" />
        <div className="mt-3 d-block d-md-none">
          <h3 className="title fw-bold fs-2 mt-3">{props.cartCourse?.title}</h3>

          <div className="instructot fw-normal fs-4">
            by {props.cartCourse?.instructor_name}
          </div>
        </div>
      </div>
      <div className="p-0 d-flex flex-column flex-md-row justify-content-between container-fluid">
        <div
          onClick={() =>
            navigate(`/coursedetails/${props.cartCourse?.course_id}`)
          }
          className="description "
        >
          <div className="d-none d-md-block">
            <h3 className="title fw-bold fs-3">{props.cartCourse?.title}</h3>

            <div className=" fw-normal fs-5">
              by {props.cartCourse?.instructor_name}
            </div>
          </div>
          <div className={`tag__${props.cartCourse?.tag}`}>
            {props.cartCourse?.tag}
          </div>

          <div className="rating d-flex align-item-center mb-2 fw-bold fs-4">
            <span className="rating_num me-2 pt-1">
              {props.cartCourse?.rating}
            </span>

            <StarRatings
              rating={props.cartCourse?.rating}
              starDimension="14px"
              starSpacing="0px"
              starRatedColor="orange"
              numberOfStars={5}
            />
            <span className="num_reviews pt-2 fw-normal fs-5 ms-2">
              ({props.cartCourse?.num_reviews} ratings)
            </span>
          </div>
          <div className="course_details fs-5 d-md-block d-none">
            <span className="me-2">21 hours</span>
            <span className="me-2">110 lectures</span>
            <span className="me-2">{props.cartCourse?.level}</span>
          </div>
          <div className="price d-flex d-md-none align-items-center">
            <span className="mb-2 fw-bold fs-1">
              ₹{props.cartCourse?.discounted_price}
            </span>

            <span className="normal-price fs-5 mx-2 text-decoration-line-through">
              ₹{props.cartCourse?.original_price}
            </span>
            <div>
              <BsTagFill />
            </div>
          </div>
        </div>

        <div className="course_details fs-5 d-block d-md-none">
          <span className="me-2">21 hours</span>
          <span className="me-2">110 lectures</span>
          <span className="me-2">{props.cartCourse?.level}</span>
        </div>
        <div className="d-flex">
          <div className="actions fs-5 fs- d-flex flex-md-column align-items-end mt-3 mt-md-1 me-md-5">
            <a
              onClick={() => removerFromWishlistHandler(props.cartCourse._id!)}
              className="me-3 me-md-0 mb-md-3"
            >
              Remove from wishlist
            </a>
            <a onClick={moveToCartHandler} className="me-3 me-md-0 mb-md-3">
              Move to cart
            </a>
            <a href="">Save for later</a>
          </div>
          <div className="price d-none d-md-flex flex-column align-items-end ">
            <span className="mb-2 fw-bold fs-1">
              ₹{props.cartCourse?.discounted_price}
            </span>

            <span className="normal-price fs-5 mx-2 text-decoration-line-through">
              ₹{props.cartCourse?.original_price}
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

export default WishlistCartCourse;
