import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { isMobile } from "react-device-detect";

export default function MegaMenu({ services }) {
  const drop = useRef();
  const showMega = () => {
    drop.current.style.display = "block";
  };
  const hideMega = () => {
    drop.current.style.display = "none";
  };

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
          onClick={hideMega}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-flex align-items-center "
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav font-weight-bolder ul-pading">
            <li className="nav-item active" onClick={hideMega}>
              <Link href="/">Home</Link>
            </li>

            <li className="nav-item dropdown " id="myHover" onClick={showMega}>
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
              {isMobile && (
                <div
                  className="main"
                  id="drop-menu"
                  ref={drop}
                  onMouseLeave={hideMega}
                >
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
                                  <Link
                                    href={{
                                      pathname: "/service/[slug]",
                                      query: { slug: value.attributes.slug },
                                    }}
                                    state={value.attributes.title}
                                  >
                                    {value.attributes.title}
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
                                  <Link
                                    href={`/service/${value.attributes.slug}`}
                                    state={value.attributes.title}
                                  >
                                    {value.attributes.title}
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
                                  <Link
                                    href={`/service/${value.attributes.slug}`}
                                    state={value.attributes.title}
                                  >
                                    {value.attributes.title}
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
                                  <Link
                                    href={`/service/${value.attributes.slug}`}
                                    state={value.attributes.title}
                                  >
                                    {value.attributes.title}
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
                                  <Link
                                    href={`/service/${value.attributes.slug}`}
                                    state={value.attributes.title}
                                  >
                                    {value.attributes.title}
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
          </ul>
        </div>
      </nav>
      {/* mega menu */}
      {!isMobile && (
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
                            <a>{value.attributes.slug}</a>
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
                            <a>{value.attributes.slug}</a>
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
                            <a>{value.attributes.slug}</a>
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
                            <a>{value.attributes.slug}</a>
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
                            <a>{value.attributes.slug}</a>
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
