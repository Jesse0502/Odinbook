import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuList, MenuItem, Image } from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
function Post() {
  const redirectToSingleTweetPage = () => {
    window.location.href = '/tweet/1';
  };
  return (
    <Box
      py='3'
      pos='relative'
      px='5'
      w='100%'
      borderBottom={'1px'}
      borderColor={'whiteAlpha.200'}>
      <Flex>
        <Avatar></Avatar>
        <Flex pl='5' flexDir={'column'}>
          <Flex>
            <Text pr='1' fontWeight={'semibold'}>
              Artboy
            </Text>
            <Text pl='1' color='whiteAlpha.600' fontWeight={'light'}>
              @user
            </Text>{' '}
            <BsDot size={26} color='#606363' />
            <Text color='whiteAlpha.600' fontWeight={'light'}>
              50s
            </Text>{' '}
          </Flex>
          <Text pr='5' onClick={redirectToSingleTweetPage}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
            exercitationem optio odio modi expedita velit culpa ipsa libero
            voluptatibus excepturi illo dolore officiis, itaque obcaecati atque
            distinctio sit consequatur minus doloribus nesciunt! Iusto,
            doloribus temporibus ab commodi at totam quisquam quos possimus quis
            fugit? Repellendus enim optio, veniam aut harum saepe atque?
          </Text>
          <Image
            mt='2'
            rounded='2xl'
            src={''}
            maxH='300px'
            w='600px'
            objectFit={'cover'}></Image>
        </Flex>
        <Box pos='absolute' right={5}>
          <Menu autoSelect={false}>
            <MenuButton>
              <BiDotsHorizontalRounded size={24} />
            </MenuButton>
            <MenuList bg='brand.bg'>
              <MenuItem _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                New Window
              </MenuItem>
              <MenuItem _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                Open Closed Tab
              </MenuItem>
              <MenuItem _hover={{ bg: 'brand.subText', color: 'brand.text' }}>
                Open File
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Flex py='2' pl='16'>
        <Flex alignItems={'center'} pr='12'>
          <FaRegComment size={18} />
          <Text pl='3'>23</Text>
        </Flex>
        <Flex alignItems={'center'} pr='12'>
          <AiOutlineHeart size={20} />
          <Text pl='3'>54</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Post;
