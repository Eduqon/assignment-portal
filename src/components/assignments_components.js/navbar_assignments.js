import { EditIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Avatar,
    Text,
    Image,
    useColorModeValue,
    useBreakpointValue,
    HStack,
} from '@chakra-ui/react';
import logo from '../../assets/Logo.png';

export function NavbarAssignments() {
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4, md: 10 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
                    <Image src={logo} w={20} />
                </Flex>
                <HStack spacing={5}>
                    {/* <Button
                        display={{ base: 'inline-flex', md: 'none' }}
                        variant={'outline'}
                        color={'gray.800'}
                        href={'#'}>
                        <EditIcon />
                    </Button>
                    <Button
                        display={{ base: 'none', md: 'inline-flex' }}
                        variant={'outline'}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'gray.800'}
                        href={'#'}>
                        Edit Contact
                    </Button> */}
                    <Avatar />
                </HStack>
            </Flex>
        </Box>
    );
}