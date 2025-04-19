import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { Book, Search, BookOpen, Library, Info } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

const AboutUs = () => {
  const features = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "کتێبی جۆراوجۆر",
      description: "زانیاری لەسەر هەزاران کتێبی جۆراوجۆر لە هەموو بوارەکاندا"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "گەڕانی ئاسان",
      description: "دۆزینەوەی خێرای کتێبەکان بە ناو، نووسەر، یان بابەت"
    },
    {
      icon: <Info className="w-6 h-6" />,
      title: "زانیاری وردەکاری",
      description: "زانیاری تەواو لەسەر کتێبەکان، نووسەر، و ناوەڕۆک"
    }
  ];
  const { main, tertiary } = useTheme();

  return (
    <div>
      <BookstoreNavigation />

      <div style={{ backgroundColor: tertiary }} className="pt-12">
        <div className="relative text-gray-100 py-16 md:py-24 px-4 md:px-6">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 md:mb-6">کتێبخانەی کوردی</h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto px-4">
              سەرچاوەیەکی باوەڕپێکراو بۆ زانیاری لەسەر کتێبە کوردییەکان. لێرە دەتوانیت زانیاری وردی کتێبەکان و نووسەرەکانیان بدۆزیتەوە.
            </p>
          </div>
        </div>

        <div dir="rtl" className="py-12 md:py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-100">چیرۆکی ئێمە</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#1a1a1a] rounded-2xl shadow-md p-6 md:p-8 space-y-6">
                <p className="text-gray-100 text-base md:text-lg leading-relaxed">
                  لە ساڵی ٢٠١٨دا، کۆمەڵێک هاوڕێی خوێنەر کە هەموو حەزیان لە کتێب و ئەدەبیات بوو بیرۆکەی دروستکردنی ئەم پڕۆژەیەیان هەبوو. لەو کاتەوە هەتا ئێستا، ئێمە گەشەمان کردووە بۆ تیمێکی پڕۆفیشناڵ لە شارەزایانی کتێب، توێژەرەوان، و نووسەران.
                </p>
                <p className="text-gray-100 text-base md:text-lg leading-relaxed">
                  ئامانجی سەرەکیمان یارمەتیدانی خەڵکە بۆ دۆزینەوەی کتێبی باش، تێگەیشتن لە چیرۆکی پشت نووسینەکان، و ناسینی ئەو نووسەرانەی کە کتێبەکانیان خۆشەویست دەکەن. ئێمە بڕوامان وایە خوێندنەوە دەتوانێت جیهان بگۆڕێت، یەک کتێب لە یەک کاتدا.
                </p>
                <p className="text-gray-100 text-base md:text-lg leading-relaxed">
                  ئەمڕۆ، ئێمە شانازی دەکەین بە کۆمەڵگایەکی بەهێزی خوێنەران کە سەردانی ماڵپەڕەکەمان دەکەن بۆ وەرگرتنی زانیاری و ئیلهام. ئێمە هەوڵ دەدەین بەردەوام زانیاری نوێ و ناوەڕۆکی بەسوود دابین بکەین بۆ پشتگیریکردنی گەشتی خوێندنەوەی هەر کەسێک.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div dir="rtl" className="py-12 md:py-16 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-100">تایبەتمەندییەکانمان</h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#1a1a1a] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    style={{ color: main }}
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 md:py-16 bg-[#121212]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-100">ئامانجەکانمان</h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="p-6 bg-[#1a1a1a] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <BookOpen style={{ color: main }} className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="text-gray-100 text-lg md:text-xl font-semibold mb-2">ناساندنی کتێب</h3>
                  <p className="text-sm md:text-base text-gray-300">ناساندنی کتێبە کوردییەکان بە خوێنەران و هاندانیان بۆ خوێندنەوە</p>
                </div>
                <div className="p-6 bg-[#1a1a1a] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Library style={{ color: main }} className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="text-gray-100 text-lg md:text-xl font-semibold mb-2">پاراستنی کەلتوور</h3>
                  <p className="text-sm md:text-base text-gray-300">بەڵگەکردن و پاراستنی مێژووی کتێبە کوردییەکان</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default AboutUs; 