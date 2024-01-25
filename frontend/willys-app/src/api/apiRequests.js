// api/apiRequests.js

const API_URL = "http://localhost:3003";

const apiRequests = {
  getSomeData: async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      throw new Error("Error:", error);
    }
  },
  getData: async (param) => {
    try {
      const response = await fetch(`${API_URL}/${param}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      throw new Error("Error:", error);
    }
  },
  startWebbScraping: async () => {
    try {
      const response = await fetch(`${API_URL}/start/1`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      throw new Error("Error:", error);
    }
  },
  postSomeData: async (requestData) => {
    try {
      const response = await fetch(`${API_URL}/postEndpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to post data");
      }
    } catch (error) {
      throw new Error("Error:", error);
    }
  },
  getProductData: async (param) => {
    try {
      const response = await fetch(`${API_URL}/product/${param}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      throw new Error("Error:", error);
    }
  },
  // And other API request functions... localhost:3003/product/Vetemjol-101145716_ST
};

export default apiRequests;
