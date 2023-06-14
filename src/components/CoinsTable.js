import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { ThemeProvider, StyledEngineProvider, createTheme} from '@mui/material/styles';
import { LinearProgress, TableBody, TableRow } from '@mui/material';
import { Container, Table, TableContainer, TextField, Typography,TableHead, TableCell , Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Pagination from '@mui/material/Pagination';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
    const [search,setSearch] = useState();
    const [page, setPage] = useState(1);
    
    const { currency,symbol,coins,loading,fetchCoins } = CryptoState();
 
    useEffect(() => {
        fetchCoins();
    }, [currency])

    const darkTheme = createTheme(({
        palette: {
          primary: {
            main: '#fff',
          },
          mode: "dark",
        },
      }));

      const handleSearch = () => {
        if(search==null) return coins;
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

    const useStyles = makeStyles()((theme) => ({
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Work+Sans",
      },
        pagination: {
          "& .MuiPaginationItem-root": {
          color: "gold",
        },
      }  
    }))

    const {classes} = useStyles();
    const navigate = useNavigate();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <Container style={{
             textAlign: "center"
        }}>
            <Typography 
            variant="h4" 
            style={{
                margin:18, fontFamily:"Work+Sans",
            }}>
               Realtime Cryptocurrency Prices
            </Typography>
            <TextField label="Search Crypto Currency" 
            variant='outlined'
            style={{
              marginBottom: 20, width:"75%"
            }}
            onChange={(e) => setSearch(e.target.value)} />

            <TableContainer component={Paper}>
              {loading ? (
                <LinearProgress style={{
                  backgroundColor: "goldenrod"}} />
              ) : (
                <Table>
                  <TableHead style={{ backgroundColor: "goldenrod"}}>
                    <TableRow>
                      {["COIN","PRICE","24H CHANGE","MARKET CAP"].map((head) =>(
                        <TableCell 
                        style={{ 
                          color: "black",
                          fontWeight: "900", 
                          fontFamily: "Work+Sans", 
                        }}
                        key={head} 
                        align={head === "COIN" ? "" : "right"} 
                        >
                          {head}

                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      
                      return(
                        <TableRow 
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}>
                              
                              <TableCell
                              component="th"
                              scope="row"
                              style={{
                                display: "flex",
                                gap:15,
                              }}
                             >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                              />
                              <div style={{ display: "flex", flexDirection:"column"}}>

                              <span 
                              style={{
                                textTransform: "uppercase",
                                fontSize:22,
                              }}
                              
                              >
                                {row.symbol}
                              </span>
                              
                              <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                              </div>

                            </TableCell>
                            <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>


                        </TableRow>
                      )
                    })}
                  </TableBody>

                </Table>
              )}
            </TableContainer>

            <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />

        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}


export default CoinsTable