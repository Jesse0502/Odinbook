import React, { useEffect, useState } from 'react';
import { Avatar, Button, Image, Textarea } from '@chakra-ui/react';
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
import { Box, Center, Flex, Link, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Upload, message } from 'antd';
import { BiCamera } from 'react-icons/bi';
import useAuth from '../customHooks/useAuth';
import useFetch from '../customHooks/useFetch';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
function EditProfileModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<any>(false);
  const [loading2, setLoading2] = useState<any>(false);
  const [url, setUrl] = useState<string | null>();
  const [postBody, setPostBody] = useState<any>();
  const [loggedInUserInfo, setLoggedInUserInfo] = useState<null | any>(null);
  const [editIsPending, setEditIsPending] = useState<boolean>(false);
  useEffect(() => {
    if (authInfo) {
      fetch(
        `https://twitter-clone-69.herokuapp.com/profile/${authInfo.username}`
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setLoggedInUserInfo(result.user[0]);
        })
        .catch((err) => {});
      console.log('running url');
    }
  }, [isOpen]);

  function beforeUpload(file) {}
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setLoading({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  function beforeUpload2(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      return setLoading2({ error: 'You can only upload JPG/PNG file!' });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return setLoading2({ error: 'Image must smaller than 2MB!' });
    }
    return isJpgOrPng && isLt2M;
  }
  const handleChange2 = (info) => {
    if (info.file.status === 'uploading') {
      setLoading2({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setLoading2({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  const { authInfo } = useAuth();
  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    setEditIsPending(true);
    const body = {
      profileBanner: loading2.imageUrl
        ? loading2.imageUrl
        : loggedInUserInfo.profileBanner
        ? loggedInUserInfo.profileBanner
        : '',
      profilePic: loading.imageUrl
        ? loading.imageUrl
        : loggedInUserInfo.profilePic
        ? loggedInUserInfo.profilePic
        : '',
      name: e.target[2].value,
      bio: e.target[3].value,
      location: e.target[4].value,
    };
    setUrl('/profile/' + authInfo.username + '?_method=PUT');
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
      setEditIsPending(false);
      window.location.reload();
    }
  });
  return (
    <Box>
      <Box
        as={Button}
        bg='transparent'
        border='1px'
        borderColor={'whiteAlpha.600'}
        color='brand.text'
        _hover={{ bg: 'transparent' }}
        top='4'
        right='5'
        onClick={onOpen}
        rounded='full'>
        Edit Profile
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='brand.bg' color='brand.text'>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => handleEditSubmit(e)}>
            <ModalBody pb={6}>
              <Flex alignItems={'center'}>
                <AiOutlineExclamationCircle size={'20'} />
                <Text pl='2'>Image should be less that 10kb in size</Text>
              </Flex>
              <FormControl mt={4} zIndex={994}>
                <Box pos='absolute' bottom='-6' right='0'>
                  {loading2.loading ? 'uploading...' : ''}
                  {loading2.error ? 'some error occured' : ''}
                </Box>
                {loading2.loading ? (
                  ''
                ) : (
                  <Box pos='absolute' bottom='-6' right='0'>
                    {loading.loading ? 'uploading...' : ''}
                    {loading.error ? 'some error occured' : ''}
                  </Box>
                )}

                <Upload
                  name='profileBanner'
                  listType='picture-card'
                  showUploadList={false}
                  action='http://www.mocky.io/v2/5cc8019d300000980a055e76'
                  method='POST'
                  // beforeUpload={beforeUpload2}
                  onChange={handleChange2}>
                  {loading2.imageUrl ? (
                    <Center
                      border='2px dashed'
                      borderColor={'whiteAlpha.500'}
                      pos='relative'>
                      <Box pos='absolute'>
                        <BiCamera size={30} />
                      </Box>
                      <Image
                        opacity='0.5'
                        maxH='200px'
                        w='full'
                        objectFit={'cover'}
                        src={loading2.imageUrl}></Image>
                      {message.error}
                    </Center>
                  ) : (
                    <Center
                      border='2px dashed'
                      borderColor={'whiteAlpha.500'}
                      pos='relative'
                      h='200px'>
                      <Box pos='absolute'>
                        <BiCamera size={30} />
                      </Box>
                      <Image
                        opacity='0.5'
                        maxH='200px'
                        w='full'
                        objectFit={'cover'}
                        src={
                          loggedInUserInfo && loggedInUserInfo.profileBanner
                            ? loggedInUserInfo.profileBanner
                            : ''
                        }></Image>
                    </Center>
                  )}
                </Upload>
              </FormControl>
              <FormControl mt={4} pos='relative' zIndex={999}>
                <Box pos='absolute' top='-16' left='3'>
                  <Center>
                    <Box pos='absolute' zIndex={999}>
                      <BiCamera size={30} />
                    </Box>
                    <Upload
                      // name='profileBanner'
                      // listType='picture-card'
                      showUploadList={false}
                      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                      // beforeUpload={beforeUpload}
                      onChange={handleChange}>
                      {loading.imageUrl ? (
                        <Center
                          borderColor={'whiteAlpha.500'}
                          pos='relative'
                          zIndex={999}>
                          <Box pos='absolute'>
                            <BiCamera size={30} />
                          </Box>
                          <Avatar
                            border='2px dashed'
                            borderColor={'whiteAlpha.600'}
                            size={'xl'}
                            opacity='0.6'
                            objectFit={'cover'}
                            src={loading.imageUrl}></Avatar>
                          {message.error}
                        </Center>
                      ) : (
                        <Center
                          zIndex={999}
                          borderColor={'whiteAlpha.500'}
                          pos='relative'>
                          <Box pos='absolute'>
                            <BiCamera size={30} />
                          </Box>
                          <Avatar
                            border='2px dashed'
                            borderColor={'whiteAlpha.600'}
                            size={'xl'}
                            opacity='0.5'
                            objectFit={'cover'}
                            src={
                              loggedInUserInfo && loggedInUserInfo.profilePic
                                ? loggedInUserInfo.profilePic
                                : ''
                            }></Avatar>
                        </Center>
                      )}
                    </Upload>
                  </Center>
                </Box>
              </FormControl>
              <FormControl pt='16'>
                <Input
                  placeholder='Name'
                  defaultValue={loggedInUserInfo ? loggedInUserInfo.name : ''}
                  borderColor={'whiteAlpha.600'}></Input>
              </FormControl>
              <FormControl pt='5'>
                <Textarea
                  placeholder='Bio'
                  defaultValue={
                    loggedInUserInfo && loggedInUserInfo.bio
                      ? loggedInUserInfo.bio
                      : ''
                  }
                  borderColor={'whiteAlpha.600'}></Textarea>
              </FormControl>
              <FormControl pt='5'>
                <Input
                  placeholder='Location'
                  defaultValue={
                    loggedInUserInfo && loggedInUserInfo.location
                      ? loggedInUserInfo.location
                      : ''
                  }
                  borderColor={'whiteAlpha.600'}></Input>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Link as={Link} mr={3} onClick={onClose}>
                Close
              </Link>
              <Button
                isDisabled={editIsPending}
                type='submit'
                colorScheme='twitter'>
                {!editIsPending ? 'Update' : 'Updating...'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default EditProfileModal;
