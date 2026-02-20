import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";

import { Outlet } from "react-router";
function App() {
  return (
    <Box sx={{ backgroundColor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Outlet></Outlet>
      </Container>
    </Box>
  )
}

export default App


