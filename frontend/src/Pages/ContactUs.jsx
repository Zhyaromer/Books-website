import { useState } from 'react';
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { Mail, Facebook, Instagram, Twitter, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const subjectOptions = [
    { value: '', label: 'هەڵبژاردنی بابەت' },
    { value: 'suggestion', label: 'پێشنیار' },
    { value: 'feedback', label: 'ڕەخنە و تێبینی' },
    { value: 'error', label: 'ڕاپۆرتی هەڵە' },
    { value: 'collaboration', label: 'هاوکاری' },
    { value: 'other', label: 'بابەتی تر' }
  ];

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
              لە ڕێگەی سۆشیاڵ میدیا یان فۆرمی پەیوەندیکردنەوە پەیوەندیمان پێوە بکە
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

        <div className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">ناردنی پەیام</h2>
                <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">ناو</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm"
                        required
                        placeholder="ناوی تەواو"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">ئیمەیڵ</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm"
                        required
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">بابەت</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm appearance-none"
                      required
                    >
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute left-4 top-[42px] pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">پەیام</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none bg-white/50 backdrop-blur-sm"
                      required
                      placeholder="پەیامەکەت لێرە بنووسە..."
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Send className="w-5 h-5 ml-2" />
                      ناردنی پەیام
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs; 