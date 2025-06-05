import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Home() {
  return (
    <>
      <div>
        <h1>Home</h1>
        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </div>
    </>
  );
}

export default Home;
