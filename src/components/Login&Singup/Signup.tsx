import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import "./login.css";
import { showNotification } from "../ToastNotification/ToastNotification";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { user, setUser, isUserLoggedIn, setUserLoggedin } =
    useContext(AppContext);
  let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  //if user loggedin navigate to homepage
  useEffect(() => {
    if (isUserLoggedIn == true) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  const onSubmit: SubmitHandler<Inputs> = async (signupData) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      };
      let response = await fetch(
        "http://localhost:3001/users/signup",
        requestOptions
      );
      const data = await response.json();

      if (data.success == true) {
        const userInfromation = {
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token,
        };
        localStorage.setItem("user", JSON.stringify(userInfromation));
        setUser(userInfromation);
        setUserLoggedin(true);

        showNotification(
          "success",
          "You signed up successfully! \n Welecome to Findemy!"
        );
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      showNotification("error", error.toString());
    }
  };

  const showPassword = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {}, []);
  return (
    <main className="signup d-flex justify-content-center align-items-center p-5">
      <div className="container d-flex justify-content-center align-items-center m-5">
        <div className="signup__form  d-flex flex-column">
          <h2 className="signup__heading fw-bold fs-3 mb-4">
            Sign up and start learning
          </h2>

          <div>
            <form
              className="d-flex flex-column"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Full Name"
                  {...register("name", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                <p role="alert">
                  {errors.name && (
                    <span className="mb-3 text-danger">
                      name must be more than 6 characters and less than 20
                      characters
                    </span>
                  )}
                </p>
                <label htmlFor="fullName">Full Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: email_regex,
                  })}
                />
                <p role="alert">
                  {errors.email && (
                    <span className="mb-3 text-danger">
                      Please enter a valid email ID!
                    </span>
                  )}
                </p>
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    pattern: password_regex,
                  })}
                />
                <p role="alert">
                  {errors.password && (
                    <span className="mb-3 text-danger">
                      password should be min 6 character with MIX of Uppercase,
                      lowercase, digits and symbols!
                    </span>
                  )}
                </p>
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
