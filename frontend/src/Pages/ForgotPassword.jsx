import { useState } from 'react';
import { Lock, Send } from 'lucide-react';
import { axiosInstance } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/forgotPassword', { email });
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
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="max-w-md w-full bg-[#1a1a1a] rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#1db954] p-3 rounded-full mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-4571933-3805751.png"
            alt="وێنەی بیرچوونی وشەی نهێنی"
            className="h-40 w-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-100">
            وشەی نهێنیت لەبیر چووە؟
          </h1>
          <p className="text-gray-100 text-center mt-2">
            ئیمەیڵی خۆت بنووسە و ئێمە لینکێک بۆ نوێکردنەوەی وشەی نهێنیت بۆ دەنێرین
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100 mb-1"
              >
                ئیمەیڵ
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-[#1a1a1a] text-white placeholder:text-gray-300 rounded-md border border-gray-600 p-3 text-right shadow-sm focus:outline-none focus:ring-1 focus:ring-[#1db954]"
                placeholder="ئیمەیڵەکەت بنووسە"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1db954] hover:bg-[#1ed760] text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
            >
              لینکی نوێکردنەوەی وشەی نهێنی بنێرە
              <Send className="h-4 w-4 mr-2" />
            </button>
          </form>
        ) : (
          <div className="text-center p-4 rounded-md">
            <p className="text-[#1db954] font-medium">
              ئیمەیڵێکمان بۆ {email} نارد!
            </p>
            <p className="text-gray-200 mt-2">
              تکایە ئیمەیڵەکەت بپشکنە و شوێن ڕێنماییەکان بکەوە بۆ نوێکردنەوەی وشەی نهێنیت.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="login" className="text-[#1db954] hover:text-[#1ed760] text-sm">
            گەڕانەوە بۆ پەڕەی چوونە ژوورەوە
          </a>
        </div>
      </div>
      <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
    </div>
  );
};

export default ForgotPassword;