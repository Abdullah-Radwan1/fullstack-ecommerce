import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Vogue-Haven",
  description:
    "Abdullah, a passionate ecommerce and business website developer with 3+ years of experience. Specializing in modern, responsive, and user-friendly websites to help businesses grow online.",
};

const AboutPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;

  // Content for English and Arabic
  const content: { [key: string]: { [key: string]: string } } = {
    en: {
      title: "About Me",
      description1:
        "Hi, I'm Abdullah — a passionate and dedicated web developer specializing in ecommerce and business websites, with over 3 years of hands-on experience. I craft modern, responsive, and user-centric websites that empower businesses to grow and thrive online.",
      description2:
        "From building ecommerce platforms from the ground up to optimizing existing websites, I focus on delivering high-quality, tailored solutions that meet each client’s unique needs. I'm always eager to explore new technologies and sharpen my skills to stay ahead in the fast-moving world of web development.",
      contactTitle: "Contact Me",
      contactDescription:
        "Have a project in mind or just want to connect? Feel free to reach out!",
      phone: "Phone: ",
      email: "Email: ",
    },
    ar: {
      title: "معلومات عني",
      description1:
        "مرحبًا، أنا عبدالله — مطوّر مواقع متخصص في التجارة الإلكترونية ومواقع الأعمال، أتمتع بشغف والتزام مع خبرة تتجاوز ثلاث سنوات. أعمل على إنشاء مواقع حديثة، سريعة الاستجابة وسهلة الاستخدام، تساهم في نمو ونجاح الأعمال عبر الإنترنت.",
      description2:
        "سواءً كان ذلك ببناء منصة تجارة إلكترونية من الصفر أو تحسين موقع قائم، أحرص دائمًا على تقديم حلول عالية الجودة ومخصصة لتلبية احتياجات كل عميل. كما أنني شغوف بتعلّم التقنيات الجديدة وتطوير مهاراتي لمواكبة عالم تطوير الويب سريع التغير.",
      contactTitle: "اتصل بي",
      contactDescription:
        "هل لديك فكرة مشروع أو ترغب في التواصل؟ لا تتردد في مراسلتي!",
      phone: "الهاتف: ",
      email: "البريد الإلكتروني: ",
    },
  };

  const currentContent = content[lang]; // Get content based on current language

  return (
    <div
      className="  flex justify-center p-6"
      dir={lang === "ar" ? "rtl" : "ltr"} // Set text direction based on language
    >
      <div className="max-w-2xl bg-muted rounded-md shadow-2xl p-8 space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent">
          {currentContent.title}
        </h1>

        {/* Description */}
        <p className="text-lg leading-relaxed">{currentContent.description1}</p>
        <p className="text-lg leading-relaxed">{currentContent.description2}</p>

        {/* Contact Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{currentContent.contactTitle}</h2>
          <p className="text-lg">{currentContent.contactDescription}</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="font-medium">{currentContent.phone}</span>
              <a
                href="tel:01288265751"
                className="hover:underline transition duration-300 bg-gradient-to-r from-green-500 to-blue-700  bg-clip-text text-transparent"
              >
                01288265751
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-medium ">{currentContent.email}</span>
              <a
                href="mailto:abdallahebedo@gmail.com"
                className="hover:underline transition duration-300 bg-gradient-to-r from-green-500 to-blue-700  bg-clip-text text-transparent"
              >
                abdallahebeedo5584@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
