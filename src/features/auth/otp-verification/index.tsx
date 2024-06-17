"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { alertNotification, getCookie, saveCookie } from "@/redux/auth/actions";
import { API } from "@/utils/configs/api";
import { setUser } from "@/redux/auth/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const OtpVerification = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<{ token: number | string }>({
    token: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(300);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userData = getCookie("userData");

  useEffect(() => {
    if (!canResend) {
      const interval = setInterval(() => {
        setTimer((prevTimer: any) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [canResend]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: (e.currentTarget as unknown as HTMLInputElement)
        .value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await API.post(`/auth/verify-admin`, {
        token: formData.token,
        id: userData.id,
      });
      
      if (response?.data?.success) {
        const jsonData = response.data;
        setIsLoading(false);
        dispatch(setUser(jsonData.user));
        saveCookie("userInfo", jsonData.user);
        saveCookie(
          "token",
          jsonData.user.accessToken,
          new Date(jsonData.expiresIn).getTime()
        );
        saveCookie(
          "refreshToken",
          jsonData.refreshToken,
          new Date(jsonData.refreshTokenExpiresIn).getTime()
        );
        router.push("/dashboard");
      }
    } catch (error: any) {
      setIsLoading(false);
      alertNotification(error?.response?.data?.message, "error");
    }
  };

  const handleResendOtp = async () => {
    if (userData.email) {
      setIsLoading(true);
      try {
        const response = await API.post(`/auth/resend-verfication`, {
          email: userData.email,
        });
        if (response.data.success) {
          alertNotification("New OTP has been resent to your email", "success");
          setCanResend(false);
          setTimer(300);
        }
      } catch (error: any) {
        alertNotification(
          error?.response?.data?.message || "Failed to resend OTP",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      alertNotification("User email is missing", "error");
    }
  };

  return (
    <section className="bg-[#ebedf5] w-full flex items-center justify-center py-8 sm:py-0">
      <div className="flex flex-col max-w-[90%] sm:max-w-[70%] mx-auto w-[85%] sm:w-[60%] lg:w-[30%]">
        <h1 className="text-center mb-8 font-telex font-semibold text-slate-600 text-xl sm:text-2xl">
          Sign in to Lasepa Admin
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="relative flex items-center w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="token"
                placeholder="Your Token Here..."
                className="p-2 bg-[#fff] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent border-none w-full pr-10"
                onChange={handleFormChange}
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
            <p className="text-sm text-[#AAACAE]">
              Enter your Token to verify sign in.
            </p>
          </div>
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
                Verifying...
              </div>
            ) : (
              "Verify Sign in"
            )}
          </button>
        </form>
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={!canResend}
          className="mt-8 bg-[#fff] px-8 py-2 rounded-md w-fit mx-auto"
        >
          {canResend
            ? "Resend OTP"
            : `Resend OTP (${Math.floor(timer / 60)}:${(timer % 60)
                .toString()
                .padStart(2, "0")})`}
        </button>
        <footer className="mt-8">
          <p className="text-sm text-[#AAACAE]">
            LASEPA © 2024. Only users invited by their organization can sign in
            using their org email
          </p>
        </footer>
      </div>
    </section>
  );
};
