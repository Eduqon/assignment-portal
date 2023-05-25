import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { apiUrl } from "../../services/contants";

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  let expertsList = [];

  useEffect(() => {
    _fetchExperts();
  }, []);

  async function _fetchExperts() {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.post(apiUrl + "/expert/fetch", config);
      let data = response.data.res;
      expertsList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          expertsList.push({
            id: data[index]._id,
            name: data[index].name,
            contact_no: data[index].contact_no,
            subject: data[index].subject,
          });
        }
      } else {
        console.log("No Experts");
      }
      setExperts(expertsList);
    } catch (err) {
      console.log(err);
    }
  }

  async function _calling(client_number) {
    try {
      const response = await axios.post(apiUrl + "/calling", {
        clientNumber: client_number,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Table variant="simple" size="md">
        <Thead bgColor={"gray.200"}>
          <Tr>
            <Th>Name</Th>
            <Th>Expert Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {experts.length === 0 ? (
            <></>
          ) : (
            experts.map((expert) => (
              <Tr key={expert.id}>
                <Td fontWeight={"semibold"}>{expert.name}</Td>
                <Td>
                  {expert.id.substring(0, 2) + "****" + "@" + "****" + ".com"}
                </Td>
                <Td>
                  <Button onClick={() => _calling(expert.contact_no)}>
                    Call
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default ExpertList;
