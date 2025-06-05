import { useParams } from 'react-router';
import { Typography } from '@mui/material';

function MessageDisplay(){
  const {message} = useParams();

  return (
    <Typography variant='h1' component='p'>{message}</Typography>
  );
}

export default MessageDisplay;