"use client";
import Link from "next/link";

export default function Products() {
  const products = [
    { id: 1, title: "الموناليزا", img: "/mon.jpg" },
    { id: 2, title: "دورية", img: "/dor.jpg" },
    { id: 3, title: "معلقات", img: "/dd.jpg" },
  ];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

    
      <div className="fixed top-0 left-0 w-full h-8 bg-[#bfa982] z-50 flex items-center overflow-hidden">
        <div className="inline-block whitespace-nowrap pl-full animate-marquee font-semibold text-[#4b3e2e] text-base">
          معنا نحو الإبداع
        </div>
      </div>

    
      <header className="sticky top-8 z-40 flex justify-between items-center bg-[#d9c8b4] px-5 py-3 text-[#4b3e2c] font-bold">
        <Link href="/products" className="hover:underline">
          الصفحة الرئيسية
        </Link>
        <input
          type="search"
          placeholder="ابحث..."
          className="rounded-full px-4 py-1 text-sm w-52 focus:outline-none"
        />
      </header>

     
      <div className="max-w-5xl mx-auto mt-32 px-4 text-center font-sans">
        <h2 className="text-2xl mb-8 font-bold">أهلاً وسهلاً بك في متجر معلقات</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-72 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-[#4b3e2c]">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      
      <style jsx global>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </>
  );
}
