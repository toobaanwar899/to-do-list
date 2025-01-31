"use client";
import dynamic from "next/dynamic";
import SignUpForm from "@/components/common/SignUpForm";

const SignUp = () => {
  return (
    <>
      <SignUpForm />
    </>
  );
};

export default dynamic(() => Promise.resolve(SignUp), { ssr: false });
