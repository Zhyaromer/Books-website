import { useState } from 'react';
import { Lock, Send } from 'lucide-react';
import {axiosInstance} from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const res = await axiosInstance.post('/auth/forgotPassword', { email });
    console.log(res.data);
    if (res.status === 200) {
      setIsSubmitted(true);
      toast.success('Email sent successfully');
    } else if (res.status === 400) {
      toast.error('bad request');
    } else if (res.status === 404) {
      toast.error('not found');
    } 
   } catch {
    toast.error('something went wrong');
   }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <img 
            src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg" 
            alt="وێنەی بیرچوونی وشەی نهێنی" 
            className="h-40 w-auto mb-4" 
          />
          <h1 className="text-2xl font-bold text-gray-800">
            وشەی نهێنیت لەبیر چووە؟
          </h1>
          <p className="text-gray-600 text-center mt-2">
            ئیمەیڵی خۆت بنووسە و ئێمە لینکێک بۆ نوێکردنەوەی وشەی نهێنیت بۆ دەنێرین
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ئیمەیڵ
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ئیمەیڵی خۆت بنووسە"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
            >
              <Send className="h-4 w-4 ml-2" />
              لینکی نوێکردنەوەی وشەی نهێنی بنێرە
            </button>
          </form>
        ) : (
          <div className="text-center p-4 bg-green-50 rounded-md">
            <p className="text-green-600 font-medium">
              ئیمەیڵێکمان بۆ {email} نارد!
            </p>
            <p className="text-gray-600 mt-2">
              تکایە ئیمەیڵەکەت بپشکنە و ڕێنماییەکانی شوێن بکە بۆ نوێکردنەوەی وشەی نهێنیت.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="login" className="text-blue-600 hover:text-blue-800 text-sm">
            بگەڕێوە بۆ پەڕەی چوونە ژوورەوە
          </a>
        </div>
      </div>
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default ForgotPassword;