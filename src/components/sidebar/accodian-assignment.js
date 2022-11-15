import React from 'react'
// import Assignments from './Assignments'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const clickk = () =>{
    document.getElementsByClassName('clickShow')[0].style.display='block';
}
function Assignmentsmob() {
    return (

        <>
            <Accordion id='assin-taget' className='clickShow' defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                ID : AAL290222
                                
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {/* table start  */}
                        <TableContainer>
                            <Table >
                                <TableCaption>Student Data</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>STUDENT EMAIL</Th>
                                        <Th>rushil.rai999@gmail.com</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Th>Subject</Th>
                                        <Th>English</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>ORDER QUOTE	</Th>
                                        <Th>1000</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>AMOUNT PAID</Th>
                                        <Th>500</Th>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>CP1 PAYMENT ID	</Th>
                                        <Th>plink_JCvF626TpfEwU3</Th>

                                    </Tr>
                                    <Tr>
                                        <Th>CP2 PAYMENT ID</Th>
                                        <Th> BLANK</Th>

                                    </Tr>
                                    <Tr>
                                        <button className='new-assign'> + New Assignment</button>

                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                        {/* table end */}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                            ID : CPE310222
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {/* table start  */}
                        <TableContainer>
                            <Table >
                                <TableCaption>Student Data</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>STUDENT EMAIL</Th>
                                        <Th>aroraharshdeep27@gmail.com</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Th>Subject</Th>
                                        <Th>English</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>ORDER QUOTE	</Th>
                                        <Th>1200</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>AMOUNT PAID</Th>
                                        <Th>1200</Th>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>CP1 PAYMENT ID	</Th>
                                        <Th>plink_JDinHZdFANLJKn</Th>

                                    </Tr>
                                    <Tr>
                                        <Th>CP2 PAYMENT ID</Th>
                                        <Th> plink_JDjUpUQnAMoPvU</Th>

                                    </Tr>
                                    <Tr>
                                        <button className='new-assign'> + New Assignment</button>

                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                        {/* table end */}
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                            ID : DEK310222
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {/* table start  */}
                        <TableContainer>
                            <Table >
                                <TableCaption>Student Data</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>STUDENT EMAIL</Th>
                                        <Th>rushil.rai999@gmail.com</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Th>Subject</Th>
                                        <Th>English</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>ORDER QUOTE	</Th>
                                        <Th>1500</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>AMOUNT PAID</Th>
                                        <Th>750</Th>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>CP1 PAYMENT ID	</Th>
                                        <Th>plink_JDjGLaizmGHi7K</Th>

                                    </Tr>
                                    <Tr>
                                        <Th>CP2 PAYMENT ID</Th>
                                        <Th> BLANK</Th>

                                    </Tr>
                                    <Tr>
                                        <button className='new-assign'> + New Assignment</button>

                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                        {/* table end */}
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                            ID : JQX310222
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {/* table start  */}
                        <TableContainer>
                            <Table >
                                <TableCaption>Student Data</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>STUDENT EMAIL</Th>
                                        <Th>rushil.rai999@gmail.com</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Th>Subject</Th>
                                        <Th>English</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>ORDER QUOTE	</Th>
                                        <Th>1000</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>AMOUNT PAID</Th>
                                        <Th>1000</Th>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>CP1 PAYMENT ID	</Th>
                                        <Th>plink_JDjczJWZKO9AJu</Th>

                                    </Tr>
                                    <Tr>
                                        <Th>CP2 PAYMENT ID</Th>
                                        <Th> plink_JDkPyya8YxoZUB</Th>

                                    </Tr>
                                    <Tr>
                                        <button className='new-assign'> + New Assignment</button>

                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                        {/* table end */}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion></>
    )
}

export default Assignmentsmob;
export {clickk};
