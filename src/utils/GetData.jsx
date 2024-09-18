import axios from "axios";
const url = "https://api.quicksell.co/v1/internal/frontend-assignment";
const GetData = async () => {
  const response = await axios.get(url);
  return response.data;
};

export default GetData;
