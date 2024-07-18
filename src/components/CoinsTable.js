import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { LinearProgress, TableContainer, TableCell, TableHead, Table, TextField, ThemeProvider, createTheme, TableRow, TableBody, Container, Typography, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CoinsTable = () => {
    const navigate = useNavigate();

    const Row = styled(TableRow)(({ theme }) => ({
        backgroundColor: "inherit",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#01141B",
        },
        fontFamily: "Poppins",
    }));

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const { currency } = CryptoState();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    //state for pages
    const [page, setpage] = useState(1);

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography variant='h4' style={{ margin: 50, fontFamily: 'Poppins' }}>
                    Crypto Currency Prices by Market Cap
                </Typography>

                <TextField
                    label="Search for a crypto currency.."
                    variant='outlined'
                    style={{ marginBottom: 20, width: '100%' }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: 'gold' }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: '#E1DEDF' }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            key={head}
                                            style={{
                                                color: 'white',
                                                backgroundColor: "#01141B",
                                                fontWeight: '700',
                                                fontFamily: 'Poppins',
                                            }}
                                            align={head === 'Coin' ? 'left' : 'right'}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return (
                                        <Row key={row.id} onClick={() => navigate(`/coins/${row.id}`)}>
                                            <TableCell component="th" scope="row" style={{ display: 'flex', gap: 15 }}>
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height="50"
                                                    style={{ marginBottom: 10 }}
                                                />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ textTransform: 'uppercase', fontSize: 22 }}>
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color: 'darkgrey' }}>
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.current_price}
                                            </TableCell>
                                            <TableCell align="right" style={{ color: profit ? 'green' : 'red' }}>
                                                {profit && '+'}{row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </TableCell>
                                        </Row>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>

                {/* pages  */}
                <Pagination

                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    onChange={(_, value) => {
                        setpage(value);
                        window.scroll(0, 450);
                      }}

                />


            </Container>
        </ThemeProvider>
    );
};

export default CoinsTable;
