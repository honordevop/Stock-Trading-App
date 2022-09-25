import axios from 'axios';


const API_KEY = "ccnbfmiad3i1nkreuksgccnbfmiad3i1nkreukt0"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: API_KEY
    }
})