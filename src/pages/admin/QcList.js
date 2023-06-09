import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { apiUrl } from "../../services/contants";

function QcList() {
  const [qcs, setQcs] = useState([]);
  let qcList = [];

  useEffect(() => {
    _fetchQcs();
  }, []);

  async function _fetchQcs() {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.post(
        apiUrl + "/user/fetch",
        {
          role: "QC",
        },
        config
      );
      let data = response.data.res;
      qcList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          qcList.push({
            id: data[index]._id,
            name: data[index].name,
            contact_no: data[index].contact_no,
          });
        }
      } else {
        console.log("No QC");
      }
      setQcs(qcList);
    } catch (err) {
      console.log(err);
    }
  }

  async function _calling(client_number) {
    try {
      const response = await axios.post(apiUrl + "/calling", {
        clientNumber: String(client_number),
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
          {qcs.length === 0 ? (
            <></>
          ) : (
            qcs.map((qc) => (
              <Tr key={qc.id}>
                <Td fontWeight={"semibold"}>{qc.name}</Td>
                <Td>
                  {qc.id.substring(0, 2) + "****" + "@" + "****" + ".com"}
                </Td>
                <Td>
                  <Button onClick={() => _calling(qc.contact_no)}>Call</Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
}

export default QcList;
