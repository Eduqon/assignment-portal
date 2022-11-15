import React, { useEffect } from "react";
import { SideBarStore } from "../../services/stores/sidebar";
// import { Link } from "react-router-dom";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import "../../index.css";
// import Assignments from '../../pages/admin/Assignments';
import { clickk } from "../../pages/admin/Assignments";
import { SubjectShow } from "../../pages/admin/Subjects";
import { NewUSe } from "../../pages/admin/NewUser";
import { VendorShow } from "../../pages/admin/Vendors";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// accordion assigment funciton
// const clickk = () =>{
//   document.getElementsByClassName('clickShow')[0].style.display='block';
//   console.log( document.getElementsByClassName('clickShow')[0])
//   console.log("hllo");
// };
// calling admin sub menu one by one by name attributes
const mobTab = (event) => {
  // this.onClose();
  let parentElement = document.getElementById("parent_tab");
  // document.getElementsByClassName("hyi")[0].style.backgroundColor ="red";
  event.target.style.backgroundColor = "#00FBBD";
  event.target.classList.add("active");
  // setbgClr( event.target.getAttribute('id'));
  // console.log( event.target.style.backgroundColor = "#00FBBD");
  // this.style.backgroundColor ="red";
  let name = parseInt(event.target.getAttribute("name"));
  // console.log(parentElement.querySelectorAll('.ShowSideClick'));
  // console.log(name);
  for (
    let i = 0;
    i < parentElement.querySelectorAll(".ShowSideClick").length;
    i++
  ) {
    if (i == name) {
      parentElement
        .querySelectorAll(".ShowSideClick")
        [i].classList.add("active");
    } else {
      parentElement
        .querySelectorAll(".ShowSideClick")
        [i].classList.remove("active");
    }
  }
};
// __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
function Examplee() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  //   drop down menu admin
  const dropp = () => {
    // console.log("hello");
    var hideShow = document.getElementsByClassName("drop")[0].style.display;
    // console.log(hideShow);
    if (hideShow === "block") {
      document.getElementsByClassName("drop")[0].style.display = "none";
    } else {
      document.getElementsByClassName("drop")[0].style.display = "block";
    }
  };
  //   drop down menu admin
  const dropSupport = () => {
    // console.log("hello");
    var hideShow =
      document.getElementsByClassName("dropSupport")[0].style.display;
    // console.log(hideShow);
    if (hideShow === "block") {
      document.getElementsByClassName("dropSupport")[0].style.display = "none";
    } else {
      document.getElementsByClassName("dropSupport")[0].style.display = "block";
    }
  };
  //   drop down menu Order Tab
  const dropOrder = () => {
    // console.log("hello");
    var hideShow =
      document.getElementsByClassName("dropOrder")[0].style.display;
    // console.log(hideShow);
    if (hideShow === "block") {
      document.getElementsByClassName("dropOrder")[0].style.display = "none";
    } else {
      document.getElementsByClassName("dropOrder")[0].style.display = "block";
    }
  };
  // my adding
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
    // setUserRole("Operator")
    // console.log(userRole);
  });
  // use state for color
  const [bgClr, setbgClr] = useState(SideBarStore((state) => state.acitveId));
  // if()
  useEffect(() => {
    // document.getElementById(`${bgClr}`).style.background ="red";
    // console.log(bgClr);
    // if(bgClr !== ""){
    // document.getElementById(`${bgClr}`).style.background ="red";
    // }
    // console.log(document.getElementById("hh4"));
  });
  // const openSideBar = ()=>{

  //   onOpen();
  //   setInterval(
  //     ()=>{
  //       document.getElementById(bgClr).style.background = "red";
  //     }  ,
  //     2000
  //   );

  // }
  // assing funciton open

  return (
    <>
      <div className="sideBarNone">
        <Button ref={btnRef} colorScheme="yellow" onClick={onOpen}>
          <HamburgerIcon />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>EduQon</DrawerHeader>
            <DrawerBody display={{ lg: "none" }}>
              {userRole === "Sales" ? (
                <>
                  <Box fontSize="xl" onClick={dropSupport}>
                    Support
                    <ChevronDownIcon />
                    <Box fontSize="md">
                      <ul className="dropSupport">
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="9"
                          className="hyi"
                        >
                          Home Chat Queue
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="10"
                          className="hyi"
                        >
                          Sales Chat Queue
                        </li>
                      </ul>
                    </Box>
                  </Box>
                  <Box fontSize="xl" onClick={dropOrder}>
                    Orders
                    <ChevronDownIcon />
                    <Box fontSize="md">
                      <ul className="dropOrder">
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="12"
                          id="hh1"
                        >
                          Fresh
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="13"
                          id="hh2"
                        >
                          CP1 Pending
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="14"
                          id="hh3"
                        >
                          CP1 Done
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="15"
                          id="hh4"
                        >
                          Confirmation Asked
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="16"
                          className="hyi"
                        >
                          Assigned Expert
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="17"
                          className="hyi"
                        >
                          Raw Submission
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="18"
                          className="hyi"
                        >
                          Internal Rework
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="19"
                          className="hyi"
                        >
                          Proof Read
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="20"
                          className="hyi"
                        >
                          CP2 Done{" "}
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="21"
                          className="hyi"
                        >
                          Client Rework
                        </li>
                      </ul>
                    </Box>
                  </Box>
                </>
              ) : userRole === "Operator" ? (
                <>
                  <Box onClick={mobTab} name="11" fontSize="xl" className="hyi">
                    Calendar
                  </Box>
                  <Box fontSize="xl" onClick={dropOrder}>
                    Orders
                    <ChevronDownIcon />
                    <Box fontSize="md">
                      <ul className="dropOrder">
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="12"
                          id="hh1"
                        >
                          Fresh
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="13"
                          id="hh2"
                        >
                          CP1 Pending
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="14"
                          id="hh3"
                        >
                          CP1 Done
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="15"
                          id="hh4"
                        >
                          Confirmation Asked
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="16"
                          className="hyi"
                        >
                          Assigned Expert
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="17"
                          className="hyi"
                        >
                          Raw Submission
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="18"
                          className="hyi"
                        >
                          Internal Rework
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="19"
                          className="hyi"
                        >
                          Proof Read
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="20"
                          className="hyi"
                        >
                          CP2 Done{" "}
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="21"
                          className="hyi"
                        >
                          Client Rework
                        </li>
                      </ul>
                    </Box>
                  </Box>
                </>
              ) : userRole === "Super Admin" || userRole === "Admin" ? (
                <>
                  <Box fontSize="xl" onClick={dropp}>
                    Admin
                    <ChevronDownIcon />
                    <Box fontSize="md">
                      <ul className="drop">
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="0"
                          className="hyi"
                        >
                          Assignments
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="1"
                          className="hyi"
                        >
                          Subjects
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="2"
                          className="hyi"
                        >
                          New User
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="3"
                          className="hyi"
                        >
                          Vendors
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="4"
                          className="hyi"
                        >
                          Admin
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="5"
                          className="hyi"
                        >
                          Operator
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="6"
                          className="hyi"
                        >
                          QC
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="7"
                          className="hyi"
                        >
                          Sales
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="8"
                          className="hyi"
                        >
                          Experts{" "}
                        </li>
                      </ul>
                    </Box>
                  </Box>
                  <Box fontSize="xl" onClick={dropSupport}>
                    Support
                    <ChevronDownIcon />
                    <Box fontSize="md">
                      <ul className="dropSupport">
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="9"
                          className="hyi"
                        >
                          Home Chat Queue
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="10"
                          className="hyi"
                        >
                          Sales Chat Queue
                        </li>
                      </ul>
                    </Box>
                  </Box>
                  <Box
                    onClick={(e) => {
                      mobTab(e);
                      onClose();
                    }}
                    name="11"
                    fontSize="xl"
                  >
                    Calendar
                  </Box>
                  <Box fontSize="xl" onClick={dropOrder}>
                    Orders
                    <ChevronDownIcon />
                    <Box fontSize="md">
                      <ul className="dropOrder">
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="12"
                          className="hyi"
                        >
                          Fresh
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="13"
                          className="hyi"
                        >
                          CP1 Pending
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="14"
                          className="hyi"
                        >
                          CP1 Done
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="15"
                          className="hyi"
                          id="hh4"
                        >
                          Confirmation Asked
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="16"
                          className="hyi"
                        >
                          Assigned Expert
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="17"
                          className="hyi"
                        >
                          Raw Submission
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="18"
                          className="hyi"
                        >
                          Internal Rework
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="19"
                          className="hyi"
                        >
                          Proof Read
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="20"
                          className="hyi"
                        >
                          CP2 Done{" "}
                        </li>
                        <li
                          onClick={(e) => {
                            mobTab(e);
                            onClose();
                          }}
                          name="21"
                          className="hyi"
                        >
                          Client Rework
                        </li>
                      </ul>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box fontSize="xl" onClick={dropOrder}>
                    Orders
                    <ChevronDownIcon />
                    <ul className="dropOrder">
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="12"
                        className="hyi"
                      >
                        Fresh
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="13"
                        className="hyi"
                      >
                        CP1 Pending
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="14"
                        className="hyi"
                      >
                        CP1 Done
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="15"
                        className="hyi"
                        id="hh4"
                      >
                        Confirmation Asked
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="16"
                        className="hyi"
                      >
                        Assigned Expert
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="17"
                        className="hyi"
                      >
                        Raw Submission
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="18"
                        className="hyi"
                      >
                        Internal Rework
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="19"
                        className="hyi"
                      >
                        Proof Read
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="20"
                        className="hyi"
                      >
                        CP2 Done{" "}
                      </li>
                      <li
                        onClick={(e) => {
                          mobTab(e);
                          onClose();
                        }}
                        name="21"
                        className="hyi"
                      >
                        Client Rework
                      </li>
                    </ul>
                  </Box>
                </>
              )}

              {/* <Box fontSize='xl' onClick={dropp}>Admin
                <ChevronDownIcon />
                <Box fontSize='md'>
                  <ul className='drop'>
                    <li onClick={mobTab} name="0" >Assignments</li>
                    <li onClick={mobTab} name="1">Subjects</li>
                    <li onClick={mobTab} name="2">New User</li>
                    <li onClick={mobTab} name="3">Vendors</li>
                    <li onClick={mobTab} name="4">Admin</li>
                    <li onClick={mobTab} name="5">Operator</li>
                    <li onClick={mobTab} name="6">QC</li>
                    <li onClick={mobTab} name="7">Sales</li>
                    <li onClick={mobTab} name="8">Experts </li>
                  </ul>
                </Box>
              </Box>
              <Box fontSize='xl' onClick={dropSupport}>
                Support
                <ChevronDownIcon />
                <Box fontSize='md'>
                  <ul className='dropSupport'>
                    <li onClick={mobTab} name="9">Home Chat Queue</li>
                    <li onClick={mobTab} name="10">Sales Chat Queue</li>
                  </ul>
                </Box>
              </Box>
              <Box onClick={mobTab} name="11" fontSize='xl'>Calendar</Box>
              <Box fontSize='xl' onClick={dropOrder}>Orders
                <ChevronDownIcon />
                <ul className='dropOrder'>
                  <li onClick={mobTab} name="0" >Assignments</li>
                  <li onClick={mobTab} name="1">Subjects</li>
                  <li onClick={mobTab} name="2">New User</li>
                  <li onClick={mobTab} name="3">Vendors</li>
                  <li onClick={mobTab} name="4">Admin</li>
                  <li onClick={mobTab} name="5">Operator</li>
                  <li onClick={mobTab} name="6">QC</li>
                  <li onClick={mobTab} name="7">Sales</li>
                  <li onClick={mobTab} name="8">Experts </li>
                </ul>

              </Box> */}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
export default Examplee;
