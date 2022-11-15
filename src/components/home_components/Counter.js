import React from 'react'
import { useEffect } from 'react'
import {
    Box
} from '@chakra-ui/react';
import { useState } from 'react'
import CountUp from 'react-countup';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { useCountUp } from 'react-countup';
import educon from './img/educon.mp4'
export default function Counter() {

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
            <div className="Mycont m-0">
                <Box display={{ base: 'block', md: 'none', sm: 'none' }}>

                    <div className="row">
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
                    <div className='col-12 d-flex justify-content-center client_heading text-center font-weight-normal'>
                        Take Help From Best Assignment Writing Service<br />Across The World
                    </div>
                </div>
                <br />
                <br />
                <div className="row p-0 m-0">
                    <div className="col-md-4 col-12">
                        <div className='boxx'>
                            <div className='counter_'>

                                {(counterTrue) ?
                                    <CountUp start={0} end={248973} delay={0}>

                                        {({ countUpRef }) => (
                                            <>
                                                <div className="d-flex flex-column justify-content-center ">

                                                    <div className='d-flex justify-content-center'>
                                                        <span ref={countUpRef} />+
                                                    </div>
                                                    <div className='Fs-3'>
                                                        Assignment
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
                                    <CountUp start={0} end={4500} delay={0}>
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
                                    <CountUp start={0} end={150} delay={0}>
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

        </>
    )
}
