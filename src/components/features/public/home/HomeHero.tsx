import Image from "next/image";
import { Clock3, Flame, MoveRight } from "lucide-react";

export default function HomeHero() {
    return (
        <section className="relative z-0 grid h-[444px] grid-cols-[1fr_510px] overflow-visible">            <div className="px-[48px] pt-[74px]">
            <div className="inline-flex items-center rounded-full bg-[#F4EEDF] px-[11px] py-[5px] text-[10px] font-medium leading-none text-[#6E6A61]">
                <span className="mr-[6px] text-[10px]">🍽</span>
                Food Ordering Service
            </div>

            <h1
                className="mt-[18px] max-w-[585px] text-[63px] font-[800] leading-[0.98] tracking-[-0.065em] text-[#1A3C34]"
                style={{ fontFamily: "var(--font-manrope)" }}
            >
                Where Great Food
                <br />
                Meets{" "}
                <span
                    className="font-normal italic"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    Great Taste.
                </span>
            </h1>

            <p className="mt-[14px] max-w-[500px] text-[15px] leading-[1.42] text-[#4E5862]">
                Experience a symphony of flavors crafted with passion. Premium
                ingredients, exquisite recipes, delivered to your door.
            </p>

            <button
                type="button"
                className="mt-[34px] inline-flex h-[38px] items-center gap-[8px] rounded-full bg-[#1A3C34] px-[20px] text-[13px] font-semibold text-white shadow-[0_14px_24px_rgba(26,60,52,0.18)]"
            >
                View Menu
                <MoveRight className="h-[14px] w-[14px]" />
            </button>
        </div>

            <div className="relative h-[444px] overflow-visible bg-[#F4EEDF] rounded-bl-[180px]">
                {/* top offer card */}
                <div className="absolute right-[32px] top-[24px] z-30 rounded-[14px] border border-[#E7DED2] bg-white mt-15 px-[16px] py-[11px] shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
                    <div className="flex items-start gap-[10px]">
                        <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[7px] bg-[#FFF7EC]">
                            <Flame className="h-[15px] w-[15px] text-[#F5A623]" />
                        </div>

                        <div>
                            <p className="text-[10px] leading-none text-[#9198A1]">
                                Today&apos;s Offer
                            </p>
                            <p className="mt-[6px] text-[15px] font-semibold leading-none text-[#1A3C34]">
                                Free Delivery
                            </p>
                        </div>
                    </div>
                </div>

                {/* bottom-left delivery card */}
                <div className="absolute left-[-36px] bottom-[66px] z-30 rounded-[14px] border border-[#E7DED2] bg-white px-[16px] py-[11px] shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
                    <div className="flex items-start gap-[10px]">
                        <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[7px] bg-[#F6F1E5]">
                            <Clock3 className="h-[14px] w-[14px] text-[#1A3C34]" />
                        </div>

                        <div>
                            <p className="text-[10px] leading-none text-[#9198A1]">
                                Avg. Delivery
                            </p>
                            <p className="mt-[6px] text-[15px] font-semibold leading-none text-[#1A3C34]">
                                22 Minutes
                            </p>
                        </div>
                    </div>
                </div>

                {/* plate image */}
                <div className="absolute inset-0 z-10">
                    <Image
                        src="https://res.cloudinary.com/drpwbblec/image/upload/v1773629197/foodio/menu-items/tokfpispuyky3xvsmqx7.png"
                        alt="Hero food"
                        fill
                        priority
                        sizes="510px"
                        className="object-contain scale-[1.58] translate-x-[-60px] translate-y-[20px]" />
                </div>
            </div>
        </section>
    );
}