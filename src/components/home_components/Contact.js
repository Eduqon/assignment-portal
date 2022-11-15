import React from 'react'
import MegaMenu from './MegaMenu'
import { NavbarHome } from './navbar_home'
import { FormHome } from './form_home'
import { FooterHome } from './footer_home'
import { FcContacts } from 'react-icons/fc';
import { BiMailSend, BiPhoneCall } from 'react-icons/bi';
import { RiWhatsappFill } from 'react-icons/ri';
import { FcCallback } from 'react-icons/fc';
import { FaRegAddressCard } from 'react-icons/fa';
import contact from '../../assets/contact.png'
import { Link } from 'react-router-dom'
import View from '../../assets/foter/View.png'
import email from '../../assets/email.png'
import { ImPointDown } from 'react-icons/im'
export default function Contact() {
    return (
        <>

            <Link to="/samples"><img src={View} alt="" className='view' /></Link>
            <NavbarHome />
            <div className="row p-0 m-0">
                <div className="col set-Back">
                    <h1 className='set-contact'>Contact Us</h1>
                </div>
            </div>

            <div className="wrap">
                <div className="row m-0 p-0">
                    <div className="col">
                        <div className="contac">
                            <div className="headings set- d-flex justify-content-center align-items-center">
                                <FcContacts className='mr-2 ' /><h1 className=''>Contact Us </h1>
                            </div>
                            <div className="row contact_details">
                                <div className="col-md-6 col-12 d-flex flex-column justify-content-around align-items-center">
                                    <ul className='set-lisT' style={{ listStyle: 'none', }}>

                                        {/* <li>
                                            <div className="d-flex align-items-center">
                                                <FcCallback className='whst' /> &nbsp;&nbsp;
                                                <a href='tel:+917986021317'> 7986021317 (Call)</a>
                                            </div>

                                        </li> */}

                                        {/* <li>
                                            <div className="d-flex align-items-center">
                                                <RiWhatsappFill className='whst' /> &nbsp;&nbsp; <a href='http://api.whatsapp.com/send?phone=917986021317' target="_blank">7986021317 (WhatsApp)</a>
                                            </div>
                                        </li> */}
                                        <li>
                                            <div className="d-flex align-items-center">
                                                <FaRegAddressCard className='whst' /> &nbsp;&nbsp;
                                                627 , Sector-62 , Noida , India
                                            </div>
                                        </li>
                                        {/* <li>    <div className="mail d-flex align-items-center">
                                            <img src={email} className="eml" /> &nbsp;&nbsp;&nbsp; <a href="mailto:assignmentsanta88@gmail.com?subject=Hello%20again" >assignmentsanta88@gmail.com</a>
                                        </div></li> */}
                                    </ul>
                                    {/* <h2 className='main-line font-weight-bolder mb-3'>Assignment Santa</h2> */}
                                    {/* <div className="address">
                                        627 , Sector-62 , Noida , India
                                    </div>
                                    <div className="mail d-flex align-items-baseline">
                                        <BiMailSend /> &nbsp;&nbsp;&nbsp; assignmentsanta88@gmail.com
                                    </div>
                                    <div className="call d-flex align-items-center">
                                        <BiPhoneCall />  &nbsp; OR &nbsp; <RiWhatsappFill /> &nbsp;&nbsp; <a href='http://api.whatsapp.com/send?phone=917986021317' target="_blank">7986021317</a>
                                    </div> */}
                                    {/* <div className="direct ">
                                        <div className='d-flex flex-row alig-items-center juestify-content-between'>

                                            <h2 className="set_linkName">
                                                Directly Contact Us On Our WhatsApp
                                            </h2>
                                            <ImPointDown />
                                        </div>
                                        <div>

                                            <div className="link">
                                              <a href="http://api.whatsapp.com/send?phone=917986021317" target='blank_'>http://api.whatsapp.com/send?phone=917986021317</a>  
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="img-contact">
                                        <img src={contact} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >

            <FooterHome />
        </>
    )
}
