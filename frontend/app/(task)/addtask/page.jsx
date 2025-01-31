import TaskComponent from "@/components/task/Add-task";
import dynamic from "next/dynamic";

const AddTask = () => {
  return <TaskComponent />;
};

export default dynamic(() => Promise.resolve(AddTask), { ssr: true });
