import AXIOS_API from "../Api/api";

export const authApi = {
  login: async (email, password) => {
    try {
      const res = await AXIOS_API.post("/api/v1/register/signIn", {
        email,
        password,
      });
      if (!res.ok) {
        return res.status(400).json({
          message: "Login failed",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Login failed",
      });
    }
  },

  logout: async () => {
    try {
      await AXIOS_API.post("/api/v1/register/logout");
      return res.status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  refresh: async () => {
    try {
      const res = await AXIOS_API.post("/api/v1/register/refresh");
      if (!res.ok) {
        return res.status(400).json({
          message: "Login failed",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Login failed",
      });
    }
  },
};
