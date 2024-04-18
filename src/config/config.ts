const config = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  imagesUrl:
    process.env.REACT_APP_API_IMAGES_URL || "http://localhost:5000/uploads/",
};

export default config;
