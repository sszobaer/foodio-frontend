import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    icon: "✔",
    style: {
      background: "#FFFFFF",
      color: "#1A3C34",
      borderRadius: "12px",
      padding: "14px 18px",
      fontFamily: "Manrope",
      fontWeight: 500,
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};
