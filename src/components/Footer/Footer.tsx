import { useRef, useEffect, useState, useContext } from "react";

import { TbWorld } from "react-icons/tb";
import { AppContext } from "../../App";
import "./footer.css";

const Footer = () => {
  const myRef = useRef<any>(null);
  const { isFooterVisible, setIsFooterVisible } = useContext(AppContext);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsFooterVisible(entry.isIntersecting);
    });
    observer.observe(myRef.current);
  }, []);
  return (
    <footer ref={myRef}>
      <div className="footer__language-and-links row g-0">
        <div className="footer__language-btn col-12 col-md-4 order-md-2">
          <button
            aria-label="language"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <TbWorld /> <span>English</span>
          </button>
        </div>
        <ul className="footer__list col-12 col-md-8 order-md-1 row">
          <div className="col-sm-4 p-0">
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
          </div>
          <div className="col-sm-4 p-0">
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
          </div>
          <div className="col-sm-4 p-0">
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>abcdef</span>
              </a>
            </li>
          </div>
        </ul>
      </div>
      <div className="footer__logo-and-copyright row g-0">
        <div className="footer__logo col-12 col-md-6">Findemy</div>
        <div className="footer__copyright col-12 col-md-6">
          © 2023 Findemy, Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
