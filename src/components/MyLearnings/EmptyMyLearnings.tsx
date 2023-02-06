import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import * as emptymylearning from "../../Assets/icons/emptymylearning.json";

const EmptyMyLearnings = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptymylearning,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="emptymylearning-courses d-flex flex-column justify-content-center align-items-center p-2">
      <Lottie options={defaultOptions} width={280} />
      <p className="mt-3 fw-bold">
        Start learning from over 213,000 courses today.
      </p>
      <p>
        When you enroll in a course, it will appear here.{" "}
        <Link className="fw-bold pb-1" to="/">
          Browse now
        </Link>
        .
      </p>
    </div>
  );
};

export default EmptyMyLearnings;
