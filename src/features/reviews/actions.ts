import { alertNotification } from "@/redux/auth/actions";
import { API } from "@/utils/configs/api";
import { AxiosError } from "axios";


export const reviewOrgDeny = async (
    data: { TypeID: any; Description: any },
    reset: () => void,
    setIsLoading: ( loading: boolean ) => void
  ) => {
    
    setIsLoading(true)
    const payload = {
      TypeID: data.TypeID,
      Description: data.Description,
      Approval: "REJECTED",
      Type: "ORGANIZATION",
    };

    try {
      const response = await API.post('/review/create', payload)
      const jsonData = response?.data

      if (jsonData?.success) {
        setIsLoading(false)
        reset()
        alertNotification("Review created successfully.", "success")
      } else {
        setIsLoading(false)
        alertNotification("Creating review failed. Please try again.", "error");
      }
    } catch (error: any) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        alertNotification(error?.response?.data?.message || "An error occured", "error")
      }
    }
  }

  export const reviewOrgApprove = async (
    data: { TypeID: any; Description: any },
    reset: () => void,
    setIsLoading: ( loading: boolean ) => void
  ) => {
    
    setIsLoading(true)
    const payload = {
      TypeID: data.TypeID,
      Description: data.Description,
      Approval: "ACCEPTED",
      Type: "ORGANIZATION",
    };

    try {
      const response = await API.post('/review/create', payload)
      const jsonData = response?.data

      if (jsonData?.success) {
        setIsLoading(false)
        reset()
        alertNotification("Review created successfully.", "success")
      } else {
        setIsLoading(false)
        alertNotification("Creating review failed. Please try again.", "error");
      }
    } catch (error: any) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        alertNotification(error?.response?.data?.message || "An error occured", "error")
      }
    }
  }
  
  export const reviewProjectDeny = async (
    data: { TypeID: any; Description: any },
    reset: () => void,
    setIsLoading: ( loading: boolean ) => void
  ) => {
    
    setIsLoading(true)
    const payload = {
      TypeID: data.TypeID,
      Description: data.Description,
      Approval: "REJECTED",
      Type: "PROJECT",
    };

    try {
      const response = await API.post('/review/create', payload)
      const jsonData = response?.data

      if (jsonData?.success) {
        setIsLoading(false)
        reset()
        alertNotification("Review created successfully.", "success")
      } else {
        setIsLoading(false)
        alertNotification("Creating review failed. Please try again.", "error");
      }
    } catch (error: any) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        alertNotification(error?.response?.data?.message || "An error occured", "error")
      }
    }
  }

  
  export const reviewProjectApprove = async (
    data: { TypeID: any; Description: any },
    reset: () => void,
    setIsLoading: ( loading: boolean ) => void
  ) => {
    
    setIsLoading(true)
    const payload = {
      TypeID: data.TypeID,
      Description: data.Description,
      Approval: "ACCEPTED",
      Type: "PROJECT",
    };

    try {
      const response = await API.post('/review/create', payload)
      const jsonData = response?.data

      if (jsonData?.success) {
        setIsLoading(false)
        reset()
        alertNotification("Review created successfully.", "success")
      } else {
        setIsLoading(false)
        alertNotification("Creating review failed. Please try again.", "error");
      }
    } catch (error: any) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        alertNotification(error?.response?.data?.message || "An error occured", "error")
      }
    }
  }
