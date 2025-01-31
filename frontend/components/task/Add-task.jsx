"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Service } from "@/service/taskService/Services";
import AddRecall from "@/validation/action/AddRecall";
import BackTitle from "../backTitle/BackTitle";

import { useNavigate } from "react-router-dom";

const TaskComponent = () => {
  //   const router = useNavigate();
  const services = new Service();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [formState, setFormState] = useState({
    errors: {},
    isLoading: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    setFormState((prev) => ({ ...prev, isLoading: true }));

    const formDataObj = new FormData();
    Object.entries(newTask).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    const result = await AddRecall(formDataObj);
    if (!result.success) {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        errors: result.error,
      }));
      return;
    }

    try {
      const response = await services.AddTask(newTask);
      if (response.statusCode === 200 || response.statusCode === 201) {
        setFormState((prev) => ({ ...prev, isLoading: false, errors: {} }));
        toast.success("Task added successfully!");
        window.location.href = "/tasklist";
      } else {
        setFormState((prev) => ({
          ...prev,
          isLoading: false,
          errors: { general: "Failed to add the task. Please try again." },
        }));
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        errors: { general: "An error occurred. Please try again." },
      }));
      console.error("Add task error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleClick} className="px-12 py-12">
        <BackTitle title="Add Task" />
        <div className="flex gap-3 flex-col justify-center items-center mt-8">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />

          {formState.errors.title && (
            <p className="text-red-500">{formState.errors.title[0]}</p>
          )}

          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate.split("T")[0]}
            onChange={handleChange}
            placeholder="Edit Due Date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formState.errors.dueDate && (
            <p className="text-red-500">{formState.errors.dueDate[0]}</p>
          )}
          <textarea
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
            placeholder="Enter Task Description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {formState.errors.description && (
            <p className="text-red-500">{formState.errors.description[0]}</p>
          )}
          <button className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-80">
            Add
          </button>
          <ToastContainer />
        </div>
      </form>
    </>
  );
};

export default TaskComponent;
