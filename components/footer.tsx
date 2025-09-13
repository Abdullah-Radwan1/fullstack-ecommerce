import { Github, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = async ({ lang }: { lang: string }) => {
  const ar = lang === "ar";

  return (
    <footer>
      <div
        className={`flex flex-col md:flex-row items-start justify-evenly px-6  gap-4 py-14 border-b border-gray-500/30 `}
      >
        {/* Title and Description */}
        <div className="w-4/5">
          <h5 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent">
            {ar ? "ڤوجيه هاڤن" : "Vogue-Haven"}
          </h5>
          <p className="mt-6 text-sm">
            {ar
              ? " فوجيه هاڤن هو موقع تجاري يهدف إلى توفير مجموعة متنوعة من المنتجات و تسهيل البحث و الفلتره علي المستخدم, اضافه امكانيه  الدفع بالفيزا و ماستر كارد, مبني علي قاعده بيانات سريعه , مع واجهه اماميه سلسه و تعطي المستخدم  تجربه  رائعه"
              : "Vogue-Haven is an e-commerce website that aims to provide a wide range of products. It includes the ability to pay with Visa and MasterCard, built on a fast database. It has a user-friendly interface and provides a great experience for users."}
          </p>
        </div>

        {/* Company Links */}
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium mb-5">
              {ar ? "تواصل معي" : "Contact me"}
            </h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link
                  className="hover:underline transition flex items-center gap-1"
                  href="https://www.linkedin.com/in/abdullah-radwan-280140284/"
                  target="_blank"
                >
                  {ar ? "لينكد إن" : "LinkedIn"}
                  <Linkedin size={15} color="royalblue" />
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline transition flex items-center gap-1"
                  href="https://github.com/Abdullah-Radwan1"
                  target="_blank"
                >
                  {ar ? "github" : "github"}
                  <Github size={15} color="purple" />
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline transition flex items-center gap-1"
                  target="_blank"
                  href="https://wa.link/7thukh"
                >
                  {ar ? "واتساب" : "whatsapp"}
                  <MessageCircle color="green" size={15} />
                </Link>
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
              <p className="flex items-center gap-1">
                +01288265751 <Phone size={15} />
              </p>
              <p className="flex items-center gap-1">
                abdallahbeedo5584@gmail.com <Mail size={15} />
              </p>
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
