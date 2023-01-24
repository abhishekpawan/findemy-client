import { Skeleton } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import React from "react";

const InstructorDetailsLoader = () => {
  return (
    <main className="container instructor p-5">
      <div className="row">
        <div className="col-12 col-md-8  mt-5 mt-md-0 order-2 order-md-1">
          <div className="instructor__details">
            <Skeleton paragraph={{ rows: 4 }} active />
            <Skeleton paragraph={{ rows: 4 }} active />
          </div>
        </div>
        <div className="col-12 col-md-4 order-1 order-md-2">
          <div className="instructor__social d-flex flex-column align-items-center">
            <div className="profile-img mb-5">
              <SkeletonAvatar
                active
                style={{ width: "15rem", height: "15rem" }}
              />
            </div>
            <div className="social-btn d-flex flex-column align-items-center ">
              <Skeleton paragraph={{ rows: 3 }} active />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InstructorDetailsLoader;
