import { Skeleton } from "antd";
import React from "react";

const MyWishlistLoader = () => {
  return (
    <main className="cart container p-4">
      <div className="row">
        <div className="col-12 ">
          <Skeleton paragraph={{ rows: 4 }} active />
          <Skeleton paragraph={{ rows: 4 }} active />
        </div>
      </div>
    </main>
  );
};

export default MyWishlistLoader;
