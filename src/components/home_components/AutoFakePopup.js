import React, { useState, useEffect } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';
import { Box } from '@chakra-ui/react'
export default function AutoFakePopup() {

    const [showw, setShoww] = useState(false);

    const handleClose = () => setShoww(false);
    const handleShow = () => setShoww(true);
    // useEffect(() => {

    const [update, setupdate] = useState(0)

    // }, [0])
    const pop = useRef();
    const [id, setid] = useState(100);
    const [days, setdays] = useState("")
    const [output, setoutput] = useState("")
    // useEffect(() => {
        // const date = new Date();
        // const birthday = new Date('august 30, 2022 4:00:00');
        // const time = Math.abs(date - birthday);
        // console.log(time)
        // setdays(Math.ceil(time / 1000))
        // const num = ((days))
        // setoutput(days);
        
        // console.log(days);
    // }, [days])
    const popUp = () => {
        // sat()=>{
        // }

        // console.log(birthday.toDateString())
        // console.log(date.toDateString())

        // console.log(date.getHours() )
        // console.log(myDate.getHours() )
        setTimeout(() => {
            pop.current.classList.remove('popHide')
            pop.current.classList.add('popShow')
            // handleShow();
            // setupdate(update + 1);
            // if(date.getSeconds() === 1){
            // }else{
            // setid(output)
            setid(Math.floor(Math.random() * 248999 ))
            // }
            // setid((id) => parseInt(id) + num);
            // console.log(number);

            // setid(Math.floor(Math.random() * 50 + 1450));
            // console.log(date.getSeconds())
            // console.log('show')
            setTimeout(() => {

                // setupdate(update + 1);
                // handleClose();
                pop.current.classList.remove('popShow')
                pop.current.classList.add('popHide')
                popUp();
            }, 8000)
        }, 5000);
    }
    // window.addEventListener('popUp' ,sat)
    useEffect(() => {
        // console.log("started");
        popUp();

    }, [0])
    // useEffect(() => {
    //     setid(Math.floor((Math.random() * 99999) + 1))
    // }, [update])

    // const popUp = () => {
    //     if (window.scrollY >= 1) {
    //         pop.current.classList.add('popShow')
    //         pop.current.classList.remove('popHide')

    //     } else {
    //         pop.current.classList.remove('popShow')
    //         pop.current.classList.add('popHide')

    //     }
    // }
    // window.addEventListener('scroll', popUp)

    return (
        <>


            <Box display={{ base: 'none', sm: 'block', md: 'block' }}>
                <div className="row d-none">
                    <div className="col">
                        <div ref={pop} className='popHide' >
                            {/* <Modal  show={showw} onHide={handleClose} id="setw"> */}
                            <div className="pop_box ">
                                <div className="row d-flex jussitify-content-center align-items-cente p-2">
                                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                                        <IoIosCheckmarkCircle className='set_icon' />

                                    </div>
                                    <div className="col-md-9 set-custom-pad">
                                        <div className='set_pop_text'>
                                            <p><b className='mb-3 set_orer'>Order Delivered</b> </p>
                                            <p className='set_pop_text pr-2'>Assignment for User ID <b>{id}</b> has been successfully delivered </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </Modal> */}
                    </div>
                </div>
            </Box>
        </>
    )
}
