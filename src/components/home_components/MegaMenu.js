import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function MegaMenu({ services }) {
  const drop = useRef();
  const mobileNavbar = useRef();
  const desktopNavbar = useRef();
  const [mobileNav, setMobileNav] = useState(false);

  // const useCheckMobileScreen = () => {
  //   const [width, setWidth] = useState(
  //     typeof window !== "undefined" && window.innerWidth
  //   );
  //   const handleWindowSizeChange = () => {
  //     setWidth(window.innerWidth);
  //   };

  //   useEffect(() => {
  //     window.addEventListener("resize", handleWindowSizeChange);
  //     return () => {
  //       window.removeEventListener("resize", handleWindowSizeChange);
  //     };
  //   }, []);

  //   return width <= 768;
  // };
  // const isMobileView = useCheckMobileScreen();

  // const showMega = () => {
  //   drop.current.style.display = "block";
  // };
  // const hideMega = () => {
  //   drop.current.style.display = "none";
  // };

  // const toggleMobileNav = () => {
  //   setMobileNav(!mobileNav);
  // };

  // useEffect(() => {
  // if (isMobileView) {
  //   if (mobileNav) {
  //     mobileNavbar.current.style.display = "flex";
  //   } else {
  //     mobileNavbar.current.style.display = "none";
  //   }
  // } else {
  //   desktopNavbar.current.style.display = "flex";
  // }
  // }, [isMobileView, mobileNav]);

  // const RowOneData = services && services.data.slice(0, 10);
  // const RowTwoData = services && services.data.slice(10, 20);
  // const RowThreeData = services && services.data.slice(20, 30);
  // const RowFourData = services && services.data.slice(30, 40);
  // const RowFiveData = services && services.data.slice(40, 50);

  // const [Mega, setMega] = useState(RowOneData);
  // useEffect(() => {
  //   setMega(RowOneData);
  // }, []);

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
