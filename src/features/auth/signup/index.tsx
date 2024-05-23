"use client";

import { ErrorMessage } from "@/features/auth/_components/error-message";
import { signupSchema } from "@/features/auth/utils/validation";
import { signUp } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useAppSelector((state: { user: any }) => state.user);
  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },

    resolver: yupResolver(signupSchema) as any,
  });
  const formSubmit = (data: any) => signUp(data, router, reset);

  return (
    <section className="bg-[#ebedf5] w-full h-full flex justify-center py-8 sm:py-0">
      <div className="max-w-[90%] sm:max-w-[70%] mx-auto w-[85%] sm:w-[60%] lg:w-[30%]">
        <h1 className="text-center mb-8 font-telex text-xl  sm:text-2xl">
          Signup to Lasepa Admin
        </h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <input
            type="text"
            id="username"
            placeholder="Staff Username"
            className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border-none w-full mb-5"
            {...register("username")}
          />
          {errors.username?.message && (
            <ErrorMessage message={errors.username.message} />
          )}
          <input
            type="email"
            id="email"
            placeholder="Staff Email"
            className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border-none w-full mb-5"
            {...register("email")}
          />
          {errors.email?.message && (
            <ErrorMessage message={errors.email.message} />
          )}
          <input
            type="text"
            id="phone"
            placeholder="Phone Number"
            className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border-none w-full mb-5"
            {...register("phone")}
          />
          {errors.phone?.message && (
            <ErrorMessage message={errors.phone.message} />
          )}
          <div className="relative flex items-center mb-5">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border-none pr-10 w-full"
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
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="confirm_password"
              placeholder="Confirm your  password"
              className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border-none pr-10 w-full"
              {...register("confirm_password")}
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
          {errors.confirm_password?.message && (
            <ErrorMessage message={errors.confirm_password.message} />
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
              "Sign up"
            )}
          </button>
          <p className="font-telex text-base mt-4 text-center font-medium text-slate-600">
            Already have an account?{" "}
            <Link href={`/login`} className=" hover:opacity-60">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
