import availableColors from "../../Helpers/colors";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

const Footer = () => {
    const { selectedColor, updateColor, main, secondary } = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleColorClick = (colorName) => {
        updateColor(colorName);
    };

    return (
        <footer dir="rtl" className="bg-[#1a1a1a] text-white">
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">پەرتووکخانە</h2>
                            <p className="text-gray-300 mb-4">
                                گەورەترین پەرتووکخانە لە کوردستان بۆ خوێندنەوەی پەرتووکی
                                نوێ و کلاسیک بە زمانی کوردی و زمانەکانی تر.
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <h2 className={`text-xl font-bold mb-4 text-gray-100`}>ڕەنگەکان</h2>
                            <div className="flex flex-wrap">
                                {availableColors.map((colorObj) => (
                                    <div
                                        onClick={() => handleColorClick(colorObj.color)}
                                        key={colorObj.color}
                                        className={`
                                                w-6 h-6 
                                                rounded-full 
                                                mr-3 mb-3
                                                cursor-pointer
                                                transition-all duration-200
                                                hover:scale-110
                                                hover:shadow-lg
                                                relative
                                            `}
                                        style={{ backgroundColor: colorObj.main }}
                                    >
                                        {selectedColor === colorObj.color && (
                                            <div className="absolute inset-0 rounded-full border-2 border-white" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:col-span-1">
                        <h3 className="text-xl font-semibold mb-4">بەشەکان</h3>
                        <ul className="space-y-2">
                            {["/books", "/authors", "/quotes", "/news", "/suggestions"].map((href, index) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        style={{
                                            color: hoveredIndex === index ? secondary : '#d1d5db',
                                        }}
                                        className="transition"
                                    >
                                        {href === "/books" && "کتێبەکان"}
                                        {href === "/authors" && "نووسەرەکان"}
                                        {href === "/quotes" && "وتە"}
                                        {href === "/news" && "هەوڵ"}
                                        {href === "/suggestions" && "پێشنیاری ئێمە"}
                                    </a>
                                </li>
                            ))}

                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="text-xl font-semibold mb-4">پەیوەندی</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span dir="ltr" className="text-gray-300">0770 322 7250</span>
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-300">info@bookstore.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="text-xl font-semibold mb-4">فۆلۆمان بکە لە</h3>
                        <div className="flex flex-wrap gap-4">
                            <a target="_blank" href="https://www.facebook.com/" className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/" className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a target="_blank" href="https://x.com/" className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M4.25 3h4.768l3.82 5.723L16.785 3H21l-6.708 8.844L21.75 21h-4.803l-4.053-6.038L8.585 21H4.25l7.095-9.198L4.25 3Z" />
                                </svg>
                            </a>
                            <a target="_blank" href="https://www.youtube.com/" className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M21.582 7.172a2.513 2.513 0 00-1.768-1.768C18.254 5 12 5 12 5s-6.254 0-7.814.404c-.86.229-1.538.908-1.768 1.768C2 8.733 2 12 2 12s0 3.267.404 4.828c.23.86.909 1.538 1.768 1.768C5.746 19 12 19 12 19s6.254 0 7.814-.404a2.513 2.513 0 001.768-1.768C22 15.267 22 12 22 12s0-3.267-.418-4.828zM9.955 15.156V8.844L15.667 12l-5.712 3.156z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8 pt-8 border-t border-gray-700 text-gray-400">
                    <p dir="ltr">©{new Date().getFullYear()}  هەموو مافەکان پارێزراون بۆ پەرتووکخانە</p>
                    <p className="mt-2">developed by <a target="_blank" href="https://www.facebook.com/zhyaromer999/" className='text-white'>Zhyar Omer</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;