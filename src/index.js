import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { Center, ChakraProvider, Heading } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderDetails } from './pages/Order_Details';
import { Assignments } from './pages/Assignments';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/Layout';
import PortalLayout from './pages/admin/Portal';
import AssignmentDetails from './pages/admin/AssignmentDetails';
import AssignmentsLayout from './pages/admin/AssignmentsLayout';
import AssignmentDetailsClient from './pages/AssignmentDetails';
import NavService from './components/home_components/NavService';
import Contact from './components/home_components/Contact';
import Samples from './components/home_components/Sample';
import Testomonial from './components/home_components/Testomonial';
import Review from './components/home_components/Review';

const propsData = {
  name :'nadeem',
  sub_heading : 'developer'
}
ReactDOM.render(
 
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact  />} />
          <Route path="/reviews" element={<Review  />} />
          <Route exact path="/samples" element={<Samples  />} />
          <Route path="assignment_details" element={<AssignmentsLayout />} >
            <Route path=":assignmentID" element={<AssignmentDetailsClient />} />
          </ Route>
          <Route path="order_details" element={<OrderDetails />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="portal" element={<PortalLayout />} />
            <Route path="assignment_details" element={<AssignmentsLayout />} >
              <Route path=":assignmentID" element={<AssignmentDetails />} />
            </ Route>
          </Route>
          <Route
            path="*"
            element={
              <Center>
                <Heading>Invalid Route</Heading>
              </Center>
            }
          />
          <Route path='/service/:id' element={<NavService list={{...propsData}}/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
  
  ,

  document.getElementById('root')
);

reportWebVitals();
