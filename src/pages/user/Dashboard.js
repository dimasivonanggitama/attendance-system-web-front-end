import React from 'react'
import { Box } from '@chakra-ui/react'
import Header from '../../components/section/Header'
import Sidebar from '../../components/section/Sidebar'

const Dashboard = (props) => {
  return (
    <Box height={"90vh"}>
      <Header />
      <Box display={"flex"} flexDirection={"row"}>
        <Sidebar role={props.role} sidebar={props.sidebar}/>
        <Box display={"flex"} maxHeight={"90vh"} width="100%" bgColor={"lightgrey"} overflowY={"auto"}>
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard