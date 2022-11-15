import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Select
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { apiUrl } from '../../services/contants';
import axios from 'axios';
// Newuser show on mobile 
const NewUSe = () => {
    document.getElementsById('hhh')[0].style.display = 'block';
    console.log(this.getElementById('hhh'));
}
// end
export const NewUser = () => {
    const [subjects, setSubjects] = useState([]);
    let navigate = useNavigate();

    async function _fetchSubjects() {
        try {
            const response = await axios.get(apiUrl + '/util/subject/fetch');
            let data = await response.data.res;
            let tempList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    tempList.push({
                        _id: data[index]._id
                    });
                }
            }
            else {
                console.log("No Subjects Found");
            }
            setSubjects(tempList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {
            _fetchSubjects();
        }, []);

    return (
        <>
            <div className='NewUsershow' className='ShowSideClick'  >
                <Flex 
                    alignItems={'flex-start'}
                    minH={'80vh'}
                    align={'center'}
                    justify={'center'}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={{ base: 'sm', md: 'md' }} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'3xl'} textAlign={'center'} color={'gray.800'}>
                                Add New User
                            </Heading>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={6}>
                                <VStack>
                                    <Box width={'100%'}>
                                        <FormControl id="nameUser" isRequired>
                                            <FormLabel>Name</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="emailUser" isRequired>
                                            <FormLabel>Email</FormLabel>
                                            <Input type="email" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="passwordUser" isRequired>
                                            <FormLabel>Password</FormLabel>
                                            <Input type="password" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="countryUser" isRequired>
                                            <FormLabel>Country</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="countrycodeUser" isRequired>
                                            <FormLabel>Country Code</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="contactUser" isRequired>
                                            <FormLabel>Contact Number</FormLabel>
                                            <Input maxLength={10} type="tel" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl isRequired>
                                            <FormLabel>Role</FormLabel>
                                            <Select id='roleUser'>
                                                <option value='Admin'>Admin</option>
                                                <option value='Operator'>Operator</option>
                                                <option value='Sales'>Sales</option>
                                                <option value='QC'>QC</option>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </VStack>
                                <Button
                                    onClick={async () => {
                                        let name = document.getElementById('nameUser');
                                        let email = document.getElementById('emailUser');
                                        let password = document.getElementById('passwordUser');
                                        let country = document.getElementById('countryUser');
                                        let countrycode = document.getElementById('countrycodeUser');
                                        let contact = document.getElementById('contactUser');
                                        let role = document.getElementById('roleUser');

                                        if (
                                            name.value === '' ||
                                            email.value === '' ||
                                            password.value === '' ||
                                            country.value === '' ||
                                            countrycode.value === '' ||
                                            contact.value === '' ||
                                            role.value === ''
                                        ) {
                                            window.alert('Fill All Details');
                                        }
                                        else {
                                            try {
                                                const responseUser = await axios.post(apiUrl + '/user/signup',
                                                    {
                                                        "_id": email.value,
                                                        "password": password.value,
                                                        "name": name.value,
                                                        "contact_no": contact.value,
                                                        "role": role.value,
                                                        "country": country.value,
                                                        "countryCode": countrycode.value,
                                                    }
                                                )
                                                if (responseUser.data.success) {
                                                    window.alert(responseUser.data.msg);
                                                    name.value = ''
                                                    email.value = ''
                                                    password.value = ''
                                                    country.value = ''
                                                    countrycode.value = ''
                                                    contact.value = ''
                                                    role.value = ''
                                                }
                                            } catch (error) {
                                                window.alert('User Signup Failed')
                                            }
                                        }
                                    }}
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Add User
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={{ base: 'sm', md: 'md' }} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'3xl'} textAlign={'center'} color={'gray.800'}>
                                Add New Vendor
                            </Heading>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={6}>
                                <VStack>
                                    <Box width={'100%'}>
                                        <FormControl id="nameVendor" isRequired>
                                            <FormLabel>Name</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="emailVendor" isRequired>
                                            <FormLabel>Email</FormLabel>
                                            <Input type="email" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="passwordVendor" isRequired>
                                            <FormLabel>Password</FormLabel>
                                            <Input type="password" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="countryVendor" isRequired>
                                            <FormLabel>Country</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="countrycodeVendor" isRequired>
                                            <FormLabel>Country Code</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="contactVendor" isRequired>
                                            <FormLabel>Contact Number</FormLabel>
                                            <Input maxLength={10} type="tel" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="codeVendor" isRequired>
                                            <FormLabel>Vendor Referral Code</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="commissionVendor" isRequired>
                                            <FormLabel>Vendor Commission</FormLabel>
                                            <Input type="number" />
                                        </FormControl>
                                    </Box>
                                </VStack>
                                <Button
                                    onClick={async () => {
                                        let name = document.getElementById('nameVendor');
                                        let email = document.getElementById('emailVendor');
                                        let password = document.getElementById('passwordVendor');
                                        let country = document.getElementById('countryVendor');
                                        let countrycode = document.getElementById('countrycodeVendor');
                                        let contact = document.getElementById('contactVendor');
                                        let role = 'Vendor';
                                        let code = document.getElementById('codeVendor');
                                        let commission = document.getElementById('commissionVendor');

                                        if (
                                            name.value === '' ||
                                            email.value === '' ||
                                            password.value === '' ||
                                            country.value === '' ||
                                            countrycode.value === '' ||
                                            contact.value === '' ||
                                            code.value === '' ||
                                            commission.value === ''
                                        ) {
                                            window.alert('Fill All Details');
                                        }
                                        else {
                                            try {
                                                const responseUser = await axios.post(apiUrl + '/user/signup',
                                                    {
                                                        "_id": email.value,
                                                        "password": password.value,
                                                        "name": name.value,
                                                        "contact_no": contact.value,
                                                        "role": role,
                                                        "country": country.value,
                                                        "countryCode": countrycode.value,
                                                        "referralCode": code.value,
                                                        "userCommission": commission.value
                                                    }
                                                )
                                                if (responseUser.data.success) {
                                                    window.alert(responseUser.data.msg);
                                                    name.value = ''
                                                    email.value = ''
                                                    password.value = ''
                                                    country.value = ''
                                                    countrycode.value = ''
                                                    contact.value = ''
                                                    role.value = ''
                                                    code.value = ''
                                                    commission.value = ''
                                                }
                                            } catch (error) {
                                                window.alert('User Signup Failed')
                                            }
                                        }
                                    }}
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Add User
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={{ base: 'sm', md: 'md' }} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'3xl'} textAlign={'center'} color={'gray.800'}>
                                Add New Expert
                            </Heading>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack spacing={6}>
                                <VStack>
                                    <Box width={'100%'}>
                                        <FormControl isRequired>
                                            <FormLabel>Subject</FormLabel>
                                            <Select id='subjectExpert'>
                                                {
                                                    (subjects.length === 0) ? <></> : subjects.map((subject, index) => <option value={subject._id} key={index}>{subject._id}</option>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="nameExpert" isRequired>
                                            <FormLabel>Name</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="emailExpert" isRequired>
                                            <FormLabel>Email</FormLabel>
                                            <Input type="email" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="countryExpert" isRequired>
                                            <FormLabel>Country</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="countrycodeExpert" isRequired>
                                            <FormLabel>Country Code</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </Box>
                                    <Box width={'100%'}>
                                        <FormControl id="contactExpert" isRequired>
                                            <FormLabel>Contact Number</FormLabel>
                                            <Input maxLength={10} type="tel" />
                                        </FormControl>
                                    </Box>
                                </VStack>
                                <Button
                                    onClick={async () => {
                                        let name = document.getElementById('nameExpert');
                                        let email = document.getElementById('emailExpert');
                                        let country = document.getElementById('countryExpert');
                                        let countrycode = document.getElementById('countrycodeExpert');
                                        let contact = document.getElementById('contactExpert');
                                        let subject = document.getElementById('subjectExpert');
                                        if (
                                            name.value === '' ||
                                            email.value === '' ||
                                            country.value === '' ||
                                            countrycode.value === '' ||
                                            contact.value === '' ||
                                            subject.value === ''
                                        ) {
                                            window.alert('Fill All Details');
                                        }
                                        else {
                                            try {
                                                const responseExpert = await axios.post(apiUrl + '/expert/signup',
                                                    {
                                                        "_id": email.value,
                                                        "name": name.value,
                                                        "subject": subject.value,
                                                        "contact_no": contact.value,
                                                        "country": country.value,
                                                        "countryCode": countrycode.value,
                                                    }
                                                )
                                                if (responseExpert.data.success) {
                                                    window.alert(responseExpert.data.msg);
                                                    name.value = ''
                                                    email.value = ''
                                                    country.value = ''
                                                    countrycode.value = ''
                                                    contact.value = ''
                                                    subject.value = ''
                                                }
                                            } catch (error) {
                                                window.alert('Expert Signup Failed')
                                            }
                                        }
                                    }}
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Add Expert
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </div>
        </>
    );
}
export { NewUSe };