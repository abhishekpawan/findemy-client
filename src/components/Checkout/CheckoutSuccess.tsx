import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import * as successIcon from "../../Assets/icons/success.json";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";

const CheckoutSuccess = () => {
  const { isCheckoutSuccess, setIsCheckoutSuccess } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // checking is checkout is successful or not
  useEffect(() => {
    if (isCheckoutSuccess === false) {
      navigate("/");
    }
  }, []);

  return (
    <main className="success container p-4">
      <div className="row">
        <Lottie options={defaultOptions} height={300} width={300} />

        {/* <h1 className="fw-bold">Shopping Cart</h1>
        <h3 className="fw-bold fs-4 mt-4 mb-3">0 Courses in Cart</h3> */}
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <h2 className="mt-3 fw-bold">
            Congratulations! Your purchase was successful! 😁
          </h2>
          <p className="mt-4 fw-bold">Start on your learnng journey today!!</p>
          <Link
            to="/mylearnings"
            onClick={setIsCheckoutSuccess(false)}
            className="start-learning-btn mt-3"
          >
            <button>Start Learning</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
