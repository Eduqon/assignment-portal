import {
    Box,
    Flex,
    Image,
    useColorModeValue,
} from '@chakra-ui/react';
import logo from '../../assets/Logo.png';

export function NavbarOrderDetails() {
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
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Image src={logo} w={20} />
                </Flex>
            </Flex>
        </Box>
    );
}