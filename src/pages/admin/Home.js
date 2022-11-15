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
import AnnChatQueue from './AnnChatQueue';
import SalesChatQueue from './SalesChatQueue';

function AdminHome() {
    return (
        <>
            <Box padding={0}>
                <Tabs isLazy variant='soft-rounded'  display={{ base: 'none', sm: 'block', md: 'block' }}>
                    {
                        <>
                            <TabList>
                                <Tab>
                                    <Heading fontSize={'md'}>Home Chat Queue</Heading>
                                </Tab>
                                <Tab>
                                    <Heading fontSize={'md'}>Sales Chat Queue</Heading>
                                </Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <AnnChatQueue />
                                </TabPanel>
                                <TabPanel>
                                    <SalesChatQueue />
                                </TabPanel>
                            </TabPanels>
                        </>
                    }
                </Tabs>
            </Box>
            <Outlet />
            {/* mobile */}
            <Box display={{ base: 'block', sm: 'none', md: 'none ' }} id='ParentElem'>
              
            </Box>
        </>
    );
}

export default AdminHome;