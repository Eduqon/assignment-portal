import React from 'react'
import MegaMenu from './MegaMenu'
import { NavbarHome } from './navbar_home'
import { FormHome } from './form_home'
import { FooterHome } from './footer_home'
import { MdOutlineChecklist } from 'react-icons/md';
import { BiMailSend, BiPhoneCall } from 'react-icons/bi';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { IoMdArrowDropright } from 'react-icons/io';
import Accounts from '../../assets/pdf/Accounts.pdf'
import Analytics from '../../assets/pdf/Analytics.pdf'
import Anthropology from '../../assets/pdf/Anthropology.pdf'
import Biology from '../../assets/pdf/Biology.pdf'
import BusinessAnalytics from '../../assets/pdf/BusinessAnalytics.pdf'
import BusinessEthics from '../../assets/pdf/BusinessEthics.pdf'
import BusinessManagement from '../../assets/pdf/BusinessManagement.pdf'
import ChildcareandPedagogy from '../../assets/pdf/ChildcareandPedagogy.pdf'
import Communication from '../../assets/pdf/Communication.pdf'
import ComputerScience from '../../assets/pdf/ComputerScience.pdf'
import Criminology from '../../assets/pdf/Criminology.pdf'
import Economics from '../../assets/pdf/Economics.pdf'
import EnglishCommorLiterature from '../../assets/pdf/EnglishCommorLiterature.pdf'
import Finance from '../../assets/pdf/Finance.pdf'
import Geography from '../../assets/pdf/Geography.pdf'
import History from '../../assets/pdf/History.pdf'
import Hospitality from '../../assets/pdf/Hospitality.pdf'
import HumanResourceManagement from '../../assets/pdf/HumanResourceManagement.pdf'
import Law from '../../assets/pdf/Law.pdf'
import Management from '../../assets/pdf/Management.pdf'
import Marketing from '../../assets/pdf/Marketing.pdf'
import Medical from '../../assets/pdf/Medical.pdf'
import Networking from '../../assets/pdf/Networking.pdf'
import Nursing from '../../assets/pdf/Nursing.pdf'
import OperationsManagement from '../../assets/pdf/OperationsManagement.pdf'
import OrganisationalBehaviour from '../../assets/pdf/OrganisationalBehaviour.pdf'
import Philosophy from '../../assets/pdf/Philosophy.pdf'
import PoliticalScience from '../../assets/pdf/PoliticalScience.pdf'
import ProjectManagement from '../../assets/pdf/ProjectManagement.pdf'
import Psychology from '../../assets/pdf/Psychology.pdf'
import Sociology from '../../assets/pdf/Sociology.pdf'
import Statistics from '../../assets/pdf/Statistics.pdf'
import TaxationorPayroll from '../../assets/pdf/TaxationorPayroll.pdf'
import Tourism from '../../assets/pdf/Tourism.pdf'
import Poster from '../../assets/pdf/Poster.pdf'
import math from '../../assets/pdf/math.pdf'
import WorldReligions from '../../assets/pdf/WorldReligions.pdf'
import { Link } from 'react-router-dom'
import View from '../../assets/foter/View.png'
export default function Samples() {
    return (
        <>
    
           <Link to="/samples"><img src={View} alt="" className='view' /></Link>
            <NavbarHome />
            {/* <FormHome /> */}

            <div className="wrap">
                <div className="row m-0 p-0">
                    <div className="col">
                        <div className="contac">
                            <div className="headings d-flex justify-content-center align-items-center mb-4">
                                <MdOutlineChecklist className='mr-2 mt-1' /><h1 className=''>Samples </h1>
                            </div>

                            <br />
                            <br />
                            <div className="row mb-4">
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                A
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Accounts} target="_blank" >- Accounting</a>
                                                <a href={Analytics} target="_blank">- Analytics</a>
                                                <a href={Anthropology} target="_blank">- Anthropology</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                B
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={BusinessManagement} target="_blank">- Business Management</a>
                                                <a href={BusinessAnalytics} target="_blank">- Business Analytics</a>
                                                <a href={BusinessEthics} target="_blank">- Business Ethics</a>
                                                <a href={Biology} target="_blank">- Biology</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                C
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Criminology} target="_blank">- Criminology</a>
                                                <a href={ComputerScience} target="_blank">- Computer Science</a>
                                                <a href={ChildcareandPedagogy} target="_blank">- Childcare & Pedagogy</a>
                                                <a href={Communication} target="_blank">- Communication</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row  mb-4">

                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                E
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Economics} target="_blank">- Economics</a>
                                                <a href={EnglishCommorLiterature} target="_blank">- English Comm/Literature</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                F
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Finance} target="_blank">- Finance</a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                G
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Geography} target="_blank">- Geography</a>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row  mb-4">
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                H
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Hospitality} target="_blank">- Hospitality</a>
                                                <a href={HumanResourceManagement} target="_blank">- Human Resource Management</a>
                                                <a href={History} target="_blank">- History</a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                L
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Law} target="_blank">- Law</a>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                M
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Management} target="_blank">- Management</a>
                                                <a href={Marketing} target="_blank">- Marketing</a>
                                                <a href={math} target="_blank">- Mathematics</a>
                                                <a href={Medical} target="_blank">- Medical</a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row  mb-4">
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                N
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Nursing} target="_blank">- Nursing</a>
                                                <a href={Networking} target="_blank">- Networking</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                O
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={OperationsManagement} target="_blank">- Operations Management</a>
                                                <a href={OrganisationalBehaviour} target="_blank">- Organization Behavior</a>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                P
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Psychology} target="_blank">- Psychology</a>
                                                <a href={PoliticalScience} target="_blank">- Political Science</a>
                                                <a href={ProjectManagement} target="_blank">- Project Management</a>
                                                <a href={Philosophy} target="_blank">- Philosophy</a>
                                                <a href={Poster} target="_blank">- Poster</a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row  mb-4">
                                
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                S
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Sociology} target="_blank">- Sociology </a>
                                        
                                                <a href={Statistics} target="_blank">- Statistics</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                T
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={Tourism} target="_blank">- Tourism</a>
                                                <a href={TaxationorPayroll} target="_blank">- Taxation/Payroll</a>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 d-flex justify-content-center align-items-start mob-m">
                                    <div className="conten">
                                        <div className="tab-row">

                                            <div className="a">
                                                W
                                            </div>
                                            <div className="ic m-0 p-0">
                                                <IoMdArrowDropright className='sample_icon' />
                                            </div>
                                            <div className="listt">
                                                <a href={WorldReligions} target="_blank">- World Religions</a>

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
    )
}
