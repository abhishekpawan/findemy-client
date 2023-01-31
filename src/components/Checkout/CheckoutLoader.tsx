import { Skeleton } from "antd";

const CheckoutLoader = () => {
  return (
    <main className="checkout-page">
      <form className="row" id="checkout-form">
        <div className="col-12 col-lg-7 my-5 py-5">
          <div className="payment col-12 me-lg-0 m-auto">
            <Skeleton paragraph={{ rows: 10 }} active />
            <Skeleton paragraph={{ rows: 10 }} active />
          </div>
        </div>
        <div className="summary-wrapper col-12 col-lg-5 d-none d-lg-block">
          <div className="summary col-12 ">
            <Skeleton paragraph={{ rows: 4 }} active />
            <Skeleton paragraph={{ rows: 4 }} active />
          </div>
        </div>
        <div className="summary-fixed d-block d-lg-none">
          <Skeleton paragraph={{ rows: 4 }} active />
        </div>
      </form>
    </main>
  );
};

export default CheckoutLoader;
