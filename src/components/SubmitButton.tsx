'use client';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { useRouter } from 'next/navigation';

type Props = {
  submit: () => Promise<boolean>;
};

export default function SubmitButton({ submit }: Props) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setIsLoading(true);
    try {
      const ok = await submit();
      setIsLoading(false);
      if (ok) {
        setHasSubmitted(true);
        // Slight delay for ux
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setConfirmOpen(false);
        router.push('/Dashboard');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (e) {
      setIsLoading(false);
      setError('An unexpected error ocurred.');
    }
  }

  return (
    <div className="p-3 bg-[#1A1A1A] rounded-lg mt-2">
      <button
        className="mt-2 w-full border border-dashed py-2 rounded-md font-semibold hover:cursor-pointer hover:bg-[#0E0E0E] transition"
        disabled={isLoading}
        onClick={() => {
          setConfirmOpen(true);
        }}
      >
        FINISH
      </button>
      {confirmOpen && (
        <ConfirmationModal
          hasSubmitted={hasSubmitted}
          isLoading={isLoading}
          hasError={error}
          message="Are you sure you want to finish this workout?"
          onConfirm={handleConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}
