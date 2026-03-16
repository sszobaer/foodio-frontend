"use client";

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function MenuItemAvailabilityToggle({
  checked,
  onChange,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex w-fit items-center gap-3"
    >
      <span
        className={`relative inline-flex h-[26px] w-[44px] rounded-full transition ${
          checked ? "bg-[#CFE5E0]" : "bg-[#E7E7E7]"
        }`}
      >
        <span
          className={`absolute top-[3px] h-[20px] w-[20px] rounded-full transition ${
            checked ? "left-[21px] bg-[#17352D]" : "left-[3px] bg-white shadow"
          }`}
        />
      </span>

      <span className="text-[14px] font-medium leading-5 text-[#2C2C2C] sm:text-[16px] sm:leading-6">
        Available for Order
      </span>
    </button>
  );
}