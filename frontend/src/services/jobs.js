import axios from 'axios'
const baseUrl = 'https://api.adzuna.com/v1/api/jobs'
const app_id = 'c1517db1'
const api_key = '91d1ecf4a9b0e82f546d9aae3b8cdd16'
const country = 'us'
const page = 1


const search = async(query) => {
    console.log('services/jobs.js search method')

    const response = await axios.get(`${baseUrl}/${country}/search/${page}?app_id=${app_id}&app_key=${api_key}&what=${query}`);

    
    return response.data;
}

export default {search}