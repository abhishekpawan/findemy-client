import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TbWorld } from "react-icons/tb";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import FindemyLogo from "../../assets/img/Findemy.png";

import "./header.css";
import { AppContext } from "../../App";
import { showNotification } from "../../utils/ToastNotification";

const Header = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, setUserLoggedin, user } = useContext(AppContext);
  const [searchText, setSearchText] = useState<string>();
  const [isUserMenuVisible, setUserMenuVisible] = useState<boolean>(false);
  const [isMobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const [isMobileSearchVisible, setMobileSearchVisible] =
    useState<boolean>(false);

  const loginHandler = () => {
    navigate("/login");
  };
  const signupHandler = () => {
    navigate("/signup");
  };

  const logoutUser = () => {
    showNotification("success", "You logged out succesfully!");
    localStorage.removeItem("user");
    setUserLoggedin(false);
    navigate("/");
  };

  return (
    <header className="d-flex align-items-center justify-content-between justify-content-md-center px-2 px-md-5">
      <div
        onClick={() => setMobileNavVisible(true)}
        className="header__nav-icon d-flex d-md-none fs-1 ms-3"
      >
        <button>
          <HiBars3 />
        </button>
      </div>

      {isMobileNavVisible ? (
        <div
          onClick={() => setMobileNavVisible(false)}
          className="side-navbar-backdrop d-block d-md-none"
        ></div>
      ) : (
        ""
      )}

      <div
        className={`
          ${isMobileNavVisible ? "active" : ""}
            side-navbar d-flex d-md-none flex-column`}
        id="sidebar"
      >
        {isUserLoggedIn ? (
          <>
            <div className="user-profile d-flex align-items-center justify-content-start ps-4 py-4 ">
              <button className="user-profile-btn d-flex align-items-center justify-content-center me-3">
                <FaUserAlt />
              </button>
              <div className="d-flex flex-column fs-5">
                <div className="fw-bold fs-3">Hi, {user?.name}</div>
                <span className="mt-2">Welcome Back</span>
              </div>
            </div>
            <div className="user-menu-options p-4 d-flex flex-column fs-3">
              <Link
                onClick={() => setMobileNavVisible(false)}
                to="/mylearnings"
              >
                My Learning
              </Link>
              <Link onClick={() => setMobileNavVisible(false)} to="/cart">
                My Cart
              </Link>
              <Link onClick={() => setMobileNavVisible(false)} to="/help">
                Help
              </Link>
              <a
                href=""
                onClick={() => {
                  logoutUser();
                  setMobileNavVisible(false);
                }}
              >
                Log out
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="user-menu-options p-4 d-flex flex-column fs-3">
              <a
                href="#"
                className="mb-3 mb-4"
                onClick={() => {
                  loginHandler();
                  setMobileNavVisible(false);
                }}
              >
                Log in
              </a>
              <a
                href="#"
                onClick={() => {
                  signupHandler();
                  setMobileNavVisible(false);
                }}
              >
                Sign up
              </a>
            </div>
          </>
        )}

        <button
          onClick={() => setMobileNavVisible(false)}
          type="button"
          className="navbar-close-btn d-flex justify-content-center align-items-center"
          aria-label="Close"
        >
          <IoMdClose />
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
          onClick={() => navigate(`/search/${searchText}`)}
        >
          <AiOutlineSearch />
        </button>
        <input
          type="text"
          placeholder="Search for anything"
          aria-label="search"
          className="fs-5"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate(`/search/${searchText}`);
          }}
        />
      </div>
      {isUserLoggedIn ? (
        <Link
          to="/mylearnings"
          className="my-learning px-2 fs-4 d-none d-md-block"
        >
          My Learnings
        </Link>
      ) : (
        ""
      )}

      <div className="header__cart-icon  d-flex justify-content-center align-items-center fs-1 px-2 me-3">
        <div
          className="d-flex d-md-none pe-4 pt-2"
          onClick={() => setMobileSearchVisible(true)}
        >
          <AiOutlineSearch />
        </div>
        {isUserLoggedIn ? (
          <div className="cart-icon">
            <Link to="/cart">
              <AiOutlineShoppingCart />
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      {isMobileSearchVisible ? (
        <div className="mobile-search d-block d-md-none">
          <div className="search-bar position-relative d-flex justify-content-center">
            <button
              className="search-btn position-absolute d-flex justify-content-center fs-2"
              aria-label="search"
              onClick={() => {
                navigate(`/search/${searchText}`);
                setMobileSearchVisible(false);
              }}
            >
              <AiOutlineSearch />
            </button>
            <input
              type="text"
              placeholder="Search for anything"
              aria-label="search"
              className="fs-5"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search/${searchText}`);
                  setMobileSearchVisible(false);
                }
              }}
            />
            <button
              onClick={() => setMobileSearchVisible(false)}
              type="button"
              className="search-close-btn fs-2 mt-1 p-3 d-flex justify-content-center align-items-center"
              aria-label="Close"
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {isUserLoggedIn ? (
        <div className="position-relative d-none d-md-block">
          <button
            onMouseEnter={() => setUserMenuVisible(true)}
            className="user-profile-btn d-none d-md-block me-3 me-md-0"
          >
            <FaUserAlt />
          </button>
          <div
            className={`
            ${isUserMenuVisible ? "" : "hidden"}
            user-menu flex-column position-absolute`}
            onMouseLeave={() => setUserMenuVisible(false)}
          >
            <div className="user-profile d-flex align-items-center justify-content-center p-4 mb-4">
              <button className="user-profile-btn me-3">
                <FaUserAlt />
              </button>
              <div className="d-flex flex-column fs-5">
                <div>{user?.name}</div>
                <div>{user?.email}</div>
              </div>
            </div>
            <div className="user-menu-options p-4 pt-0 d-flex flex-column">
              <Link to="/mylearnings">My Learning</Link>
              <Link to="/cart">My Cart</Link>
              <Link to="/help">Help</Link>
              <a href="" onClick={logoutUser}>
                Log out
              </a>
            </div>
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
