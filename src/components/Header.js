import { AppBar, Container, MenuItem, Toolbar, Typography, Select } from '@mui/material'
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles()(() => {
    return{
      title: {
        flex:1,
        color: "goldenrod",
        fontFamily: "Work+Sans",
        fontWeight: "bold",
        cursor: "pointer", 
    }
  };
  });

const Header = () => {

    const { classes } = useStyles();
    const navigate = useNavigate();

    const {currency, setCurrency,user } = CryptoState();

    const darkTheme = createTheme(({
        palette: {
          primary: {
            main: '#fff',
          },
          mode: "dark",
        },
      }));

  return (
      <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkTheme}>
          <AppBar color="transparent" position="static">
              <Container>
                  <Toolbar>
                      <Typography onClick={() => navigate("/")}
                       className={classes.title} variant='h5'>CryptoEdge
                       </Typography>
                          
                      <Select variant="outlined"
                      style={{
                          width: 100,
                          height: 40,
                          marginRight: 15,
          
                      }}
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      >
                          <MenuItem value={"USD"}>USD</MenuItem>
                          <MenuItem value={"INR"}>INR</MenuItem>
                      </Select>

                      {user ? <UserSidebar /> : <AuthModal />}

                  </Toolbar>
              </Container>

          </AppBar>
          </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default Header