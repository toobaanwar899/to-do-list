import { allApiEndPoints } from "../ApiUrl";
import axiosInstance from "../interceptor/interceptor";

export class Service {
  async AddTask(body) {
    try {
      const response = await axiosInstance.post(allApiEndPoints.addTask, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Task cannot add:", error);
      throw error;
    }
  }

  async AllTask(params) {
    const { search } = params;
    try {
      const response = await axiosInstance.get(allApiEndPoints.getAllTask, {
        params: {
          search,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching Task data:",
        error.message,
        error.response?.data || "No additional error details"
      );
      throw error;
    }
  }

  async getTaskById(id) {
    try {
      const response = await axiosInstance.get(
        `${allApiEndPoints.getTaskById}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching Task data:",
        error.message,
        error.response?.data || "No additional error details"
      );
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      const response = await axiosInstance.delete(
        `${allApiEndPoints.delete}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error in deleting data:",
        error.message,
        error.response?.data || "No additional error details"
      );
      throw error;
    }
  }

  async UpdateTask(body, id) {
    try {
      const url = `${allApiEndPoints.updateTask}/${id}`;
      const response = await axiosInstance.put(url, body);
      return response;
    } catch (error) {
      console.error(
        "Edit Task error:",
        error.message,
        error.response?.data || "No additional error details"
      );
      throw error;
    }
  }

  async UpdateTaskStatus(body, id) {
    try {
      const url = `${allApiEndPoints.updateTaskStatus}/${id}`;
      const response = await axiosInstance.put(url, body);
      return response;
    } catch (error) {
      console.error(
        "Edit Task error:",
        error.message,
        error.response?.data || "No additional error details"
      );
      throw error;
    }
  }
}
