import { Box, Collapse, Text } from '@chakra-ui/react'
import React from 'react'

const InputWithError = (props) => {
    const bool = props.errors && props.touched;
    return (
        <Box
            borderRadius="10"
            bgColor={bool? 'red' : 'transparent'}
            color="white"
            margin="5"
            padding="1"
            width="100%"
            in={bool}
            sx={{
                "transition": "background-color 0.5s ease-out"
            }}
            alignItems={"start"}
            textAlign={"left"}
        >
            {props.children}
            <Collapse in={bool}>
                <Text fontSize={"md"} paddingLeft="1">{props.errors}</Text>
            </Collapse>
        </Box>
    )
}

export default InputWithError