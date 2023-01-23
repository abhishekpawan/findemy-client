import instructorData from "../../data/instructors.json";

import "./instructordetails.css";

const InstructorDetails = () => {
  console.log(instructorData[0].social_urls[1].split(".")[1]);
  return (
    <main className="container instructor p-5">
      <div className="row">
        <div className="col-12 col-md-8  mt-5 mt-md-0 order-2 order-md-1">
          <div className="instructor__details">
            <div className="fw-bold title">INSTRUCTOR</div>
            <h1 className="fw-bold ">{instructorData[0].name}</h1>
            <h2 className="fw-bold fs-4 mb-5">{instructorData[0].short_bio}</h2>
            <div className="instructor__stats d-flex mb-5">
              <div className="total__students me-5">
                <div className="fw-bold fs-4">Total Students</div>
                <div className="fw-bold fs-1">666,322</div>
              </div>
              <div className="total__reviews">
                <div className="fw-bold fs-4">Reviews</div>
                <div className="fw-bold fs-1">73,221</div>
              </div>
            </div>
            <div className="about">
              <h2 className="fw-bold fs-4">About</h2>
              <div>{instructorData[0].about}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 order-1 order-md-2">
          <div className="instructor__social d-flex flex-column align-items-center">
            <div className="profile-img mb-5">
              <img
                className="rounded-circle"
                src={instructorData[0].profile_img}
                alt={`${instructorData[0].name}'s profile image`}
              />
            </div>
            <div className="social-btn d-flex flex-column align-items-center ">
              <button>{instructorData[0].social_urls[0]}</button>
              <button>{instructorData[0].social_urls[1]}</button>
              <button>{instructorData[0].social_urls[1]}</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InstructorDetails;
