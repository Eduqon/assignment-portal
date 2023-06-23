import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function MegaMenu({ services }) {
  const drop = useRef();
  const mobileNavbar = useRef();
  const desktopNavbar = useRef();
  const [mobileNav, setMobileNav] = useState(false);

  const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(
      typeof window !== "undefined" && window.innerWidth
    );
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 768;
  };
  const isMobileView = useCheckMobileScreen();

  const showMega = () => {
    drop.current.style.display = "block";
  };
  const hideMega = () => {
    drop.current.style.display = "none";
  };

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  useEffect(() => {
    if (isMobileView) {
      if (mobileNav) {
        mobileNavbar.current.style.display = "flex";
      } else {
        mobileNavbar.current.style.display = "none";
      }
    } else {
      desktopNavbar.current.style.display = "flex";
    }
  }, [isMobileView, mobileNav]);

  const RowOneData = services && services.data.slice(0, 10);
  const RowTwoData = services && services.data.slice(10, 20);
  const RowThreeData = services && services.data.slice(20, 30);
  const RowFourData = services && services.data.slice(30, 40);
  const RowFiveData = services && services.data.slice(40, 50);

  const [Mega, setMega] = useState(RowOneData);
  useEffect(() => {
    setMega(RowOneData);
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white pt-0"
        id="set-mob"
      >
        <a className="navbar-brand" href="#">
          <Link href="/">
            <img className="ml-4 set_width" src="/assets/Logo.png" />
          </Link>
        </a>
        <button
          className="navbar-toggler"
          id="collap"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMobileNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {isMobileView ? (
          <div
            className="align-items-center"
            ref={mobileNavbar}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav font-weight-bolder ul-pading">
              <li className="nav-item active" onClick={hideMega}>
                <Link href="/">Home</Link>
              </li>

              <li
                className="nav-item dropdown "
                id="myHover"
                onClick={showMega}
              >
                <span
                  onMouseOver={showMega}
                  onClick={showMega}
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </span>
              </li>
              <li className="nav-item">
                <Link href="/samples">
                  <a className="nav-link">Samples</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/reviews">
                  <a className="nav-link">Reviews</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact">
                  <a className="nav-link">Contact Us</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blog">
                  <a className="nav-link">Blog</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/verify/Mansighanga997@gmail.com">
                  <a className="nav-link">Verify</a>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div
            className="align-items-center"
            ref={desktopNavbar}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav font-weight-bolder ul-pading">
              <li className="nav-item active" onClick={hideMega}>
                <Link href="/">Home</Link>
              </li>

              <li
                className="nav-item dropdown "
                id="myHover"
                onClick={showMega}
              >
                <span
                  onMouseOver={showMega}
                  onClick={showMega}
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </span>
              </li>
              <li className="nav-item">
                <Link href="/samples">
                  <a className="nav-link">Samples</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/reviews">
                  <a className="nav-link">Reviews</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact">
                  <a className="nav-link">Contact Us</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blog">
                  <a className="nav-link">Blog</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/verify/Mansighanga997@gmail.com">
                  <a className="nav-link">Verify</a>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      {/* mega menu */}
      {!isMobileView && (
        <div className="main" id="drop-menu" ref={drop} onMouseLeave={hideMega}>
          <div className="row set-font">
            <div className="col-md-2 col-12">
              <div className="row my-Div">
                {RowOneData &&
                  RowOneData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-2 col-12">
              <div className="row my-Div">
                {RowTwoData &&
                  RowTwoData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="row my-Div">
                {RowThreeData &&
                  RowThreeData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-2 col-12">
              <div className="row  my-Div">
                {RowFourData &&
                  RowFourData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-2 col-12">
              <div className="row my-Div">
                {RowFiveData &&
                  RowFiveData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobileView && (
        <div className="main" id="drop-menu" ref={drop} onMouseLeave={hideMega}>
          <div className="row set-font">
            <div className="col-md-2 col-12">
              <div className="row my-Div">
                {RowOneData &&
                  RowOneData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-2 col-12">
              <div className="row my-Div">
                {RowTwoData &&
                  RowTwoData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="row my-Div">
                {RowThreeData &&
                  RowThreeData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-2 col-12">
              <div className="row  my-Div">
                {RowFourData &&
                  RowFourData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-2 col-12">
              <div className="row my-Div">
                {RowFiveData &&
                  RowFiveData.map((value, ind) => {
                    return (
                      <>
                        <div
                          onClick={hideMega}
                          key={ind}
                          className="col-12 border-set d-flex align-items-center p-3 ml-3"
                        >
                          <IoIosArrowForward className="mr-2" />
                          <Link href={`/service/${value.attributes.slug}`}>
                            <a>{value.attributes.title}</a>
                          </Link>
                        </div>
                        <hr className="sethr" />
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
