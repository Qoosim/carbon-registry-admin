import React from "react";
import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  message: string | FieldError;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (typeof message === "string") {
    return <div className="text-red-500 text-sm">{message}</div>;
  }
  // If message is a FieldError, extract the error message from it
  return <div className="text-red-500 text-sm">{message.message}</div>;
};

// export const ErrorMessage = ({ message }: { message: string }) => {
//   return <div className="text-red-500 text-sm">{ message }</div>;
// };
