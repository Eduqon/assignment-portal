import React from "react"
import { Input } from '@chakra-ui/react'
import axios from "axios";
import { apiUrl } from "../../services/contants";

function DeadlinePopup({ showPopup, setShowPopup,expertdeadlineDate, setExpertdeadlineDate,index,assignments }) {

    async function handleClickSave() {
        try {
            let userToken = localStorage.getItem('userToken');
            let expertdeadline = expertdeadlineDate;
            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.post(apiUrl + '/assignment/update',
                {
                    "_id": assignments[index].id,
                    "expertDeadline": expertdeadline
                },
                config
            )
             console.log(response.res.id);
        }
        catch(error){
            console.log(error+"error triggered");
        }
        setShowPopup(!showPopup);
    }
   
    return (

        <div className="popup" style={{
            width: "250px",
            height: "170px",
            backgroundColor: " #f8f9fa",
            position: " absolute",
            borderRadius: "13px",
            left: "56%",
            top: " 28%",
            padding: "30px",
            boxShadow: "0 0 3px"
        }}>
            <div className="showpic" onClick ={()=>setShowPopup(!showPopup)}
                style={{
                    height: "19%",
                    width: "11%",
                    marginLeft: " 98%",
                    marginTop: "-9%",
                    cursor:"pointer"
                } }><img src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png"   /></div>
            <label style={{
                fontWeight: "600",
                marginTop: "0%"
            }}>Update Expert Deadline</label>
            <Input
                onChange={(e) => setExpertdeadlineDate(e.target.value)}
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
            />
            <button onClick={()=>handleClickSave()}
                style={{
                    backgroundColor: "blue",
                    height: "26%",
                    width: "35%",
                    borderRadius: "10px",
                    color: "white",
                    marginLeft: "33%",
                    marginTop: "9%"
                }}>Save</button>
        </div>
    )
}
export default DeadlinePopup