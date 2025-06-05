import { useParams } from 'react-router';

function MessageDisplay(){
  const {message} = useParams();

  return (
    <p>{message}</p>
  );
}

export default MessageDisplay;