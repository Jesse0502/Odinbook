import { Box, Button, Link, useDisclosure } from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import PostTweet from '../Home/Feed/PostTweet';
function NavOpenTweet() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {' '}
      <Button
        onClick={onOpen}
        rounded='20vh'
        bg='brand.main'
        color='brand.text'
        mt='8'
        w='full'
        // onClick={handleTweetModal}
        _hover={{ bg: 'brand.main' }}
        _active={{ bg: 'brand.main' }}
        py='6'>
        Tweet
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='brand.bg' color='brand.text' w='full' py='0'>
          <ModalHeader>Create Tweet</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg='brand.bg' color='brand.text' w='full' px='1' py='0'>
            <PostTweet onClose={onClose} />
          </ModalBody>

          <ModalFooter py='6'>
            <Link pos='absolute' left='5' colorScheme='blue' onClick={onClose}>
              Close
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NavOpenTweet;
