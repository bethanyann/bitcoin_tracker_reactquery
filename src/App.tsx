import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
// styles 
import { Wrapper } from './styles/App.styles';
// actions
import { changeCurrency } from './features/appSlice';
// types
import { Currencies } from './bitcoinTypes';
//Hooks
import { useAppSelector, useAppDispatch } from './reduxHooks';
import { useGetBitcoinDataQuery } from './services/app';



//fetch function for data - create it outside of the app component so it isn't recreated on every render 
const getBitcoinData = async (): Promise<Currencies> => {
  return await (await fetch('https://blockchain.info/ticker')).json();
}

const INTERVAL_TIME = 30000; //30 second

const App = () => {
  //first argument is the query key name //second argument is the function name  //third argument is an object containing the time useQuery should refetch the data
  // const { data, isLoading, error, refetch } = useQuery<Currencies>("bc-data", getBitcoinData, { refetchInterval: INTERVAL_TIME});

  //swapping out this local state for the redux state 
  //create state for the dropdown currency value so that it is controlled by react 
  //const [ currency, setCurrency ] = useState(Currencies.USD);

  const dispatch = useAppDispatch();
  const { currency } = useAppSelector(state => state.app);

  const { data, isLoading, error } = useGetBitcoinDataQuery(undefined, {
    pollingInterval: INTERVAL_TIME
  });

  const handleCurrencySelection = (e:any) => {
    //a dispatch action is used when a state value needs updated 
    dispatch(changeCurrency(e.currentTarget.value));
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
          { data && Object.keys(data).map(currency => (
            <option key={currency} value={currency}>
                {currency}
            </option>
          ))}
        </select>
        <div>
          <h2>
            { data && data[currency].symbol }
            { data && data[currency].last }
          </h2>
        </div>
      </>
    </Wrapper>
  );
}

export default App;
