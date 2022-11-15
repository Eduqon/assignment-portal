import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export function FooterOrderDetails() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                fontSize={'xs'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <Text>Disclaimer: The reference papers provided by Assignment Santa should be used as model papers only. Students are not to copy or submit them as is. These reference papers are strictly intended for research and reference purposes only.</Text>
                <Text>© 2022 Assignment Santa. All rights reserved</Text>
            </Container>
        </Box>
    );
}