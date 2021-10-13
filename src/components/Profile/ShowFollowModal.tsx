import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure, Button } from '@chakra-ui/react';
import FollowOrFollower from './FollowOrFollower';
function ShowFollowModal({ follow, type }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Flex onClick={onOpen} alignItems={'center'} cursor={'pointer'}>
        <Text fontSize={18} pr='2' fontWeight={'bold'}>
          {follow ? follow.length : ''}
        </Text>
        <Text as={'span'} color='whiteAlpha.600' fontWeight={'light'}>
          {type}
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg='brand.subText'
          color='brand.text'
          h='80vh'
          overflow={'auto'}>
          <ModalHeader bg='brand.bg'>{type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg='brand.bg'>
            {follow &&
              follow.map((info) => (
                <FollowOrFollower info={info} onClose={onClose} />
              ))}

            {follow && !follow.length && <Text>Seems kinda empty here 🐵</Text>}
          </ModalBody>

          <ModalFooter bg='brand.bg'>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ShowFollowModal;
