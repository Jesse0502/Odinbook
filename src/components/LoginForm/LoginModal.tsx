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
  Link,
  List,
  Text,
} from '@chakra-ui/layout';
import { FaTwitter } from 'react-icons/fa';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { FormControl, FormLabel, Tooltip } from '@chakra-ui/react';
import { CircularProgress } from '@chakra-ui/react';
import useFetch from '../customHooks/useFetch';
function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPass, setShowPass] = useState<Boolean>(false);
  const [formResult, setFormResult] = useState();
  const [url, setUrl] = useState<string>();
  const [postBody, setPostBody] = useState<any>();
  const [spinner, setSpinner] = useState<boolean>(false);
  const handleShowPass = () => {
    if (showPass) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };

  const handleFormSubmit = (e: any) => {
    const body = {
      email: e.target[1].value,
      password: e.target[2].value,
    };
    setSpinner(true);
    setUrl('/login');
    setPostBody(body);
    console.log(body);
  };
  const { fetchData, fetchError, fetchIsPending } = useFetch(
    url,
    'POST',
    postBody
  );

  useEffect(() => {
    if (fetchData) {
      setSpinner(false);
    }
    if (fetchData && fetchData.success) {
      localStorage.setItem('token', fetchData.user);
      window.location.href = '/';
    }
  }, [fetchData]);
  return (
    <>
      <Box
        as={'span'}
        display={'inline-block'}
        _hover={{ bg: 'whiteAlpha.200' }}
        onClick={onOpen}>
        <Text fontWeight={500} bg='transparent' _hover={{ bg: 'transparent' }}>
          Login
        </Text>
      </Box>

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
              <Box py='5' h='96'>
                <Heading fontSize={30}>Login into your account</Heading>
                <FormControl mt='16' mb='5'>
                  <FormLabel>
                    <Heading size={'md'}>Email</Heading>
                  </FormLabel>
                  <Input
                    w='full'
                    isRequired
                    type='email'
                    h='12'
                    placeholder='Enter email'
                    borderColor='whiteAlpha.400'></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <Heading size={'md'}>Password</Heading>
                  </FormLabel>
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
                </FormControl>
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
                isDisabled={spinner}
                _hover={{ bg: 'brand.main' }}>
                {!spinner ? (
                  'Login'
                ) : (
                  <CircularProgress
                    isIndeterminate
                    thickness={12}
                    size='30px'
                    px='3'
                    color='brand.main'
                  />
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
