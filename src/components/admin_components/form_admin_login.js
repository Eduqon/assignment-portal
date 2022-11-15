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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../../services/stores/user_store';
import validator from 'validator';
import { apiUrl } from '../../services/contants';
import axios from 'axios';

export const FormAdminLogin = () => {
    // const [pages, setPages] = useState(0);
    // const setEmail = ClientStore(state => state.setId);

    const setName = UserStore(state => state.setName);
    const setContactNo = UserStore(state => state.setContactNo);
    const setRole = UserStore(state => state.setRole);
    const setId = UserStore(state => state.setId);
    const id = UserStore(state => state.id);


    let navigate = useNavigate();

    async function _submit() {
        let password = document.getElementById('password');

        let emailVal = false;
        let passwordVal = false;

        if (validator.isEmail(id)) {
            emailVal = true;
        }
        else {
            window.alert("Enter Valid Email");
        }

        if (password.value !== null && password.value !== undefined && password.value == "") {
            window.alert("Enter Password");
        } else {
            passwordVal = true;
        }

        if (emailVal === true && passwordVal === true) {
            try {
                let userToken = localStorage.getItem('userToken');
                let config = {
                    headers: { "Authorization": `Bearer ${userToken}` },
                }
                const response = await axios.post(apiUrl + '/user/verify',
                    {
                        "_id": id,
                        "password": password.value
                    },
                    config
                )
                console.log(response.status);
                if (response.data.success === true) {
                    await setContactNo(response.data.user.contact_no);
                    await setRole(response.data.user.role);
                    await setName(response.data.user.name);
                    localStorage.setItem('userEmail', id);
                    localStorage.setItem('userRole', response.data.user.role);
                    localStorage.setItem('userName', response.data.user.name);
                    localStorage.setItem('userCommission', response.data.user.userCommission);
                    //localStorage.setItem('userChatToken', JSON.stringify(response.data.tokenObj));
                    navigate("/admin/portal");
                }
                else if (response.status == 203) {
                    localStorage.setItem("userToken", response.data.token);
                    userToken = response.data.token;

                    try {
                        let config = {
                            headers: { "Authorization": `Bearer ${userToken}` },
                        }
                        const response = await axios.post(apiUrl + '/user/verify',
                            {
                                "_id": id,
                                "password": password.value
                            },
                            config
                        )
                        console.log(response.data);
                        if (response.data.success === true) {
                            await setContactNo(response.data.user.contact_no);
                            await setRole(response.data.user.role);
                            await setName(response.data.user.name);
                            localStorage.setItem('userEmail', id);
                            localStorage.setItem('userRole', response.data.user.role);
                            localStorage.setItem('userName', response.data.user.name);
                            navigate("/admin/portal");
                        }
                    } catch (error) {
                        console.log(JSON.stringify(error.response.data));
                    }
                }
            }
            catch (err) {
                console.log(JSON.stringify(err));
            }
        }
    }

    return (
        <Flex
            minH={'80vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} minW={{ base: 'sm', md: 'md' }} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'3xl'} textAlign={'center'} color={'gray.800'}>
                        Admin Portal Login
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
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email"
                                        onChange={async () => {
                                            let email = document.getElementById('email');
                                            await setId(email.value);
                                        }}
                                    />
                                </FormControl>
                            </Box>
                            <Box width={'100%'}>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" />
                                </FormControl>
                            </Box>
                        </VStack>
                        <Button
                            onClick={() => { _submit(); }}
                            size="lg"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}