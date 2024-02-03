import axios from "./BaseUrl";

interface Book {
  title: string;
  author: string;
  no_of_pages: number;
  published_at: Date;
}

//add-book
export const addBook = async ({
  title,
  author,
  no_of_pages,
  published_at,
}: Book) => {
  try {
    const response = await axios.post("/add-book", {
      title,
      author,
      no_of_pages,
      published_at,
    });

    return response;
  } catch (error) {
    console.log("Error is adding Book", error);
  }
};

//get-all-books
export const getBooks = async (page: number,ITEMS_PER_PAGE:number) => {
  try {
    const response = await axios.get(`/get-books?page=${page}&limit=${ITEMS_PER_PAGE}`);

    return response;
  } catch (error) {
    console.log("Error is fetching Books", error);
  }
};

export const getBookById = async (id: string) => {
  try {
    const response = await axios.get(`/getbookById/${id}`);

    return response;
  } catch (error) {
    console.log("Error is fetching Book", error);
  }
};

export const updateBook = async (
  { title, author, no_of_pages, published_at }: Book,
  id: string
) => {
  try {
    const response = await axios.put(`/update-book/${id}`, {
      title,
      author,
      no_of_pages,
      published_at,
    });

    return response;
  } catch (error) {
    console.log("Error in updating Book", error);
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await axios.delete(`/delete-book/${id}`);
    return response;
  } catch (error) {
    console.log("Error in deleting Book", error);
  }
};
