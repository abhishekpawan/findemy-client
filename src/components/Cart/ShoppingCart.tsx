import CartCourse from "./ShoppingCartCourse";

import "./shoppingcart.css";

const ShoppingCart = () => {
  return (
    <main className="cart container p-4">
      <div className="row">
        <h1 className="fw-bold">Shopping Cart</h1>
        <h3 className="fw-bold fs-4 mt-4 mb-3">3 Course in Cart</h3>
        <div className="col-12 col-lg-9">
          <CartCourse />
          <CartCourse />
          <CartCourse />
        </div>
        <div className="col-12 col-lg-3">
          <div className="total-prices d-flex flex-column ms-lg-4">
            <div className="fw-bold mb-3">Total</div>
            <div className="fw-bold fs-1 mb-2"> ₹529</div>
            <div className="mb-2 fs-5 text-decoration-line-through">₹2599</div>
            <div className="mb-3 fs-5">80% off</div>
            <div className="checkout-btn d-flex justify-content-center align-items-center ">
              <button className="fw-bold ">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
