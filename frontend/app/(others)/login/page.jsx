"use client";
import dynamic from "next/dynamic";
import LoginForm from "@/components/common/LoginForm";


const LogIn = () => {
  return <LoginForm />;
};

export default dynamic(() => Promise.resolve(LogIn), { ssr: false });
