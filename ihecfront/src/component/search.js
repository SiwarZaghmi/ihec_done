import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState  } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { summarizeData,roastData } from '../API/Request';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from '@mui/material/Skeleton';




function Search() {
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const handleSummarize = async () => {
    try {
      setLoading(true);

      // Show loading toast
      toast.info('Summarizing...', { autoClose: false });
  
      const data = { language, url };
      const result = await summarizeData(data);
  
      // Close loading toast when the request is complete
      toast.dismiss();
      setResponse(result.data.summary);
      setLoading(false);
      setSearchHistory(prevSearches => [`${language} Summarize: ${url}`, ...prevSearches.slice(0, 2)]);

    } catch (error) {
      setLoading(false);

      // Handle errors and show an error toast if needed
      toast.error('An error occurred while summarizing.');
    }
  };
  
  const handleRoast = async () => {
    try {
      setLoading(true);

      // Show loading toast
      toast.info('Roasting...', { autoClose: false });
  
      const data = { language, url };
      const result = await roastData(data);
  
      // Close loading toast when the request is complete
      toast.dismiss();
      setLoading(false);
      setResponse(result.data.roast)
      setSearchHistory(prevSearches => [`${language} Roast: ${url}`, ...prevSearches.slice(0, 2)]);

      // Handle the response as needed
    } catch (error) {
      // Handle errors and show an error toast if needed
      toast.error('An error occurred while roasting.');
      setLoading(false);

    }
  };

const [url, setUrl ] = useState("")

const [response,setResponse] = useState("")
const [language, setLanguage] = useState("")
const handleLanguageChange = (event) => {
  setLanguage(event.target.value);
};
const[canSendData, setCanSendData]=useState(false)
const [errorMessage,setErrorMessage] = useState("")
const validateURL=(url)=>{
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
if(urlPattern.test(url)){
  setCanSendData(true)
  setErrorMessage("")
  setUrl(url)
}else{
  setErrorMessage("Please enter a valid URL")
  setCanSendData(false)
}
}
  return (
  <Box  sx={{
  
    display : 'flex',
    alignItems:'center',
    
    flexDirection: 'column'

    
      }}>

<FormControl error variant="standard">

    <Box sx={{
  
  display : 'flex',
  alignItems:'center',
  
  flexDirection: 'align'

  
    }}>
      
      <TextField error={errorMessage.length>0}
onChange={(event) => {
        validateURL(event.target.value);
      }}
   id="outlined-basic" label="Enter Website URL" variant="outlined" sx={{
  outlineColor:'#002B40',
  width:'70vh'}}> 

</TextField>

  <FormControl style={{ width: '30%' }} >
        <InputLabel >Language</InputLabel>
        <Select
          value={language}
    label="langue"
    onChange={handleLanguageChange}>
        <MenuItem value=""><em>None</em></MenuItem>        
        <MenuItem value={"fr"}>French</MenuItem>
        <MenuItem value={"en"}>English</MenuItem>
        </Select>
      </FormControl>

  </Box>
<FormHelperText id="component-error-text">{errorMessage}</FormHelperText>

</FormControl>
<Stack spacing={2} direction="row" sx={{ marginTop: 5 }}>

      <Button variant="contained" disabled={!canSendData ||loading} onClick={handleSummarize}>
        Summarize
      </Button>
      <Button variant="contained" disabled={!canSendData ||loading} onClick={handleRoast}>
        Roast
      </Button>
    </Stack>
    <Box>
        <h3>Last 3 Searches:</h3>
        <ul>
          {searchHistory.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </Box>
    {loading ? (
      <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={100} height={20} />
        {/* Add more Skeleton components as needed */}
      </Stack>
    ):

    <div>{response}</div>
    }

<ToastContainer position="top-right" autoClose={5000} />

  </Box>


  );
}

export default Search;

