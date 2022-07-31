import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.post["Content-Type"] = "application/json";

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpService;
