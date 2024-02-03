import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Layout from "../LayoutPage/Layout";

const Home = () => {
  return (
    <Layout>
      <Container component="main" sx={{ my: 8, textAlign: "center"}}>
        <Typography variant="h3" sx={{ fontWeight: 900 }}>
          Discover Books at{" "}
          <span style={{ color: "#08999D" }}>Book Catalog</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 5, fontSize: "20px", fontWeight: 500, color: "#808080" }}
        >
          Explore our diverse collection of books or contribute by adding your
          own!
        </Typography>
        <div>
          <Button
            component={Link}
            to="/books"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#08999D",
              ":hover": {
                bgcolor: "#087275",
              },
            }}
          >
            Browse Books
          </Button>
          <Button
            component={Link}
            to="/add-book"
            variant="outlined"
            sx={{
              mt: 3,
              ml: 2,
              borderColor: "#08999D",
              color: "#08999D",
              ":hover": {
                borderColor: "#087275",
                color: "#087275",
              },
            }}
          >
            Add Book
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
