"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthService from "@/service/AuthService";
import UserSignInRecall from "@/validation/action/SignUpRecall";
import InputField from "../fields/InputField";
import Loader from "../loader/Loader";
import { toast, ToastContainer } from "react-toastify";

const SignUpForm = () => {
  const authService = new AuthService();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formState, setFormState] = useState({
    data: null,
    errors: {},
    isLoading: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function ApiCall(SignInData) {
    try {
      const { name, email, password } = SignInData;
      const response = await authService.UserSignIn({
        name,
        email,
        password,
      });

      if (response.statusCode === 200) {
        setFormState((prev) => ({ ...prev, isLoading: false, errors: {} }));
        toast.success("user has been added");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
        console.log("Login successful:", response);
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        errors: {
          email: error?.response?.data?.message || [],
        },
      }));
      console.error("Signup error:", error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  }

  async function submit(event) {
    event.preventDefault();
    setFormState((prev) => ({ ...prev, isLoading: true }));

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    const result = await UserSignInRecall(formDataObj); // Validation before submission

    if (!result.success) {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        errors: result.error,
      }));
      return; // Stop execution if validation fails
    } else {
      ApiCall(result.data);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center">
        {/* Sign in section */}
        <div className="mt-[10vh] w-full max-w-full flex-col items-center p-10 justify-center  rounded-2xl  xl:max-w-[420px] shadow-2xl ">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
            User Sign In
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
          </p>

          <form onSubmit={submit}>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              placeholder="Enter your name"
              id="name"
              type="text"
              name="name"
              value={formData.firstname}
              onChange={handleChange}
            />

            {formState.errors.name && (
              <p className="text-red-500 text-start">
                {formState.errors.name[0]}
              </p>
            )}

            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formState.errors.email && (
              <p className="text-red-500 text-start">
                {formState.errors.email[0]}
              </p>
            )}

            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formState.errors.password && (
              <p className="text-red-500 text-start">
                {formState.errors.password[0]}
              </p>
            )}

            <button className="linear mt-2 w-full rounded-xl bg-green-600 hover:bg-green-500 text-white bg-brand-500 py-[12px] text-base font-medium  transition duration-200 hover:bg-brand-600 active:bg-brand-700">
              Sign In
            </button>
            {formState.isLoading && <Loader />}
            {formState.errors.general && (
              <p className="text-red-500 mt-3">{formState.errors.general}</p>
            )}
          </form>

          <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700">
              Not registered yet?
            </span>
            <Link
              href="/login"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              Already have an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
