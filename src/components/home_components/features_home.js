import { useEffect } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Items";
import Clientslider from './sliders/Clientslider';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillProject } from 'react-icons/ai';
import { RiArrowDownCircleFill } from 'react-icons/ri';
import { GiProgression } from 'react-icons/gi';
import { MdLiveHelp } from 'react-icons/md';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { BsJournalBookmarkFill, BsPencilFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaHandshake } from 'react-icons/fa';
import LoadForm from './LoadForm';
import AutoFakePopup from './AutoFakePopup';
import Dissertation from './featuresImages/Dissertation.png'
import time from './featuresImages/time.png'
import Online from './featuresImages/Online.png'
import Casestudy from './img/Casestudy.png'
import Completecoursework from './img/Completecoursework.png'
import DissertationHead from './img/DissertationHead.png'
import EssayWritingHelp from './img/EssayWritingHelp.png'
import Researchpaperhelp from './img/Researchpaperhelp.png'
import Thesis from './img/Thesis.png'
import View from '../../assets/foter/View.png'
import Whychooseourhelp from './img/Whychooseourhelp.png'
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import Counter from './Counter';
import Testomonial from './Testomonial';
import Allfeatures from './Allfeatures';
const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};
const listone = ["Well-Researched Assignments", "100% Plagiarism Free Work", "Best Grades for you", "On time delivery"
  , "Foolproof Double Quality Checks",
  "24*7 Assistance and help",
  "Unlimited Revisions as per your requirements.",
  "Well-written, authentic, coherent and distinct content."]
// main list
const subject1 = [
  "Accounting Assignment Help",
  , "Business Assignment Help"
  , "Business Environment Assignment Help"
  , "Business Law Assignment Help"
  , "Business Plan Assignment Help"
  , "Case Study Assignment Help"
  , "Childcare Assignment Help"
  , "Commerce Assignment Help"
  , "Communication Assignment Help"
  , "Construction Assignment Help"
  , "Criminology Assignment Help"
  , "Cultural Studies Assignment Help"
  , "English Literature Assignment Help"
  , "Entrepreneurship Assignment Help"
  , "Environmental Studies Assignment Help"
  , "Estate Management Assignment Help"
  , "Economics Assignment Help"
  , "Education Assignment Help"
]
const subject2 = [
  , "Engineering Assignment Help"
  , "Finance Assignment Help"
  , "Food Assignment Help"
  , "General Studies Assignment Help"
  , "Health Assignment Help"
  , "Health & Social Care Assignment Help"
  , "Hospitality Assignment Help"
  , "Human Resource Management Assignment Help"
  , "Information Systems Assignment Help"
  , "Information Technology Assignment Help"
  , "International Studies Assignment Help"
  , "Law Assignment Help"
  , "Leadership Assignment Help"
  , "Management Assignment Help"
  , " Marketing Assignment Help"
  , " Marketing Essentials Assignment Help"
  , " Media Assignment Help"
]
const subject3 = [

  , " Medical Assignment Help"
  , "Nursing Assignment Help",
  "Physical Education Assignment Help"
  , "Physiology Assignment Help"
  , "Planning Assignment Help"
  , "Politics Assignment Help"
  , "Poster Assignment Help"
  , "PowerPoint Assignment Help"
  , "Project Management Assignment Help"
  , "Psychology Assignment Help"
  , "Religion Assignment Help"
  , "Research Methodology Assignment Help"
  , "Sciences Assignment Help"
  , "Social Policy Assignment Help"
  , "Social Work Assignment Help"
  , "Sociology Assignment Help"
  , "Tourism Assignment Help"
]
const listthird = [
  "In-depth Topic Coverage"
  , "Well Curated and Coherent Essay"
  , "Authentic and Quality Essay"
  , "Accurate Essay Structure"
  , "100% Plagiarism Free Essay"
  , "Effective Expression Delivery"
]
const listfour = [
  "Accurate Dessertation Outline"
  , "Careful Compliance of guidelines"
  , "In-depth Topic Coverage"
  , "Well-researched Quality Content"
  , "100% Plagiarism Free Dessertation"
  , "Original and Distinct Content"
]
const listfive = [
  "Well-Organized Data"
  , "Unique Cases"
  , "Careful Compliance of guidelines"
  , "In-depth Topic Coverage"
  , "Well-researched Quality Content"
  , "100% Plagiarism Free Content"
]
const listsix = [
  "360-degree data coverage"
  , "In-depth and Comprehensive Research"
  , "Careful Compliance of guidelines"
  , "Best Quality Research Assurance"
  , "Authentic and Distinct Content"
  , "100% Plagiarism Free Content"
]
const listseven = [
  "360-degree data coverage"
  , "Coherent Presentation and Organization"
  , "In-depth and Comprehensive Research"
  , "Careful Compliance of guidelines"
  , "Authentic and Distinct Content"
  , "100% Plagiarism Free Content"
]
const listeight = [
  "On-Time Submissions"
  , "Precise and Accurate Content"
  , "Original and Quality Content"
  , "100% Plagiarism Free Content"
  , "Well-Researched and Accurate Work"
]
export function FeaturesHome() {
  const [readed, setreaded] = useState(
    {
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      eight: false,
    }
  )
  const [lists, setlists] = useState(listone);
  const [secondList1, setsecondList1] = useState(listone);
  const [secondList2, setsecondList2] = useState(secondList1);
  const [secondList3, setsecondList3] = useState(secondList2);
  const [thirdList, setthirdList] = useState(listthird);
  const [fourList, setfourList] = useState(listfour);
  const [fiveList, setfiveList] = useState(listfive);
  const [sixList, setsixList] = useState(listsix);
  const [sevenList, setsevenList] = useState(listseven);
  const [eightList, seteightList] = useState(listeight);

  const [poploop, setpoploop] = useState(['18937792', '8638622', '383872']);

  const subject = useRef();
  const timee = useRef();
  const Essay = useRef();
  const Dessertation = useRef();
  const Case = useRef();
  const Research = useRef();
  const thesis = useRef();
  const cousreWork = useRef();
  useEffect(() => {
    console.log(readed.one, 'one')
    console.log(readed.two, 'two')
  }, [readed])

  return (
    <>


      {/* {
        poploop.map((val) => { */}
      {/* <div className='View'> */}
      <Link to="/samples"><img src={View} alt="" className='view' /></Link>
      {/* </div> */}
      <AutoFakePopup id={67668877} />
      {/* })
      } */}
      <LoadForm />
      <div className="row p-0 m-0 set_color">
        <div className="col">
          <Counter />
        </div>
      </div>

      <div className="row p-0 m-0 ">
        <div className="col">
          <Clientslider />
        </div>
      </div>
      <Allfeatures />
    </>
  );
}