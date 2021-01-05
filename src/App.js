//import logo from './logo.svg';
import './App.css';
import {Grid} from '@material-ui/core';
import Search from './components/Search';

function App() {
  return (
    <Grid className="App" 
    container
    direction='column' 
    justify='center' 
    alignItems='center'>
      <h1>Url shortner</h1>
      <Search></Search>
    </Grid>
  );
}

export default App;
