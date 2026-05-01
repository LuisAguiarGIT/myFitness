import { IValidationResult, ValidationStatus } from '@/types/validation';
import { LucideIcon, CircleCheckBig, CircleAlert } from 'lucide-react';

type StatusStyle = {
  icon: LucideIcon;
  text: string;
  bg: string;
  border: string;
};

const statusStyles: Record<ValidationStatus, StatusStyle> = {
  [ValidationStatus.Success]: {
    icon: CircleCheckBig,
    text: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success',
  },
  [ValidationStatus.Error]: {
    icon: CircleAlert,
    text: 'text-error',
    bg: 'bg-error/10',
    border: 'border-error',
  },
};

export default function Alert({ status, message }: IValidationResult) {
  const { bg, border, text, icon: Icon } = statusStyles[status];
  return (
    <div
      className={`${bg} ${border} ${text} border p-2 mt-2 flex items-center gap-2`}
    >
      <Icon className={`w-4 h-4 ${text}`} />
      <p className={`text-sm ${text}`}>{message}</p>
    </div>
  );
}
