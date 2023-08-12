import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ModalRegular = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onCloseX}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign={"center"}>{props.children}</ModalBody>
            <ModalFooter>
                {
                    (props.secondaryButton)? <Button variant='ghost' marginRight={5} onClick={props.onClickSecondaryButton}>{props.secondaryButton}</Button>
                    : <></>
                }
                <Button colorScheme={props.defaultButtonColor} mr={3} onClick={props.onClose}>{props.primaryButton}</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ModalRegular