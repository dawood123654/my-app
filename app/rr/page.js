"use client";
import Head from "next/head";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>من نحن</title>
        <meta name="description" content="تعرف علينا - من نحن" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

     
      <header className="flex justify-between items-center px-6 py-4 bg-[#fff9f4] border-b border-gray-200 sticky top-0 z-50 rtl">
        <div className="logo">
          <Link href="/products">
            <img src="/dd.jpg" alt="الشعار" className="h-12" />
          </Link>
        </div>
        <nav className="text-[#5c4434] font-bold text-lg">
          <Link href="/products" className="hover:text-[#a8805b] transition">
            الرئيسية
          </Link>
        </nav>
      </header>

    
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#fef4ea] to-[#f6e2d3] px-6 py-16 text-center rtl">
        <div className="max-w-3xl bg-white/90 rounded-xl shadow-xl p-8 md:p-14 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-[#a46b44] mb-6">من نحن</h2>
          <p className="text-[#4a3b2b] text-lg md:text-xl leading-relaxed font-normal">
            نحن فريق فني شغوف، نؤمن بأن الفن ليس مجرد لوحة تُعلّق، بل رسالة تُروى، وذوق يُعبّر عنك.
            نُقدم لوحات فنية مصمّمة بعناية، تمزج بين الأصالة والحداثة، لتجعل مساحتك تنطق بالجمال.
            <br /><br />
            في كل عمل نقدّمه، تجد لمسة من الروح، وتفصيلًا من الشغف. نسعى لأن نكون خيارك الأول في عالم الفن المعلّق.
          </p>
        </div>
      </section>

     
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1.2s ease-in-out;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
