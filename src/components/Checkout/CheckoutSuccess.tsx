import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import * as successIcon from "../../assets/icons/success.json";

const CheckoutSuccess = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <main className="sucess container p-4">
      <div className="row">
        <Lottie options={defaultOptions} height={300} width={300} />

        {/* <h1 className="fw-bold">Shopping Cart</h1>
        <h3 className="fw-bold fs-4 mt-4 mb-3">0 Courses in Cart</h3> */}
        <div className="empty-cart d-flex flex-column justify-content-center align-items-center ">
          <p className="mt-3">
            Your cart is empty. Keep shopping to find a course!
          </p>
          <Link to="/" className="keep-shopping-btn mt-3">
            <button>Start Learning</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
