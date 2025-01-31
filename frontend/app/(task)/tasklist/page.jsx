"use client";
import TaskListComponent from "@/components/task/Task-list";
import dynamic from "next/dynamic";

const TaskList = () => {
  return <TaskListComponent />;
};

export default dynamic(() => Promise.resolve(TaskList), { ssr: false });
