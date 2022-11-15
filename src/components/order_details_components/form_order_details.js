import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    Stack,
    Button,
    Heading,
    Select,
    useColorModeValue,
    Wrap,
    VStack,
    Textarea,
    InputRightAddon,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { useState, useRef, useEffect } from 'react';
import order_details_image from '../../assets/order_details_bg.jpg';
import { ClientStore } from '../../services/stores/client_store';
import { AssignmentFormStore } from '../../services/stores/assignment_form_store';
import axios from 'axios';
import { apiUrl } from '../../services/contants';
import { useNavigate } from 'react-router-dom';

export function FormOrderDetails() {
    const [fileName, setFileName] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [level, setLevel] = useState('');
    const [token, setToken] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const inputRef = useRef(null);
    const existingUser = ClientStore(state => state.existingUser);
    const id = ClientStore(state => state.id);
    const subject = AssignmentFormStore(state => state.subject);
    const deadline = AssignmentFormStore(state => state.deadline);
    const pages = AssignmentFormStore(state => state.pages);
    const clearAssignmentStore = AssignmentFormStore(state => state.clearAssignmentStore);

    let navigate = useNavigate();

    useEffect(async () => {
        await _fetchToken();
    })

    async function _fetchToken() {
        try {
            const response = await axios.get(apiUrl + '/util/sas-token?container_name=assignment-dscp');
            let data = response.data;
            if (data.success) {
                setToken(data.SASToken);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function uploadFile(blobName, filePath) {
        setIsUploading(true);
        await _fetchToken();
        onOpen();
        var data = filePath;

        var config = {
            method: 'put',
            url: 'https://assignmentsanta.blob.core.windows.net/assignment-dscp/' + encodeURIComponent(blobName) + "?" + token,
            headers: {
                'x-ms-blob-type': 'BlockBlob'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response);
                setFileUrl(fileUrl => ['https://assignmentsanta.blob.core.windows.net/assignment-dscp/' + encodeURIComponent(blobName), ...fileUrl]);
                setIsUploading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsUploading(false);
            });
        onClose();
    }

    async function _submit() {
        if (isUploading) {
            window.alert('File Still being uploaded... Please Wait');
        } else {
            let reference = document.getElementById('reference');
            let description = document.getElementById('description');
            let countrycode = document.getElementById('countrycode');
            let number = document.getElementById('number');
            let callbacktime = document.getElementById('callbacktime');
            let vendor = document.getElementById('vendor');
            let taskCode = document.getElementById('taskCode');

            let levelVal = false;
            let referenceVal = false;
            let descriptionVal = false;
            let countrycodeVal = false;
            let numberVal = false;
            let callbacktimeVal = false;

            if (existingUser) {
                if (level == "") {
                    window.alert('Select an Assignment Level');
                    levelVal = false;
                }
                else {
                    levelVal = true;
                }

                if (reference.value == "") {
                    window.alert('Select an Assignment Reference');
                    referenceVal = false;
                }
                else {
                    referenceVal = true;
                }

                let vendorId = '';

                if (levelVal === true && referenceVal === true) {
                    let clientToken = localStorage.getItem("clientToken");
                    let config = {
                        headers: { "Authorization": `Bearer ${clientToken}` },
                    }
                    try {
                        const responseVendor = await axios.post(apiUrl + '/user/fetch',
                            {
                                "referralCode": vendor.value
                            }
                        )
                        if (responseVendor.data.res.length !== 0) {
                            vendorId = responseVendor.data.res[0]._id;
                        }
                    } catch (error) {
                        //console.log(error);
                    }
                    try {
                        if (taskCode.value === "") {
                            const response = await axios.post(apiUrl + '/assignment/new',
                                {
                                    "client_id": id,
                                    "status": "Fresh Order",
                                    "subject": subject,
                                    "level": level,
                                    "reference": reference.value,
                                    "description": description.value,
                                    "descriptionFile": fileUrl,
                                    "deadline": deadline,
                                    "currencyOfQuote": "INR",
                                    "quotation": null,
                                    "paid": null,
                                    "numOfPages": pages,
                                    "vendorId": vendorId
                                }, config
                            )
                            if (response.data.success === true) {
                                window.alert('Assignment Submitted');
                                clearAssignmentStore();
                                navigate("/assignments");
                            }
                            else {
                                window.alert('response');
                            }
                        }
                        else {
                            const response = await axios.post(apiUrl + '/assignment/new',
                                {
                                    "_id": taskCode.value,
                                    "client_id": id,
                                    "status": "Fresh Order",
                                    "subject": subject,
                                    "level": level,
                                    "reference": reference.value,
                                    "description": description.value,
                                    "descriptionFile": fileUrl,
                                    "deadline": deadline,
                                    "currencyOfQuote": "INR",
                                    "quotation": null,
                                    "paid": null,
                                    "numOfPages": pages,
                                    "vendorId": vendorId
                                }, config
                            )
                            if (response.data.success === true) {
                                window.alert('Assignment Submitted');
                                clearAssignmentStore();
                                navigate("/assignments");
                            }
                            else {
                                window.alert('response');
                            }
                        }
                    }
                    catch (err) {
                        window.alert(err);
                    }
                }
            }
            else if (!existingUser) {
                if (level == "") {
                    window.alert('Select an Assignment Level');
                    levelVal = false;
                }
                else {
                    levelVal = true;
                }

                if (reference.value == "") {
                    window.alert('Select an Assignment Reference');
                    referenceVal = false;
                }
                else {
                    referenceVal = true;
                }

                if (countrycode.value == "") {
                    window.alert('Select a country code');
                    countrycodeVal = false;
                } else {
                    countrycodeVal = true;
                }

                if (number.value == "") {
                    window.alert('Enter your contact number');
                    numberVal = false;
                } else {
                    numberVal = true;
                }

                if (callbacktime.value == "") {
                    window.alert('Specify suitable callback time');
                    callbacktimeVal = false;
                } else {
                    callbacktimeVal = true;
                }
                let vendorId = '';

                if (levelVal === true && referenceVal === true && countrycodeVal === true && numberVal === true && callbacktimeVal === true) {
                    let countrycodeSplit = await countrycode.options[countrycode.selectedIndex].text.split("(");
                    let countryName = countrycodeSplit[0];
                    try {
                        const signupResponse = await axios.post(apiUrl + '/client/signup',
                            {
                                "_id": id,
                                "country": countryName,
                                "countryCode": countrycode.value,
                                "contact_no": number.value,
                                "callback_time": callbacktime.value
                            }
                        )
                        if (signupResponse.data.success === true) {
                            localStorage.setItem("clientToken", signupResponse.data.token);
                            localStorage.setItem('clientEmail', id);
                            let clientToken = localStorage.getItem("clientToken");
                            let config = {
                                headers: { "Authorization": `Bearer ${clientToken}` },
                            }
                            try {
                                const responseVendor = await axios.post(apiUrl + '/user/fetch',
                                    {
                                        "referralCode": vendor.value
                                    }
                                )
                                if (responseVendor.data.res.length !== 0) {
                                    vendorId = responseVendor.data.res[0]._id;
                                }
                            } catch (error) {
                                console.log(error);
                            }
                            if (taskCode.value === '') {
                                const response = await axios.post(apiUrl + '/assignment/new',
                                    {
                                        "client_id": id,
                                        "status": "Fresh Order",
                                        "subject": subject,
                                        "level": level,
                                        "reference": reference.value,
                                        "description": description.value,
                                        "descriptionFile": fileUrl,
                                        "deadline": deadline,
                                        "currencyOfQuote": "INR",
                                        "quotation": null,
                                        "paid": null,
                                        "numOfPages": pages,
                                        "vendorId": vendorId
                                    },
                                    config
                                )
                                console.log(response);
                                if (response.data.success === true) {
                                    window.alert('Assignment Submitted');
                                    clearAssignmentStore();
                                    navigate("/assignments");
                                }
                                else {
                                    window.alert(response.data);
                                }
                            } else {
                                const response = await axios.post(apiUrl + '/assignment/new',
                                    {
                                        "_id": taskCode.value,
                                        "client_id": id,
                                        "status": "Fresh Order",
                                        "subject": subject,
                                        "level": level,
                                        "reference": reference.value,
                                        "description": description.value,
                                        "descriptionFile": fileUrl,
                                        "deadline": deadline,
                                        "currencyOfQuote": "INR",
                                        "quotation": null,
                                        "paid": null,
                                        "numOfPages": pages,
                                        "vendorId": vendorId
                                    },
                                    config
                                )
                                console.log(response);
                                if (response.data.success === true) {
                                    window.alert('Assignment Submitted');
                                    clearAssignmentStore();
                                    navigate("/assignments");
                                }
                                else {
                                    window.alert(response.data);
                                }
                            }
                        }
                        else {
                            window.alert("Signup Failed");
                        }
                    }
                    catch (err) {
                        //console.log(err);
                    }
                }
            }
            else {
                navigate("/");
            }
        }
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>File Upload</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        File is being uploaded, please wait..
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Flex
                minH={'80vh'}
                backgroundImage={
                    order_details_image
                }
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
                align={'center'}
                justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'4xl'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'3xl'} textAlign={'center'} color={'white'}>
                            Get Help Instantly !!
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={6}>
                            <Box>
                                <FormControl display={(localStorage.getItem('userToken') === null) ? 'none' : 'block'} id="taskCode" isRequired>
                                    <FormLabel>Custom Task Code</FormLabel>
                                    <Input type="text" />
                                </FormControl>
                            </Box>
                            <VStack alignItems={'left'}>
                                <FormLabel>Level of Assignment</FormLabel>
                                <Wrap
                                    flexWrap={true}
                                    direction={'row'}
                                    spacing={1.5}>
                                    <Button
                                        id='High School'
                                        display={'inline-flex'}
                                        fontSize={'sm'}
                                        fontWeight={600}
                                        color={(level == 'High School') ? 'white' : 'gray.800'}
                                        bg={(level == 'High School') ? 'gray.400' : 'gray.200'}
                                        onClick={() => { setLevel('High School'); }}
                                        _hover={{
                                            bg: 'gray.400',
                                            color: 'white',
                                        }}>
                                        High School
                                    </Button>
                                    <Button
                                        display={'inline-flex'}
                                        fontSize={'sm'}
                                        fontWeight={600}
                                        color={(level == 'Diploma') ? 'white' : 'gray.800'}
                                        bg={(level == 'Diploma') ? 'gray.400' : 'gray.200'}
                                        onClick={() => { setLevel('Diploma'); }}
                                        _hover={{
                                            bg: 'gray.400',
                                            color: 'white',
                                        }}>
                                        Diploma
                                    </Button>
                                    <Button
                                        display={'inline-flex'}
                                        fontSize={'sm'}
                                        fontWeight={600}
                                        color={(level == 'Undergraduate') ? 'white' : 'gray.800'}
                                        bg={(level == 'Undergraduate') ? 'gray.400' : 'gray.200'}
                                        onClick={() => { setLevel('Undergraduate'); }}
                                        _hover={{
                                            bg: 'gray.400',
                                            color: 'white',
                                        }}>
                                        Undergraduate
                                    </Button>
                                    <Button
                                        display={'inline-flex'}
                                        fontSize={'sm'}
                                        fontWeight={600}
                                        color={(level == 'Postgraduate') ? 'white' : 'gray.800'}
                                        bg={(level == 'Postgraduate') ? 'gray.400' : 'gray.200'}
                                        onClick={() => { setLevel('Postgraduate'); }}
                                        _hover={{
                                            bg: 'gray.400',
                                            color: 'white',
                                        }}>
                                        Postgraduate
                                    </Button>
                                    <Button
                                        display={'inline-flex'}
                                        fontSize={'sm'}
                                        fontWeight={600}
                                        color={(level == 'PhD/Doctorate') ? 'white' : 'gray.800'}
                                        bg={(level == 'PhD/Doctorate') ? 'gray.400' : 'gray.200'}
                                        onClick={() => { setLevel('PhD/Doctorate'); }}
                                        _hover={{
                                            bg: 'gray.400',
                                            color: 'white',
                                        }}>
                                        PhD/Doctorate
                                    </Button>
                                </Wrap>
                            </VStack>
                            <Select placeholder='Select Assignment Reference' id='reference'>
                                <option value='I Don’t Know'>I Don’t Know</option>
                                <option value='AGLC'>AGLC</option>
                                <option value='APA'>APA</option>
                                <option value='BMJ'>BMJ</option>
                                <option value='Chicago'>Chicago</option>
                                <option value='Footnotes'>Footnotes</option>
                                <option value='Footnotes and Bibliography'>Footnotes and Bibliography</option>
                                <option value='Harvard'>Harvard</option>
                                <option value='IEEE'>IEEE</option>
                                <option value='MHRA'>MHRA</option>
                                <option value='MLA'>MLA</option>
                                <option value='Open'>Open</option>
                                <option value='OSCOLA'>OSCOLA</option>
                                <option value='Oxford'>Oxford</option>
                                <option value='Turabian'>Turabian</option>
                                <option value='Vancouver'>Vancouver</option>
                            </Select>
                            <Box>
                                <FormControl id="description">
                                    <FormLabel>Enter your assignment description</FormLabel>
                                    <Textarea maxLength={10000}></Textarea>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="file">
                                    <FormLabel>Upload File</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            isReadOnly={true}
                                            value={fileName} />
                                        <InputRightAddon>
                                            <Button onClick={() => inputRef.current.click()}>
                                                <AttachmentIcon />
                                            </Button>
                                            <input
                                                type="file"
                                                multiple='true'
                                                onChange={async () => {
                                                    let tempFileNames = []
                                                    for (let index = 0; index < inputRef.current.files.length; index++) {
                                                        tempFileNames.push(inputRef.current.files[index].name);
                                                        await uploadFile(inputRef.current.files[index].name, inputRef.current.files[index])
                                                    }
                                                    setFileName(tempFileNames);
                                                }}
                                                ref={inputRef}
                                                style={{ display: "none" }}
                                            />
                                        </InputRightAddon>
                                    </InputGroup>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="vendor">
                                    <FormLabel>Enter Referral Code</FormLabel>
                                    <Input></Input>
                                </FormControl>
                            </Box>
                            <HStack display={(!existingUser) ? "flex" : "none"}>
                                <Box>
                                    <FormControl>
                                        <FormLabel>Country</FormLabel>
                                        <Select id="countrycode">
                                            <option data-countrycode="DZ" value="213">Algeria (+213)</option>
                                            <option data-countrycode="AD" value="376">Andorra (+376)</option>
                                            <option data-countrycode="AO" value="244">Angola (+244)</option>
                                            <option data-countrycode="AI" value="1264">Anguilla (+1264)</option>
                                            <option data-countrycode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                                            <option data-countrycode="AR" value="54">Argentina (+54)</option>
                                            <option data-countrycode="AM" value="374">Armenia (+374)</option>
                                            <option data-countrycode="AW" value="297">Aruba (+297)</option>
                                            <option data-countrycode="AU" value="61">Australia (+61)</option>
                                            <option data-countrycode="AT" value="43">Austria (+43)</option>
                                            <option data-countrycode="AZ" value="994">Azerbaijan (+994)</option>
                                            <option data-countrycode="BS" value="1242">Bahamas (+1242)</option>
                                            <option data-countrycode="BH" value="973">Bahrain (+973)</option>
                                            <option data-countrycode="BD" value="880">Bangladesh (+880)</option>
                                            <option data-countrycode="BB" value="1246">Barbados (+1246)</option>
                                            <option data-countrycode="BY" value="375">Belarus (+375)</option>
                                            <option data-countrycode="BE" value="32">Belgium (+32)</option>
                                            <option data-countrycode="BZ" value="501">Belize (+501)</option>
                                            <option data-countrycode="BJ" value="229">Benin (+229)</option>
                                            <option data-countrycode="BM" value="1441">Bermuda (+1441)</option>
                                            <option data-countrycode="BT" value="975">Bhutan (+975)</option>
                                            <option data-countrycode="BO" value="591">Bolivia (+591)</option>
                                            <option data-countrycode="BA" value="387">Bosnia Herzegovina (+387)</option>
                                            <option data-countrycode="BW" value="267">Botswana (+267)</option>
                                            <option data-countrycode="BR" value="55">Brazil (+55)</option>
                                            <option data-countrycode="BN" value="673">Brunei (+673)</option>
                                            <option data-countrycode="BG" value="359">Bulgaria (+359)</option>
                                            <option data-countrycode="BF" value="226">Burkina Faso (+226)</option>
                                            <option data-countrycode="BI" value="257">Burundi (+257)</option>
                                            <option data-countrycode="KH" value="855">Cambodia (+855)</option>
                                            <option data-countrycode="CM" value="237">Cameroon (+237)</option>
                                            <option data-countrycode="CA" value="1">Canada (+1)</option>
                                            <option data-countrycode="CV" value="238">Cape Verde Islands (+238)</option>
                                            <option data-countrycode="KY" value="1345">Cayman Islands (+1345)</option>
                                            <option data-countrycode="CF" value="236">Central African Republic (+236)</option>
                                            <option data-countrycode="CL" value="56">Chile (+56)</option>
                                            <option data-countrycode="CN" value="86">China (+86)</option>
                                            <option data-countrycode="CO" value="57">Colombia (+57)</option>
                                            <option data-countrycode="KM" value="269">Comoros (+269)</option>
                                            <option data-countrycode="CG" value="242">Congo (+242)</option>
                                            <option data-countrycode="CK" value="682">Cook Islands (+682)</option>
                                            <option data-countrycode="CR" value="506">Costa Rica (+506)</option>
                                            <option data-countrycode="HR" value="385">Croatia (+385)</option>
                                            <option data-countrycode="CU" value="53">Cuba (+53)</option>
                                            <option data-countrycode="CY" value="90392">Cyprus North (+90392)</option>
                                            <option data-countrycode="CY" value="357">Cyprus South (+357)</option>
                                            <option data-countrycode="CZ" value="42">Czech Republic (+42)</option>
                                            <option data-countrycode="DK" value="45">Denmark (+45)</option>
                                            <option data-countrycode="DJ" value="253">Djibouti (+253)</option>
                                            <option data-countrycode="DM" value="1809">Dominica (+1809)</option>
                                            <option data-countrycode="DO" value="1809">Dominican Republic (+1809)</option>
                                            <option data-countrycode="EC" value="593">Ecuador (+593)</option>
                                            <option data-countrycode="EG" value="20">Egypt (+20)</option>
                                            <option data-countrycode="SV" value="503">El Salvador (+503)</option>
                                            <option data-countrycode="GQ" value="240">Equatorial Guinea (+240)</option>
                                            <option data-countrycode="ER" value="291">Eritrea (+291)</option>
                                            <option data-countrycode="EE" value="372">Estonia (+372)</option>
                                            <option data-countrycode="ET" value="251">Ethiopia (+251)</option>
                                            <option data-countrycode="FK" value="500">Falkland Islands (+500)</option>
                                            <option data-countrycode="FO" value="298">Faroe Islands (+298)</option>
                                            <option data-countrycode="FJ" value="679">Fiji (+679)</option>
                                            <option data-countrycode="FI" value="358">Finland (+358)</option>
                                            <option data-countrycode="FR" value="33">France (+33)</option>
                                            <option data-countrycode="GF" value="594">French Guiana (+594)</option>
                                            <option data-countrycode="PF" value="689">French Polynesia (+689)</option>
                                            <option data-countrycode="GA" value="241">Gabon (+241)</option>
                                            <option data-countrycode="GM" value="220">Gambia (+220)</option>
                                            <option data-countrycode="GE" value="7880">Georgia (+7880)</option>
                                            <option data-countrycode="DE" value="49">Germany (+49)</option>
                                            <option data-countrycode="GH" value="233">Ghana (+233)</option>
                                            <option data-countrycode="GI" value="350">Gibraltar (+350)</option>
                                            <option data-countrycode="GR" value="30">Greece (+30)</option>
                                            <option data-countrycode="GL" value="299">Greenland (+299)</option>
                                            <option data-countrycode="GD" value="1473">Grenada (+1473)</option>
                                            <option data-countrycode="GP" value="590">Guadeloupe (+590)</option>
                                            <option data-countrycode="GU" value="671">Guam (+671)</option>
                                            <option data-countrycode="GT" value="502">Guatemala (+502)</option>
                                            <option data-countrycode="GN" value="224">Guinea (+224)</option>
                                            <option data-countrycode="GW" value="245">Guinea - Bissau (+245)</option>
                                            <option data-countrycode="GY" value="592">Guyana (+592)</option>
                                            <option data-countrycode="HT" value="509">Haiti (+509)</option>
                                            <option data-countrycode="HN" value="504">Honduras (+504)</option>
                                            <option data-countrycode="HK" value="852">Hong Kong (+852)</option>
                                            <option data-countrycode="HU" value="36">Hungary (+36)</option>
                                            <option data-countrycode="IS" value="354">Iceland (+354)</option>
                                            <option data-countrycode="IN" value="91">India (+91)</option>
                                            <option data-countrycode="ID" value="62">Indonesia (+62)</option>
                                            <option data-countrycode="IR" value="98">Iran (+98)</option>
                                            <option data-countrycode="IQ" value="964">Iraq (+964)</option>
                                            <option data-countrycode="IE" value="353">Ireland (+353)</option>
                                            <option data-countrycode="IL" value="972">Israel (+972)</option>
                                            <option data-countrycode="IT" value="39">Italy (+39)</option>
                                            <option data-countrycode="JM" value="1876">Jamaica (+1876)</option>
                                            <option data-countrycode="JP" value="81">Japan (+81)</option>
                                            <option data-countrycode="JO" value="962">Jordan (+962)</option>
                                            <option data-countrycode="KZ" value="7">Kazakhstan (+7)</option>
                                            <option data-countrycode="KE" value="254">Kenya (+254)</option>
                                            <option data-countrycode="KI" value="686">Kiribati (+686)</option>
                                            <option data-countrycode="KP" value="850">Korea North (+850)</option>
                                            <option data-countrycode="KR" value="82">Korea South (+82)</option>
                                            <option data-countrycode="KW" value="965">Kuwait (+965)</option>
                                            <option data-countrycode="KG" value="996">Kyrgyzstan (+996)</option>
                                            <option data-countrycode="LA" value="856">Laos (+856)</option>
                                            <option data-countrycode="LV" value="371">Latvia (+371)</option>
                                            <option data-countrycode="LB" value="961">Lebanon (+961)</option>
                                            <option data-countrycode="LS" value="266">Lesotho (+266)</option>
                                            <option data-countrycode="LR" value="231">Liberia (+231)</option>
                                            <option data-countrycode="LY" value="218">Libya (+218)</option>
                                            <option data-countrycode="LI" value="417">Liechtenstein (+417)</option>
                                            <option data-countrycode="LT" value="370">Lithuania (+370)</option>
                                            <option data-countrycode="LU" value="352">Luxembourg (+352)</option>
                                            <option data-countrycode="MO" value="853">Macao (+853)</option>
                                            <option data-countrycode="MK" value="389">Macedonia (+389)</option>
                                            <option data-countrycode="MG" value="261">Madagascar (+261)</option>
                                            <option data-countrycode="MW" value="265">Malawi (+265)</option>
                                            <option data-countrycode="MY" value="60">Malaysia (+60)</option>
                                            <option data-countrycode="MV" value="960">Maldives (+960)</option>
                                            <option data-countrycode="ML" value="223">Mali (+223)</option>
                                            <option data-countrycode="MT" value="356">Malta (+356)</option>
                                            <option data-countrycode="MH" value="692">Marshall Islands (+692)</option>
                                            <option data-countrycode="MQ" value="596">Martinique (+596)</option>
                                            <option data-countrycode="MR" value="222">Mauritania (+222)</option>
                                            <option data-countrycode="YT" value="269">Mayotte (+269)</option>
                                            <option data-countrycode="MX" value="52">Mexico (+52)</option>
                                            <option data-countrycode="FM" value="691">Micronesia (+691)</option>
                                            <option data-countrycode="MD" value="373">Moldova (+373)</option>
                                            <option data-countrycode="MC" value="377">Monaco (+377)</option>
                                            <option data-countrycode="MN" value="976">Mongolia (+976)</option>
                                            <option data-countrycode="MS" value="1664">Montserrat (+1664)</option>
                                            <option data-countrycode="MA" value="212">Morocco (+212)</option>
                                            <option data-countrycode="MZ" value="258">Mozambique (+258)</option>
                                            <option data-countrycode="MN" value="95">Myanmar (+95)</option>
                                            <option data-countrycode="NA" value="264">Namibia (+264)</option>
                                            <option data-countrycode="NR" value="674">Nauru (+674)</option>
                                            <option data-countrycode="NP" value="977">Nepal (+977)</option>
                                            <option data-countrycode="NL" value="31">Netherlands (+31)</option>
                                            <option data-countrycode="NC" value="687">New Caledonia (+687)</option>
                                            <option data-countrycode="NZ" value="64">New Zealand (+64)</option>
                                            <option data-countrycode="NI" value="505">Nicaragua (+505)</option>
                                            <option data-countrycode="NE" value="227">Niger (+227)</option>
                                            <option data-countrycode="NG" value="234">Nigeria (+234)</option>
                                            <option data-countrycode="NU" value="683">Niue (+683)</option>
                                            <option data-countrycode="NF" value="672">Norfolk Islands (+672)</option>
                                            <option data-countrycode="NP" value="670">Northern Marianas (+670)</option>
                                            <option data-countrycode="NO" value="47">Norway (+47)</option>
                                            <option data-countrycode="OM" value="968">Oman (+968)</option>
                                            <option data-countrycode="PW" value="680">Palau (+680)</option>
                                            <option data-countrycode="PA" value="507">Panama (+507)</option>
                                            <option data-countrycode="PG" value="675">Papua New Guinea (+675)</option>
                                            <option data-countrycode="PY" value="595">Paraguay (+595)</option>
                                            <option data-countrycode="PE" value="51">Peru (+51)</option>
                                            <option data-countrycode="PH" value="63">Philippines (+63)</option>
                                            <option data-countrycode="PL" value="48">Poland (+48)</option>
                                            <option data-countrycode="PT" value="351">Portugal (+351)</option>
                                            <option data-countrycode="PR" value="1787">Puerto Rico (+1787)</option>
                                            <option data-countrycode="QA" value="974">Qatar (+974)</option>
                                            <option data-countrycode="RE" value="262">Reunion (+262)</option>
                                            <option data-countrycode="RO" value="40">Romania (+40)</option>
                                            <option data-countrycode="RU" value="7">Russia (+7)</option>
                                            <option data-countrycode="RW" value="250">Rwanda (+250)</option>
                                            <option data-countrycode="SM" value="378">San Marino (+378)</option>
                                            <option data-countrycode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                                            <option data-countrycode="SA" value="966">Saudi Arabia (+966)</option>
                                            <option data-countrycode="SN" value="221">Senegal (+221)</option>
                                            <option data-countrycode="CS" value="381">Serbia (+381)</option>
                                            <option data-countrycode="SC" value="248">Seychelles (+248)</option>
                                            <option data-countrycode="SL" value="232">Sierra Leone (+232)</option>
                                            <option data-countrycode="SG" value="65">Singapore (+65)</option>
                                            <option data-countrycode="SK" value="421">Slovak Republic (+421)</option>
                                            <option data-countrycode="SI" value="386">Slovenia (+386)</option>
                                            <option data-countrycode="SB" value="677">Solomon Islands (+677)</option>
                                            <option data-countrycode="SO" value="252">Somalia (+252)</option>
                                            <option data-countrycode="ZA" value="27">South Africa (+27)</option>
                                            <option data-countrycode="ES" value="34">Spain (+34)</option>
                                            <option data-countrycode="LK" value="94">Sri Lanka (+94)</option>
                                            <option data-countrycode="SH" value="290">St. Helena (+290)</option>
                                            <option data-countrycode="KN" value="1869">St. Kitts (+1869)</option>
                                            <option data-countrycode="SC" value="1758">St. Lucia (+1758)</option>
                                            <option data-countrycode="SD" value="249">Sudan (+249)</option>
                                            <option data-countrycode="SR" value="597">Suriname (+597)</option>
                                            <option data-countrycode="SZ" value="268">Swaziland (+268)</option>
                                            <option data-countrycode="SE" value="46">Sweden (+46)</option>
                                            <option data-countrycode="CH" value="41">Switzerland (+41)</option>
                                            <option data-countrycode="SI" value="963">Syria (+963)</option>
                                            <option data-countrycode="TW" value="886">Taiwan (+886)</option>
                                            <option data-countrycode="TJ" value="7">Tajikstan (+7)</option>
                                            <option data-countrycode="TH" value="66">Thailand (+66)</option>
                                            <option data-countrycode="TG" value="228">Togo (+228)</option>
                                            <option data-countrycode="TO" value="676">Tonga (+676)</option>
                                            <option data-countrycode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                                            <option data-countrycode="TN" value="216">Tunisia (+216)</option>
                                            <option data-countrycode="TR" value="90">Turkey (+90)</option>
                                            <option data-countrycode="TM" value="7">Turkmenistan (+7)</option>
                                            <option data-countrycode="TM" value="993">Turkmenistan (+993)</option>
                                            <option data-countrycode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                                            <option data-countrycode="TV" value="688">Tuvalu (+688)</option>
                                            <option data-countrycode="UG" value="256">Uganda (+256)</option>
                                            <option data-countrycode="GB" value="44">UK (+44)</option>
                                            <option data-countrycode="UA" value="380">Ukraine (+380)</option>
                                            <option data-countrycode="AE" value="971">United Arab Emirates (+971)</option>
                                            <option data-countrycode="UY" value="598">Uruguay (+598)</option>
                                            <option data-countrycode="US" value="1">USA (+1)</option>
                                            <option data-countrycode="UZ" value="7">Uzbekistan (+7)</option>
                                            <option data-countrycode="VU" value="678">Vanuatu (+678)</option>
                                            <option data-countrycode="VA" value="379">Vatican City (+379)</option>
                                            <option data-countrycode="VE" value="58">Venezuela (+58)</option>
                                            <option data-countrycode="VN" value="84">Vietnam (+84)</option>
                                            <option data-countrycode="VG" value="84">Virgin Islands - British (+1284)</option>
                                            <option data-countrycode="VI" value="84">Virgin Islands - US (+1340)</option>
                                            <option data-countrycode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                                            <option data-countrycode="YE" value="969">Yemen (North)(+969)</option>
                                            <option data-countrycode="YE" value="967">Yemen (South)(+967)</option>
                                            <option data-countrycode="ZM" value="260">Zambia (+260)</option>
                                            <option data-countrycode="ZW" value="263">Zimbabwe (+263)</option>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box flexGrow={1}>
                                    <FormControl id="number">
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input type="text" maxLength={10} />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <Select placeholder='Select Callback Time' id='callbacktime' display={(!existingUser) ? "flex" : "none"}>
                                <option value="12:00 AM To 03:00 AM">12:00 AM To 03:00 AM</option>
                                <option value="03:00 AM To 06:00 AM">03:00 AM To 06:00 AM</option>
                                <option value="06:00 AM To 09:00 AM">06:00 AM To 09:00 AM</option>
                                <option value="09:00 AM To 12:00 PM">09:00 AM To 12:00 PM</option>
                                <option value="12:00 PM To 03:00 PM">12:00 PM To 03:00 PM</option>
                                <option value="03:00 PM To 06:00 PM">03:00 PM To 06:00 PM</option>
                                <option value="06:00 PM To 09:00 PM">06:00 PM To 09:00 PM</option>
                                <option value="09:00 PM To 12:00 AM">09:00 PM To 12:00 AM</option>
                            </Select>
                            <HStack justifyContent={'space-between'}>
                                <Button
                                    size="lg"
                                    bg={'gray.400'}
                                    color={'white'}
                                    onClick={() => { navigate("/"); }}
                                    _hover={{
                                        bg: 'gray.500',
                                    }}>
                                    Back
                                </Button>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    onClick={() => {
                                        if (isUploading) {
                                            window.alert('File Uploading, please wait...');
                                        } else {
                                            _submit();
                                        }
                                    }}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Finish
                                </Button>
                            </HStack>
                        </Stack>
                    </Box>
                </Stack >
            </Flex >
        </>
    );
}