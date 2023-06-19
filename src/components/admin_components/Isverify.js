import React ,{useState,useEffect} from 'react'
import './verify.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { apiUrl } from "../../services/contants";
import verify from '../../assets/verified.png'
import notverify from '../../assets/notverify.png'
function Isverify() {

    const[isVerified,setIsverified] = useState(false)
    const {id} = useParams();
    console.log(id,"veridy");
    const Isverifyfun = async()=>{
        const data = await axios.put(
             apiUrl + "/user/updatebyadmin",
             {
                "_id": id,
                "isAuthentify":true
             }
        )
        console.log(data.data.success);
        if(data.data.success ===true){
            setIsverified(true)
        }
    }
useEffect(()=>{
Isverifyfun()
},[])
  return (
    <div className={isVerified === true ? 'verifydiv':'verifydivred'}>
      <div className={isVerified === true ? 'miniverifydiv':'miniverifydivred'}>
        <img src={isVerified === true ? verify : notverify}/>
        <div className={isVerified === true ? 'wordblue':'wordred'}>
         {id} Verfied
        </div>
      </div>
    </div>
  )
}

export default Isverify
