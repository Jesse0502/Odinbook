import React, { useState } from 'react';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  List,
  Text,
} from '@chakra-ui/layout';
import { FaTwitter } from 'react-icons/fa';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Tooltip } from '@chakra-ui/react';
function SignupModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPass, setShowPass] = useState<Boolean>(false);
  const [formError, setFormError] = useState<null | String>(null);
  const handleShowPass = () => {
    if (showPass) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };

  const handleFormSubmit = (e: any) => {
    if (e.target[4].value !== e.target[5].value) {
      setFormError('Passwords must match!');
    } else {
      setFormError(null);

      const body = {
        name: e.target[1].value,
        username: e.target[2].value,
        email: e.target[3].value,
        password: e.target[4].value,
      };
      console.log(body);
    }
  };
  return (
    <>
      <Center
        my='10'
        as={Button}
        _hover={{ bg: 'whiteAlpha.200' }}
        bg='whiteAlpha.100'
        border='1px solid whitesmoke'
        onClick={onOpen}
        rounded={49}>
        <Text
          fontWeight={500}
          px='4'
          bg='transparent'
          _hover={{ bg: 'transparent' }}>
          Signup with email and password
        </Text>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          rounded='lg'
          w='full'
          mx={{ lg: '0', base: '2' }}
          bg='brand.subText'
          color='brand.text'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(e);
            }}>
            <ModalCloseButton />
            <ModalHeader>
              <Center>
                <FaTwitter size={35} color='#35B9F9' />
              </Center>
            </ModalHeader>
            <ModalBody>
              <Box py='5'>
                <Heading fontSize={30}>Create your account</Heading>
                <Input
                  w='full'
                  mt='10'
                  mb='6'
                  isRequired
                  h='12'
                  placeholder='Enter name'
                  borderColor='whiteAlpha.400'></Input>
                <Input
                  w='full'
                  isRequired
                  mb='6'
                  h='12'
                  placeholder='Enter username'
                  borderColor='whiteAlpha.400'></Input>
                <Input
                  w='full'
                  isRequired
                  type='email'
                  mb='6'
                  h='12'
                  placeholder='Enter email'
                  borderColor='whiteAlpha.400'></Input>
                <InputGroup>
                  <Input
                    w='full'
                    isRequired
                    type={showPass ? 'text' : 'password'}
                    mb='6'
                    h='12'
                    placeholder='Enter password'
                    borderColor='whiteAlpha.400'></Input>
                  <InputRightElement
                    children={
                      <Link
                        onClick={handleShowPass}
                        variant={'link'}
                        mr='6'
                        mt='1'>
                        {!showPass ? 'Show' : 'Hide'}
                      </Link>
                    }
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    w='full'
                    isRequired
                    type={showPass ? 'text' : 'password'}
                    mb='6'
                    h='12'
                    placeholder='Confirm password'
                    borderColor='whiteAlpha.400'></Input>
                  <InputRightElement
                    children={
                      <Link
                        onClick={handleShowPass}
                        variant={'link'}
                        mr='6'
                        mt='1'>
                        {!showPass ? 'Show' : 'Hide'}
                      </Link>
                    }
                  />
                </InputGroup>
                <Text color='red'>{formError}</Text>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Link
                color='brand.text'
                type='reset'
                variant='link'
                mr={5}
                onClick={onClose}>
                Close
              </Link>
              <Button
                variant='solid'
                type='submit'
                border='2px solid'
                borderColor={'brand.main'}
                colorScheme='twitter'
                color='brand.text'
                _hover={{ bg: 'brand.main' }}>
                Create Account
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignupModal;
