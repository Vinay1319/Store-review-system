import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users";

export const getAllStores = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stores`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stores:", error);
        return [];
    }
};

export const searchStores = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stores/search`, {
            params: { query }
        });
        return response.data;
    } catch (error) {
        console.error("Error searching stores:", error);
        return [];
    }
};

export const submitRating = async (userId, storeId, rating) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ratings`, {
            userId,
            storeId,
            rating
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting rating:", error);
        return null;
    }
};
