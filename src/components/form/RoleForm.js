import { Box, Button, HStack, Input } from '@chakra-ui/react'
import React from 'react'
import InputWithError from '../input/InputWithError'

const RoleForm = () => {
  return (
    <HStack>
        <InputWithError margin={"0"} padding={"0"}>
            <Input type="text" name="username" placeholder='Username' bgColor="white" borderColor={"grey"} color={"black"} />
        </InputWithError>
        <Button type="submit" colorScheme={"green"}>Tambah</Button>
    </HStack>
  )
}

export default RoleForm