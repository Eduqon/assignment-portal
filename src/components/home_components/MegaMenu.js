import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo.png';
import { Link } from "react-router-dom";
import { IoIosArrowForward } from 'react-icons/io';
import { useRef } from 'react';

export default function MegaMenu() {
    const drop = useRef();
    const showMega = () => {
        drop.current.style.display = "block";
    }
    const hideMega = () => {
        drop.current.style.display = "none";
        console.log('hided')
    }

    const RowOne = [
        {
            name: "Accounting Assignment Help",
            id: "Accounting-Assignment-Help",
        },
        {
            name: "Business Assignment Help",
            id: "Accounting-Assignment-Help",
        },
        {
            name: "Business Environment Assignment Help",
            id: "Business-Environment-Assignment-Help",
        },
        {
            name: "Business Law Assignment Help",
            id: "Business-Law-Assignment-Help",
        },
        {
            name: "Business Plan Assignment Help",
            id: "Business-Plan-Assignment-Help",
        },
        {
            name: "Case Study Assignment Help",
            id: "Case-Study-Assignment-Help",
        },
        {

            name: "Childcare Assignment Help",
            id: "Childcare-Assignment-Help",
        },
        {

            name: "Commerce Assignment Help",
            id: "Commerce-Assignment-Help",
        },
        {

            name: "Communication Assignment Help",
            id: "Communication-Assignment-Help",
        },
        {

            name: "Construction Assignment Help",
            id: "Construction-Assignment-Help",
        }
    ]

    const RowTwo = [
        {
            name: "Criminology Assignment Help",
            id: "Criminology-Assignment-Help",
        },
        {
            name: "Cultural Studies Assignment Help",
            id: "Cultural-Studies-Assignment-Help",
        },
        {
            name: "Business Environment Assignment Help",
            id: "Business-Environment-Assignment-Help",
        },
        {
            name: "English Literature Assignment Help",
            id: "English-Literature-Assignment-Help",
        },
        {
            name: "Entrepreneurship Assignment Help",
            id: "Entrepreneurship-Assignment-Help",
        },
        {
            name: "Environmental Studies Assignment Help",
            id: "Environmental-Studies-Assignment-Help",
        },
        {

            name: "Estate Management Assignment Help",
            id: "Estate-Management-Assignment-Help",
        },
        {

            name: "Economics Assignment Help",
            id: "Economics-Assignment-Help",
        },
        {

            name: "Education Assignment Help",
            id: "Education-Assignment-Help",
        },
        {

            name: "Engineering Assignment Help",
            id: "Engineering-Assignment-Help",
        }

    ]

    const RowThree = [
        {

            name: "Finance Assignment Help",
            id: "Finance-Assignment-Help",
        },
        {
            name: "Food Assignment Help",
            id: "Food-Assignment-Help",
        },
        {
            name: "General Studies Assignment Help",
            id: "General-Studies-Assignment-Help",
        },
        {
            name: "Health Assignment Help",
            id: "Health-Assignment-Help",
        },
        {
            name: "Health & Social Care Assignment Help",
            id: "Health-&-Social-Care-Assignment-Help",
        },
        {
            name: "Hospitality Assignment Help",
            id: "Hospitality-Assignment-Help",
        },
        {
            name: "Human Resource Management Assignment Help",
            id: "Human-Resource-Management-Assignment-Help",
        },
        {

            name: "Information Systems Assignment Help",
            id: "Information-Systems-Assignment-Help",
        },
        {

            name: "Information Technology Assignment Help",
            id: "Information-Technology-Assignment-Help",
        },
        {

            name: "International Studies Assignment Help",
            id: "International-Studies-Assignment-Help",
        },
        {

            name: "Law Assignment Help",
            id: "Law-Assignment-Help",
        },
        {

            name: "Sociology Assignment Help",
            id: "Sociology-Assignment-Help",
        }
    ]
  
    const RowFour = [
        {

            name: "Tourism Assignment Help",
            id: "Tourism-Assignment-Help",
        },
        {
            name: "Leadership Assignment Help",
            id: "Leadership-Assignment-Help",
        },
        {
            name: "Management Assignment Help",
            id: "Management-Assignment-Help",
        },
        {
            name: "Marketing Assignment Help",
            id: "Marketing-Assignment-Help",
        },
        {
            name: "Marketing Essentials Assignment Help",
            id: "Marketing-Essentials-Assignment-Help",
        },
        {
            name: "Media Assignment Help",
            id: "Media-Assignment-Help",
        },
        {
            name: "Medical Assignment Help",
            id: "Medical-Assignment-Help",
        },
        {

            name: "Nursing Assignment Help",
            id: "Nursing-Assignment-Help",
        },
        {

            name: "Physical Education Assignment Help",
            id: "Physical-Education-Assignment-Help",
        },
        {

            name: "Physiology Assignment Help",
            id: "Physiology-Assignment-Help",
        },
        {

            name: "Planning Assignment Help",
            id: "Planning-Assignment-Help",
        }
    ]
    const RowFive = [
        {

            name: "Politics Assignment Help",
            id: "Politics-Assignment-Help",
        },
        {
            name: "Poster Assignment Help",
            id: "Poster-Assignment-Help",
        },
        {
            name: "PowerPoint Assignment Help",
            id: "PowerPoint-Assignment-Help",
        },
        {
            name: "Project Management Assignment Help",
            id: "Project-Management-Assignment-Help",
        },
        {
            name: "Psychology Assignment Help",
            id: "Psychology-Assignment-Help",
        },
        {
            name: "Religion Assignment Help",
            id: "Religion-Assignment-Help",
        },
        {
            name: "Research Methodology Assignment Help",
            id: "Research-Methodology-Assignment-Help",
        },
        {

            name: "Sciences Assignment Help",
            id: "Sciences-Assignment-Help",
        },
        {

            name: "Social Policy Assignment Help",
            id: "Social-Policy-Assignment-Help",
        },
        {

            name: "Social Work Assignment Help",
            id: "Social-Work-Assignment-Help",
        }
    ]
    const [Mega, setMega] = useState(RowOne)
    useEffect(() => {
        setMega(RowOne)
        console.log(Mega, "data")
    }, [])

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-white pt-0" id='set-mob'>
                <a class="navbar-brand" href="#">
                    
                <Link to="/"><img className=' ml-4 set_width' src={logo} /></Link>
                </a>
                <button class="navbar-toggler" id='collap' type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={hideMega}>
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse d-flex align-items-center " id="navbarSupportedContent" >
                    <ul class="navbar-nav font-weight-bolder ul-pading">
                        <li class="nav-item active" onClick={hideMega}>
                            <Link to="/" >Home</Link>
                            {/* <a class="nav-link" href="#" className=''>Home <span class="sr-only">(current)</span></a> */}
                        </li>

                        <li class="nav-item dropdown " id='myHover'  onClick={showMega}>
                            <Link to='/' onMouseOver={showMega} onClick={showMega} class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                                Services
                            </Link>
                            {/* <div class="dropdown-menu drop-menu" >
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div> */}
                        </li>
                        <li class="nav-item">
                        <Link to="/samples"> <a class="nav-link" href="#">Samples</a></Link>
                        </li>
                        <li class="nav-item">
                        <Link to="/reviews"><a class="nav-link ">Reviews</a></Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/contact"><a class="nav-link ">Contact Us</a></Link>
                        </li>
                    </ul>

                </div>
            </nav>
            {/* mega menu */}
            <div className="main" id='drop-menu' ref={drop} onMouseLeave={hideMega} >


                <div className="row set-font">
                    <div className="col-md-2 col-12">
                        <div className="row my-Div">
                            {
                                RowOne.map((value, ind) => {
                                    return (
                                        <>
                                            <div onClick={hideMega} key={ind} className="col-12 border-set d-flex align-items-center p-3 ml-3"><IoIosArrowForward className='mr-2' /><Link to={`/service/${value.id}`} state={value.name}>{value.name}</Link></div><hr className='sethr' />
                                        </>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="col-md-2 col-12">
                        <div className="row my-Div">
                            {
                                RowTwo.map((value, ind) => {
                                    return (
                                        <>
                                            <div onClick={hideMega} key={ind} className="col-12 border-set d-flex align-items-center p-3 ml-3"><IoIosArrowForward className='mr-2' /><Link to={`/service/${value.id}`} state={value.name}>{value.name}</Link></div><hr className='sethr' />
                                        </>
                                    )
                                })
                            }



                        </div>
                    </div>
                    <div className="col-md-3 col-12">
                        <div className="row my-Div">
                            {
                                RowThree.map((value, ind) => {
                                    return (
                                        <>
                                            <div onClick={hideMega} key={ind} className="col-12 border-set d-flex align-items-center p-3 ml-3"><IoIosArrowForward className='mr-2' /><Link to={`/service/${value.id}`} state={value.name}>{value.name}</Link></div><hr className='sethr' />
                                        </>
                                    )
                                })
                            }


                        </div>
                    </div>
                    <div className="col-md-2 col-12">
                        <div className="row  my-Div" >
                            {
                                RowFour.map((value, ind) => {
                                    return (
                                        <>
                                            <div onClick={hideMega} key={ind} className="col-12 border-set d-flex align-items-center p-3 ml-3"><IoIosArrowForward className='mr-2' /><Link to={`/service/${value.id}`} state={value.name}>{value.name}</Link></div><hr className='sethr' />
                                        </>
                                    )
                                })
                            }
                     
                        </div>
                    </div>
                    <div className="col-md-2 col-12">
                        <div className="row my-Div">

                        {
                                RowFive.map((value, ind) => {
                                    return (
                                        <>
                                            <div onClick={hideMega} key={ind} className="col-12 border-set d-flex align-items-center p-3 ml-3"><IoIosArrowForward className='mr-2' /><Link   to={`/service/${value.id}`} state={value.name}  >{value.name}</Link></div><hr className='sethr' />
                                        </>
                                    )
                                })
                            }

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
