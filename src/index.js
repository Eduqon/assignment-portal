import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import { Center, ChakraProvider, Heading } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OrderDetails } from "./pages/Order_Details";
import { Assignments } from "./pages/Assignments";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/Layout";
import PortalLayout from "./pages/admin/Portal";
import AssignmentDetails from "./pages/admin/AssignmentDetails";
import AssignmentsLayout from "./pages/admin/AssignmentsLayout";
import AssignmentDetailsClient from "./pages/AssignmentDetails";
import NavService from "./components/home_components/NavService";
import Contact from "./components/home_components/Contact";
import Samples from "./components/home_components/Sample";
import Testomonial from "./components/home_components/Testomonial";
import Review from "./components/home_components/Review";
import Error from "./pages/Error";
import { strapiUrl } from "./services/contants";

const propsData = {
  name: "nadeem",
  sub_heading: "developer",
};

//Apollo client
const client = new ApolloClient({
  uri: `http://localhost:1337/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reviews" element={<Review />} />
              <Route exact path="/samples" element={<Samples />} />
              <Route exact path="/404.html" element={<Error />} />
              <Route path="assignment_details" element={<AssignmentsLayout />}>
                <Route
                  path=":assignmentID"
                  element={<AssignmentDetailsClient />}
                />
              </Route>
              <Route path="order_details" element={<OrderDetails />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="admin" element={<AdminLayout />}>
                <Route path="login" element={<AdminLogin />} />
                <Route path="portal" element={<PortalLayout />} />
                <Route
                  path="assignment_details"
                  element={<AssignmentsLayout />}
                >
                  <Route path=":assignmentID" element={<AssignmentDetails />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/404.html" replace />} />
              <Route
                exact
                path="/service/:slug"
                element={<NavService list={{ ...propsData }} />}
              />
            </Routes>
          </ApolloProvider>
        </BrowserRouter>
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();
