import { Container, Typography } from "@mui/material";
import TodoList from "./components/TodoList";


function App() {
  return (
    <>
      <Container maxWidth='sm'>
        <Typography variant="h3" align="center" component="h2">
          To-Do-List
        </Typography>
        <TodoList />
      </Container>
    </>
  );
}

export default App;
