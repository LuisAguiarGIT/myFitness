'use client';

type Props = {
  submit: () => void;
};

export default function SubmitButton({ submit }: Props) {
  return (
    <div className="p-3 bg-[#1A1A1A] rounded-lg mt-2">
      <button
        className="mt-2 w-full border border-dashed py-2 rounded-md font-semibold hover:cursor-pointer hover:bg-[#0E0E0E] transition"
        onClick={() => {
          submit();
        }}
      >
        FINISH
      </button>
    </div>
  );
}
