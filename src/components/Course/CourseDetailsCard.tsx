import { FC, useContext, useState } from "react";
import { BsPlayBtn, BsFileEarmark, BsTrophy } from "react-icons/bs";
import { HiOutlineFolderDownload, HiOutlineDeviceMobile } from "react-icons/hi";
import { IoIosInfinite } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import "./coursedetails.css";

const CourseDetailsCard: FC<{
  isCourseAddedToCart?: boolean;
  isCoursePurchased?: boolean;
  course_thumbnail?: string;
  original_price?: number;
  discounted_price?: number;
  buyNowHandler(): void;
  addToCartHandler(): void;
  isSpinning: boolean;
}> = (props) => {
  const navigate = useNavigate();
  const { isFooterVisible, setIsFooterVisible } = useContext(AppContext);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 34, color: "purple" }} spin />
  );
  // const [isScrollingStart, setIsScrollingStart] = useState<Boolean>(false);

  // window.onscroll = function () {
  //   let scrollLimit = 80;
  //   if (window.scrollY >= scrollLimit) {
  //     setIsScrollingStart(true);
  //   } else {
  //     setIsScrollingStart(false);
  //   }
  // };
  // ${isScrollingStart ? "scrolling-start " : ""}

  return (
    <div
      className={`
     ${
       isFooterVisible ? "not-fixed" : ""
     } course__details__card d-none d-lg-block`}
    >
      <div className={`course__details__card-img `}>
        <img src={props.course_thumbnail} alt="" />
      </div>
      <div className="course__details__card-details">
        {props.isCoursePurchased ? (
          <>
            <div className="fs-3 fw-bold text-center mb-4">
              You have enrolled in this Course!
            </div>
            <div className="fs-4 text-center mb-4">Start Learning Now!</div>
          </>
        ) : (
          <>
            {" "}
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
                    (props?.discounted_price! / props?.original_price!) * 100
                  )}
                % off
              </div>
            </div>
            {props.isCourseAddedToCart ? (
              <div
                onClick={() => navigate("/cart")}
                className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3"
              >
                <button className="fw-bold">Go to cart</button>
              </div>
            ) : (
              <Spin indicator={antIcon} spinning={props.isSpinning}>
                <>
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
                </>
              </Spin>
            )}
            <div className="fs-4 text-center mb-4">
              30-Day Money-Back Guarantee
            </div>
          </>
        )}

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
