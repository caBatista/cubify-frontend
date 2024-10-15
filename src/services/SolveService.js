import axios from "axios";

const API_URL = "http://localhost:8080/solve";

class SolveService {
  static async saveSolve(solveData) {
    try {
      const response = await axios.post(API_URL, solveData);
      return response.data;
    } catch (error) {
      console.error("Error saving solve:", error);
      throw error;
    }
  }

  static async getSolves() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error retrieving solves:", error);
      throw error;
    }
  }
}

export default SolveService;
