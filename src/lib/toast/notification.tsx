import { X } from "lucide-react";
import { AiFillAlert } from "react-icons/ai";
import { BiSolidErrorCircle } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import type { ToasterProps } from "sonner";
import { toast } from "sonner";
interface NotificationProps extends ToasterProps {
  title: string;
  description?: string;
  variant?: "success" | "error" | "warning" | "info";
}

export const notification = {
  success: ({ title, description, ...props }: NotificationProps) =>
    toast.custom(
      (t) => (
        <div
          className={`flex w-[360px] ${
            description ? "items-start" : "items-center"
          } gap-3 rounded-xl border border-green-200/50 bg-green-50/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-green-700/40 dark:bg-green-900/30`}
        >
          <FaCircleCheck className="mt-0.5 h-5 w-5 text-green-500 dark:text-green-400" />
          <div className="flex-1">
            <h2
              className={`${
                description ? "text-sm" : "text-base"
              } font-semibold text-green-900 dark:text-green-100`}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs text-green-800 dark:text-green-200">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="mt-0.5 rounded-full p-1.5 text-green-600 transition-colors duration-200 hover:bg-green-200/50 dark:text-green-300 dark:hover:bg-green-800/40"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ),
      { ...props }
    ),

  error: ({ title, description, ...props }: NotificationProps) =>
    toast.custom(
      (t) => (
        <div
          className={`flex w-[360px] ${
            description ? "items-start" : "items-center"
          } gap-3 rounded-xl border border-red-200/50 bg-red-50/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-red-700/40 dark:bg-red-900/30`}
        >
          <BiSolidErrorCircle className="mt-0.5 h-5 w-5 text-red-500 dark:text-red-400" />
          <div className="flex-1">
            <h2
              className={`${
                description ? "text-sm" : "text-base"
              } font-semibold text-red-900 dark:text-red-100`}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs text-red-800 dark:text-red-200">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="mt-0.5 rounded-full p-1.5 text-red-600 transition-colors duration-200 hover:bg-red-200/50 dark:text-red-300 dark:hover:bg-red-800/40"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ),
      { ...props }
    ),

  warning: ({ title, description, ...props }: NotificationProps) =>
    toast.custom(
      (t) => (
        <div
          className={`flex w-[360px] ${
            description ? "items-start" : "items-center"
          } gap-3 rounded-xl border border-yellow-200/50 bg-yellow-50/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-yellow-700/40 dark:bg-yellow-900/30`}
        >
          <AiFillAlert className="mt-0.5 h-5 w-5 text-yellow-500 dark:text-yellow-400" />
          <div className="flex-1">
            <h2
              className={`${
                description ? "text-sm" : "text-base"
              } font-semibold text-yellow-900 dark:text-yellow-100`}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs text-yellow-800 dark:text-yellow-200">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="mt-0.5 rounded-full p-1.5 text-yellow-600 transition-colors duration-200 hover:bg-yellow-200/50 dark:text-yellow-300 dark:hover:bg-yellow-800/40"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ),
      { ...props }
    ),

  info: ({ title, description, ...props }: NotificationProps) =>
    toast.custom(
      (t) => (
        <div
          className={`flex w-[360px] ${
            description ? "items-start" : "items-center"
          } gap-3 rounded-xl border border-blue-200/50 bg-blue-50/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-blue-700/40 dark:bg-blue-900/30`}
        >
          <BsFillInfoCircleFill className="mt-0.5 h-5 w-5 text-blue-500 dark:text-blue-400" />
          <div className="flex-1">
            <h2
              className={`${
                description ? "text-sm" : "text-base"
              } font-semibold text-blue-900 dark:text-blue-100`}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs text-blue-800 dark:text-blue-200">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="mt-0.5 rounded-full p-1.5 text-blue-600 transition-colors duration-200 hover:bg-blue-200/50 dark:text-blue-300 dark:hover:bg-blue-800/40"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ),
      { ...props }
    ),
};
