import React from 'react'
import { NavbarHome } from './navbar_home'
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
import home_image from '../../assets/home_bg.jpg';
import validator from 'validator';
import { ClientStore } from '../../services/stores/client_store';
import { AssignmentFormStore } from '../../services/stores/assignment_form_store';
import axios from 'axios';
import { apiUrl } from '../../services/contants';
import { useNavigate, useParams } from 'react-router-dom';
import home4 from '../../assets/home4.jpg';
import hom1 from '../../assets/hom1.jpg';
import three from '../../assets/three.jpg'
import imm from './imm.png'
import Slider from './sliders/Slider'
import AllhomePageForservie from './AllhomePageForservie';
import { FooterHome } from './footer_home';
import AutoFakePopup from './AutoFakePopup';
import {useLocation} from 'react-router-dom';
export default function NavService(props) {
    const location = useLocation();
    const [pages, setPages] = useState(0);

    const setEmail = ClientStore(state => state.setId);
    const setExistingUser = ClientStore(state => state.setExistingUser);

    const setSubject = AssignmentFormStore(state => state.setSubject);
    const setDeadline = AssignmentFormStore(state => state.setDeadline);
    const setStorePages = AssignmentFormStore(state => state.setPages);
    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        console.log(location,"state");
        let date = document.getElementById('date');
        date.min = new Date().toLocaleDateString('en-ca');
        date.value = new Date().toLocaleDateString('en-ca');
    })

    async function _submit() {
        let email = document.getElementById('email');
        let subject = document.getElementById('subject');
        let date = document.getElementById('date');
        let time = document.getElementById('time');
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
    useEffect(() => {
        console.log(id, "id")
        //  console.log(props.props.name , "prop data")
        console.log(props, "prop data")
    }, [])

    return (
        <>

            <AutoFakePopup />
            <NavbarHome />
            {/* form section */}
            <div className="contain position-relative">
            <div
                    className='bg-image  '
                // minH={'70vh'}
                // minW={'100%'}
                // align={'center'}
                // justify={'center'}
                // backgroundImage={
                //     three
                // }
                // sx={{ backdropBlur: "20px" }}
                // __css={{ backdropBlur: "20px" }}
                // backgroundSize={'cover'}
                // backgroundRepeat="no-repeat"
                // backgroundPosition={'center center'}
                ></div>
                    <div className="row w-100  set-pos-blur">
                        <div className="col-md-6 col-12 d-flex align-items-center flex-column justify-content-center">

                            <Box id="set-left" display={{ base: 'none', sm: 'block', md: 'block' }}><Slider /></Box>

                        </div>
                        <div className="col-md-6 col-12">

                            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
                                <Stack align={'center'}>
                                    <h1 className='top_class1'>
                                        {location.state}
                                    </h1 >
                                    <p className='top_class_sub'>
                                        Take help from best writing service !!
                                    </p>
                                </Stack>
                                <Box
                                    rounded={'lg'}
                                    bg={useColorModeValue('white', 'gray.700')}
                                    boxShadow={'lg'}
                                    p={8}>
                                    <Stack spacing={4}>
                                        <HStack>
                                            <Box>
                                                <FormControl id="email" isRequired>
                                                    <FormLabel>Email</FormLabel>
                                                    <Input type="email" onChange={async () => {
                                                        let email = document.getElementById('email');
                                                        setEmail(email.value);
                                                    }} />
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl id="subject" isRequired>
                                                    <FormLabel>Subject</FormLabel>
                                                    <Input type="text" />
                                                </FormControl>
                                            </Box>
                                        </HStack>
                                        <FormControl id="words">
                                            <FormLabel>No. of Words/Pages</FormLabel>
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
                                                <Input
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
                                        <FormControl id="deadline">
                                            <FormLabel>Deadline</FormLabel>
                                            <HStack>
                                                <Input type="date" id='date' />
                                                <Input type="time" id='time' />
                                            </HStack>
                                        </FormControl>
                                        <Stack spacing={10} pt={2}>
                                            <button className='btn btn-Set'
                                                onClick={() => { _submit(); }}
                                            >
                                                Submit
                                            </button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </div>
                    </div>
                
            </div>
            <div className="Mycontainer">
                <AllhomePageForservie />
            </div>
            <FooterHome className='w-100' />
        </>
    )
}
