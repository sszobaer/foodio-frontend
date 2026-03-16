type Props = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export default function CatCard({
  label,
  icon,
  active = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[60px] w-[98px] flex-col items-center justify-center rounded-[12px] transition-all duration-200"
      style={{
        backgroundColor: active ? "#F3ECDD" : "#F7F6F3",
      }}
    >
      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#1A3C34] text-white">
        {icon}
      </div>

      <span className="mt-[8px] text-[11px] font-medium leading-none text-[#1A3C34]">
        {label}
      </span>
    </button>
  );
}