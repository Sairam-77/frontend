import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json",
  },
});

// const createUser = async (data:any) => {
//   const response = await apiClient.post<any>("/create", data);
//   return response.data;
// }

const getMovies = async () => {
  const response = await apiClient.get("/movies", );
  return response.data;
}

const updateSeats = async (id,selected,selectedSeats)=>{
   const response = await apiClient.put("/movies",{id,selected,selectedSeats});
   return response.data
}

const ticketBooking = async (props)=>{
  const response = await apiClient.post("/ticket/create",props);
  return response
}

const ticketList = async (props)=>{
  const response = await apiClient.post("/ticket/list",props);
  return response
}


const MovieService = {
 
  getMovies,
  updateSeats,
  ticketBooking,
  ticketList
}

export default MovieService;