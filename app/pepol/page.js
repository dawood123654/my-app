"use client";
import { useRef, useEffect } from "react";
import Head from "next/head";

export default function ContactPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("animate-fadeInUp");
      },
      { threshold: 0.3 }
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>تواصل معنا</title>
      </Head>

      <section
        ref={sectionRef}
        className="max-w-xl mx-auto mt-24 text-center rtl opacity-0 transform translate-y-12 transition-all duration-1000 px-4"
      >
        <h2 className="text-3xl font-bold mb-2 text-gray-800">تواصل معنا</h2>
        <p className="text-gray-600 mb-6">
          هل لديك استفسار أو ترغب في طلب خاص؟ يسعدنا التواصل معك.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("تم الإرسال بنجاح!");
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="الاسم"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            placeholder="رسالتك"
            required
            className="w-full p-3 h-28 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition-colors duration-300"
          >
            إرسال
          </button>
        </form>
      </section>

      <style jsx>{`
        .animate-fadeInUp {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
}
