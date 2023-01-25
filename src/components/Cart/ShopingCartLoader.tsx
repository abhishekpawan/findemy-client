import { Skeleton } from "antd";
import React from "react";

const ShopingCartLoader = () => {
  return (
    <main className="cart container p-4">
      <div className="row">
        <div className="col-12 col-lg-9">
          <Skeleton paragraph={{ rows: 4 }} active />
          <Skeleton paragraph={{ rows: 4 }} active />
        </div>

        <div className="col-12 col-lg-3">
          <Skeleton paragraph={{ rows: 4 }} active />
        </div>
      </div>
    </main>
  );
};

export default ShopingCartLoader;
