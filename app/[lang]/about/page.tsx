import React from "react";

const AboutPage = async ({ params }: { params: { lang: string } }) => {
  const { lang } = params;

  // Content for English and Arabic
  const content: { [key: string]: { [key: string]: string } } = {
    en: {
      title: "About Me",
      description1:
        "Hi, I'm Abdullah, a passionate and dedicated ecommerce and business website developer with over 3 years of experience. I specialize in creating modern, responsive, and user-friendly websites that help businesses grow and succeed online.",
      description2:
        "Whether it's building an ecommerce platform from scratch or optimizing an existing business website, I focus on delivering high-quality solutions tailored to my clients' needs. I'm always eager to learn new technologies and improve my skills to stay ahead in the ever-evolving world of web development.",
      contactTitle: "Contact Me",
      contactDescription:
        "If you'd like to collaborate or have any questions, feel free to reach out!",
      phone: "Phone: ",
      email: "Email: ",
    },
    ar: {
      title: "معلومات عني",
      description1:
        "مرحبًا، أنا عبدالله, مطور مواقع تجارة إلكترونية ومواقع أعمال متخصص ومتفانٍ مع أكثر من ثلاث اعوام من الخبرة. أتخصص في إنشاء مواقع ويب حديثة وسريعة الاستجابة وسهلة الاستخدام تساعد الأعمال على النجاح والتطور عبر الإنترنت.",
      description2:
        "سواء كان ذلك بناء منصة تجارة إلكترونية من الصفر أو تحسين موقع أعمال موجود، أركز على تقديم حلول عالية الجودة مصممة خصيصًا لاحتياجات العملاء. أنا دائمًا متحمس لتعلم التقنيات الجديدة وتحسين مهاراتي للبقاء في المقدمة في عالم تطوير الويب سريع التطور.",
      contactTitle: "اتصل بي",
      contactDescription:
        "إذا كنت ترغب في التعاون أو لديك أي أسئلة، فلا تتردد في التواصل معي!",
      phone: " الهاتف: ",
      email: " البريد الإلكتروني: ",
    },
  };

  const currentContent = content[lang]; // Get content based on current language

  return (
    <div
      className="  flex justify-center p-6"
      dir={lang === "ar" ? "rtl" : "ltr"} // Set text direction based on language
    >
      <div className="max-w-2xl bg-muted rounded-lg shadow-2xl p-8 space-y-6">
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
                abdallahebedo@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
