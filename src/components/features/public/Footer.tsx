import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#EEE7DD]">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-[54px]">
        <div className="flex items-center gap-2">
          <span
            className="text-[18px] font-semibold leading-none text-[#1A3C34]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Foodio.
          </span>
          <span className="text-[11px] text-[#8A8F98]">© 2026 Foodio Inc.</span>
        </div>

        <div className="flex items-center gap-[24px] text-[11px] text-[#8A8F98]">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Contact</Link>
        </div>
      </div>
    </footer>
  );
}