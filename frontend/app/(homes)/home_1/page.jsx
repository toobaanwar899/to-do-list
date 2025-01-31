"use client"
import LoginForm from "@/components/common/LoginForm";
import dynamic from "next/dynamic";
const Home_1 = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default dynamic(() => Promise.resolve(Home_1), { ssr: true });
