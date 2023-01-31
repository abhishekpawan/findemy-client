import React, { FC } from "react";

const CheckoutSummary: FC<{
  totalOriginalPrice: number;
  totalDiscounts: number;
  totalPrice: number;
}> = (props) => {
  return (
    <>
      <div className="summary-wrapper col-12 col-lg-5 d-none d-lg-block">
        <div className="summary col-12 ">
          <h2 className="fw-bold fs-2">Summary</h2>
          <div className="prices d-flex justify-content-between mt-4">
            <div className="d-flex flex-column fs-4 ">
              <span className="mb-3">Original Price:</span>

              <span>Discounts:</span>
            </div>
            <div className="d-flex flex-column fs-4">
              <span className="mb-3"> ₹{props.totalOriginalPrice}</span>
              <span> ₹{props.totalDiscounts}</span>
            </div>
          </div>
          <div className="total mt-4 d-flex justify-content-between fw-bold fs-3">
            <span>Total:</span> <span>₹{props.totalPrice}</span>
          </div>
          <div className="mt-5 d-flex flex-column">
            <p className="fs-6">
              By completing your purchase you agree to these Terms of Service.
            </p>
            <button
              type="submit"
              form="checkout-form"
              className="complete_checkout-btn mt-2 p-4 fw-bold "
            >
              Complete Checkout
            </button>
            <p className="fs-6 mt-2 text-center">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>
      <div className="summary-fixed d-block d-lg-none">
        <div className="prices d-flex justify-content-between mt-4">
          <div className="d-flex flex-column fs-4 ">
            <span className="mb-3">Original Price:</span>

            <span>Discounts:</span>
          </div>
          <div className="d-flex flex-column fs-4">
            <span className="mb-3"> ₹{props.totalOriginalPrice}</span>
            <span> ₹{props.totalDiscounts}</span>
          </div>
        </div>
        <div className="total mt-4 d-flex justify-content-between fw-bold fs-3">
          <span>Total:</span> <span>₹{props.totalPrice}</span>
        </div>
        <div className="mt-5 d-flex flex-column">
          <p className="fs-6">
            By completing your purchase you agree to these Terms of Service.
          </p>
          <button className="complete_checkout-btn mt-2 p-4 fw-bold ">
            Complete Checkout
          </button>
          <p className="fs-6 mt-2 text-center">30-Day Money-Back Guarantee</p>
        </div>
      </div>
    </>
  );
};

export default CheckoutSummary;
