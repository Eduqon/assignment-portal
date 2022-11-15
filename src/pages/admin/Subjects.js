import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    VStack,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    IconButton,
    useDisclosure,
    Modal,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalHeader,
    Text
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from 'react-router-dom';
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
// assignment show on mobile 
const SubjectShow = () => {
    // document.getElementsByClassName('SubjectShow')[0].style.display = 'block';
    console.log(document.getElementsByClassName('SubjectShow')[0])
    console.log("hello");
}
// end
function Subjects() {
    const [subjects, setSubjects] = useState([]);

    let subjectList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchSubjects();
        }, []);

    async function _fetchSubjects() {
        try {
            let userToken = localStorage.getItem("userToken");
            if (userToken == null) {
                navigate("/admin/login");
            }

            const response = await axios.get(apiUrl + '/util/subject/fetch');
            let data = response.data.res;
            subjectList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    subjectList.push({
                        _id: data[index]._id,
                    });
                }
            }
            else {
                console.log("No Subjects");
            }
            setSubjects(subjectList);
        } catch (err) {
            console.log(err);
        }
    }

    async function _addSubject() {
        let subject = document.getElementById('subject');
        if (subject.value === '') {
            window.alert('Enter a subject name');
        } else {
            try {
                const response = await axios.post(apiUrl + '/util/subject/new',
                    {
                        "_id": subject.value,
                    }
                )
                if (response.data.success) {
                    await _fetchSubjects();
                    subject.value = '';
                }
            } catch (error) {

            }
        }
    }

    async function _deleteSubject(id) {
        try {
            const response = await axios.get(apiUrl + '/util/subject/delete?_id=' + id);
            if (response.data.success) {
                await _fetchSubjects();
                onModalClose();
                setSelectedId('');
            }
        } catch (error) {

        }
    }

    const [selectedId, setSelectedId] = useState('');

    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose
    } = useDisclosure();

    function DeleteModal() {
        return (
            <Modal
                onClose={onModalClose}
                isOpen={isModalOpen}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedId}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor={'red'} color={'white'} onClick={async () => _deleteSubject(selectedId)}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        );
    }

    return (
        <>
            <DeleteModal />
            <div className='SubjectShow ShowSideClick'>
                <VStack>
                    <Box width={'100%'}>
                        <FormControl id="subject">
                            <FormLabel>Add New Subject</FormLabel>
                            <InputGroup>
                                <Input type="text" />
                                <InputRightElement padding={'5px'}>
                                    <IconButton
                                        icon={<AddIcon />}
                                        onClick={() => _addSubject()}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </Box>
                    <Table variant='simple' size="md">
                        <Thead bgColor={'gray.200'}>
                            <Tr>
                                <Th>Name</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {subjects.map(
                                subject => <Tr key={subject._id}>
                                    <Td fontWeight={'bold'}>{subject._id}</Td>
                                    <Td>
                                        <IconButton
                                            icon={<DeleteIcon />}
                                            onClick={() => { setSelectedId(subject._id); onModalOpen(); }} />
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </VStack>
            </div>
        </>
    );
}

export default Subjects;
export { SubjectShow };