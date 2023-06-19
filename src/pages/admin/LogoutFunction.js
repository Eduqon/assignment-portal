
import axios from "axios";
export const deleteToken = async(navigate,toast) =>{
console.log("hii yha ye b chal rha h ");

   const userEmail =  localStorage.getItem('userEmail')
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem("userToken");

    try {
        const userData = await axios.put("http://localhost:8080/user/updatebyadmin",{
            _id:userEmail,
            isAuthentify:false
        })

        if(userData){
            toast({
                title: 'Logout SuccessFull',
                description: "Logout",
                status: 'success',
                isClosable: true,
              })
        }
    }
     catch (error) {
        console.log(error);
    }
    localStorage.removeItem('userEmail');
    navigate("/admin/login");
} 