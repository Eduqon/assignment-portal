import React from "react";
import { NavbarHome } from "../components/home_components/navbar_home";
import FooterHome from "../components/home_components/footer_home";
import { MdOutlineChecklist } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import Link from "next/link";
import HeadLayout from "../components/home_components/HeadLayout";
import { client } from "./_app";
import { SEOTAGS, SERVICES } from "../services/contants";

export default function Samples({ services, seotags }) {
  return (
    <>
      <HeadLayout slug="samples" seotags={seotags} />
      <Link href="/samples">
        <img src="/assets/foter/View.png" alt="" className="view" />
      </Link>
      <NavbarHome services={services} />

      <div className="wrap">
        <div className="row m-0 p-0">
          <div className="col">
            <div className="contac">
              <div className="headings d-flex justify-content-center align-items-center mb-4">
                <MdOutlineChecklist className="mr-2 mt-1" />
                <h1 className="">Samples </h1>
              </div>

              <br />
              <br />
              <div className="row mb-4">
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">A</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Accounts.pdf" target="_blank">
                          - Accounting
                        </a>
                        <a href="/assets/pdf/Analytics.pdf" target="_blank">
                          - Analytics
                        </a>
                        <a href="/assets/pdf/Anthropology.pdf" target="_blank">
                          - Anthropology
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">B</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a
                          href="/assets/pdf/BusinessManagement.pdf"
                          target="_blank"
                        >
                          - Business Management
                        </a>
                        <a
                          href="/assets/pdf/BusinessAnalytics.pdf"
                          target="_blank"
                        >
                          - Business Analytics
                        </a>
                        <a
                          href="/assets/pdf/BusinessEthics.pdf"
                          target="_blank"
                        >
                          - Business Ethics
                        </a>
                        <a href="/assets/pdf/Biology.pdf" target="_blank">
                          - Biology
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">C</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Criminology.pdf" target="_blank">
                          - Criminology
                        </a>
                        <a
                          href="/assets/pdf/ComputerScience.pdf"
                          target="_blank"
                        >
                          - Computer Science
                        </a>
                        <a
                          href="/assets/pdf/ChildcareandPedagogy.pdf"
                          target="_blank"
                        >
                          - Childcare & Pedagogy
                        </a>
                        <a href="/assets/pdf/Communication.pdf" target="_blank">
                          - Communication
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mb-4">
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">E</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Economics.pdf" target="_blank">
                          - Economics
                        </a>
                        <a
                          href="/assets/pdf/EnglishCommorLiterature.pdf"
                          target="_blank"
                        >
                          - English Comm/Literature
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">F</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Finance.pdf" target="_blank">
                          - Finance
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">G</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Geography.pdf" target="_blank">
                          - Geography
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mb-4">
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">H</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Hospitality.pdf" target="_blank">
                          - Hospitality
                        </a>
                        <a
                          href="/assets/pdf/HumanResourceManagement.pdf"
                          target="_blank"
                        >
                          - Human Resource Management
                        </a>
                        <a href="/assets/pdf/History.pdf" target="_blank">
                          - History
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">L</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Law.pdf" target="_blank">
                          - Law
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">M</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Management.pdf" target="_blank">
                          - Management
                        </a>
                        <a href="/assets/pdf/Marketing.pdf" target="_blank">
                          - Marketing
                        </a>
                        <a href="/assets/pdf/math.pdf" target="_blank">
                          - Mathematics
                        </a>
                        <a href="/assets/pdf/Medical.pdf" target="_blank">
                          - Medical
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mb-4">
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">N</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Nursing.pdf" target="_blank">
                          - Nursing
                        </a>
                        <a href="/assets/pdf/Networking.pdf" target="_blank">
                          - Networking
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">O</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a
                          href="/assets/pdf/OperationsManagement.pdf"
                          target="_blank"
                        >
                          - Operations Management
                        </a>
                        <a
                          href="/assets/pdf/OrganisationalBehaviour.pdf"
                          target="_blank"
                        >
                          - Organization Behavior
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">P</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Psychology.pdf" target="_blank">
                          - Psychology
                        </a>
                        <a
                          href="/assets/pdf/PoliticalScience.pdf"
                          target="_blank"
                        >
                          - Political Science
                        </a>
                        <a
                          href="/assets/pdf/ProjectManagement.pdf"
                          target="_blank"
                        >
                          - Project Management
                        </a>
                        <a href="/assets/pdf/Philosophy.pdf" target="_blank">
                          - Philosophy
                        </a>
                        <a href="/assets/pdf/Poster.pdf" target="_blank">
                          - Poster
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mb-4">
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">S</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Sociology.pdf" target="_blank">
                          - Sociology{" "}
                        </a>

                        <a href="/assets/pdf/Statistics.pdf" target="_blank">
                          - Statistics
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">T</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a href="/assets/pdf/Tourism.pdf" target="_blank">
                          - Tourism
                        </a>
                        <a
                          href="/assets/pdf/TaxationorPayroll.pdf"
                          target="_blank"
                        >
                          - Taxation/Payroll
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                  <div className="conten">
                    <div className="tab-row">
                      <div className="a">W</div>
                      <div className="ic m-0 p-0">
                        <IoMdArrowDropright className="sample_icon" />
                      </div>
                      <div className="listt">
                        <a
                          href="/assets/pdf/WorldReligions.pdf"
                          target="_blank"
                        >
                          - World Religions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterHome />
    </>
  );
}

export async function getStaticProps() {
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });

  const { data } = await client.query({
    query: SEOTAGS,
  });

  return {
    props: {
      services: serviceData.services,
      seotags: data.seotags,
    },
  };
}
