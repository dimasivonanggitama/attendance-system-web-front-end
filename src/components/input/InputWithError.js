import { Box, Collapse, Text } from '@chakra-ui/react'
import React from 'react'

const InputWithError = (props) => {
    const bool = props.errors && props.touched;
    return (
        <Box
            borderRadius="10"
            bgColor={bool? 'red' : 'transparent'}
            color="white"
            marginX="5"
            marginY="5"
            paddingX="1"
            paddingTop="1"
            paddingBottom="1"
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