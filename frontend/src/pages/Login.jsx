import { Link, useLocation, useNavigate } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const {login,loginWithGoogle} = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathName ||  '/'
  const navigate = useNavigate()

     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm(); 

    const LoginUser  = async (data) => {
      try {
        const res = await login(data.email,data.password)
        if(res?.data?.user){
          navigate(from, { replace: true }); 
          toast.success("user logged in successfully")
        }
      } catch (error) {
        console.log(error)
      } 
    }


    const loginwithSocial = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center px-4 font-mona-sans">
      <Toaster />

      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <FaGithub size={50} className="text-black" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-8">
          Sign in to GitHub
        </h1>

        {/* Card */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">

        <form onSubmit={handleSubmit(LoginUser)}> 
            {/* Email */}
          <div>

              <label className="label">
                <span className="label-text font-medium text-black">
                  Email
                </span>
              </label>

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered bg-white text-black w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

          {/* Password */}
           <div>

              <label className="label">
                <span className="label-text font-medium text-black">
                  Password
                </span>
              </label>

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered bg-white w-full text-black"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Must contain uppercase, lowercase and number",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

          {/* Button */}
          <button type="submit" className="btn w-full bg-[#1f883d] hover:bg-[#1a7f37] my-8 text-white border-none">
            Sign in
          </button>
        </form>

          {/* Divider */}
          <div className="divider my-6">
            or
          </div>

          {/* Google */}
          <button onClick={loginwithSocial} className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-100 mb-3">
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </div>

        {/* Bottom Links */}
        <div className="text-center mt-6 text-sm">

          <p>
            New to GitHub?{" "}
            <Link
              to="/singup"
              className="text-blue-600 hover:underline"
            >
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;