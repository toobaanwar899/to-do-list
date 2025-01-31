"use client";
import EditTaskComponent from "@/components/task/Edit-task";
// import dynamic from "next/dynamic";

const EditTask = () => {
  return <EditTaskComponent />;
};

export default EditTask;
// export default dynamic(() => Promise.resolve(EditTask), { ssr: false });
