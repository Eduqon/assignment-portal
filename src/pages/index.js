"use client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { NavbarHome } from "../components/home_components/navbar_home.js";
import { FooterHome } from "../components/home_components/footer_home.js";
import HeadLayout from "../components/home_components/HeadLayout.js";
import { client } from "./_app.js";
import { SEOTAGS, SERVICES, REVIEWS } from "../services/contants.js";
import Star from "../components/Star.js";
import { Key_features } from "../../public/key_features.js";
import { services_data } from "../../public/services.js";
import Slider from "../components/home_components/sliders/Slider.js";
import { steps_data } from "../../public/steps_file.js";

const FormSection = dynamic(
  () => import("../components/home_components/formSection.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const WorkSection = dynamic(
  () => import("../components/home_components/workSection.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const ReviewSection = dynamic(
  () => import("../components/home_components/reviewSection.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

function Home({ services, seotags, reviews }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewListData, setReviewListData] = useState([]);

  const { data: reviewsData } = reviews;
  const limit = 12;

  useEffect(() => {
    handleSort();
  }, [currentPage]);

  const handleSort = () => {
    const sortedData = [...reviewsData];

    sortedData.sort((a, b) => {
      const dateA = new Date(a.attributes.Date);
      const dateB = new Date(b.attributes.Date);
      return dateB - dateA;
    });
    const sortedList =
      sortedData &&
      sortedData.slice(currentPage * limit, (currentPage + 1) * limit);
    setReviewListData(sortedList);
  };

  return (
    <>
      <HeadLayout
        slug="assignment-help-online-assignment-assistance"
        seotags={seotags}
      />
      <NavbarHome services={services} />
      <FormSection />
      <WorkSection />
      <ReviewSection reviewListData={reviewListData} />
      <Box id="faqs" padding={["1rem", "1rem", "1rem", "1rem 3rem"]}>
        <Heading>Frequently Asked Questions for Assignment Help</Heading>
        <Box marginTop={"2rem"}>
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  I want to pay someone to do my assignment. Can I?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Yes, you can pay Assignment Santa to complete your homework.
                  We help you bargain with the Tutors for the best price on your
                  assignment. You are also welcome to haggle with us for the
                  best prices at any time. We work with a group of graduates,
                  professionals, and task-writing specialists who are available
                  twenty-four hours a day. Our staff offers extensive assignment
                  writing services and can handle a range of assignments.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What online resources can I use to help with my assignments?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>
                  If you need assistance with your assignments, case studies, or
                  research writing projects, Assignment Santa is here to help.
                  We offer original, non-plagiarized content and assignments at
                  the lowest price possible. The primary principle of each
                  project followed by Assignment Santa is to thoroughly research
                  the subject, create a solid work schedule, and guarantee that
                  the online assignment writing service is completed by the
                  deadline. Many people, including working people, students,
                  specialists, and teachers, appreciate Assignment Santa's
                  versatile skills and affordable assignment help.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What are the best tips for choosing an online assignment help
                  services provider?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  There are a few important pointers that will help you do your
                  homework assignments on time and within your budget without
                  sacrificing the quality of the job.
                </Text>
                <UnorderedList>
                  <ListItem>Examine the services offered.</ListItem>
                  <ListItem>
                    Look into the expertise of the instructors.
                  </ListItem>
                  <ListItem>Consider time management..</ListItem>
                  <ListItem>Check the samples.</ListItem>
                  <ListItem>Evaluate the costs.</ListItem>
                </UnorderedList>
                <Text>
                  Contact Assignment Santa if you're looking for a dynamic and
                  reliable platform. We can offer cutting-edge online homework
                  help because of our extensive global network of qualified
                  tutors.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  Does assignmentsanta.com deliver original content with all its
                  assignment help services?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Assignment Santa makes a unique and distinctive assignment for
                  each of its customers. Along with being adept at original
                  writing, we also make use of a variety of modern technologies
                  to check the work for plagiarism before delivering it to
                  clients. It helps our writers to fix the plagiarism problem.
                  To get error-free material, our proofreading assignment
                  assistance professionals also check the assignments for
                  errors. They then continue to edit the contents so that they
                  preserve the papers' general relevance and tone while keeping
                  the contents flowing. These are the major reasons why so many
                  students use Assignment Santa to complete their assignments.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What is the importance of assignments in lesson plans?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Assessment is essential to the learning procedures. According
                  to John Biggs, an expert on higher education, "What and how
                  students learn depends to a great extent on how they perceive
                  they will be graded." Given the significance of assessment for
                  student learning, it is critical to think carefully about the
                  most effective method for measuring the learning you want your
                  students to acquire. Assessments should incorporate learning,
                  grading, and student enthusiasm. Effective evaluation methods
                  provide crucial insights into students' learning. They outline
                  the subjects the students studied, how well they retained the
                  content, and the difficulties they encountered.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  Is assignment help for students legal?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Assignment writing services are frequently used by university
                  and college students to assist them with a variety of
                  assignments. Essay writing services will keep expanding
                  because many students still have writing needs. If you follow
                  the guidelines, you are free to buy essays. Customers want to
                  do business with registered companies since registration
                  increases a company's credibility and trustworthiness.
                  However, use caution when selecting a writing service because
                  there are some unethical ones out there. And Assignment Santa
                  is among the best and most reputable writers you can work
                  with. They are reputable and well-known for providing the
                  greatest essay writing services available.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What is the best website to get assignment help quickly?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Assignmentsanta.com is more than just an average assignment
                  writing company that provides{" "}
                  <a href="https://www.assignmentsanta.com/service/academic-writing- services">
                    academic writing services
                  </a>
                  . It is a group of highly educated paper writers that have
                  grouped to offer a solid solution to individuals facing
                  academic challenges. Many students who need assistance with
                  their assignments and homework find the Assignment Santa
                  website to be appealing. Additionally, they offer reasonable
                  help to students within a predetermined deadline.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What are the best ways to start an assignment introduction?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Your assignment's introduction is the first paragraph. Your
                  introduction should inform the reader about the paper's topic
                  and the justifications you plan to make for it. The aim of
                  your paper is made clear to the reader by the{" "}
                  <a href="https://www.assignmentsanta.com/blog/thesis-statement">
                    thesis statement
                  </a>
                  , which is part of the introduction. By shifting from a
                  generic to a specific introduction, you can accomplish these.
                  The first stage should consist of general summary of the
                  subject of your project. The topic should be focused in the
                  center of the introduction so that your reader can see how it
                  relates to your paper's overall goal. Finally, make sure to
                  properly state your thesis before leading the reader to your
                  major point.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What are the main “assignment help for me" services available
                  at Assignment Santa?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  To make sure that our students don't have to wait for
                  "assignment help for me" services, some of the well-liked
                  sections of our assignment writing service are as follows:
                </Text>
                <UnorderedList>
                  <ListItem>Biotechnology.</ListItem>
                  <ListItem>Writing. </ListItem>
                  <ListItem>Graphic Design and other software. </ListItem>{" "}
                  <ListItem>Architecture and Planning. </ListItem>{" "}
                  <ListItem>Pharmaceutical Science. </ListItem>
                  <ListItem>
                    Ocean Engineering and Naval Architecture.{" "}
                  </ListItem>{" "}
                  <ListItem>Nursing. </ListItem>
                  <ListItem>Nuclear Engineering. </ListItem>
                  <ListItem>Metallurgical and Materials. </ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What is your key principle behind providing help in assignment
                  writing to students?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Affordability, a plagiarism-free solution, availability, and
                  professionalism are our four primary principles for providing
                  writing services. We stand out from the other assignment
                  assistance service providers due to our inclination for the
                  ASAP approach. Our specialized assignment assistance follows
                  the principle of absorbing ideas and using them to create a
                  superior assignment answer.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
      <Box
        width={"100%"}
        position={"relative"}
        height={["20rem", "540px"]}
        marginTop={"2rem"}
      >
        <Box
          backgroundImage={"url(/assets/newDesigns/FooterBg.png)"}
          backgroundSize={"cover"}
          height={["83%", "90%"]}
          width={"100%"}
          position={"absolute"}
          bottom={0}
        >
          <Box
            id="right-section"
            position={"absolute"}
            right={["-3rem", "2rem"]}
            bottom={0}
            width={["15rem", "30rem"]}
            transform={["translateX(-50%)", "none"]}
            display={["none", "none", "none", "block"]}
          >
            <img
              width="600"
              height="400"
              src="/assets/newDesigns/FooterSanta.png"
              alt="Footer Santa"
            />
          </Box>
        </Box>
        <Box
          id="wait-longer-section"
          background={"#FFF3DB"}
          width={["20rem", "580px"]}
          height={"100%"}
          position={"relative"}
          marginLeft={["1rem", "3rem"]}
        >
          <Box id="vector"></Box>
          <Box
            id="top-section"
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}
            padding={"4rem"}
          >
            <Heading fontSize={["25px", "40px"]} fontWeight={"700"}>
              Why wait <span style={{ color: "#EF2B4B" }}>any longer</span>?
            </Heading>
            <Text fontSize={["15px", "20px"]} fontWeight={"500"}>
              Place an order now and get proposals from our professional writers
              within 10 seconds
            </Text>
            <Button
              width={["auto", "12rem"]}
              background={"#EF2B4B"}
              color="#fff"
              padding={["0rem", "2rem 8rem"]}
              borderRadius={"40px"}
              fontWeight={"600"}
              fontSize={["15px", "23px"]}
            >
              Order Now
            </Button>
          </Box>
          <Box
            id="bottom-section"
            position={"absolute"}
            bottom={["0rem", "-1rem"]}
            left={["0%", "7%"]}
            transform={["scale(1)", "scale(1.1)"]}
          >
            <img
              width="600"
              height="400"
              src="/assets/newDesigns/Gifts.png"
              alt="Gifts"
            />
          </Box>
        </Box>
      </Box>
      <FooterHome />
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });
  const { data } = await client.query({
    query: SEOTAGS,
  });
  const { data: reviewsData } = await client.query({
    query: REVIEWS,
  });
  return {
    props: {
      services: serviceData.services || null,
      seotags: data.seotags || null,
      reviews: reviewsData.reviews || null,
    },
  };
}
