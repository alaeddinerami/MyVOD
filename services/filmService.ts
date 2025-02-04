import axios from "axios";

const API_BASE_URL ='http://192.168.9.4:3000/api/films';

export const filmService = {
    getAllFilm: async() => {
        try {
            const response = await axios.get(`${API_BASE_URL}`)
        } catch (error) {
            
        }
    }
}