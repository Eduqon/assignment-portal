import {
  Box,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import moment from "moment";
import { RiDoubleQuotesL } from "react-icons/ri";
import React from "react";
import { services_data } from "../../../public/services";
import { Key_features } from "../../../public/key_features";
import { FaLocationArrow } from "react-icons/fa";
import Star from "../Star";
import Image from "next/image";

const ReviewSection = ({ reviewListData }) => {
  return (
    <Box
      id="reviews-section"
      display={"flex"}
      alignItems={"center"}
      padding={"2rem"}
      flexDirection={"column"}
      gap={"2rem"}
      background={"linear-gradient(250deg, #FFEDED, transparent)"}
    >
      <Box id="services">
        <Box>
          <Heading textTransform={"capitalize"} textAlign={"center"}>
            Assignment Help <span style={{ color: "#EF2B4B" }}>Services</span>
          </Heading>
          <hr
            style={{
              width: "6%",
              color: "#EF2B4B",
              margin: "1rem auto",
              borderTopWidth: "4px",
              opacity: 1,
            }}
          />
        </Box>
        <Box
          display={"grid"}
          gridTemplateColumns={["auto", "auto", "auto auto", "auto auto auto"]}
          justifyContent={"space-around"}
          gap={[0, 0, 0, "5rem"]}
          padding={[0, 0, 0, "0 5rem"]}
        >
          {services_data.map((data) => {
            return (
              <Box
                display={"flex"}
                gap={"1rem"}
                flexDirection={"column"}
                alignItems={"center"}
                textAlign={"center"}
                padding={"1rem"}
              >
                <Box
                  width={"3rem"}
                  borderRadius={"0.3rem"}
                  background={"#ffd9df"}
                  padding={"0.4rem"}
                >
                  <Image
                    width={600}
                    height={600}
                    src={data.icon}
                    alt={data.altText}
                  />
                </Box>
                <Box>
                  <Heading size="md">{data.heading}</Heading>
                  <Text>{data.sub_heading}</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box id="features">
        <Box>
          <Heading textTransform={"capitalize"} textAlign={"center"}>
            Assignment Help <span style={{ color: "#EF2B4B" }}>Features</span>
          </Heading>
          <hr
            style={{
              width: "6%",
              color: "#EF2B4B",
              margin: "1rem auto",
              borderTopWidth: "4px",
              opacity: 1,
            }}
          />
        </Box>
        <Box
          display={"grid"}
          gridTemplateColumns={["auto", "auto", "auto auto", "auto auto auto"]}
          justifyContent={"space-around"}
          gap={[0, 0, 0, "5rem"]}
          padding={[0, 0, 0, "0 5rem"]}
        >
          {Key_features.map((data) => {
            return (
              <Box
                display={"flex"}
                gap={"1rem"}
                flexDirection={"column"}
                alignItems={"center"}
                textAlign={"center"}
                padding={"1rem"}
              >
                <Box
                  width={"3rem"}
                  borderRadius={"0.3rem"}
                  background={"#ffd9df"}
                  padding={"0.4rem"}
                >
                  <Image
                    width={600}
                    height={600}
                    src={data.icon}
                    alt={data.altText}
                  />
                </Box>
                <Box>
                  <Heading size="md">{data.heading}</Heading>
                  <Text>{data.sub_heading}</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box id="question_section">
        <Stack gap={"1rem"} padding={["0rem", "0rem", "0rem", "0 3rem"]}>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <Box display={["none", "none", "none", "block"]}>
                <FaLocationArrow color="#EF2B4B" />
              </Box>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 500,
                }}
              >
                What exactly do you mean by an "assignment" and why would you
                require assistance with one?
              </h3>
            </Box>
            <br />
            <Text>
              There is no doubt that writing projects are among the most dreaded
              chores that students are given to complete during their college
              years. The complexity of the assignments puts a great deal of
              mental strain on the students. No matter how challenging the
              project may be, students must nevertheless complete many
              assignments each day by the deadline given by their lecturers.
              It's especially harder for students who are less competent at
              writing and comprehending assignment issues. These students run
              into difficulties while writing their assignments and are unsure
              of who to turn to or where to look for assistance.
            </Text>
            <br />
            <Text>
              Academic assignments can be challenging or simple, depending on
              the subject. Things will be a lot easier to manage for students if
              they have <strong>assignment help</strong>. The student, however,
              encounters difficulties if their friends decline to lend a hand
              with their assignments. The situation becomes more challenging
              when the professor is also engaged and unable to respond to the
              student's questions. How may these circumstances be resolved,
              then? Do not worry. Whatever the case, a student in any
              circumstance can get in touch with{" "}
              <strong>Assignment Santa</strong> for any form of assistance. We
              are always available to assist you in finishing your assignment.
            </Text>
            <br />
            <Text>
              Although 24x7 accessibility is a minor aspect of our assignment
              assistance services, other features like timeliness and top-notch
              quality set us apart from the competition. Our skilled writers are
              completely aware that the deadline is one of the major causes of
              pressure when finishing and submitting an assignment. In this
              case, assignment writing services are crucial. Whatever the time
              restrictions, we will collaborate with you to complete your
              project ahead of schedule.
            </Text>
          </Box>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <Box display={["none", "none", "none", "block"]}>
                <FaLocationArrow color="#EF2B4B" />
              </Box>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 500,
                }}
              >
                Employ the Assistance of Our Experts to Complete Your
                Assignments on Time
              </h3>
            </Box>
            <br />
            <Text>
              The assignment is one of the most challenging tasks that students
              have to do throughout their academic careers. Students are now
              expected to complete numerous tasks across a variety of courses.
              Academic institutions provide grades for assignments based on
              their quality, which is a significant factor in assessing a
              student's overall academic performance. This thus puts more
              pressure on students to complete their assignments. Due to their
              lack of time and lack of prior assignment writing experience,
              students ultimately turned to the best assignment assistance
              services online for help.
            </Text>
            <br />
            <Text>
              You might be having trouble finishing your assignments if you're a
              student in high school, or university. Do you need any
              <strong>assignment help</strong>? Well, you have stopped at the
              right place. Regardless of your academic level,
              assignmentsanta.com has qualified assignment experts in many
              disciplines who are here to help you with all of your
              subject-related assignments. We have been in the business for a
              while and have already helped countless students earn top scores.
              The assignment assistance professionals on our team will deliver
              top-notch, precise answers before the deadline, depending on your
              needs.
            </Text>
            <br />
            <Text>
              Take advantage of our online assignment writing assistance. By
              enlisting our assignment help, you'll experience less academic
              stress and perform better in class.
            </Text>
          </Box>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <Box display={["none", "none", "none", "block"]}>
                <FaLocationArrow color="#EF2B4B" />
              </Box>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 500,
                }}
              >
                Reduce your academic stress with our top-rated online assignment
                help service, Best Writers, and Great Results.
              </h3>
            </Box>
            <br />
            <Text>
              The cause for assignment writing failure is a query that the
              majority of students ask themselves. Why getting an A on your
              assignment is difficult? According to our online assignment
              writers, having bad time management abilities results in a time
              rush, which strains your head. Moreover, one of the main causes of
              poor assignment grades is a lack of comprehension of academic
              research. Assignment Santa is aware of the requirements that
              professors will be looking for in your assignment to give it a
              first-class grade, but achieving them can be challenging. It is
              possible to become exhausted from nonstop research, writing, and
              assignment analysis. To assist you to succeed in your academic
              coursework, Assignment Santa has been offering custom assignment
              writing services. You can rank among the top students in your
              class by utilizing our first-rate{" "}
              <strong>online assignment help service</strong>. We provide a fair
              service with excellent results for all of our customers that
              require assignment help. To discover more about our writing style,
              the themes we cover, and the results it may provide for you, look
              at a few of our sample assignments.
            </Text>
          </Box>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <Box display={["none", "none", "none", "block"]}>
                <FaLocationArrow color="#EF2B4B" />
              </Box>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 500,
                }}
              >
                Receive competent assignment help from anywhere in Australia,
                Canada, the UK, and the USA.
              </h3>
            </Box>
            <br />
            <Text>
              Looking for reliable assignment help? Do you dislike having to
              write essays? Or unsure of where to begin but eager to produce a
              well-written assignment? The hunt is over now. We are here to help
              you with our excellent assignment assistance services. Simply get
              in touch with us to acquire a quality project on time. You may
              unwind and enjoy life by selecting our trustworthy, serious, and
              reliable assignment support services. After joining us, you won't
              look back and will continue to rely on us for all of your tasks
              going forward. Our assignment help services stand out for their
              accessibility from everywhere, which is a major plus.
            </Text>
            <br />
            <Text>
              Assignment Santa of Australia has a solid reputation in the fields
              of custom dissertation writing, court writing services, report
              writing assistance, and assignment writing services. Our
              well-known company has been providing{" "}
              <strong>online assignment help</strong> services to a variety of
              clientele. Our team works hard to finish projects by the deadline
              and on time. Your task will be completed on time and to your
              standards because of our extensive experience. Assignment Santa
              also provides editing and proofreading services to their clients.
            </Text>
          </Box>
          <Box>
            <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
              <Box display={["none", "none", "none", "block"]}>
                <FaLocationArrow color="#EF2B4B" />
              </Box>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 500,
                }}
              >
                What Makes Our Online Assignment Helpers the Best for You?
              </h3>
            </Box>
            <br />
            <Text>
              Whenever you run into any assignment-related issues, get in touch
              with us right away. Our staff of academic writers is capable of
              producing unique answers for any kind of assignment on any topic.
              The assignment writer team at Assignmentsanta.com is considered to
              be the best among all assignment writing websites for the
              following reasons.
            </Text>
            <br />
            <UnorderedList>
              <ListItem>
                We have native academic experts on our staff. Based on the
                academic institutions in your nation's educational system's
                needs for assignment writing, you can thus obtain fantastic
                answers. Additionally, you won't encounter any language hurdles
                when speaking with them.
              </ListItem>
              <ListItem>
                Our academic writers will create a personalized paper on the
                assignment topic of your choice with the appropriate citations.
              </ListItem>
              <ListItem>
                The assignment writers on our staff have extensive experience in
                both academic writing and teaching. As a result, they are quite
                skilled at producing content that will please your supervisor
                and earn you excellent marks.
              </ListItem>
              <ListItem>
                We have highly regarded professionals and Ph.D. scholars in all
                subjects of study. They can therefore easily do in-depth
                research and create unique, accurate answers that are free of
                plagiarism.
              </ListItem>
              <ListItem>
                Our professionals will answer quickly and without keeping you
                waiting long for any of your questions.
              </ListItem>
            </UnorderedList>
          </Box>
        </Stack>
      </Box>
      <Box id="reviews">
        <Heading textTransform={"capitalize"} textAlign={"center"}>
          Countless <span style={{ color: "#EF2B4B" }}>positive</span> reviews
          <br />
          from <span style={{ color: "#EF2B4B" }}>satisfied students</span>
        </Heading>
        <Box
          width={"100%"}
          height={"100%"}
          padding={["0rem", "2rem"]}
          display={"grid"}
          gridTemplateColumns={[
            "auto",
            "auto",
            "auto auto",
            "auto auto auto auto",
          ]}
          justifyContent={"center"}
          gap={"2rem"}
          marginTop={["1rem", "0rem"]}
        >
          {reviewListData.map((review) => {
            return (
              review && (
                <Box
                  borderRadius={"20px"}
                  background={"#fff"}
                  padding={"1rem"}
                  boxShadow={"0px 0px 15px -5px #000"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-around"}
                  gap={"1rem"}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Heading
                      fontSize={"14px"}
                      fontWeight={"700"}
                      color="#EF2B4B"
                    >
                      {review.attributes.Review_heading}
                    </Heading>
                    <RiDoubleQuotesL
                      color="#EF2B4B"
                      opacity={"0.6"}
                      fontSize={"2rem"}
                    />
                  </Box>
                  <Text fontWeight={"500"} color={"#303B4F"}>
                    {review.attributes.Main_heading}
                  </Text>
                  <Text
                    fontSize={"14px"}
                    fontWeight={"400"}
                    fontStyle={"italic"}
                    color={"#222222"}
                  >
                    {review.attributes.Sub_heading}
                  </Text>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Box
                      id="rating"
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.5rem"}
                    >
                      <Star stars={review.attributes.Rating} />
                      <span style={{ fontWeight: 700 }}>
                        {review.attributes.Rating}
                      </span>
                    </Box>
                    <Box>{moment(review.attributes.Date).format("ll")}</Box>
                  </Box>
                  <Box>
                    User ID:{" "}
                    <span style={{ fontWeight: "600" }}>
                      {review.attributes.UserID}
                    </span>
                  </Box>
                </Box>
              )
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewSection;
