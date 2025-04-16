import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { Mail, Facebook, Instagram, Phone, MailIcon, CheckCircle } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { useState } from 'react';
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      title: "Facebook",
      details: "@KurdishBooks",
      link: "https://facebook.com/KurdishBooks",
      bgColor: "bg-[#1877F2]",
      hoverColor: "hover:bg-[#1877F2]/90"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Instagram",
      details: "@KurdishBooks",
      link: "https://instagram.com/KurdishBooks",
      bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
      hoverColor: "hover:from-[#833AB4]/90 hover:via-[#FD1D1D]/90 hover:to-[#F77737]/90"
    },
    {
      icon: <SiTiktok className="w-6 h-6" />,
      title: "Tiktok",
      details: "@KurdishBooks",
      link: "https://Tiktok.com/KurdishBooks",
      bgColor: "bg-[#1DA1F2]",
      hoverColor: "hover:bg-[#1DA1F2]/90"
    },
  ];

  const contactInfo = [
    {
      icon: <MailIcon className="w-5 h-5 text-[#1db954]" />,
      title: "ئیمەیڵ",
      details: "zhyaraland123@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5 text-[#1db954]" />,
      title: "ژمارەی تەلەفۆن",
      details: "+964 750 123 4567"
    }
  ];

  const subjectOptions = [
    { value: "", label: "بابەت هەڵبژێرە", disabled: true },
    { value: "general", label: "پرسیاری گشتی" },
    { value: "suggestion", label: "پێشنیار" },
    { value: "complaint", label: "سکاڵا" },
    { value: "other", label: "بابەتی تر" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/user/contactEmail', formData, { withCredentials: true });

      if (response.status === 200) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", { transition: Slide });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BookstoreNavigation />
      <div className="flex-grow pt-12 bg-[#2E8B57]">
        <div className="relative py-20 px-4 md:px-6">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">پەیوەندیمان پێوە بکە</h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
              ئێمە ئامادەین بۆ وەڵامدانەوەی پرسیارەکانتان و پێشنیارەکانتان
            </p>
          </div>
        </div>

        <div dir="rtl" className="py-12 md:py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">نامە بنێرە</h2>

                {isSubmitted ? (
                  <div className="bg-[#162623] rounded-lg p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-[#1db954] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-100 mb-2">سوپاس بۆ پەیوەندی کردن</h3>
                    <p className="text-gray-300 mb-4">نامەکەت بە سەرکەوتوویی نێردرا. بەم زوانە پەیوەندیت پێوە دەکەین.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                         ناو
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="ناوی خۆت بنووسە"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg focus:border-[#1db954] outline-none transition"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                          ئیمەیڵ
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="ئیمەیڵیەکەت بنووسە"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg focus:border-[#1db954] outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">
                        بابەت
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg appearance-none focus:border-[#1db954] outline-none transition hover:border-[#1db954] cursor-pointer"
                        required
                      >
                        {subjectOptions.map((option, index) => (
                          <option
                            key={index}
                            value={option.value}
                            disabled={option.disabled}
                            className="bg-[#1a1a1a] hover:bg-[#1db954] hover:text-white"
                            style={{
                              ':hover': {
                                backgroundColor: '#1db954',
                                color: 'white'
                              }
                            }}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <style jsx>{`
                        select option:hover {
                          background-color: #1db954 !important;
                          color: white !important;
                        }
                      `}</style>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                        پەیام
                      </label>
                      <textarea
                        id="message"
                        placeholder="پەیامەکەت لێرە بنووسە..."
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        className="resize-none w-full px-4 py-3 bg-[#1a1a1a] text-gray-100 border border-gray-700 rounded-lg focus:border-[#1db954] outline-none transition"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1db954] hover:bg-[#1ed760] text-white font-medium py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      <span>ناردنی نامە</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-100 mb-6 pb-2 border-b border-gray-800">زانیاریەکانی پەیوەندی کردن</h2>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="p-2 bg-gray-800 rounded-lg flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-200 mb-1">{item.title}</h3>
                          <p className="text-gray-300 text-sm">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-100 mb-6 pb-2 border-b border-gray-800">سۆشیال میدیا</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex flex-col items-center justify-center p-4 rounded-lg ${social.bgColor} ${social.hoverColor} text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
                      >
                        <div className="mb-2">{social.icon}</div>
                        <h3 className="font-medium text-sm">{social.title}</h3>
                        <p className="text-xs opacity-80 mt-1">{social.details}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        draggable={true}
        transition={Slide}
      />
    </div>
  );
};

export default ContactUs;