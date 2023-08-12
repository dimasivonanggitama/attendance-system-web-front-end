import React from 'react'
import { Box } from '@chakra-ui/react'
import Header from '../../components/section/Header'
import Sidebar from '../../components/section/Sidebar'

const Dashboard = (props) => {
  return (
    <Box>
      <Header />
      <Box maxHeight={"90vh"} display={"flex"} flexDirection={"row"}>
        <Sidebar role={props.role} sidebar={props.sidebar}/>
        <Box width="100%" padding={5} bgColor={"lightgrey"} overflowY={"auto"}>
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard