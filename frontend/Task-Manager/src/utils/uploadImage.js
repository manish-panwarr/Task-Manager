import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // Append image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set header for file upload
            },
        });
        return response.data; // Return the response data
    } catch (e) {
        console.error("Error uploading the image:", e);
        throw e; // Rethrow error for handling
    }
};

export default uploadImage;
