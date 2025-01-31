import { environment } from "@/environments/environment";

export const allApiEndPoints = {
  userSignIn: `${environment.baseURL}signup`,
  
  loginUser: `${environment.baseURL}login`,

  delete: `${environment.baseURL}user/DeleteTasks`,

  addTask: `${environment.baseURL}user/addTask`,
  
  getTaskById: `${environment.baseURL}user/getTaskById`,
  
  updateTask: `${environment.baseURL}/user/updateTask`,

  updateTaskStatus: `${environment.baseURL}user/updateTaskStatus`,

  getAllTask: `${environment.baseURL}user/getAllTasks`,

  

  

  

};
