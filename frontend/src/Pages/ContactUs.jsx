import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { Mail, Facebook, Instagram, Twitter} from 'lucide-react';

const ContactUs = () => {
  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      title: "Facebook",
      details: "@KurdishBooks",
      link: "https://facebook.com/KurdishBooks",
      bgColor: "bg-[#1877F2]"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Instagram",
      details: "@KurdishBooks",
      link: "https://instagram.com/KurdishBooks",
      bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      title: "Twitter",
      details: "@KurdishBooks",
      link: "https://twitter.com/KurdishBooks",
      bgColor: "bg-[#1DA1F2]"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "ئیمەیڵ",
      details: "info@kurdishbooks.com",
      link: "mailto:info@kurdishbooks.com",
      bgColor: "bg-blue-600"
    }
  ];

  return (
    <div>
      <BookstoreNavigation />
      <div className="pt-20 md:pt-24">
        <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-24 px-4 md:px-6">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">پەیوەندیمان پێوە بکە</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              لە ڕێگەی سۆشیاڵ میدیا پەیوەندیمان پێوە بکە
            </p>
          </div>
        </div>

        <div className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                    <div className={`${social.bgColor} p-6 flex items-center justify-center text-white transition-transform group-hover:scale-105`}>
                      {social.icon}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{social.title}</h3>
                      <p className="text-indigo-600">{social.details}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
     
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs; 