import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = ({ children }: any) => {
  return (
    <Box>
      <NavBar />
      <Box>{children}</Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
