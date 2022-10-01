import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
//styles 
import { Wrapper } from './styles/App.styles';

type BitcoinData = {
  '15m': number;
  buy: number;
  last: number;
  sell: number;
  symbol: string;
}

//type for the whole bitcoin object
type Currencies = {
  //each key is a string, and each one is paired with a BitcoinData obj
  [key: string]: BitcoinData
}

//fetch function for data - create it outside of the app component so it isn't recreated on every render 
const getBitcoinData = async (): Promise<Currencies> => {
  return await (await fetch('https://blockchain.info/ticker')).json();
}

const INTERVAL_TIME = 30000; //30 second

const App = () => {
                                             //first argument is the query key name
                                             //second argument is the function name
  const { data, isLoading, error, refetch } = useQuery<Currencies>("bc-data", getBitcoinData);

  //create state for the dropdown currency value so that it is controlled by react 
  const [ currency, setCurrency ] = useState('USD');

  const handleCurrencySelection = (e:any) => {
    setCurrency(e.currentTarget.value);
  }

  //console.log(data);

  if(isLoading) return <div> Loading...</div>
  if(error) return <div> Whoops! </div>

  return (
    <Wrapper>
      <>
        <h2>Bitcoin Price</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {/* need to map through the data here, and we want the keys from the options to be the values  */}
          {data && Object.keys(data).map(currency => (
            <option key={currency} value={currency}/>
          ))}
        </select>
      </>
    </Wrapper>
  );
}

export default App;
