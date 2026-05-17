import { data, Link, useLocation, useNavigate } from "react-router";
import signupImage from "/images/sing-up.webp";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const { signUp, loginWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathName || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (form) => {
    form.preventDefault;
    try {
      const { data, error: signUpError } = await signUp(
        form.email,
        form.password,
      );

      console.log("supabase data ", data);

      if (data && data.user) {
        const res = await axiosSecure.post("/users/create", {
          username: form.username,
          password: form.password,
        });
        if (res.data.success) {
          toast.success("user created successfully");
          navigate(from, { replace: true });
        }
      }
      if (signUpError) console.log("supabes eror", signUpError);
    } catch (error) {
      console.log("singup form a problem ", error);
    }
    console.log(data);
  };

  const loginwithSocial = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen overflow-hidden grid lg:grid-cols-2 bg-white font-mona-sans">
      <Toaster />

      {/* LEFT SIDE */}
      <div className="hidden lg:flex bg-black relative overflow-hidden">
        <div className="relative z-10 w-full px-20 py-16 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Create your free account
            </h1>

            <p className="text-gray-300 mt-6 text-lg">
              Explore GitHub's core features for individuals and organizations.
            </p>

            <button className="mt-8 text-white font-medium hover:underline">
              See what's included ↓
            </button>
          </div>

          <div className="relative flex justify-center items-center h-[500px]">
            <img
              src={signupImage}
              alt="github mascots"
              className="w-full max-w-2xl object-contain relative z-10"
            />

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600 blur-[120px] opacity-60 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-center items-center px-6 py-6 overflow-hidden">
        <div className="w-full max-w-md">
          {/* Top */}
          <div className="flex justify-end mb-6 text-sm text-black">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="font-semibold hover:underline">
                Sign in →
              </Link>
            </p>
          </div>

          <h2 className="text-4xl font-bold mb-8 text-black">
            Sign up for GitHub
          </h2>

          {/* Google */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={loginwithSocial}
              className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-100"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
          </div>

          <div className="divider my-6 text-black">or</div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-black">Email</span>
              </label>

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered bg-white text-black w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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

            {/* PASSWORD */}
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
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: "Must contain uppercase, lowercase and number",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* USERNAME */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-black">
                  Username
                </span>
              </label>

              <input
                type="text"
                placeholder="Username"
                className="input input-bordered bg-white w-full text-black"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: "Only letters, numbers and underscore allowed",
                  },
                })}
              />

              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn w-full bg-black text-white hover:bg-gray-900 border-none mt-2"
            >
              Create account
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-xs text-gray-500 mt-5 leading-5">
            By creating an account, you agree to the Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
