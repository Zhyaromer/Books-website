import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const [bookPosition, setBookPosition] = useState(-100);
    const [rotation, setRotation] = useState(0);
    const [bounce, setBounce] = useState(0);
    const [showText, setShowText] = useState(false);
    const [showDust, setShowDust] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setBookPosition(20);
            setRotation(15);
            setTimeout(() => {
                setShowDust(true);
                setBookPosition(0);
                setRotation(0);
                setBounce(1);
                setTimeout(() => setShowText(true), 600);
            }, 600);
        }, 400);
    }, []);

    return (
        <div>
            <BookstoreNavigation />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-gray-800 p-6 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-repeat"
                        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
                </div>

                <div className="relative w-full max-w-lg mb-8">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-700 rounded-full filter blur-md opacity-60 scale-x-75"
                        style={{
                            transform: `translateX(-50%) scale(${0.8 + (bounce * 0.2)})`,
                            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}></div>

                    <div
                        className="relative mx-auto w-32 h-40"
                        style={{
                            transform: `translateY(${bookPosition}px) rotate(${rotation}deg)`,
                            transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        <div className="absolute w-32 h-40 bg-indigo-600 rounded-r-md shadow-lg">
                            <div className="absolute left-0 top-0 w-2 h-full bg-indigo-800"></div>
                            <div className="absolute left-4 top-3 right-3 bottom-3 bg-indigo-50 rounded-r-sm p-1">
                                <div className="w-full h-2 bg-indigo-400 mb-1"></div>
                                <div className="w-full h-2 bg-indigo-400 mb-1"></div>
                                <div className="w-3/4 h-2 bg-indigo-400"></div>

                                <div className="absolute left-0 top-12 w-full text-center text-indigo-800 font-bold text-xs -rotate-90 origin-center">
                                    کتێب
                                </div>
                            </div>

                            <div className="absolute right-0 top-0 w-1 h-full bg-white opacity-30"></div>
                        </div>

                        {showDust && (
                            <>
                                <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-300 rounded-full animate-ping opacity-70"></div>
                                <div className="absolute bottom-0 left-10 w-1 h-1 bg-gray-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '0.2s' }}></div>
                                <div className="absolute bottom-0 right-3 w-2 h-2 bg-gray-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '0.1s' }}></div>
                                <div className="absolute bottom-0 right-12 w-1 h-1 bg-gray-300 rounded-full animate-ping opacity-70" style={{ animationDelay: '0.3s' }}></div>
                            </>
                        )}
                    </div>
                </div>

                <div className={`text-center transition-all duration-1000 transform ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-6xl font-bold mb-2 text-indigo-500">404</h1>
                    <h2 className="text-3xl font-bold mb-4 text-gray-100">پەڕە نەدۆزرایەوە!</h2>
                    <p className="text-xl mb-6 text-gray-300">ئەو پەڕەیەی کە داوات کردووە بەردەست نییە</p>
                    <button onClick={() => navigate('/')} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                        گەڕانەوە بۆ سەرەتا
                    </button>
                </div>

                <div className="absolute top-1/4 left-8 w-12 h-16 bg-amber-50 rounded-sm opacity-20 animate-float transform rotate-12"></div>
                <div className="absolute bottom-1/4 right-8 w-8 h-12 bg-amber-50 rounded-sm opacity-20 animate-float transform -rotate-6" style={{ animationDelay: '1.5s' }}></div>
            </div>
            <Footer />
        </div>
    );
};

const floatKeyframes = `
@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}
`;

const style = document.createElement('style');
style.innerHTML = floatKeyframes;
document.head.appendChild(style);

export default NotFoundPage;