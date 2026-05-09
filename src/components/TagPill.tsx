interface ITagPillProps {
  name: string;
  selected: boolean;
  onToggle: (name: string) => void;
}

export default function TagPill({ name, selected, onToggle }: ITagPillProps) {
  return (
    <button
      onClick={() => onToggle(name)}
      className={`px-3 py-1 rounded-full text-sm transition ${
        selected
          ? 'bg-white text-black font-semibold'
          : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
      }`}
    >
      {name}
    </button>
  );
}
