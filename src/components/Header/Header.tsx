import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TbWorld } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FindemyLogo from "../../Assets/img/Findemy.png";

import "./header.css";
import { AppContext } from "../../App";
import { showNotification } from "../ToastNotification/ToastNotification";

const Header = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, setUserLoggedin, user } = useContext(AppContext);
  const [isUserMenuVisible, setUserMenuVisible] = useState<boolean>(false);

  const loginHandler = () => {
    navigate("/login");
  };
  const signupHandler = () => {
    navigate("/signup");
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUserLoggedin(false);

    //setting notification popup
    showNotification("success", "You logged out succesfully!");

    navigate("/");
  };

  return (
    <header className="d-flex align-items-center justify-content-between justify-content-md-center px-2 px-md-5">
      <div className="header__nav-icon d-flex d-md-none fs-1 ms-3">
        <button>
          <HiBars3 />
        </button>
      </div>
      <nav className="header__logo ps-4 ps-md-0">
        <Link className="me-3" to="/">
          <img src={FindemyLogo} alt="findemy-logo" />
        </Link>
      </nav>
      <div className="header__search-bar mx-3 position-relative d-none d-md-flex justify-content-center">
        <button
          className="position-absolute d-flex justify-content-center fs-2"
          aria-label="search"
        >
          <AiOutlineSearch />
        </button>
        <input
          type="text"
          placeholder="Search for anything"
          aria-label="search"
          className="fs-5"
        />
      </div>
      {isUserLoggedIn ? (
        <Link
          to="/mylearnigs"
          className="my-learning px-2 fs-4 d-none d-md-block"
        >
          My Learnings
        </Link>
      ) : (
        ""
      )}

      <div className="header__cart-icon  d-flex justify-content-center fs-1 px-2 me-3">
        <div className="d-flex d-md-none pe-4">
          <AiOutlineSearch />
        </div>
        <AiOutlineShoppingCart />
      </div>
      {isUserLoggedIn ? (
        <div className="position-relative">
          <button
            onMouseEnter={() => setUserMenuVisible(true)}
            className="user-profile d-none d-md-block me-3 me-md-0"
          >
            <FaUserAlt />
          </button>
          <div
            className={`
            ${isUserMenuVisible ? "" : "hidden"}
            user-menu flex-column position-absolute`}
            onMouseLeave={() => setUserMenuVisible(false)}
          >
            <div className="d-flex">
              <FaUserAlt />
              <div className="d-flex flex-column">
                <div>{user.name}</div>
                <div>{user.email}</div>
              </div>
            </div>
            <Link to="/mylearnigs">My Learning</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/help">Help</Link>
            <a onClick={logoutUser}>Log out</a>
          </div>
        </div>
      ) : (
        <>
          <div className="header__login-btn d-none d-md-flex">
            <button className="fs-5 fw-bold me-3 px-2" onClick={loginHandler}>
              Log in
            </button>
          </div>
          <div className="header__signup-btn d-none d-md-flex">
            <button className="fs-5 fw-bold me-3 px-2" onClick={signupHandler}>
              Sign up
            </button>
          </div>
        </>
      )}
      <div className="header__language-btn d-none d-md-flex fs-2">
        {isUserLoggedIn ? (
          ""
        ) : (
          <button
            aria-label="language"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <TbWorld />
          </button>
        )}

        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title ">Choose a language</h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <button>English</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
