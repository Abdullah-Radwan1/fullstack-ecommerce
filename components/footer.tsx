import { Github, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

const Footer = async () => {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const ar = locale === "ar";

  return (
    <footer>
      <div
        className={`flex flex-col md:flex-row items-start justify-evenly px-6  gap-4 py-10 border-b border-gray-500/30 `}
      >
        {/* Title and Description */}
        <div className="w-4/5">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-my-main  to-my-secondary  bg-clip-text text-transparent">
            {t("title")}
          </h2>
          <p className="mt-6 text-sm">{t("description")}</p>
        </div>

        {/* Company Links */}
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium mb-5">{t("contactMe")}</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link
                  aria-label="linkedin"
                  className="hover:underline transition flex items-center gap-1"
                  href="https://www.linkedin.com/in/abdullah-radwan-280140284/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("linkedin")}
                  <Linkedin size={15} color="royalblue" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  aria-label="github"
                  className="hover:underline transition flex items-center gap-1"
                  href="https://github.com/Abdullah-Radwan1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("github")}
                  <Github size={15} color="purple" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  aria-label="whatsapp"
                  className="hover:underline transition flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.link/7thukh"
                >
                  {t("whatsapp")}
                  <MessageCircle color="green" size={15} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium mb-5">{t("getInTouch")}</h2>
            <div className="text-sm space-y-2">
              <p className="flex items-center gap-1">
                +01288265751 <Phone size={15} />
              </p>
              <p className="flex items-center gap-1">
                abdullah.radwan.dev@gmail.com <Mail size={15} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center text-xs md:text-sm">{t("copyright")}</p>
    </footer>
  );
};

export default Footer;
