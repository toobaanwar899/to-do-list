import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { BsFillGearFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import PageTitle from "../pageTitle/PageTitle";
import { Service } from "@/service/taskService/Services";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import Search from "../searchbar/Search";
import { useDispatch, useSelector } from "react-redux";

const TaskListComponent = () => {
  const taskParam = useSelector((state) => state.task);
  const services = new Service();
  const [allTask, setAllTask] = useState([]);

  // Fetch all tasks
  async function fetchAllTasks(taskParam) {
    try {
      const response = await services.AllTask(taskParam);
      setAllTask(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    if (taskParam) {
      fetchAllTasks(taskParam);
    } else {
      fetchAllTasks([]);
    }
  }, [taskParam]);
  // Delete task handler
  async function handleDelete(id) {
    try {
      const response = await services.deleteTask(id);
      if (response.success) {
        setAllTask(allTask.filter((task) => task._id !== id));
        toast.success("Task deleted successfully.");
      } else {
        console.error("Failed to delete task:", response.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Update task status handler
  async function handleStatusChange(event, id) {
    const newStatus = event.target.value;
    try {
      const response = await services.UpdateTaskStatus(
        { status: newStatus },
        id
      );
      if (response.data.statusCode === 200) {
        setAllTask(
          allTask.map((task) =>
            task._id === id ? { ...task, status: newStatus } : task
          )
        );
        fetchAllTasks(taskParam);
        toast.success("Task Update successfully.");
        console.log(`Task status updated to ${newStatus}`);
      } else {
        console.error("Failed to update task status:", response.message);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="px-12 py-12">
        <PageTitle
          title={"Task List"}
          buttonTitle={"Add New Task"}
          link={"/addtask"}
        />
        <Search />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-7">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task to Do
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody>
              {allTask.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No tasks available
                  </td>
                </tr>
              ) : (
                allTask.map((item) => (
                  <tr
                    key={item._id}
                    className="odd:bg-white even:bg-gray-50 border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.title}
                    </th>

                    <td className="px-6 py-4">{item.dueDate.split("T")[0]}</td>
                    <td className="px-6 py-6 flex items-center ">
                      {item.status === "completed" && (
                        <GrStatusGood
                          className="text-green-500"
                          title="Completed"
                        />
                      )}
                      {item.status === "pending" && (
                        <ImCross className="text-red-500" title="Pending" />
                      )}
                      {item.status === "in_progress" && (
                        <BsFillGearFill
                          className="text-yellow-500"
                          title="In Progress"
                        />
                      )}
                      {item.status === "overdue" && (
                        <RiErrorWarningFill
                          className="text-orange-500"
                          title="Overdue"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => dispatch(setTaskId(item._id))}>
                        <Link
                          href={`/edittask/${item._id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          <MdModeEditOutline />
                        </Link>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDelete />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        onChange={(event) =>
                          handleStatusChange(event, item._id)
                        }
                        defaultValue={item.status}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="over_due">Overdue</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TaskListComponent;
