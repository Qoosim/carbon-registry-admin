"use client";

import Image from "next/image";
import Link from "next/link";
import { ErrorMessage } from "@/features/auth/_components/error-message";
import { loginSchema } from "@/features/auth/utils/validation";
import { signIn } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useAppSelector((state: { user: any }) => state.user);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: { email: string; password: string }) =>
    signIn(data, router);

  return (
    <section className="bg-[#ebedf5] w-full flex items-center justify-center py-8 sm:py-0">
      <div className="max-w-[90%] sm:max-w-[70%] mx-auto w-[85%] sm:w-[60%] lg:w-[30%]">
        <h1 className="text-center mb-8 font-telex font-semibold text-slate-600 text-xl sm:text-2xl">
          Sign in to Lasepa Admin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            placeholder="Staff Email"
            className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border-none w-full"
            {...register("email")}
          />
          {errors.email?.message && (
            <ErrorMessage message={errors.email.message} />
          )}

          <div className="relative flex items-center w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border-none w-full pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 mr-3"
            >
              {showPassword ? (
                <FaEye className="text-[#737476]" />
              ) : (
                <FaEyeSlash className="text-[#737476]" />
              )}
            </button>
          </div>
          {errors.password?.message && (
            <ErrorMessage message={errors.password.message} />
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#117031] w-full p-2 rounded-md mt-6 text-white font-semibold hover:opacity-80"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>{" "}
                Processing...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <div className="flex justify-between items-center w-full mt-3 text-slate-600">
            <div className="font-telex text-sm sm:text-base text-center font-medium">
              <Link href={`/forget-password`} className="hover:opacity-60">
                Forgot password
              </Link>
            </div>
            <div className="font-telex text-sm sm:text-base text-center font-medium">
              Don&apos;t an account?{" "}
              <Link href={`/signup`} className="hover:opacity-60">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
