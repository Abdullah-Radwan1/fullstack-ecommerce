import React from "react";

const Footer = async ({ lang }: { lang: string }) => {
  const ar = lang === "ar";

  return (
    <footer>
      <div
        className={`flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 ${
          ar ? "text-right" : "text-left"
        }`}
      >
        {/* Title and Description */}
        <div className="w-4/5">
          <h5 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent">
            {ar ? "ڤوجيه هاڤن" : "Vogue-Haven"}
          </h5>
          <p className="mt-6 text-sm">
            {ar
              ? "مطور full stack أعمل على تطوير و إكتساب مهارات جديده, لدي خبرة تزيد عن 3 سنوات ومهارات في مجموعة واسعة من التقنيات، بما في ذلك Next.js, express وأنواع مختلفة من قواعد البيانات مع Prisma كـORM، مع التزام قوي بتقديم تجارب مستخدم عالية الجودة"
              : "A continuously self-improving Full-stack developer with +3 years of experience, skilled in a wide range of technologies,including Next.js, express, and different types of databases with prisma as an ORM, with a strong commitment to deliveringhigh-quality user experiences"}
          </p>
        </div>

        {/* Company Links */}
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium mb-5">{ar ? "الشركة" : "Company"}</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  {ar ? "الرئيسية" : "Home"}
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  {ar ? "من نحن" : "About us"}
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  {ar ? "اتصل بنا" : "Contact us"}
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  {ar ? "سياسة الخصوصية" : "Privacy policy"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium mb-5">
              {ar ? "تواصل معنا" : "Get in touch"}
            </h2>
            <div className="text-sm space-y-2">
              <p>+01288265751</p>
              <p>abdallahbeedo5584@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center text-xs md:text-sm">
        {ar
          ? "حقوق النشر 2025 © عبد الله رضوان. جميع الحقوق محفوظة."
          : "Copyright 2025 © Abdullah Radwan. All Rights Reserved."}
      </p>
    </footer>
  );
};

export default Footer;
