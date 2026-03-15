interface Props {
  active: boolean;
  activeText?: string;
  inactiveText?: string;
}

export default function AvailabilityBadge({
  active,
  activeText = "Available",
  inactiveText = "Unavailable",
}: Props) {
  return (
    <span
      className={[
        "inline-flex h-6 items-center rounded-full px-2.5",
        "text-[12px] font-medium leading-4 tracking-[-0.1px]",
        active
          ? "bg-[#DDF5E5] text-[#149447]"
          : "bg-[#FCE4E4] text-[#D92D20]",
      ].join(" ")}
    >
      {active ? activeText : inactiveText}
    </span>
  );
}
