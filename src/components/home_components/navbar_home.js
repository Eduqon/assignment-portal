import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    HStack,
    Image,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';

import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    PhoneIcon,
} from '@chakra-ui/icons';
import { ClientStore } from '../../services/stores/client_store';
import validator from 'validator';
import axios from 'axios';
import { apiUrl } from '../../services/contants';
import { useNavigate } from 'react-router-dom';

import '../../MyCustom.css'
import MegaMenu from './MegaMenu';


// import Button from 'react-bootstrap/Button';
export function NavbarHome() {
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const email = ClientStore(state => state.id);
    const setEmail = ClientStore(state => state.setId);

    let navigate = useNavigate();

    function EmailModal() {
        return (
            <Modal
                onClose={onModalClose}
                isOpen={isModalOpen}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Email to continue</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="emailModalInput">
                            <Input type="email" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={async () => {
                            let email = document.getElementById('emailModalInput');
                            if (email.value === "") {
                                window.alert("Enter Email")
                            } else {
                                let clientToken = localStorage.getItem("clientToken");
                                let config = {
                                    headers: { "Authorization": `Bearer ${clientToken}` },
                                }
                                try {
                                    const response = await axios.post(apiUrl + '/client/verify',
                                        {
                                            "_id": email.value
                                        }, config
                                    )
                                    if (response.data.success === true) {
                                        setEmail(email.value);
                                        localStorage.setItem('clientEmail', email.value);
                                        navigate("/assignments");
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
                                                localStorage.setItem('clientEmail', email.value);
                                                navigate("/assignments");
                                            }
                                        } catch (error) {
                                            console.log('err');

                                        }
                                    }
                                }
                                catch (err) {
                                    window.alert(err.response.data['msg']);
                                }
                            }
                        }}>Proceed</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        );
    }

    return (
        <>
            <EmailModal />
            <div className="row  pt-3 m-0" >
                <div className="col-md-4 col-12 ">
                    

                </div>
                {/* <Box display={{ base: 'none', sm: 'block', md: 'block' }}> */}
                    <div className="col-md-8 col-12 d-flex justify-content-around flex-row align-items-center"  >
                        {/* <div className='  d-flex justify-content-between align-items-center  mr-4'> */}
                        {/* <HStack>
                            <PhoneIcon display={{ base: "none", md: 'flex' }} />
                            <Link href="tel:+919999999999"
                                fontWeight={'bold'}
                                fontSize={{ base: '0', md: "md" }}>
                                +91 7986021317
                            </Link>
                        </HStack> */}

                        <div className="labelss">
                            <button className='btn btn-mine '>Get 50% OFF On Your First Order</button>
                        </div>
                        <button id='clr'

                            onClick={async () => {
                                console.log(email);
                                if (validator.isEmail(email)) {
                                    try {
                                        const response = await axios.post(apiUrl + '/client/verify',
                                            {
                                                "client_id": email
                                            }
                                        )
                                        if (response.data.success === true) {
                                            navigate("/assignments");
                                        }
                                        else {
                                            window.alert(response.data['msg']);
                                        }
                                    }
                                    catch (err) {
                                        window.alert(err.response.data['msg']);
                                    }
                                } else {
                                    console.log("Email Modal");
                                    onModalOpen();
                                }
                            }}
                        >
                            Check Orders
                        </button>
                        {/* </div> */}

                    </div>
                {/* </Box> */}
            </div>
            <MegaMenu />

            {/* <Box>
                <EmailModal />
                <Flex
                    bg={useColorModeValue('white', 'gray.800')}
                    color={useColorModeValue('gray.600', 'white')}
                    minH={'60px'}
                    py={{ base: 2 }}
                    px={{ base: 1, md: 10 }}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                    align={'center'}>
                    <Image src={logo} w={20} />

                    <Stack
                        flex={{ base: 1, md: 1 }}
                        justify={'flex-end'}
                        direction={'row'}
                        align={'center'}
                        spacing={6}>
                        <HStack>
                            <PhoneIcon display={{ base: "none", md: 'flex' }} />
                            <Link href="tel:+919999999999"
                                fontWeight={'bold'}
                                fontSize={{ base: '0', md: "md" }}>
                                +91 999 999 9999
                            </Link>
                        </HStack>
                        <Button
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'gray.800'}
                            bg={'gray.200'}
                            onClick={async () => {
                                console.log(email);
                                if (validator.isEmail(email)) {
                                    try {
                                        const response = await axios.post(apiUrl + '/client/verify',
                                            {
                                                "client_id": email
                                            }
                                        )
                                        if (response.data.success === true) {
                                            navigate("/assignments");
                                        }
                                        else {
                                            window.alert(response.data['msg']);
                                        }
                                    }
                                    catch (err) {
                                        window.alert(err.response.data['msg']);
                                    }
                                } else {
                                    console.log("Email Modal");
                                    onModalOpen();
                                }
                            }}
                            _hover={{
                                bg: 'gray.400',
                                color: 'white',
                            }}>
                            Check Orders
                        </Button>
                    </Stack>
                </Flex> */}

            {/* <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse> */}
            {/* </Box> */}
        </>
    );
}

// const DesktopNav = () => {
//     const linkColor = useColorModeValue('gray.600', 'gray.200');
//     const linkHoverColor = useColorModeValue('gray.800', 'white');
//     const popoverContentBgColor = useColorModeValue('white', 'gray.800');

//     return (
//         <Stack direction={'row'} spacing={4}>
//             {NAV_ITEMS.map((navItem) => (
//                 <Box key={navItem.label}>
//                     <Popover trigger={'hover'} placement={'bottom-start'}>
//                         <PopoverTrigger>
//                             <Link
//                                 p={2}
//                                 href={navItem.href ?? '#'}
//                                 fontSize={'sm'}
//                                 fontWeight={500}
//                                 color={linkColor}
//                                 _hover={{
//                                     textDecoration: 'none',
//                                     color: linkHoverColor,
//                                 }}>
//                                 {navItem.label}
//                             </Link>
//                         </PopoverTrigger>

//                         {navItem.children && (
//                             <PopoverContent
//                                 border={0}
//                                 boxShadow={'xl'}
//                                 bg={popoverContentBgColor}
//                                 p={4}
//                                 rounded={'xl'}
//                                 minW={'sm'}>
//                                 <Stack>
//                                     {navItem.children.map((child) => (
//                                         <DesktopSubNav key={child.label} {...child} />
//                                     ))}
//                                 </Stack>
//                             </PopoverContent>
//                         )}
//                     </Popover>
//                 </Box>
//             ))}
//         </Stack>
//     );
// };

// const DesktopSubNav = ({ label, href, subLabel }) => {
//     return (
//         <Link
//             href={href}
//             role={'group'}
//             display={'block'}
//             p={2}
//             rounded={'md'}
//             _hover={{ bg: useColorModeValue('gray.100', 'gray.900') }}>
//             <Stack direction={'row'} align={'center'}>
//                 <Box>
//                     <Text
//                         transition={'all .3s ease'}
//                         _groupHover={{ color: 'black' }}
//                         fontWeight={500}>
//                         {label}
//                     </Text>
//                     <Text fontSize={'sm'}>{subLabel}</Text>
//                 </Box>
//                 <Flex
//                     transition={'all .3s ease'}
//                     transform={'translateX(-10px)'}
//                     opacity={0}
//                     _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//                     justify={'flex-end'}
//                     align={'center'}
//                     flex={1}>
//                     <Icon color={'black'} w={5} h={5} as={ChevronRightIcon} />
//                 </Flex>
//             </Stack>
//         </Link>
//     );
// };

// const MobileNav = () => {
//     return (
//         <Stack
//             bg={useColorModeValue('white', 'gray.800')}
//             p={4}
//             display={{ md: 'none' }}>
//             {NAV_ITEMS.map((navItem) => (
//                 <MobileNavItem key={navItem.label} {...navItem} />
//             ))}
//         </Stack>
//     );
// };

// const MobileNavItem = ({ label, children, href }) => {
//     const { isOpen, onToggle } = useDisclosure();

//     return (
//         <Stack spacing={4} onClick={children && onToggle}>
//             <Flex
//                 py={2}
//                 as={Link}
//                 href={href ?? '#'}
//                 justify={'space-between'}
//                 align={'center'}
//                 _hover={{
//                     textDecoration: 'none',
//                 }}>
//                 <Text
//                     fontWeight={600}
//                     color={useColorModeValue('gray.600', 'gray.200')}>
//                     {label}
//                 </Text>
//                 {children && (
//                     <Icon
//                         as={ChevronDownIcon}
//                         transition={'all .25s ease-in-out'}
//                         transform={isOpen ? 'rotate(180deg)' : ''}
//                         w={6}
//                         h={6}
//                     />
//                 )}
//             </Flex>

//             <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
//                 <Stack
//                     mt={2}
//                     pl={4}
//                     borderLeft={1}
//                     borderStyle={'solid'}
//                     borderColor={useColorModeValue('gray.200', 'gray.700')}
//                     align={'start'}>
//                     {children &&
//                         children.map((child) => (
//                             <Link key={child.label} py={2} href={child.href}>
//                                 {child.label}
//                             </Link>
//                         ))}
//                 </Stack>
//             </Collapse>
//         </Stack>
//     );
// };

// const NAV_ITEMS = [
//     // {
//     //     label: 'Example 1',
//     //     children: [
//     //         {
//     //             label: 'Example 1_1',
//     //             subLabel: "Lorem Ipsum is simply dummy text of the printing....",
//     //             href: '#',
//     //         },
//     //         {
//     //             label: 'Example 1_2',
//     //             subLabel: 'Lorem Ipsum is simply dummy text of the printing....',
//     //             href: '#',
//     //         },
//     //     ],
//     // },
//     // {
//     //     label: 'Example 2',
//     //     children: [
//     //         {
//     //             label: 'Example 2_1',
//     //             subLabel: "Lorem Ipsum is simply dummy text of the printing....",
//     //             href: '#',
//     //         },
//     //         {
//     //             label: 'Example 2_2',
//     //             subLabel: 'Lorem Ipsum is simply dummy text of the printing....',
//     //             href: '#',
//     //         },
//     //     ],
//     // },
// ];