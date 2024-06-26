import { store } from '@/redux/store';
import { API } from '@/utils/configs/api';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast, TypeOptions } from "react-toastify";
import { setIsLoading, setUser, setUserError, setVerifyStatus } from './authSlice';

export const signUp = async (
  data: { username: any; email: any; phone: number; password: any; confirm_password: any },
  router: AppRouterInstance | string[],
  reset: () => void
) => {
  const  dispatch = store.dispatch
  dispatch(setIsLoading(true))
  const payload = {
    username: data.username,
    email: data.email,
    phone: data.phone,
    password: data.password,
    confirm_password: data.confirm_password,
    role: "ADMIN"
  };
  try {
    const response = await API.post('/auth/register-admin', payload)
    
    const jsonData = response?.data
    if (jsonData?.success) {
      dispatch(setIsLoading(false))
      reset()
      alertNotification("Account created successfully.", "success")
      router.push('/login')
    } else {
      dispatch(setIsLoading(false));
      alertNotification("Registration failed. Please try again.", "error");
    }
  } catch (error: any) {
    dispatch(setIsLoading(false))
    if (error instanceof AxiosError) {
      alertNotification(error?.response?.data?.message || "An error occured", "error")
    }
  }
}

export const OtpVerification = async (
  data: {
    token: string;
    id: string;
  },
  router: AppRouterInstance | string[]
) => {
  const dispatch = store.dispatch;
  // dispatch(setIsLoading(true));
  try {
    dispatch(
      setVerifyStatus({
        isLoading: true,
      })
    );
    const response = await API.post(`/auth/verify-admin`, {
      token: data.token,
      id: data.id,
    });
    const jsonData = response.data;
    if (jsonData.success) {
      dispatch(
        setVerifyStatus({
          isLoading: false,
          isSuccessful: true,
        })
      );
      store.dispatch(setUser(jsonData.user));
      saveCookie("userInfo", jsonData.user);
      router.push("/dashboard");
    }
  } catch (error: any) {
    dispatch(
      setVerifyStatus({
        isLoading: false,
        isSuccessful: false,
      })
    );
  }
};

export const signIn = async (
  data: { email: string; password: string },
  router: AppRouterInstance | string[]
) => {
  const dispatch = store.dispatch
  dispatch(setIsLoading(true))

  try {
    const response = await API.post('/auth/login-admin', data)
    if (response?.data?.success) {
      const userData = response.data.user
      dispatch(setUser(userData))
      dispatch(setIsLoading(false))
      saveCookie('userData', userData)
      alertNotification("Enter your OTP", "success")
      router.push('/otp-verify')
    } else {
      dispatch(setUserError("Login failed. Please try again."))
      dispatch(setIsLoading(false));
      alertNotification("Login failed. Please try again.", "error");
    }
  } catch (error: any) {
    dispatch(setUserError(error?.response?.data?.message ?? "An error occurred"))
    dispatch(setIsLoading(false));
    alertNotification(error?.response?.data?.message ?? "An error occurred", "error")
  }
}

export const saveCookie = (name: string, value: any, expireIn = 356) => {
  if (typeof value !== "string") {
    const newVale = JSON.stringify(value);
    Cookies.set(name, newVale);
  } else {
    Cookies.set(name, value);
  }
};

export const getCookie = (name: string) => {
  let value;
  const jsonString = Cookies.get(name);
  try {
    if (typeof jsonString === "string") {
      const jsonObject = JSON.parse(jsonString);
      value = jsonObject;
    }
  } catch (error) {
    value = jsonString;
  }
  return value;
};

export const signOut = () => {
  return async (dispatch: (arg0: { type: 'RESET' }) => void) => {
    dispatch(store.dispatch({ type: 'RESET' }));
    Cookies.remove('userData');
  };
};

export const alertNotification = (message: string, type: TypeOptions) => {
  toast(message, {
    type: type,
  });
};
