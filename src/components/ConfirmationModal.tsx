import { LoaderCircle, CircleCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface IConfirmModalProps {
  hasSubmitted: boolean;
  isLoading: boolean;
  hasError: string | null;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  hasSubmitted,
  isLoading,
  hasError,
  message,
  onConfirm,
  onCancel,
}: IConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-foreground rounded-xl p-6 flex flex-col gap-4 w-80">
        <p className="text-white">{message}</p>
        {isLoading && (
          <div className="flex justify-center align-center ">
            <LoaderCircle className="stroke-[#cafd00] animate-spin h-15 w-15" />
          </div>
        )}
        {hasSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }}
            className="flex justify-center align-center"
          >
            <CircleCheck className="stroke-[#cafd00] h-15 w-15" />
          </motion.div>
        )}
        {hasError && <p className="text-red-400 text-sm">{hasError}</p>}
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-[#2a2a2a] text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
