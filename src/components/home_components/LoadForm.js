import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputLeftElement,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import validator from 'validator';
import { ClientStore } from '../../services/stores/client_store';
import { AssignmentFormStore } from '../../services/stores/assignment_form_store';
import axios from 'axios';
import { apiUrl } from '../../services/contants';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
export default function LoadForm() {
    const [pages, setPages] = useState(0);

    const setEmail = ClientStore(state => state.setId);
    const setExistingUser = ClientStore(state => state.setExistingUser);

    const setSubject = AssignmentFormStore(state => state.setSubject);
    const setDeadline = AssignmentFormStore(state => state.setDeadline);
    const setStorePages = AssignmentFormStore(state => state.setPages);

    let navigate = useNavigate();

    useEffect(() => {
        let date = document.getElementById('dateNew');
        date.min = new Date().toLocaleDateString('en-ca');
        date.value = new Date().toLocaleDateString('en-ca');
    })

    async function _submit() {
        let email = document.getElementById('emailNew');
        let subject = document.getElementById('subjectNew');
        let date = document.getElementById('dateNew');
        let time = document.getElementById('timeNew');
        let clientToken = localStorage.getItem("clientToken");

        let emailVal = false;
        let subjectVal = false;
        let pagesVal = false;
        let deadlineVal = false;

        if (validator.isEmail(email.value)) {
            await setEmail(email.value);
            emailVal = true;
        }
        else {
            window.alert('Enter Valid Email');
            emailVal = false;
        }

        if (subject.value == "") {
            window.alert("Enter a Subject");
            subjectVal = false;
        }
        else {
            await setSubject(subject.value);
            subjectVal = true;
        }

        if (pages == 0) {
            window.alert('Specify No. Of Pages');
            pagesVal = false;
        } else {
            await setStorePages(pages);
            pagesVal = true;
        }

        if (time.value == "") {
            window.alert("Select Deadline Time");
            deadlineVal = false;
        }
        else {
            let splitDate = await date.value.split("-");
            let year = splitDate[0];
            let month = splitDate[1];
            let day = splitDate[2];

            let splitTime = await time.value.split(":");
            let hour = splitTime[0];
            let min = splitTime[1];
            let deadline = new Date(year, month - 1, day, hour, min, 0);
            await setDeadline(deadline.toISOString());
            deadlineVal = true;
        }

        if (emailVal === true && subjectVal === true && pagesVal === true && deadlineVal === true) {
            try {
                let config = {
                    headers: { "Authorization": `Bearer ${clientToken}` },
                }
                const response = await axios.post(apiUrl + '/client/verify',
                    {
                        "_id": email.value
                    },
                    config
                )
                if (response.data.success === true) {
                    await setExistingUser(true);
                    localStorage.setItem('clientEmail', email.value);
                    navigate("/order_details");
                }
                else if (response.status == 203) {
                    localStorage.setItem("clientToken", response.data.token);
                    clientToken = response.data.token;

                    try {
                        let config = {
                            headers: { "Authorization": `Bearer ${clientToken}` },
                        }
                        const response = await axios.post(apiUrl + '/client/verify',
                            {
                                "_id": email.value
                            },
                            config
                        )
                        if (response.data.success === true) {
                            await setExistingUser(true);
                            localStorage.setItem('clientEmail', email.value);
                            navigate("/order_details");
                        }
                    } catch (error) {
                        if (error.response.status == 401) {
                            await setExistingUser(false);
                            navigate("/order_details");
                        }
                        else {
                            window.alert(error.response.message);
                        }
                    }
                }
            } catch (error) {
                if (error.response.status == 401) {
                    await setExistingUser(false);
                    navigate("/order_details");
                }
                else {
                    window.alert(error.response.message);
                }
            }
        }
    }
    // form show
    const [navbar, setnavbar] = useState(false);
    const ShowNav = () => {
        // console.log(window.scrollY);
        if (window.scrollY >= 600) {
            setnavbar(true)
        } else {
            setnavbar(false)

        }
    }
    window.addEventListener('scroll', ShowNav)
    return (
        <>
            <Box display={{ base: "none", sm: "block", md: "block" }}>


                <div className={navbar ? 'activee' : 'non-active'} >


                    <div className="row w-100 set-form m-0">

                        <div className="col-md-12 col-12">

                            <div className="row">
                                <div className="col-12 text-center pt-1 pb-1">
                                    Securing Higher Grades Costing Your Pocket? Book Your Assignment at The Lowest Price Now!
                                </div>
                            </div>

                            <div className='row set-dis'>
                                <div className='col-2 '>
                                    <img src={logo} alt="" className='set_width1' />


                                </div>
                                <div className='col-2'>
                                    {/* <label>Email</label> */}
                                    {/* <FormLabel>Email</FormLabel> */}
                                    <input className='form-control shadow-none add_border' placeholder='Email' required id="emailNew" type="email" onChange={async () => {
                                        let email = document.getElementById('emailNew');
                                        setEmail(email.value);
                                    }} />
                                </div>
                                <div className='col-2'>

                                    {/* <label>Subject</label> */}
                                    {/* <FormLabel>Subject</FormLabel> */}
                                    <input type="text" placeholder='Subject' className='form-control  shadow-none add_border' id="subjectNew" required />
                                </div>
                                <div className='col-3'>
                                    <FormControl id="words">
                                        {/* <FormLabel>No. of Words/Pages</FormLabel> */}
                                        <InputGroup>
                                            <InputLeftElement h={'full'}>
                                                <Button
                                                    variant={'outline'}
                                                    onClick={() => {
                                                        if (pages <= 0) {
                                                            console.log("Already zero")
                                                        }
                                                        else {
                                                            setPages(pages - 1);
                                                        }
                                                    }}>
                                                    <MinusIcon />
                                                </Button>
                                            </InputLeftElement>
                                            <Input className='add_border'
                                                type="text"
                                                value={"   " + pages + " Pages/" + (250 * pages) + " Words"}
                                                contentEditable={false}
                                                onChange={() => console.log(pages)}
                                            />
                                            <InputRightElement h={'full'}>
                                                <Button
                                                    variant={'outline'}
                                                    onClick={() => {
                                                        setPages(pages + 1);
                                                    }}>
                                                    <AddIcon />
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </div>
                                <div className='col-2'>
                                    <FormControl id="deadline">
                                        {/* <FormLabel>Deadline</FormLabel> */}
                                        {/* <HStack> */}
                                        {/* <Input  type="date" id='dateNew'  className='mr-3 add_border'/>
                                            <Input type="time" id='timeNew'  className='add_border'/> */}
                                        <div className="d-flex justify-content-center align-itmes-center">

                                            <input type="date" id='dateNew' className='w-50 mr-3 form-control add_border' />
                                            <input type="time" id='timeNew' className='w-50 form-control add_border' />
                                        </div>
                                        {/* </HStack> */}
                                    </FormControl>
                                </div>
                                <div className='col-1 d-flex justify-content-center align-items-center'>

                                    <button className='btn  set_btn'
                                        onClick={() => { _submit(); }}
                                    >
                                        Submit
                                    </button>

                                </div>



                            </div>
                        </div>
                    </div>


                </div>
            </Box>
        </>
    )
}
