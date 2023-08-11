import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import Hero from '../../components/section/Hero'
import LoginForm from '../../components/form/LoginForm'

const LandingPage = () => {
  return (
    <Box
      display='flex'
      justifyContent={"center"}
      height="calc(100vh)"
      width='100%'
    >
      <Box flex={2} bgColor="lightgrey"><Hero/></Box>
      <VStack flex={1} bgColor={"blackAlpha.100"} justifyContent={"center"}>
        <LoginForm/>
      </VStack>
    </Box>
  )
}

export default LandingPage