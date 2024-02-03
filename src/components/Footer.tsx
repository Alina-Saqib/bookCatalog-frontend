import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <footer style={{ marginTop: "auto", backgroundColor: "#f8f8f8", padding: "20px 0" }}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Book Catalog. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
