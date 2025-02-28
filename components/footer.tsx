import React from "react";

const Footer = async ({ lang }: { lang: string }) => {
  type FooterTranslations = {
    [key: string]: {
      title: string;
      description: string;
      company: string;
      home: string;
      aboutUs: string;
      contactUs: string;
      privacyPolicy: string;
      getInTouch: string;
      phone: string;
      email: string;
      copyright: string;
    };
  };

  // Define translations for the content
  const translations: FooterTranslations = {
    en: {
      title: "Vogue-Haven",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      company: "Company",
      home: "Home",
      aboutUs: "About us",
      contactUs: "Contact us",
      privacyPolicy: "Privacy policy",
      getInTouch: "Get in touch",
      phone: "+01288265751",
      email: "abdallahbeedo5584@gmail.com",
      copyright: "Copyright 2025 © Abdullah Radwan All Right Reserved.",
    },
    ar: {
      title: "ڤوجيه هاڤن",
      description:
        "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان لوريم إيبسوم النص القياسي في الصناعة منذ القرن الخامس عشر، عندما أخذت طابعة غير معروفة لوحًا من النوع وخلطته لعمل كتاب عينة.",
      company: "الشركة",
      home: "الرئيسية",
      aboutUs: "من نحن",
      contactUs: "اتصل بنا",
      privacyPolicy: "سياسة الخصوصية",
      getInTouch: "تواصل معنا",
      phone: "+01288265751",
      email: "abdallahbeedo5584@gmail.com",
      copyright: "حقوق النشر 2025 © عبد الله رضوان. جميع الحقوق محفوظة.",
    },
  };

  // Get the translated content based on the language
  const content = translations[lang as keyof typeof translations];

  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30">
        <div className="w-4/5">
          <h5 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent">
            {content.title}
          </h5>
          <p className="mt-6 text-sm">{content.description}</p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium mb-5">{content.company}</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  {content.home}
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  {content.aboutUs}
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  {content.contactUs}
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  {content.privacyPolicy}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium mb-5">{content.getInTouch}</h2>
            <div className="text-sm space-y-2">
              <p>{content.phone}</p>
              <p>{content.email}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">{content.copyright}</p>
    </footer>
  );
};

export default Footer;
