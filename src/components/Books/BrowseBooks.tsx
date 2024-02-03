import { useEffect, useState } from "react";
import Layout from "../../LayoutPage/Layout";
import { deleteBook, getBooks } from "../../api_calls/book_apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import UpdateBook from "./UpdateBook";
import { useNavigate } from "react-router-dom";
const columnsHead = [
  "ID",
  "Title",
  "Author",
  "No of Pages",
  "Published At",
  "Actions",
];

const ITEMS_PER_PAGE = 5;
const BrowseBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [page,setPage]=useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBookData, setEditBookData] = useState(null);
  const [noBooks, setNoBooks] = useState(false)
  const navigate = useNavigate();
 
  const fetchAllBooks = async () => {
    try {
      const response = await getBooks(page,ITEMS_PER_PAGE);
      if (response?.status === 200) {
        setAllBooks(response?.data?.books);
        setTotalPages(response?.data?.totalPages);
      if(response?.data?.books.length === 0)
      setNoBooks(true)
      
      } 
      else if(response?.status === 404)
      {
        toast.error(response.data.message);
      }
      else {
        toast.error("Error in fetching Books");
      }
    } catch (error) {
      toast.error("Error in fetching Books");
    }
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    console.log(event);
    setPage(newPage);
    
  };

  useEffect(() => {
    fetchAllBooks();
  }, [page]);

 



  const handleEdit = (bookData: any) => {
    setEditBookData(bookData);
    setEditModalOpen(true);
    console.log("Edit book with ID:", bookData);
  };

  const handleCloseEditModal = () => {
    // Close the edit modal
    setEditModalOpen(false);
    setEditBookData(null);
  };

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string>('');

  const handleDelete = (id: string) => {
    setBookToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await deleteBook(bookToDelete);
      if (response?.status === 200) {
        toast.success("Book deleted successfully!");
        if (allBooks.length === 1 && page > 1) {
          setPage(page - 1);
        }else
         {fetchAllBooks();}
      } else if (response?.status === 404) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book");
    } finally {
      setDeleteConfirmationOpen(false);
      setBookToDelete("");
     
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setBookToDelete('');
    toast.info("Book deletion cancelled");
  };


  return (
    <Layout>
      <ToastContainer />
      <Box
        sx={{
          p: 5,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Books Data
        </Typography>
        <TableContainer component={Paper} sx={{boxShadow:"none"}}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#08999D" }}>
                {columnsHead.map((item,index) => (
                  <TableCell key={index} sx={{ color: "white", fontSize: "16px" }}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: "whitesmoke" }}>
  {noBooks ? (
    <TableRow>
      <TableCell colSpan={columnsHead.length} align="center">
        <Typography variant="body1" color="textSecondary">
          No books to display! Please add
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 1,
            bgcolor: "#08999D",
            ":hover": {
              bgcolor: "#087275",
            },
          }}
          onClick={() => {
            navigate("/add-book");
          }}
        >
          Add Book
        </Button>
      </TableCell>
    </TableRow>
  ) : (
    allBooks.map((book: any, index: number) => (
      <TableRow key={book._id}>
        <TableCell>{(page - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
        <TableCell>{book?.title}</TableCell>
        <TableCell>{book?.author}</TableCell>
        <TableCell>{book?.no_of_pages}</TableCell>
        <TableCell>
          {new Date(book?.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </TableCell>
        <TableCell>
          <Button
            onClick={() => handleEdit(book)}
            variant="outlined"
            color="primary"
            sx={{ mx: 1 }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(book?._id)}
            variant="outlined"
            color="secondary"
            sx={{my:{xs:1 ,md:0,lg:0}}}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

          </Table>
          <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "#08999D"
                  },
                 
            }}
          />
        </Box>
       
        </TableContainer>
      </Box>
      {/* Update Model */}
      <UpdateBook
        open={editModalOpen}
        handleClose={handleCloseEditModal}
        editBookData={editBookData}
        fetchAllBooks={fetchAllBooks}
        
      />

      
      {/* Delete Dialog */}
        <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Book"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this book? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default BrowseBooks;
