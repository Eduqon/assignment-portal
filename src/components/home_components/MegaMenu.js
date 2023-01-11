import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";

const SERVICES = gql`
  query GetServices {
    services(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
  }
`;

export default function MegaMenu() {
  const { loading, error, data } = useQuery(SERVICES);
  const { services } = !loading && data;

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
  //   useEffect(() => {
  //     setMega(RowOneData);
  //     console.log(Mega, "data");
  //   }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light bg-white pt-0"
        id="set-mob"
      >
        <a class="navbar-brand" href="#">
          <Link to="/">
            <img className=" ml-4 set_width" src={logo} />
          </Link>
        </a>
        <button
          class="navbar-toggler"
          id="collap"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={hideMega}
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse d-flex align-items-center "
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav font-weight-bolder ul-pading">
            <li class="nav-item active" onClick={hideMega}>
              <Link to="/">Home</Link>
            </li>

            <li class="nav-item dropdown " id="myHover" onClick={showMega}>
              <Link
                to="/"
                // onMouseOver={showMega}
                // onClick={showMega}
                class="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/samples">
                {" "}
                <a class="nav-link" href="#">
                  Samples
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/reviews">
                <a class="nav-link ">Reviews</a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/contact">
                <a class="nav-link ">Contact Us</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* mega menu */}
      <div className="main" id="drop-menu" ref={drop} onMouseLeave={hideMega}>
        <div className="row set-font">
          <div className="col-md-2 col-12">
            <div className="row my-Div">
              {RowOneData.map((value, ind) => {
                return (
                  <>
                    <div
                      onClick={hideMega}
                      key={ind}
                      className="col-12 border-set d-flex align-items-center p-3 ml-3"
                    >
                      <IoIosArrowForward className="mr-2" />
                      <Link
                        to={`/service/${value.attributes.slug}`}
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
              {RowTwoData.map((value, ind) => {
                return (
                  <>
                    <div
                      onClick={hideMega}
                      key={ind}
                      className="col-12 border-set d-flex align-items-center p-3 ml-3"
                    >
                      <IoIosArrowForward className="mr-2" />
                      <Link
                        to={`/service/${value.attributes.slug}`}
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
              {RowThreeData.map((value, ind) => {
                return (
                  <>
                    <div
                      onClick={hideMega}
                      key={ind}
                      className="col-12 border-set d-flex align-items-center p-3 ml-3"
                    >
                      <IoIosArrowForward className="mr-2" />
                      <Link
                        to={`/service/${value.attributes.slug}`}
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
              {RowFourData.map((value, ind) => {
                return (
                  <>
                    <div
                      onClick={hideMega}
                      key={ind}
                      className="col-12 border-set d-flex align-items-center p-3 ml-3"
                    >
                      <IoIosArrowForward className="mr-2" />
                      <Link
                        to={`/service/${value.attributes.slug}`}
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
              {RowFiveData.map((value, ind) => {
                return (
                  <>
                    <div
                      onClick={hideMega}
                      key={ind}
                      className="col-12 border-set d-flex align-items-center p-3 ml-3"
                    >
                      <IoIosArrowForward className="mr-2" />
                      <Link
                        to={`/service/${value.attributes.slug}`}
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
    </>
  );
}
