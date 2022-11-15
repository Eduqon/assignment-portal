import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { AiFillStar } from 'react-icons/ai';
import { FcRating } from 'react-icons/fc';
import { RiDoubleQuotesL } from 'react-icons/ri';
import man1 from '../../assets/avtar/man1.png'
import man2 from '../../assets/avtar/man2.png'
import man3 from '../../assets/avtar/man3.png'
import man4 from '../../assets/avtar/man4.png'
import man5 from '../../assets/avtar/man5.png'
import man6 from '../../assets/avtar/man6.png'
import man7 from '../../assets/avtar/man7.png'
import man8 from '../../assets/avtar/man8.png'
import woman1 from '../../assets/avtar/woman1.png'
import woman2 from '../../assets/avtar/woman2.png'

export default function Testomonial() {

    const options = {
        margin: 30,
        responsiveClass: true,
        autoplay: true,
        dots: false,
        nav: true,

        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,

            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 3,

            }
        },
    };
    return (
        <>

            <div className="row p-0 m-0">
                <div className="col-12 headings my-4 d-flex justify-content-center align-items-center pt-4">
                    {/* <HiOutlineClipboardList className='mt-0 mr-2 Fs' /> */}
                    <FcRating />&nbsp;<h2 className=''>User Reviews</h2>
                </div>
                <div className='col-12 d-flex justify-content-center client_heading'>
                Your Satisfaction is Our Motto.
                </div>
            </div>
            <br />
            <br />


            
            <OwlCarousel className='owl-theme' loop margin={10} dots={false}   {...options}>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex flex-column'>

                                    <h2 className='font-weight-bold'>My All-Time Assignment Partner  </h2>
                                    <span>(Finance)</span>
                                </div>
                                <div className='star d-flex align-items-center'>
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    &nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My cousin recommended me Assignment Santa when I got stuck in the middle of Finance Assignments. I literally suck at quantitative subjects. But all thanks to Assignment Santa, who provided me a helping hand just 12 hours before my submission. Unbelievably, I scored 96/100 even in an assignment made in such rush. Big fan man! <RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={man1} alt="" />
                                            <p>- Satinder Kaur</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex d-flex flex-column mb-2'>

                                    <h2 className='font-weight-bold'>On-time Delivery and Best Content </h2>
                                    <span className='mb-2'>(Marketing)</span>
                                </div>
                                <div className='star d-flex align-items-center'>
                                           <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />&nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Keeping it short, best assignment service I have encountered till date. On-time delivery, that too with plagiarism report for our satisfaction. I have got A+ in my Marketing subject, and got 7-8 assignments made from Assignment Santa. They are really good at critical analysis, I must say.<RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={man2} alt="" />
                                            <p>- Michael Hanan</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex d-flex flex-column mb-2'>

                                    <h2 className='font-weight-bold'>Got Multiple Free Revisions with Ease </h2>
                                    <span className='mb-2'>(English)</span>
                                </div>
                                <div className='star d-flex align-items-center'>
                                           <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar  />&nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I was really satisfied with the content, but felt some issues with the structure. Got it revised within time with ease, that too for free. The rhetorical essay that you did for me got 98/100. Very Satisfied with service and the results. Keep going and keep helping students like us. .<RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={man3} alt="" />
                                            <p>- Kay Hussain</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex d-flex flex-column mb-2'>

                                    <h2 className='font-weight-bold'>Excellent Results at Nominal Prices </h2>
                                    <span className='mb-2'>(Business Management)</span>
                                </div>
                                <div className='star d-flex align-items-center'>
                                           <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />&nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sustaining in UK is not easy, especially when you are unaware of plagiarism and referencing styles. But Assignment Santa has really helped in keeping me stress free at least in studies part. Got 84 in my management dissertation. Very happy.<RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={man4} alt="" />
                                            <p>- Bohai Nay</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex d-flex flex-column mb-2'>

                                    <h2 className='font-weight-bold'>ecommended Service for Economics Assignments</h2>
                                    {/* <span className='mb-2'>(assignment)</span> */}
                                </div>
                                <div className='star d-flex align-items-center'>
                                           <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />&nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I got 2 assignments done from Assignment Santa for Economics subject. Both got 93.5 and 97 respectively. Recommending everyone this website since then.<RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={woman1} alt="" />
                                            <p>- Neha Saini</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
               

            </OwlCarousel>
            <br />
            <br />
            <OwlCarousel className='owl-theme slider-items owl-carousel' {...options} loop margin={10} dots={false} >
                <div class='item'>
                    <div className="row">
                        <div className="col">
                            <div className='d-flex justify-content-center'>
                                <div className='edit-testo w-85 p-4'>
                                    <div className='d-flex flex-column'>

                                        <h2 className='font-weight-bold mb-2 '>Excellent Last-Minute Help </h2>
                                        <span className='mb-2'> (Business Analytics Assignment)</span>
                                    </div>
                                    <div className='star d-flex align-items-center'>
                                        <AiFillStar className='set-start' />
                                        <AiFillStar className='set-start' />
                                        <AiFillStar className='set-start' />
                                        <AiFillStar />
                                        <AiFillStar />&nbsp;&nbsp;
                                        {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                    </div>
                                    <div className="star_contw">
                                        <p>
                                            <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I did not understand even a word of the instruction file, and did not have the time to learn because of hectic schedule of work-life in Canada. I reached out to Assignment Santa 1 day before submission, and scored 93/100. Highly Satisfied.<RiDoubleQuotesL className='qutes1' />
                                        </p>
                                        <div className="testoIcon">
                                            <div className="img-t d-flex">
                                                <img src={man5} alt="" />
                                                <p>- Rafael Notargiacomo</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex flex-column mb-2'>

                                    <h2 className='font-weight-bold'>Best Assignment Service at Pocket-Friendly Prices </h2>
                                    <span className='mb-2'>(Law)</span>
                                </div>
                                <div className='star d-flex align-items-center'>
                                           <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />&nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Twaade Karke Pass hogye Semester Ch. Keep it Up. Next Semester b tuc hi bcha lyo. God Bless You.<RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={man6} alt="" />
                                            <p>- Ramanjot Singh</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex flex-column mb-2'>

                                    <h2 className='font-weight-bold'>Remarkable Service and Best Results </h2>
                                    <span className='mb-2'>(Philosophy)</span>
                                </div>
                                <div className='star d-flex align-items-center'>
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                            
                                    &nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I got my all my Philosophy Assignments and Exams done from Assignment Santa, and scored an overall grade of A. I could not ask for more, very satisfied with the service. Those Kant and Aristotle principles were really going over my head. Thank you team!.<RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={woman2} alt="" />
                                            <p>- Mariya Roy</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex d-flex flex-column mb-2'>

                                    <h2 className='font-weight-bold'>Life- Saver for Me </h2>
                                    <span className='mb-2'>(Programming)</span>
                                </div>
                                <div className='star d-flex align-items-center'>
                                           <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />&nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Programming instructor was a real bully, and looked like he was intentionally failing people. You were a life- saver to me. Thank you team for saving me, otherwise would have failed twice in a row, and would have lost a chance to stay in Australia. I have got 80+ in almost all my Programming assignments. Trust me; it was dream for many in my class. Highly recommended  Assignment Service.<RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={man7} alt="" />
                                            <p>- Thomson Girard</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class='item'>
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <div className='edit-testo w-85 p-4'>
                                <div className='d-flex d-flex flex-column mb-2'>

                                    <h2 className='font-weight-bold'>Perfect Helping Hand for Students </h2>
                                    <span className='mb-2'>(Organization Behavior)</span>
                                </div>
                                <div className='star d-flex align-items-center'>
                                           <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />
                                    <AiFillStar className='set-start' />&nbsp;&nbsp;
                                    {/* <span className='start_date'>Aug,17th 2022 </span> */}
                                </div>
                                <div className="star_contw">
                                    <p>
                                        <RiDoubleQuotesL className='qutes' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Grades improved dramatically in assignments. I got 97.2 percent in my term paper worth 30 percent of total course. All thanks to Assignment Santa. You people are great. Plagiarism free content and on-time delivery. Just perfect!  Looking forward to get my exam done too.<RiDoubleQuotesL className='qutes1' />
                                    </p>
                                    <div className="testoIcon">
                                        <div className="img-t d-flex">
                                            <img src={man8} alt="" />
                                            <p>- Elvin, Mark</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
            </OwlCarousel>
        </>
    )
}
