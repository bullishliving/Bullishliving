import { toast, Toast } from "react-hot-toast";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import clsx from "clsx";

const toastStyles = {
  success: 'bg-[#fff9e6] text-primary-500 border-primary-600',
  error: 'bg-red-50 text-red-700 border-red-400',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-400',
  info: 'bg-blue-50 text-blue-700 border-blue-400',
};

const icons = {
  success: <CheckCircle size={18} className="text-primary-500" />,
  error: <AlertCircle size={18} className="text-red-600" />,
  warning: <AlertCircle size={18} className="text-yellow-600" />,
  info: <Info size={18} className="text-blue-600" />,
};

const CustomToast = ({
  t,
  message,
  type,
}: {
  t: Toast;
  message: string;
  type: "success" | "error" | "warning" | "info";
}) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 p-4  border rounded-lg shadow-md',
        toastStyles[type],
        t.visible ? 'animate-fadeInUp' : 'animate-fadeOut'
      )}
    >
      {icons[type]}
      <p className="text-sm">{message}</p>
      <button onClick={() => toast.dismiss(t.id)} className="ml-auto">
        <X size={16} className="text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
};

export default function showToast(
  message: string,
  type: "success" | "error" | "warning" | "info" = "success"
) {
  toast.custom((t) => <CustomToast t={t} message={message} type={type} />, {
    position: "top-right",
    duration: 4000, // Keeps it consistent with built-in toast durations
  });
}
