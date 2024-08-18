import toast from "react-hot-toast";

export const showErrorToast = (title) => {
  toast.error(title, {
    icon: "⚠",
    style: {
      background: "var(--primary)",
      color: "var(--text)"
    },
  });
};