import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import Search from './component/search';

function App() {
  return (
    <Box 
         sx={{
               backgroundColor:'#87CEEB',
               height: '100vh',
               display:'flex',
               flexDirection:'column',
               alignItems:'center'





         }}
    
    
    
    >
    <Typography variant="h3" gutterBottom>
        what does this company do?
      </Typography>
    <Search></Search>
      
      </Box>
  );
}

export default App;
