import React from 'react'
import Dashboard from '../user/Dashboard'
import { Box, HStack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { TbUserPlus } from 'react-icons/tb'

const UserManagementPage = () => {
  return (
    <Dashboard>
      <Box>
        <HStack borderRadius={15} boxShadow={"md"} padding={"3"} bgColor={"white"} _hover={{background: "gray.200"}} >
          <TbUserPlus size={25}/>
          <Text>Tambah Pegawai</Text>
        </HStack>
      </Box>
    </Dashboard>
  )
}

export default UserManagementPage