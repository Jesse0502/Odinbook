import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { Image } from '@chakra-ui/react';
import signupHero from '../../assets/signupHero.png';
function Media() {
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
          <Image
            mt='2'
            rounded='2xl'
            src={signupHero}
            maxH='300px'
            w='600px'
            objectFit={'cover'}></Image>
        </Flex>
        <Box pos='absolute' right={5}>
          <Menu isLazy autoSelect={false}>
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
      <Flex pt='4' pl='16'>
        <Box pr='12'>
          <FaRegComment size={18} />
        </Box>
        <AiOutlineHeart size={20} />
      </Flex>
    </Box>
  );
}

export default Media;
