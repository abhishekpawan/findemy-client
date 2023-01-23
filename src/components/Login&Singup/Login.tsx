import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsApple } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const showPassword = (): void => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <main className="login d-flex justify-content-center align-items-center p-5">
      <div className="container d-flex justify-content-center align-items-center m-5">
        <div className="login__form d-flex flex-column">
          <h2 className="login__heading fw-bold fs-3 mb-4">
            Log in to your Findemy account
          </h2>
          <button>
            <i>
              <FcGoogle />
            </i>
            Continue with Google
          </button>
          <button>
            <i id="facebook">
              <BsFacebook />
            </i>
            Continue with Facebook
          </button>
          <button>
            <i>
              <BsApple />
            </i>
            Continue with Apple
          </button>
          <div>
            <form className="d-flex flex-column">
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

              <button>Log in</button>
            </form>

            <div className="login__signup d-flex justify-content-center">
              <p className="m-0">
                Don't have an account?
                <Link to="/signup"> Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
