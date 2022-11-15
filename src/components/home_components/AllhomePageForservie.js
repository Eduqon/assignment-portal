import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaListUl } from 'react-icons/fa';
import "swiper/css/navigation";
// import one from './client-img/one.webp'
import { Navigation, Autoplay } from "swiper";
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillProject } from 'react-icons/ai';
import { GiProgression } from 'react-icons/gi';
import { MdLiveHelp } from 'react-icons/md';
import { BsJournalBookmarkFill, BsPencilFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import LoadForm from './LoadForm';
import AutoFakePopup from './AutoFakePopup';
import Dissertation from './featuresImages/Dissertation.png'
import time from './featuresImages/time.png'
import Online from './featuresImages/Online.png'
import Casestudy from './img/Casestudy.png'
import Completecoursework from './img/Completecoursework.png'
import DissertationHead from './img/DissertationHead.png'
import EssayWritingHelp from './img/EssayWritingHelp.png'
import Researchpaperhelp from './img/Researchpaperhelp.png'
import Thesis from './img/Thesis.png'
import Whychooseourhelp from './img/Whychooseourhelp.png'
import { FooterHome } from "./footer_home";
import one from './sliders/one.webp'
import newzland from './sliders/newzland.gif'
import UK from './sliders/UK.webp'
import Germany from './sliders/Germany.webp'
import { Link } from 'react-router-dom'
import egipt from './sliders/egipt.jpg'
import canada from './sliders/canada.webp'
import australia from './sliders/australia.webp'
import CountUp from 'react-countup';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { useHref } from "react-router-dom";
import View from '../../assets/foter/View.png'
import educon from './img/educon.mp4';
import {
  Box
} from '@chakra-ui/react';
import AnonymousChat from "../chat_components/anonymous_chat";
import Allfeatures from "./Allfeatures";
// main list
const Subject1 = [
  "Accounting Assignment Help",
  , "Business Assignment Help"
  , "Business Environment Assignment Help"
  , "Business Law Assignment Help"
  , "Business Plan Assignment Help"
  , "Case Study Assignment Help"
  , "Childcare Assignment Help"
  , "Commerce Assignment Help"
  , "Communication Assignment Help"
  , "Construction Assignment Help"
  , "Criminology Assignment Help"
  , "Cultural Studies Assignment Help"
  , "English Literature Assignment Help"
  , "Entrepreneurship Assignment Help"
  , "Environmental Studies Assignment Help"
  , "Estate Management Assignment Help"
  , "Economics Assignment Help"
  , "Education Assignment Help"
  , "Engineering Assignment Help"
]
const Subject2 = [
  , "Finance Assignment Help"
  , "Food Assignment Help"
  , "General Studies Assignment Help"
  , "Health Assignment Help"
  , "Health & Social Care Assignment Help"
  , "Hospitality Assignment Help"
  , "Human Resource Management Assignment Help"
  , "Information Systems Assignment Help"
  , "Information Technology Assignment Help"
  , "International Studies Assignment Help"
  , "Law Assignment Help"
  , "Leadership Assignment Help"
  , "Management Assignment Help"
  , " Marketing Assignment Help"
  , " Marketing Essentials Assignment Help"

]
const Subject3 = [
  , " Media Assignment Help"
  , " Medical Assignment Help"
  , "Nursing Assignment Help"
  ,
  "Physical Education Assignment Help"
  , "Physiology Assignment Help"
  , "Planning Assignment Help"
  , "Politics Assignment Help"
  , "Poster Assignment Help"
  , "PowerPoint Assignment Help"
  , "Project Management Assignment Help"
  , "Psychology Assignment Help"
  , "Religion Assignment Help"
  , "Research Methodology Assignment Help"
  , "Sciences Assignment Help"
  , "Social Policy Assignment Help"
  , "Social Work Assignment Help"
  , "Sociology Assignment Help"
  , "Tourism Assignment Help"
]
const listthird = [
  "In-depth Topic Coverage"
  , "Well Curated and Coherent Essay"
  , "Authentic and Quality Essay"
  , "Accurate Essay Structure"
  , "100% Plagiarism Free Essay"
  , "Effective Expression Delivery"
]
const listfour = [
  "Accurate Dessertation Outline"
  , "Careful Compliance of guidelines"
  , "In-depth Topic Coverage"
  , "Well-researched Quality Content"
  , "100% Plagiarism Free Dessertation"
  , "Original and Distinct Content"
]
const listfive = [
  "Well-Organized Data"
  , "Unique Cases"
  , "Careful Compliance of guidelines"
  , "In-depth Topic Coverage"
  , "Well-researched Quality Content"
  , "100% Plagiarism Free Content"
]
const listsix = [
  "360-degree data coverage"
  , "In-depth and Comprehensive Research"
  , "Careful Compliance of guidelines"
  , "Best Quality Research Assurance"
  , "Authentic and Distinct Content"
  , "100% Plagiarism Free Content"
]
const listseven = [
  "360-degree data coverage"
  , "Coherent Presentation and Organization"
  , "In-depth and Comprehensive Research"
  , "Careful Compliance of guidelines"
  , "Authentic and Distinct Content"
  , "100% Plagiarism Free Content"
]
const listeight = [
  "On-Time Submissions"
  , "Precise and Accurate Content"
  , "Original and Quality Content"
  , "100% Plagiarism Free Content"
  , "Well-Researched and Accurate Work"
]
export default function AllhomePageForservie() {


  const [poploop, setpoploop] = useState(['18937792', '8638622', '383872']);
  const listone = ["Well-Researched Assignments", "100% Plagiarism Free Work", "Best Grades for you", "On time delivery"
    , "Foolproof Double Quality Checks",
    "24*7 Assistance and help",
    "Unlimited Revisions as per your requirements.",
    "Well-written, authentic, coherent and distinct content."]

  const [lists, setlists] = useState(listone);
  const [secondList1, setsecondList1] = useState(Subject1);
  const [secondList2, setsecondList2] = useState(Subject2);
  const [secondList3, setsecondList3] = useState(Subject3);
  const [thirdList, setthirdList] = useState(listthird);
  const [fourList, setfourList] = useState(listfour);
  const [fiveList, setfiveList] = useState(listfive);
  const [sixList, setsixList] = useState(listsix);
  const [sevenList, setsevenList] = useState(listseven);
  const [eightList, seteightList] = useState(listeight);
  const timee = useRef();

  const Essay = useRef();
  const Dessertation = useRef();
  const Case = useRef();
  const Research = useRef();
  const thesis = useRef();
  const cousreWork = useRef();
  const subject = useRef()
  
  const [counterTrue, setcounterTrue] = useState(0)
  const firstCount = () => {
      if (window.scrollY >= 500) {
          // start()
          console.log(window.scrollY);
          setcounterTrue(true)
      } else {
          console.log('false')

      }
  }

  window.addEventListener('scroll', firstCount)
  return (
    <>
      <br />
      <AnonymousChat />
      <Link to="/"><img src={View} alt="" className='view' /></Link>
      <div className="Mycont m-0">
                <Box display={{ base: 'block', md: 'none', sm: 'none' }}>

                    <div className="row p-0 m-0">
                        <div className="col">
                            <video className='w-100 brdr' loop="true" autoplay="autoplay" controls="controls" id="vid" muted >
                                <source src={educon} type="video/mp4" />

                            </video>
                        </div>
                    </div>
                </Box>
                <br />

                <div className="row p-0 m-0">
                    <div className="col-12 headings1 my-4 d-flex justify-content-center align-items-center">
                        <HiOutlineClipboardList className='mt-0 mr-2 Fs' /><h2> Assignment Santa</h2>
                    </div>
                    <div className='col-12 d-flex justify-content-center client_heading'>
                        Take help from best MBA writing service in Australia
                    </div>
                </div>
                <br />
                <br />
                <div className="row p-0 m-0">
                    <div className="col-md-4 col-12">
                        <div className='boxx'>
                            <div className='counter_'>

                                {(counterTrue) ?
                                    <CountUp start={0} end={157} delay={0}>

                                        {({ countUpRef }) => (
                                            <>
                                                <div className="d-flex flex-column justify-content-center ">

                                                    <div className='d-flex justify-content-center'>
                                                        <span ref={countUpRef} />+
                                                    </div>
                                                    <div className='Fs-3'>
                                                        Subjects
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </CountUp>
                                    : 0}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-12">
                        <div className='counter_'>

                            {
                                (counterTrue) ?
                                    <CountUp start={0} end={2014} delay={0}>
                                        {({ countUpRef }) => (
                                            <>
                                                <div className="d-flex flex-column justify-content-center ">

                                                    <div className='d-flex justify-content-center'>


                                                        <span ref={countUpRef} />+
                                                    </div>
                                                    <div className='Fs-3'>
                                                        PHD Experts
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </CountUp> : 0}
                        </div>
                    </div>
                    <div className="col-md-4 col-12">
                        <div className='counter_'>


                            {
                                (counterTrue) ?
                                    <CountUp start={0} end={157} delay={0}>
                                        {({ countUpRef }) => (
                                            <>
                                                <div className="d-flex flex-column justify-content-center ">

                                                    <div className='d-flex justify-content-center'>


                                                        <span ref={countUpRef} />+
                                                    </div>
                                                    <div className='Fs-3'>
                                                        Subjects
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </CountUp>
                                    : 0
                            }

                        </div>
                    </div>
                </div>
            </div>

      <br />
      <div className="adjust">
        <div className="row m-0 p-0">
          <div className="col set-m">
            <div className="headings d-flex justify-content-center align-items-center">
              <FaListUl className="mr-2" /><h1>Providing Services In</h1>


            </div>
          </div>
        </div>

        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          slidesPerView={4}
          spaceBetween={30}
          slidesPerGroup={1}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          loopFillGroupWithBlank={true}
          // pagination={{
          //   clickable: true,
          // }}
          navigation={false}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}><img src={one} className="img-sizw" /></SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}><img src={UK} className="img-sizw" /></SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}><img src={Germany} className="img-sizw" /></SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}><img src={newzland} className="img-sizw" /></SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}><img src={egipt} className="img-sizw" /></SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}><img src={australia} className="img-sizw" /></SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}><img src={canada} className="img-sizw" /></SwiperSlide>
        </Swiper>
      </div>
      {/* text content */}
      <Allfeatures/>
      {/* <div className='Mycontainer'>
        <div className="section"></div>
        <h2 className='headings'>Why Choose Our Help?</h2>

        <div className="row p-0 m-0 set_mr">

          <div className="col-md-4 col-12  Mp-4  d-flex flex-column justify-content-center align-items-center">
            <div className="img-Logo1">
              <img src={Online} alt="hy" />
            </div>
            <h2 className='sub_head_two'>Online Assignment Help</h2>
            <p className='w-100 mx-4 px-4 set_text'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...</p>
          </div>
          <div className="col-md-4 col-12 Mp-4 d-flex flex-column justify-content-center align-items-center">
            <div className="img-Logo">
              <img src={Dissertation} alt="hy" />
            </div>
            <h2 className='sub_head_two'>Dissertation Writing Help</h2>
            <p className='w-100  px-4   set_text'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...</p>
          </div>
          <div className="col-md-4 col-12 Mp-4  d-flex flex-column justify-content-center align-items-center">
            <div className="img-Logo2">
              <img src={time} alt="hy" />
            </div>
            <h2 className='sub_head_two'> On Time Delivery</h2>
            <p className='w-100 mx-4 px-4 set_text'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...</p>
          </div>

        </div>

        <div className="row p-0 m-0">

          <div className="col">
            <div className="row m-0 p-0">
              // {/* <div className="Mycontainer"> */}
              {/* <div className="d-lg-flex">


                <div className="col-md-6 col-12 p-0" ref={timee}>
                  <p className='set_text'>Assignment Santa is aware that the students have multiple things to cater to. With various subjects, jobs, co-curricular activities, it becomes difficult to meet deadlines and submit the best assignments. Here, Assignment Santa comes to your rescue. With a team of experts in various fields, proficient writers and researchers, we make it our responsibility to create the best assignments for you. We focus on:</p>
                  <div>
                    <ul className='set_list'>
                      {
                        lists.map((value) => {
                          return (
                            <>
                              <div className="d-flex align-items-center ">

                                <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                              </div>
                            </>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-12 d-flex justify-content-center align-itmes-baseline ">
                  <img src={Whychooseourhelp} alt="" className='w-75' />
                </div>
              </div>
              <div ref={timee}>
                <p className='set_text'>We cover subjects from all the fields worldwide, assignments of all types within the norms of your
                  given university. With 6+ years of experience, we have catered to more than 35,000 students from
                  various universities across the globe who have reached pinnacles of success with out helping hand.
                  Don’t let one assignment come between you and your success, seek our help now:
                  <br />
                  <b className='mt-3'>PLACE ORDER OPTION TO BE ATTACHED</b></p>
              </div>
              <div className="button_read ">
                <button className='btn shadow-none' onClick={() => {
                  timee.current.classList.toggle('Read')
                }}> Read More</button>
              </div>
              <div className="">
                <h1 className='headings'>Why should you trust us?</h1>
                <p className='set_text'>
                  In this Information world, it becomes difficult to choose the best possible option. To make your job
                  easier, we are providing you with the various assignment samples written by our writers. We are
                  attaching the most authentic testimonial from our students across the world. We motivate you to ask us as many questions as you want, seek all the information to be sure and we guarantee you that
                  you will get the best grades.
                </p>
              </div> */} 

              {/* </div> */}



              {/* <div className="">
                <div className="headings d-flex justify-content-center align-items-center ">
                  <GiProgression className='mt-0 mr-2 Fs' /><h1 className=''>Subject Help that we offer:</h1>
                </div>
                <p className='set_text mt-4'>
                  We understand the importance of each and every subject and we offer you a complete A to Z
                  subjects coverage. Our aim is to help you achieve the best grades in every subject so that no subject
                  hinders your success. Our team of experts spend relentless hours in ensuring that your subject
                  assignment is made with utmost depth, research and quality content.
                </p>
              </div>
              <div className='row' ref={subject}>
                <div className="col-md-4 col-12">
                  <ul className='set_list'>
                    {
                      secondList1.map((value) => {
                        return (
                          <>
                            <div className="d-flex align-items-center">

                              <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                            </div>
                          </>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className="col-md-4 col-12">
                  <ul className='set_list'>
                    {
                      secondList2.map((value) => {

                        return (
                          <>
                            <div className="d-flex align-items-center">

                              <IoIosArrowForward className='mr-2  colr-icon' /><li className='set_clor'>{value}</li>
                            </div>
                          </>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className="col-md-4 col-12">
                  <ul className='set_list'>
                    {
                      secondList3.map((value) => {
                        return (
                          <>
                            <div className="d-flex align-items-center">

                              <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                            </div>
                          </>
                        )
                      })
                    }
                  </ul>
                </div>

              </div>
              <div className="button_read ">
                <button className='btn shadow-none' onClick={() => {
                  subject.current.classList.toggle('Read')
                }}> Read More</button>
              </div>
              <div>
                <h1 className='headings'>Why Essay Writing Help?</h1>
                <p className='set_text'>
                  An essay is a highly effective piece of writing aimed to reflect the writer’s complete
                  view point of a given topic. It needs to be written in a way that both informs and
                  convinces the reader about the given topic. Not only this, there are various kinds of
                  essays demanding different writing styles. These include descriptive essays,
                  compare and contrast essays, critical essays, narrative essays, argumentative
                  essays, expository essays and many more. Most of the universities use this to test
                  the academic footing of its students and one essay is responsible to decide a
                  student’s academic career. Hence, a student has to write an essay with utmost care
                  and dedication. This is why a student should take help from our top writers who have
                  the experience of writing thousands of essays in myriad of topics
                </p>
              </div>
              <div> <div className="ref" ref={Essay}>
                <h2 className='sub_headings'>
                  Essay Writing Help from Assignment Santa
                </h2>
                <p className='set_text'>
                  We have a well-curated team of essay writers who have been trained in writing
                  various types of essays. They hold years of experience and expertise in writing
                  outstanding essays that have fetched our students the best grades.
                </p>
                <h3 className='small_headings1'>We guarantee you:
                </h3>
                <div className="row p-0 m-0">
                  <div className="col-md-6 col-12 d-lg-flex">
                    <ul className='set_list'>

                      {
                        thirdList.map((value) => {
                          return (
                            <>
                              <div className="d-flex align-items-center">

                                <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                              </div>
                            </>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className="col-md-6 col-12 d-flex justify-content-sm-center justify-content-lg-start">
                    <img src={EssayWritingHelp} className='w-50 set-mt' />
                  </div>
                </div>
              </div>

                <div className="button_read ">
                  <button className='btn shadow-none' onClick={() => {
                    Essay.current.classList.toggle('Read')
                  }}> Read More</button>
                </div>
                <div>
                  <div className="headings d-flex justify-content-center align-items-center">

                    <MdLiveHelp className='mt-1 mr-2 Fs-1' />
                    <h1 className=''>
                      Dessertation help
                    </h1>
                  </div>
                  <h2 className='sub_headings'>
                    Why Dessertation Help?
                  </h2>
                  <p className='set_text'>
                    A desertation is an academic paper consisting microscopic details about one’s
                    research question. Desertation writing is the most complex form of academic writing
                    that starts from choosing the topic of research and goes till concluding the outcomes
                    of the research. It is a technical avenue consisting of various methodology and
                    requiring painstaking hours of complete focus. Even the most dedicated researchers
                    face difficulty when it comes to writing a Dessertation and take Dessertation Writing
                    help. Desertation help ensures that your desertation is written with undivided
                    attention capturing minutest details and fetching you your academic degree.
                  </p>
                  <div ref={Dessertation}>
                    <h2 className='sub_headings'>
                      Dessertation Help from our experts
                    </h2>

                    <p className='set_text'>
                      Our team of experts consist of many researchers and PHD scholars who have years
                      and years of experience in writing dissertation on various topics. We comply by each
                      and every rule and follow a proper dissertation outline. We focus on every aspect of
                      the research topic with the minutest detail to help you write an outstanding dissertation that will set you apart from all the students
                    </p>
                    <div className='position-relative'>

                      <h2 className='small_headings2'>
                        We guarantee you:
                      </h2>
                    </div>
                    <div className="row p-0 m-0">
                      <div className="col-md-6 col-12 d-flex align-items-center">
                        <ul className='set_list'>
                          {
                            fourList.map((value) => {
                              return (
                                <>
                                  <div className="d-flex align-items-center">

                                    <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                                  </div>
                                </>
                              )
                            })
                          }
                        </ul>
                      </div>
                      <div className="col-md-6 col-12 d-flex justify-content-sm-center justify-content-start">
                        <img src={DissertationHead} alt="" className='w-50' />
                      </div>
                    </div>
                  </div>
                  <div className="button_read ">
                    <button className='btn shadow-none' onClick={() => {
                      Dessertation.current.classList.toggle('Read')
                    }}> Read More</button>
                  </div>
                </div>
                <div>
                  <div className="headings d-flex justify-content-center align-items-center">

                    <BsJournalBookmarkFill className="mt-0 mr-2" />
                    <h1 className=''>
                      Case Study
                    </h1>

                  </div>
                  <h2 className='sub_headings'>
                    Why Case Study Help?
                  </h2>

                  <p className='set_text'>
                    A case study is a method of research that focuses on one particular subject, person,
                    group, usually from the real life. This helps in deeply analyzing the research concern,
                    relating it with real life and forming the future trends. It becomes extremely difficult
                    for students to make case study assignments since they involve painstaking
                    research, multi-faceted data collection and proper organization of data. Hence, if
                    complete attention cannot be given, it is best for students to seek case study help.
                    This will help them get best grades.
                  </p>
                  <div className='' ref={Case}>
                    <h2 className='sub_headings'>
                      Case Study Help from Assignment Santa
                    </h2>
                    <p className='set_text'>
                      Case study requires a comprehensive study within a short period of time. Our team
                      of experts are well trained in research and can produce succinct and well research
                      case studies within a short span of time. Our experts focus of authenticity, accuracy
                      and coherency of data which is the perfect recipe for a remarkable case study
                    </p>

                    <div className="row m-0 p-0">
                      <div className="col-md-6 col-12 d-flex flex-column">
                        <h3 className='small_headings'>
                          We guarantee you:
                        </h3>
                        <ul className='set_list'>
                          {
                            fiveList.map((value) => {
                              return (
                                <>
                                  <div className="d-flex align-items-center">

                                    <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                                  </div>
                                </>
                              )
                            })
                          }
                        </ul>
                      </div>

                      <div className="col-md-6 col-12 d-flex align-items-baseline justify-content-sm-center justify-content-start">
                        <img src={Casestudy} className='w-50 ' />
                      </div>
                    </div>
                  </div>
                  <div className="button_read ">
                    <button className='btn shadow-none' onClick={() => {
                      Case.current.classList.toggle('Read')
                    }}> Read More</button>
                  </div>

                </div>
                <div>
                  <div className="headings d-flex justify-content-center align-items-center">

                    <ImSearch className='mr-2 mt-1' /><h1 className=''>Research Paper Writing Help</h1>
                  </div>
                  <h2 className='sub_headings'>Why Research Paper Writing Help?</h2>

                  <p className='set_text'>
                    Writing a research paper can be the most frightening task for any university student.
                    It is because every research paper involves various different aspects that need to beperfected from creating a hypothesis to giving suitable suggestions. Writing these
                    things require a 360-degree approach of studying each and every thing in greatest
                    details. We understand that university students do not have time to focus only on
                    one subject’s research, hence we encourage research paper writing help from us.
                  </p>
                  <div ref={Research}>
                    <h2 className='sub_headings'>Research Help from Assignment Santa</h2>

                    <p className='set_text'>
                      We have a well-curated team of researchers who have been researching in various
                      fields from many years. After having written hundreds of research papers, they are
                      here to help you get the best grades and achieve your academic goals. Our writers
                      ensure that minutest detail gets covered and our quality checkers makes sure that
                      you get the best written research paper.
                    </p>
                    <div className="row m-0 p-0">
                      <div className="col-md-6 col-12 d-flex flex-column">
                        <h3 className='small_headings'>
                          We guarantee you:
                        </h3>
                        <ul className='set_list'>
                          {
                            sixList.map((value) => {
                              return (
                                <>
                                  <div className="d-flex align-items-center">

                                    <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                                  </div>
                                </>
                              )
                            })
                          }
                        </ul>
                      </div>

                      <div className="col-md-6 col-12 d-flex align-items-baseline justify-content-sm-center justify-content-start">
                        <img src={Researchpaperhelp} className='w-50 ' />
                      </div>
                    </div>
                  </div>

                  <div className="button_read ">
                    <button className='btn shadow-none' onClick={() => {
                      Research.current.classList.toggle('Read')
                    }}> Read More</button>
                  </div>
                </div>
                <div>
                  <div className="headings d-flex justify-content-center align-items-center">
                    <BsPencilFill className='mr-2 mt-1' /><h1 className=''>Thesis Writing</h1>
                  </div>
                  <h1 className='sub_headings'>Why Thesis Writing Help?</h1>

                  <p className='set_text'>
                    Thesis Writing constitutes for the most important part of your doctoral or master’s
                    Programme. It is the final obstacle between you and your academic degree but it is
                    also the most difficult hurdle to overcome. It calls for innumerable hours of dedicated
                    research, comprehensive organization of research data, complete coverage of
                    microscopic detail, concise conclusions and solutions for your research problem. It is
                    not at all easy for a single person to do this herculean task. Hence, at this final stage,
                    it becomes very important for student to seek professional help from experts in
                    writing thesis.
                  </p>
                  <div ref={thesis}>
                    <h1 className='sub_headings'>Thesis Writing Help from our experts</h1>
                    <p className="set_text">
                      Our experts have over 6+ years-worth of experience in writing thesis. They have
                      been trained to do research in various topics and are well aware of the importance of
                      thesis writing in the student’s life. Hence, they make sure to deliver the best thesis
                      that will fetch you the best grades.
                    </p>

                    <div className="row m-0 p-0">
                      <div className="col-md-6 col-12 d-flex flex-column">
                        <h3 className='small_headings'>
                          We guarantee you:
                        </h3>
                        <ul className='set_list'>
                          {
                            sevenList.map((value) => {
                              return (
                                <>
                                  <div className="d-flex align-items-center">

                                    <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                                  </div>
                                </>
                              )
                            })
                          }
                        </ul>
                      </div>

                      <div className="col-md-6 col-12 d-flex align-items-baseline justify-content-sm-center justify-content-start">
                        <img src={Thesis} className='w-50 ' />
                      </div>
                    </div>
                  </div>
                  <div className="button_read ">
                    <button className='btn shadow-none' onClick={() => {
                      thesis.current.classList.toggle('Read')
                    }}> Read More</button>
                  </div>
                </div>
                <div>
                  <div className="headings d-flex justify-content-center align-items-center">
                    <AiFillProject className='mr-2 mt-1' /> <h1 className=''>Complete Coursework</h1>
                  </div>
                  <h1 className='sub_headings'>Why Complete Coursework help?</h1>

                  <p className='set_text'>
                    Universities and Colleges prefer giving daily, weekly and monthly coursework to
                    continually assess and grade the students. But being a student and having so many
                    commitments, jobs, activities to attend to everyday, it becomes extremely difficulty to
                    focus on the coursework. This deteriorates the grades of the students. Hence,
                    students must seek complete coursework help if they wish to go about with their
                    work peacefully without having to worry about their grades.
                  </p>
                  <div ref={cousreWork}>
                    <h1 className='sub_headings'>Complete Coursework help from our experts</h1>
                    <p className="set_text">
                      Our experts who are well-trained in various fields are competent to complete your
                      coursework. With their knowledge and expertise, they make sure that you get the
                      best grades and all your deadlines are met without you having to worry about them.
                      We take entire responsibility of your coursework completion and submission.
                    </p>
                    <div className="row m-0 p-0">
                      <div className="col-md-6 col-12 d-flex flex-column">
                        <h3 className='small_headings'>
                          We guarantee you:
                        </h3>
                        <ul className='set_list'>
                          {
                            eightList.map((value) => {
                              return (
                                <>
                                  <div className="d-flex align-items-center">

                                    <IoIosArrowForward className='mr-2 colr-icon' /><li className='set_clor'>{value}</li>
                                  </div>
                                </>
                              )
                            })
                          }
                        </ul>
                      </div>

                      <div className="col-md-6 col-12 d-flex align-items-baseline  justify-content-sm-center justify-content-start">
                        <img src={Completecoursework} className='w-50 ' />
                      </div>
                    </div>
                  </div>
                  <div className="button_read ">
                    <button className='btn shadow-none' onClick={() => {
                      cousreWork.current.classList.toggle('Read')
                    }}> Read More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
