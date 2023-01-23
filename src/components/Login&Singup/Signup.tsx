import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./login.css";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const showPassword = (): void => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <main className="signup d-flex justify-content-center align-items-center p-5">
      <div className="container d-flex justify-content-center align-items-center m-5">
        <div className="signup__form  d-flex flex-column">
          <h2 className="signup__heading fw-bold fs-3 mb-4">
            Sign up and start learning
          </h2>

          <div>
            <form className="d-flex flex-column">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Full Name"
                  name="fullName"
                  required
                />

                <label htmlFor="fullName">Full Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  required
                />

                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <label htmlFor="password">Password</label>
                <a>
                  {passwordVisible ? (
                    <AiFillEyeInvisible onClick={showPassword} />
                  ) : (
                    <AiFillEye onClick={showPassword} />
                  )}
                </a>
              </div>

              <button>Sign up</button>
            </form>
            <div className="signup__terms-and-policy mt-3 fs-6 text-center">
              <p>
                By signing up, you agree to our <u>Terms of Use</u> and{" "}
                <u>Privacy Policy..</u>
              </p>
            </div>
            <div className="signup__terms-and-policy__underline"></div>

            <div className="signup__login d-flex justify-content-center">
              <p className="m-0">
                Already have an account?
                <Link to="/login"> Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
