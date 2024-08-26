import toast from "react-hot-toast";

export const showToast = (type, message, icon, duration) => {
  toast[type](message, {
    icon,
    style: {
      background: "var(--primary)",
      color: "var(--text)"
    },
    duration,
    closeOnClick: true,
    pauseOnHover: true,
  });
};