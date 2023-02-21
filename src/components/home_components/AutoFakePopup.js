import React, { useState, useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useRef } from "react";
import { Box } from "@chakra-ui/react";
export default function AutoFakePopup() {
  const [showw, setShoww] = useState(false);

  const handleClose = () => setShoww(false);
  const handleShow = () => setShoww(true);

  const [update, setupdate] = useState(0);

  const pop = useRef();
  const [id, setid] = useState(100);
  const [days, setdays] = useState("");
  const [output, setoutput] = useState("");

  const popUp = () => {
    setTimeout(() => {
      pop.current?.classList.remove("popHide");
      pop.current?.classList.add("popShow");
      setid(Math.floor(Math.random() * 248999));
      setTimeout(() => {
        pop.current?.classList.remove("popShow");
        pop.current?.classList.add("popHide");
        popUp();
      }, 8000);
    }, 5000);
  };
  useEffect(() => {
    popUp();
  }, [0]);

  return (
    <>
      <Box display={{ base: "none", sm: "block", md: "block" }}>
        <div className="row d-none">
          <div className="col">
            <div ref={pop} className="popHide">
              <div className="pop_box ">
                <div className="row d-flex jussitify-content-center align-items-cente p-2">
                  <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <IoIosCheckmarkCircle className="set_icon" />
                  </div>
                  <div className="col-md-9 set-custom-pad">
                    <div className="set_pop_text">
                      <p>
                        <b className="mb-3 set_orer">Order Delivered</b>{" "}
                      </p>
                      <p className="set_pop_text pr-2">
                        Assignment for User ID <b>{id}</b> has been successfully
                        delivered{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </Modal> */}
          </div>
        </div>
      </Box>
    </>
  );
}
