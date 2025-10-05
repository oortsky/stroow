import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  DollarSign,
  FileText,
  Tag,
  Clock,
  Copy,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
          icon: <Clock className="w-3 h-3 mr-1" />,
          label: "Pending Payment"
        };
      case "paid":
        return {
          color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
          icon: <DollarSign className="w-3 h-3 mr-1" />,
          label: "Payment Received"
        };
      case "proceeded":
        return {
          color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
          icon: <RefreshCw className="w-3 h-3 mr-1" />,
          label: "In Progress"
        };
      case "received":
        return {
          color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
          icon: <FileText className="w-3 h-3 mr-1" />,
          label: "Delivery Received"
        };
      case "released":
        return {
          color: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
          icon: <DollarSign className="w-3 h-3 mr-1" />,
          label: "Payment Released"
        };
      case "completed":
        return {
          color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
          icon: <CheckCircle className="w-3 h-3 mr-1" />,
          label: "Completed"
        };
      case "cancelled":
        return {
          color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
          icon: <XCircle className="w-3 h-3 mr-1" />,
          label: "Cancelled"
        };
      case "refunded":
        return {
          color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
          icon: <RefreshCw className="w-3 h-3 mr-1" />,
          label: "Refunded"
        };
      default:
        return {
          color: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
          icon: <Clock className="w-3 h-3 mr-1" />,
          label: "Unknown Status"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      className={`${config.color} ${className} transition-colors duration-200`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
}