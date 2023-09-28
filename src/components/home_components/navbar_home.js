import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Divider,
  Text,
  Box,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { ClientStore } from "../../services/stores/client_store";
import validator from "validator";
import axios from "axios";
import { apiUrl } from "../../services/contants";
import MegaMenu from "./MegaMenu";
import Header from "./Header";
import { useState } from "react";

export function NavbarHome({ services }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setEmail = ClientStore((state) => state.setId);

  let navigate = useRouter();

  function EmailModal() {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Check Your Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              marginTop={"1rem"}
            >
              <Text>Enter Your Email address to continue</Text>
              <FormControl id="emailModalInput">
                <Input type="email" placeholder="Enter Your Email address" />
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              width={"100%"}
              borderRadius={"30px"}
              padding={"1.5rem"}
              onClick={async () => {
                let email = document.getElementById("emailModalInput");
                if (email.value === "") {
                  window.alert("Enter Email");
                } else {
                  let clientToken = localStorage.getItem("clientToken");
                  let config = {
                    headers: { Authorization: `Bearer ${clientToken}` },
                  };
                  try {
                    const response = await axios.post(
                      apiUrl + "/client/verify",
                      {
                        _id: email.value,
                      },
                      config
                    );
                    if (response.data.success === true) {
                      setEmail(email.value);
                      localStorage.setItem("clientEmail", email.value);
                      navigate.replace("/assignments");
                    } else if (response.status == 203) {
                      localStorage.setItem("clientToken", response.data.token);
                      clientToken = response.data.token;

                      try {
                        let config = {
                          headers: { Authorization: `Bearer ${clientToken}` },
                        };
                        const response = await axios.post(
                          apiUrl + "/client/verify",
                          {
                            _id: email.value,
                          },
                          config
                        );
                        if (response.data.success === true) {
                          localStorage.setItem("clientEmail", email.value);
                          navigate.replace("/assignments");
                        }
                      } catch (error) {
                        console.log("err");
                      }
                    }
                  } catch (err) {
                    window.alert(err.response.data["msg"]);
                  }
                }
              }}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <>
      <EmailModal />
      <div className="row  pt-3 m-0 d-flex justify-content-end">
        <div
          className="col-12 d-flex justify-content-between flex-row align-items-center"
          style={{
            width: "65%",
          }}
        >
          <div className="labelss">
            <button className="btn btn-mine ">
              Get 50% OFF On Your First Order
            </button>
          </div>
          <div>
            <span
              id="number-section"
              style={{
                marginRight: "20px",
                fontSize: "20px",
                fontFamily: "monospace",
              }}
            >
              +61-48889-3287
            </span>
          </div>
        </div>
      </div>
      <Header services={services} onOpen={onOpen} />
      {/* <MegaMenu services={services} /> */}
    </>
  );
}
