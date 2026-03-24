"use client"
import Image from "next/image";
import { Clock3, Flame, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { MenuItem } from "@/types/home.type";

export default function HomeHero({ items = [] }: { items?: MenuItem[] }) {
    const router = useRouter();

    const defaultImage = "/plate1.png";
    const localFallbackImages = ["/plate1.png", "/plate2.png", "/plate3.png"];
    const images = localFallbackImages;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative z-0 flex flex-col lg:grid lg:h-[444px] lg:grid-cols-[1fr_510px] gap-10 lg:gap-0 overflow-visible">
            <div className="px-6 lg:px-[48px] pt-[120px] lg:pt-[74px] flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="inline-flex items-center rounded-full bg-[#F4EEDF] px-[11px] py-[5px] text-[10px] font-medium leading-none text-[#6E6A61]">
                    <span className="mr-[6px] text-[10px]">🍽</span>
                    Food Ordering Service
                </div>

                <h1
                    className="mt-[18px] max-w-[585px] text-[42px] lg:text-[63px] font-[800] leading-[1.1] lg:leading-[0.98] tracking-[-0.065em] text-[#1A3C34]"
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
                    onClick={() => router.push("/food-menu")}
                    className="mt-[24px] lg:mt-[34px] inline-flex h-[38px] items-center gap-[8px] rounded-full bg-[#1A3C34] px-[20px] text-[13px] font-semibold text-white shadow-[0_14px_24px_rgba(26,60,52,0.18)]"
                >
                    View Menu
                    <MoveRight className="h-[14px] w-[14px]" />
                </button>
            </div>

            <div className="relative h-[340px] lg:h-[444px] w-full overflow-visible bg-[#F4EEDF] rounded-[30px] lg:rounded-none lg:rounded-bl-[180px] lg:rounded-tl-none">
                {/* top offer card */}
                <div className="absolute right-2 lg:right-[32px] top-4 lg:top-[110px] z-30 animate-float">
                    <div className="rounded-[14px] border border-[#E7DED2] bg-white px-[12px] lg:px-[16px] py-[8px] lg:py-[11px] shadow-[0_8px_18px_rgba(0,0,0,0.08)] scale-90 lg:scale-100 origin-top-right">
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
                </div>

                {/* bottom-left delivery card */}
                <div className="absolute left-[-10px] lg:left-[-36px] bottom-4 lg:bottom-[66px] z-30 animate-float-delayed">
                    <div className="rounded-[14px] border border-[#E7DED2] bg-white px-[12px] lg:px-[16px] py-[8px] lg:py-[11px] shadow-[0_8px_18px_rgba(0,0,0,0.08)] scale-90 lg:scale-100 origin-bottom-left">
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
                </div>

                {/* plate image */}
                <div className="absolute inset-0 z-10 font-[0] flex items-center justify-center lg:justify-start">
                    <div className="relative h-full aspect-square lg:scale-180 lg:-translate-x-[20px] lg:translate-y-[20px] rounded-full overflow-hidden">
                        {images.map((img, idx) => (
                            <Image
                                key={`${img}-${idx}`}
                                src={img || defaultImage}
                                alt="Hero food"
                                fill
                                priority={idx === 0}
                                sizes="(max-width: 768px) 100vw, 510px"
                                className={`object-contain transition-opacity duration-500 ${currentImageIndex === idx ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}