import './index.css';
import { Box, ChakraProvider } from '@chakra-ui/react';
import Signup from './components/LoginForm/Signup';
import { extendTheme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import CantEnterPage from './components/AccessDenied/CantEnterPage';
import Profile from './components/Profile/Profile';
import SingleTweet from './components/Profile/SingleTweet/SingleTweet';
import useAuth from './components/customHooks/useAuth';
import { TweetPostContext } from './components/Context/TweetPostContext';
import Chat from './components/Chat/Chat';
import Messages from './components/Chat/Messages/Messages';
import Notifications from './components/Notifications/Notifications';
function App() {
  const { authInfo } = useAuth();
  const [tweetPost, setTweetPost] = useState(true);
  const theme = extendTheme({
    colors: {
      brand: {
        main: '#1DA1F2',
        bg: '#1A1C1D',
        text: '#f5f5f5',
        subText: '#1F2223',
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div className='App'>
          {!authInfo ? (
            <Switch>
              <Route path='/' exact component={Signup}></Route>
              <Route path='*' exact component={CantEnterPage}></Route>
            </Switch>
          ) : (
            <Switch>
              <Route path='/home' exact component={Home}></Route>
              <Route path='/search/' exact component={Chat}></Route>
              <Route
                path='/notifications/'
                exact
                component={Notifications}></Route>
              <Route path='/chat/:id' exact component={Messages}></Route>
              <Route path='/tweet/:id' exact component={SingleTweet}></Route>
              <Route path='/:user' exact component={Profile}></Route>
              <Redirect exact from='/' to='/home'></Redirect>
              <Route component={CantEnterPage}></Route>
            </Switch>
          )}
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
