import { useContext, useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsApple } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./login.css";
import { AppContext } from "../../App";
import { showNotification } from "../ToastNotification/ToastNotification";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { setUser, isUserLoggedIn, setUserLoggedin } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isSpinning, setSpining] = useState<boolean>(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 34, color: "purple" }} spin />
  );
  useEffect(() => {
    if (isUserLoggedIn == true) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  const showPassword = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit: SubmitHandler<Inputs> = async (loginData) => {
    setSpining(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      };
      let response = await fetch(
        "http://localhost:3001/users/login",
        requestOptions
      );
      const data = await response.json();

      if (data.success == true) {
        const userInfromation = {
          id: data._id,
          name: data.name,
          email: data.email,
          token: data.token,
        };
        localStorage.setItem("user", JSON.stringify(userInfromation));
        setUser(userInfromation);
        setUserLoggedin(true);
        setSpining(false);

        //setting notification popup
        showNotification("success", "You logged in succesfully!");
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setSpining(false);
      //setting notification popup
      showNotification("error", error.toString());
    }
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
            <Spin indicator={antIcon} spinning={isSpinning}>
              <form
                className="d-flex flex-column"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                    })}
                  />
                  <p role="alert">
                    {errors.password && (
                      <span className="mb-3 text-danger">
                        Please enter a Password!
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

                <button>Log in</button>
              </form>
            </Spin>

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
