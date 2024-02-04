import { Box, Modal } from "@mui/material";
import BookForm from "./BookForm";
import dayjs from "dayjs";
import { updateBook } from "../../api_calls/book_apis";
import { toast} from "react-toastify";

interface Book {
  title: string;
  author: string;
  no_of_pages: number;
  published_at: Date;
}

const UpdateBook = ({ open, handleClose, editBookData ,fetchAllBooks}: any) => {
  const EditBook = async (formData: Book) => {
      const { _id } = editBookData;
      const response = await updateBook(formData, _id);
    if (response?.status === 200) {
      toast.success(response?.data.message);
      fetchAllBooks();
      handleClose();
      
    } 
    else if(response?.status === 404)
    {
      toast.error(response?.data.message);
    }
    else {
      toast.error("Error in updating Book");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          width: {xs:'65%' , md:"30%"},
        }}
      >
        {editBookData ? (
          <BookForm
            initialValues={{
              title: editBookData.title || "",
              author: editBookData.author || "",
              no_of_pages: editBookData.no_of_pages || "",
              published_at: dayjs(editBookData.published_at)|| null,
            }}
            onSubmit={EditBook}
          />
        ) : (
          <p>No book data provided for editing.</p>
        )}
      </Box>
    </Modal>
  );
};


export default UpdateBook;
