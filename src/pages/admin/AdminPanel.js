import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Heading
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Admins from './Admins';
import Assignments from './Assignments';
import Experts from './Experts';
import { NewUser } from './NewUser';
import Operators from './Operators';
import QC from './QC';
import Sales from './Sales';
import Subjects from './Subjects';
import Vendors from './Vendors';

function AdminPanel() {
    return (
        <>
            <Box padding={0}>
                <Tabs isLazy variant='soft-rounded'>
                    {
                        <>
                            <TabList  display={{ base: 'none', sm: 'inline-flex' , md: 'inline-flex' }}>
                                <Tab>
                                    <Heading fontSize={'md'}>Assignments</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>Subjects</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>New User</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>Vendors</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>Admin</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>Operator</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>QC</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>Sales</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>Experts</Heading>
                                </Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Assignments />
                                </TabPanel>
                                <TabPanel>
                                    <Subjects />
                                </TabPanel>
                                <TabPanel>
                                    <NewUser />
                                </TabPanel>
                                <TabPanel>
                                    <Vendors />
                                </TabPanel>
                                <TabPanel>
                                    <Admins />
                                </TabPanel>
                                <TabPanel>
                                    <Operators />
                                </TabPanel>
                                <TabPanel>
                                    <QC />
                                </TabPanel>
                                <TabPanel>
                                    <Sales />
                                </TabPanel>
                                <TabPanel>
                                    <Experts />
                                </TabPanel>
                            </TabPanels>
                        </>
                    }
                </Tabs>
            </Box>
            <Outlet />
        </>
    );
}

export default AdminPanel;