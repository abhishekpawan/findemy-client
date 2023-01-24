import { FC, useContext, useEffect, useState } from "react";
import { BsPlayBtn, BsFileEarmark, BsTrophy } from "react-icons/bs";
import { HiOutlineFolderDownload, HiOutlineDeviceMobile } from "react-icons/hi";
import { IoIosInfinite } from "react-icons/io";
import { AppContext } from "../../App";
import courseData from "../../data/courses.json";

import "./coursedetails.css";

const CourseDetailsCard: FC<{
  course_thumbnail?: string;
  original_price?: number;
  discounted_price?: number;
  buyNowHandler(): void;
  addToCartHandler(): void;
}> = (props) => {
  const { isFooterVisible, setIsFooterVisible } = useContext(AppContext);
  const [isScrollingStart, setIsScrollingStart] = useState<Boolean>(false);
  const { isUserLoggedIn } = useContext(AppContext);

  window.onscroll = function () {
    let scrollLimit = 80;
    if (window.scrollY >= scrollLimit) {
      setIsScrollingStart(true);
    } else {
      setIsScrollingStart(false);
    }
  };

  return (
    <div
      className={`
     ${isFooterVisible ? "not-fixed" : ""}
       ${isScrollingStart ? "scrolling-start " : ""} 
       course__details__card d-none d-lg-block`}
    >
      <div
        className={`${isScrollingStart ? " " : ""}course__details__card-img `}
      >
        <img src={props.course_thumbnail} alt="" />
      </div>
      <div className="course__details__card-details">
        <div className="price-details d-flex align-items-center">
          <div className="discounted-price fw-bold fs-1 py-2 me-3">
            ₹{props?.discounted_price}
          </div>
          <div className="price me-3 text-decoration-line-through ">
            ₹{props?.original_price}
          </div>
          <div className="percentage">
            {100 -
              Math.round(
                (courseData[0].discounted_price / courseData[0].price) * 100
              )}
            % off
          </div>
        </div>
        <div
          onClick={props.addToCartHandler}
          className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3"
        >
          <button className="fw-bold">Add to cart</button>
        </div>
        <div
          onClick={props.buyNowHandler}
          className="buy_now-btn d-flex justify-content-center align-items-center mb-4"
        >
          <button className="fw-bold">Buy now</button>
        </div>
        <div className="fs-4 text-center mb-4">30-Day Money-Back Guarantee</div>
        <div className="course__includes">
          <h2 className="fw-bold fs-3">This course includes:</h2>
          <ul>
            <li>
              <BsPlayBtn /> 14 hours on-demand video
            </li>
            <li>
              <BsFileEarmark /> 1 article
            </li>
            <li>
              <HiOutlineFolderDownload /> 3 downloadable resources
            </li>
            <li>
              <IoIosInfinite /> Full lifetime access
            </li>
            <li>
              <HiOutlineDeviceMobile />
              Access on mobile and TV
            </li>
            <li>
              <BsTrophy />
              Certificate of completion
            </li>
          </ul>
        </div>
        <div className="apply_coupon d-flex align-items-center justify-content-between py-4">
          <a>Share</a>
          <a>Gift this course</a>
          <a>Apply Coupon</a>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
