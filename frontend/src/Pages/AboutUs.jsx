import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { Book, Search, BookOpen, Library, Info } from 'lucide-react';

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

  return (
    <div>
      <BookstoreNavigation />
      <div className="pt-20 md:pt-24">
        <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-24 px-4 md:px-6">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">کتێبخانەی کوردی</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto px-4">
              سەرچاوەیەکی باوەڕپێکراو بۆ زانیاری لەسەر کتێبە کوردییەکان. لێرە دەتوانیت زانیاری وردی کتێبەکان و نووسەرەکانیان بدۆزیتەوە.
            </p>
          </div>
        </div>

        <div className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">چیرۆکی ئێمە</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-6">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  لە ساڵی ٢٠١٨دا، کۆمەڵێک هاوڕێی خوێنەر کە هەموو حەزیان لە کتێب و ئەدەبیات بوو بیرۆکەی دروستکردنی ئەم پڕۆژەیەیان هەبوو. لەو کاتەوە هەتا ئێستا، ئێمە گەشەمان کردووە بۆ تیمێکی پڕۆفیشناڵ لە شارەزایانی کتێب، توێژەرەوان، و نووسەران.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  ئامانجی سەرەکیمان یارمەتیدانی خەڵکە بۆ دۆزینەوەی کتێبی باش، تێگەیشتن لە چیرۆکی پشت نووسینەکان، و ناسینی ئەو نووسەرانەی کە کتێبەکانیان خۆشەویست دەکەن. ئێمە بڕوامان وایە خوێندنەوە دەتوانێت جیهان بگۆڕێت، یەک کتێب لە یەک کاتدا.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  ئەمڕۆ، ئێمە شانازی دەکەین بە کۆمەڵگایەکی بەهێزی خوێنەران کە سەردانی ماڵپەڕەکەمان دەکەن بۆ وەرگرتنی زانیاری و ئیلهام. ئێمە هەوڵ دەدەین بەردەوام زانیاری نوێ و ناوەڕۆکی بەسوود دابین بکەین بۆ پشتگیریکردنی گەشتی خوێندنەوەی هەر کەسێک.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div dir="rtl" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">تایبەتمەندییەکانمان</h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 md:py-16 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">ئامانجەکانمان</h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <BookOpen className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">ناساندنی کتێب</h3>
                  <p className="text-sm md:text-base text-gray-600">ناساندنی کتێبە کوردییەکان بە خوێنەران و هاندانیان بۆ خوێندنەوە</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Library className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2">پاراستنی کەلتوور</h3>
                  <p className="text-sm md:text-base text-gray-600">بەڵگەکردن و پاراستنی مێژووی کتێبە کوردییەکان</p>
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