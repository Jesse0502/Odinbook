import React, { useEffect, useState } from 'react';
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
  HStack,
  Link,
  List,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { FaTwitter } from 'react-icons/fa';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/input';
import { CircularProgress, Tooltip } from '@chakra-ui/react';
import useFetch from '../customHooks/useFetch';

function SignupModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPass, setShowPass] = useState<Boolean>(false);
  const [formError, setFormError] = useState<null | String>(null);
  const [url, setUrl] = useState<null | string>();
  interface postBodyInterface {
    name: String;
    username: String;
    email: String;
    password: String;
  }
  const [postBody, setPostBody] = useState<postBodyInterface>();
  const handleShowPass = () => {
    if (showPass) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };
  const [spinner, setSpinner] = useState<boolean>(false);
  const handleFormSubmit = (e: any) => {
    if (e.target[4].value !== e.target[5].value) {
      setFormError('Passwords must match!');
    } else {
      setFormError(null);
      setSpinner(true);
      const body = {
        name: e.target[1].value,
        username: e.target[2].value,
        email: e.target[3].value,
        password: e.target[4].value,
      };
      setUrl('/signup');
      setPostBody(body);
    }
  };
  const { fetchData, fetchIsPending, fetchError } = useFetch(
    url,
    'POST',
    postBody
  );
  useEffect(() => {
    if (fetchData) {
      setSpinner(false);
    }
  }, [fetchData]);
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
                <Stack spacing={4}>
                  <InputGroup>
                    <InputLeftAddon
                      children='@'
                      fontSize={'20'}
                      h='12'
                      bg='brand.bg'
                      border='1px'
                      borderColor='whiteAlpha.400'
                    />
                    <Input
                      w='full'
                      h='12'
                      isRequired
                      mb='6'
                      pl='3'
                      placeholder='Enter username'
                      borderColor='whiteAlpha.400'></Input>
                  </InputGroup>
                </Stack>
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
                <Text color='green.400'>
                  {fetchData ? fetchData.success : ''}
                </Text>
                <Text color='red.400'>{fetchData ? fetchData.error : ''}</Text>
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
                minW='100px'
                _hover={{ bg: 'brand.main' }}>
                {spinner ? (
                  <CircularProgress
                    isIndeterminate
                    color='brand.main'
                    size='30px'
                    thickness={12}
                  />
                ) : (
                  'Create Account'
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignupModal;
