import { AuthService } from "@/service/AuthService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Helper from "@/Helper/Helper";
import InputField from "../fields/InputField";
import Loader from "../loader/Loader";
import AdminLoginRecall from "@/validation/action/LoginRecall";

const LoginForm = () => {
  const authService = new AuthService();
  const router = useRouter();
  const helper = new Helper();
  const [formData, setFormData] = useState({
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
  //   const navigate = useNavigate();
  async function ApiCall(loginData) {
    try {
      const { email, password } = loginData;
      const response = await authService.UserLogin({ email, password });

      if (response.statusCode === 200) {
        //setting token and role in session storage
        const { token } = response.data;

        helper.setToken(token);

        if (helper.getToken()) {
          toast.success("login successfuly...");

          setTimeout(() => {
            router.push("/tasklist");
          }, 3000);
        } else {
          console.error("token and role not set in local storage");

          HandleError(response.statusCode);
        } //api work
        setFormState((prev) => ({ ...prev, isLoading: false, errors: {} }));
        console.log("Login successful:", response);
      } else {
        setFormState((prev) => ({
          ...prev,
          isLoading: false,
          errors: { general: "Login failed. Please try again." },
        }));
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      console.error("Login error:", errorMsg);

      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        errors: {
          email: error.response?.data?.email || [errorMsg],
          password: error.response?.data?.password || [errorMsg],
        },
      }));
    }
  }

  async function submit(event) {
    event.preventDefault();
    setFormState((prev) => ({ ...prev, isLoading: true }));

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    const result = await AdminLoginRecall(formDataObj);
    if (!result.success) {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        errors: result.error,
      }));
    } else {
      ApiCall(result.data);
    }
  }

  return (
    <div className=" mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center ">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center shadow-2xl  p-10 justify-center  rounded-2xl xl:max-w-[420px] ">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700">Login Page</h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to log in!
        </p>
        <form onSubmit={submit}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            name="email"
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
            value={formData.password}
            onChange={handleChange}
            id="password"
            type="password"
            name="password"
          />
          {formState.errors.password && (
            <p className="text-red-500 text-start">
              {formState.errors.password[0]}
            </p>
          )}
          <button
            type="submit"
            disabled={formState.isLoading}
            className={`linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium bg-green-600 hover:bg-green-500 text-white transition duration-200 ${
              formState.isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-brand-600 active:bg-brand-700"
            }`}
          >
            Log In
          </button>
          <ToastContainer />
          {formState.isLoading && <Loader />}
          {formState.errors.general && (
            <p className="text-red-500 mt-3">{formState.errors.general}</p>
          )}

          <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700">
              Not registered yet?
            </span>

            <Link
              href="/signup"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
