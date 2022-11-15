import { RepeatIcon } from "@chakra-ui/icons";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Link
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from 'react-router-dom';

function VendorOrders() {
    const [assignments, setAssignments] = useState([]);

    let assignmentList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchAssignments();
        }, []);

    async function _fetchAssignments() {
        try {
            let userToken = localStorage.getItem("userToken");
            let userEmail = localStorage.getItem("userEmail");
            if (userToken == null) {
                navigate("/admin/login");
            }

            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.get(apiUrl + '/assignment/fetch?vendorId=' + userEmail, config);
            let data = response.data.assignmentData;
            assignmentList = [];
            console.log("fetching");
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    assignmentList.push({
                        id: data[index]._id,
                        client_id: data[index].client_id,
                        assignedQC: data[index].assignedQC,
                        subject: data[index].subject,
                        status: data[index].status,
                        quotation: data[index].quotation,
                        currencyOfQuote: data[index].currencyOfQuote,
                        level: data[index].level,
                        reference: data[index].reference,
                        description: data[index].description,
                        descriptionFile: data[index].descriptionFile,
                        numOfPages: data[index].numOfPages,
                        paid: data[index].paid,
                        deadline: new Date(data[index].deadline).toLocaleTimeString() + ", " + new Date(data[index].deadline).toDateString(),
                        expertDeadline: new Date(data[index].expertDeadline).toLocaleTimeString() + ", " + new Date(data[index].expertDeadline).toDateString()
                    });
                }
            }
            else {
                window.alert("No Orders");
            }
            setAssignments(assignmentList);
            console.log(assignments);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Table variant='simple' size="md">
                <Thead bgColor={'gray.200'}>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Student Email</Th>
                        <Th>Subject</Th>
                        <Th>Order Quote</Th>
                        <Th>Commission</Th>
                        <Th>Deadline</Th>
                        <Th>
                            <Button leftIcon={<RepeatIcon />} onClick={async () => {
                                await _fetchAssignments();
                            }}>
                                Refresh
                            </Button>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {assignments.map(
                        assignment => <Tr key={assignment.id}>
                            <Td fontWeight={'semibold'}>{assignment.id}</Td>
                            <Td>{assignment.client_id}</Td>
                            <Td color={'green.600'} fontWeight={'semibold'}>{assignment.subject}</Td>
                            <Td>{assignment.quotation}</Td>
                            <Td>{parseInt(assignment.quotation) * localStorage.getItem('userCommission') / 100}</Td>
                            <Td color={'red.600'} fontWeight={'semibold'}>{assignment.deadline}</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </>
    );
}

export default VendorOrders;