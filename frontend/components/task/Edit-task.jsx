"use client";
import { Service } from "@/service/taskService/Services";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import BackTitle from "../backTitle/BackTitle";
import { useParams } from "next/navigation";
import { Navigate, useNavigate } from "react-router-dom";

const EditTaskComponent = () => {
  const services = new Service();
  const { id } = useParams();
  console.log(id);

  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    description: "",
  });
  const [formState, setFormState] = useState({
    data: null,
    errors: {},
    isLoading: false,
  });

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  }

  // Fetch task data by id
  async function getDataById(id) {
    try {
      const response = await services.getTaskById(id);
      const alldata = response.data;
      if (alldata) {
        setNewTask({
          title: alldata.title,
          dueDate: alldata.dueDate,
          description: alldata.description,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
  }, [id]);

  async function UpdateData(formData, id) {
    try {
      const response = await services.UpdateTask(formData, id);
      if (response.data.statusCode === 200) {
        toast.success("Task Updated Successfully");
        window.location.href = "/tasklist";
        // setTimeout(() => {
        //   router.push("/tasklist");
        // }, 4000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error during task updation:", error.message);
    }
  }

  // Handle form submission
  async function handleClick(event) {
    event.preventDefault();
    setFormState({ ...formState, isLoading: true });

    try {
      // Call UpdateData with newTask and id
      await UpdateData(newTask, id);
    } finally {
      setFormState({ ...formState, isLoading: false });
    }
  }
  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleClick} className="px-12 py-12">
        <BackTitle title={"Edit Task"} />
        <div className="flex gap-3 flex-col justify-center items-center mt-8">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Edit task"
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

          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-80"
            disabled={formState.isLoading}
          >
            {formState.isLoading ? "Updating..." : "Edit Task"}
          </button>

          <ToastContainer />
        </div>
      </form>
    </>
  );
};

export default EditTaskComponent;
