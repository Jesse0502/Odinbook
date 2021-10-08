import './index.css';
import { Box, ChakraProvider } from '@chakra-ui/react';
import Signup from './components/LoginForm/Signup';
import { extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home/Home';
import CantEnterPage from './components/AccessDenied/CantEnterPage';
function App() {
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
  useEffect(() => {
    //check user is logged in
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div className='App'>
          {false ? (
            <Switch>
              <Route path='/' exact component={Signup}></Route>
              <Route path='*' exact component={CantEnterPage}></Route>
            </Switch>
          ) : (
            <Switch>
              <Route path='/home' exact component={Home}></Route>
              <Route component={CantEnterPage}></Route>
            </Switch>
          )}
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
