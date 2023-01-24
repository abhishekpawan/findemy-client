import { Skeleton } from "antd";

const CourseDetailsLoader = () => {
  return (
    <main className="course__details d-flex flex-column">
      <div className="course__details__body__container">
        <div className="course__details__body">
          <div className="course__details-img d-flex d-lg-none pb-4">
            <Skeleton.Image
              style={{ width: "350px", height: "240px" }}
              active
            />
          </div>
          <Skeleton paragraph={{ rows: 5 }} active />

          <div className="course__details__card-details d-block d-lg-none pt-1 ">
            <div className="add_to_cart-btn d-flex justify-content-center align-items-center mb-3"></div>
            <div className="buy_now-btn d-flex justify-content-center align-items-center mb-4"></div>
            <Skeleton paragraph={{ rows: 3 }} active />
          </div>
        </div>
      </div>
      <div className="course__details__desc">
        <div className="learning-points">
          <Skeleton paragraph={{ rows: 3 }} active />
        </div>
        <Skeleton paragraph={{ rows: 7 }} active />
      </div>
    </main>
  );
};

export default CourseDetailsLoader;
