import axios from "axios";
import { allApiEndPoints } from "./ApiUrl";

export class AuthService {
  async UserSignIn(body) {
    try {
      const response = await axios.post(allApiEndPoints.userSignIn, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // Return data from the response
    } catch (error) {
      // Log the complete error for debugging
      console.error("Signup error:", error);

      // Throw the complete error so the calling function can handle it
      throw error;
    }
  }

  async UserLogin(body) {
    try {
      const response = await axios.post(allApiEndPoints.loginUser, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occured";
      console.error("login error :", errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export default AuthService;
