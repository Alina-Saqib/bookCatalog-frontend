import { Box, Card, useMediaQuery } from "@mui/material";
import Layout from "../../LayoutPage/Layout";
import bgImage from "../../assets/Images/backgroundImage.jpg";
import BookForm from "./BookForm";
import { addBook } from "../../api_calls/book_apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface Book {
  title: string;
  author: string;
  no_of_pages: number;
  published_at: Date;
}

const AddBook = () => {
  const isMobile = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const createBook = async (formData: Book) => {
    const response = await addBook({ ...formData });

    if (response?.status === 200) {
      toast.success("Book Added Successfully");
      navigate("/books");
    } else if (response?.status === 404)
    {
      toast.error(response.data);
    }
     else {
      toast.error("Error in Adding Book");
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <Box
        sx={{
          background: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <Card
          sx={{
            p: 5,
            textAlign: "center",
            width: isMobile ? "100%" : "30%",
          }}
        >
          <BookForm onSubmit={createBook} />
        </Card>
      </Box>
    </Layout>
  );
};

export default AddBook;
