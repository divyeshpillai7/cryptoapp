import React, { useState, useEffect } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { ThemeProvider } from '@emotion/react';
import { CircularProgress, createTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import SelectButton from './SelectButton';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { chartDays } from '../config/data';

// Registering the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  const Cont = styled('div')(({ theme }) => ({
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <Cont>
        {!historicData ? (
          <CircularProgress style={{ color: '#01141B' }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: '#2EDCE3',
                  },
                ],
              }}

              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}>{chartDays.map(day=>(
              <SelectButton key={day.value} onClick={()=> setDays(day.value)} selected={day.value===days}>
                {day.label}
                </SelectButton>
            ))}</div>
          </>
        )}
      </Cont>
    </ThemeProvider>
  );
};

export default CoinInfo;
