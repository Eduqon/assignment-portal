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
import DeadlineCalendarView from './DeadlineCalendarView';
import ExpertDeadlineCalendarView from './ExpertDeadlineCalendarView';
function Calendars() {

    return (
        <>
            <div className='ShowSideClick'>
                <Box padding={0} >
                    <Tabs isLazy variant='soft-rounded'>
                        <TabList >
                            <Tab>
                                <Heading fontSize={'sm'}>By Deadline</Heading>
                            </Tab>
                            <Tab>
                                <Heading fontSize={'sm'}>By Expert Deadline</Heading>
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <DeadlineCalendarView />
                            </TabPanel>
                            <TabPanel>
                                <ExpertDeadlineCalendarView />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Outlet />

            </div>
        </>
    );
}

export default Calendars;