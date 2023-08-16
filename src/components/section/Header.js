import { Avatar, Badge, Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} height={"10vh"} boxShadow={'md'} bgColor={"blackAlpha.50"}>
        <Text marginX={5} textAlign="center" as="b" fontSize="6xl">TUPO</Text>
        <HStack margin={5} paddingX={3} borderRadius={15} boxShadow={"md"} bgColor={"white"} _hover={{background: "gray.200"}}>
            <Avatar name="Dimas Ivon Anggitama" src="#" marginRight={5}/>
            <Box>
                <Text>Dimas Ivon Anggitama</Text>
                <Badge colorScheme='red'>Admin</Badge>
            </Box>
        </HStack>
    </Box>
  )
}

export default Header