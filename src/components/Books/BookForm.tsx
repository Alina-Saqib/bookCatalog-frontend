import { Button, Grid, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";


const BookForm = ({ initialValues, onSubmit }: any) => {
  
  const [formData, setFormData] = useState(initialValues || {});

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, published_at: date });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.published_at) {
      toast.error("Please select a date");
      return;
    }
  
    const selectedDate = new Date(formData.published_at);
  const currentDate = new Date();

  if (selectedDate >= currentDate) {
    toast.error("Selected date should be earlier than the current date");
    return;
  }
    onSubmit(formData);
    setFormData({});
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          mb: 2,
        }}
      >
        {initialValues ? "Update Book" : "Add Book"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Author"
              variant="outlined"
              name="author"
              value={formData.author || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="number"
              label="No of Pages"
              variant="outlined"
              name="no_of_pages"
              value={formData.no_of_pages || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Published At"
                  value={formData.published_at || null}
                  onChange={handleDateChange}
                  disableFuture={true}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                bgcolor: "#08999D",
                ":hover": {
                  bgcolor: "#087275",
                },
              }}
            >
              {initialValues ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default BookForm;
