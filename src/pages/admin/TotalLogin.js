import React, { useEffect, useState } from 'react'
import './logins.css'
import axios from 'axios'
import { apiUrl } from '../../services/contants'
function TotalLogin() {

    const [userData, setUserData] = useState();
    const data = [
        {
            name: "ajay",
            number: 8059070534,
            role: "admin",

        },
        {
            name: "sokle",
            number: 859083038035,
            role: "fabricator",

        },
        {
            name: "sandeep basjKAFKafA",
            number: "2353759836473264",
            role: "sfksadjkjsf"
        },

        {
            name: "jewt'qgreor[preoy[]] basjKAFKafA",
            number: "2353759836473264",
            role: "jtrhrhttrhkptypyrp"
        },
        {
            name: "sandeep gkjeghkegkegjgdljegjgaagd",
            number: "egkljergljreglerjglergjerl",
            role: "dgnaagakga;skgasasg"
        },
        {
            name: "ajay",
            number: 8059070534,
            role: "admin",

        },
        {
            name: "sokle",
            number: 859083038035,
            role: "fabricator",

        },
        {
            name: "sandeep basjKAFKafA",
            number: "2353759836473264",
            role: "sfksadjkjsf"
        },

        {
            name: "jewt'qgreor[preoy[]] basjKAFKafA",
            number: "2353759836473264",
            role: "jtrhrhttrhkptypyrp"
        },
        {
            name: "sandeep gkjeghkegkegjgdljegjgaagd",
            number: "egkljergljreglerjglergjerl",
            role: "dgnaagakga;skgasasg"
        },
        {
            name: "ajay",
            number: 8059070534,
            role: "admin",

        },
        {
            name: "sokle",
            number: 859083038035,
            role: "fabricator",

        },
        {
            name: "sandeep basjKAFKafA",
            number: "2353759836473264",
            role: "sfksadjkjsf"
        },

        {
            name: "jewt'qgreor[preoy[]] basjKAFKafA",
            number: "2353759836473264",
            role: "jtrhrhttrhkptypyrp"
        },
        {
            name: "sandeep gkjeghkegkegjgdljegjgaagd",
            number: "egkljergljreglerjglergjerl",
            role: "dgnaagakga;skgasasg"
        },
        {
            name: "ajay",
            number: 8059070534,
            role: "admin",

        },
        {
            name: "sokle",
            number: 859083038035,
            role: "fabricator",

        },
        {
            name: "sandeep basjKAFKafA",
            number: "2353759836473264",
            role: "sfksadjkjsf"
        },

        {
            name: "jewt'qgreor[preoy[]] basjKAFKafA",
            number: "2353759836473264",
            role: "jtrhrhttrhkptypyrp"
        },
        {
            name: "sandeep gkjeghkegkegjgdljegjgaagd",
            number: "egkljergljreglerjglergjerl",
            role: "dgnaagakga;skgasasg"
        },
    ]

    const GetAllUsers = async () => {
        try {
            const UserData = await axios.get(`${apiUrl}/user/loginuser`);
            setUserData(UserData.data.res)
            console.log(UserData.data.res, "sdhjksah");
            // return UserData
        }
        catch (err) {
            console.log(err, "ERROR");
        }
    }
    useEffect(() => {
        GetAllUsers();

    }, [0])



    return (
        <div className='totallogindiv'>
            <div className='heading'>
                <div className='serial'> Serial Number</div>
                <div className='name'> Name</div>
                <div className='number'> Phone Number</div>
                <div className='role'> Role</div>
                <div className='action'> Action</div>
            </div>

            <div className='tablescroll'>
                {
                    userData?.map((res, index) => {
                        console.log(res,"response print");
                        return (
                            <div className='tablerow'>
                                <div className='serialrow'>{index} </div>
                                <div className='namerow'>{res?.name}</div>
                                <div className='numberrow'>{res?.contact_no}</div>
                                <div className='rolerow'>{res?.role?.substring(0, 20)}</div>
                                <div className='actionrow'> <span>Logout</span></div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='logoutall'>
                <button>Logout All</button>
            </div>
        </div>
    )
}

export default TotalLogin
