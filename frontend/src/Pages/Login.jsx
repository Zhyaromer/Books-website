import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { axiosInstance, useCheckAuth } from "../context/AxiosInstance";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const LoginForm = () => {
    const { main, secondary, tertiary } = useTheme();
    const navigate = useNavigate();
    const { isAuthenticated } = useCheckAuth();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const [credentials, setCredentials] = useState({
        user_login_email: '',
        user_login_password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/auth/login', {
            email: credentials.user_login_email,
            password: credentials.user_login_password
        }, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    const token = response.data.token;
                    const userId = response.data.userId;
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    navigate('/');
                }
            })
            .catch(error => {
                toast.error(error.response.data.message || "Something went wrong");
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div>
            <BookstoreNavigation />
            <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#121212] p-4">
                <div className="w-full max-w-md rounded-lg bg-[#1a1a1a] p-8 shadow-lg">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-100">چوونەژوورەوە</h2>
                    <form onSubmit={handleSubmit} className="space-y-6" autoComplete="new-password">
                        <div className="space-y-2">
                            <label htmlFor="user_login_email" className="block text-right text-sm font-medium text-gray-200">
                                ئیمەیڵ
                            </label>
                            <div className="relative bg-[#1a1a1a]">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <Mail className="h-5 w-5 text-gray-300" />
                                </div>
                                <input
                                    type="text"
                                    id="user_login_email"
                                    name="user_login_email"
                                    value={credentials.user_login_email}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    className="w-full bg-[#1a1a1a] text-gray-100 placeholder:text-gray-300 rounded-md border border-gray-600 p-3 pr-10 text-right shadow-sm focus:outline-none"
                                    onFocus={(e) => e.target.style.borderColor = secondary}
                                    onBlur={(e) => e.target.style.borderColor = '#4a5565'}
                                    placeholder="ئیمەیڵیەکەت بنووسە"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="user_login_password" className="block text-right text-sm font-medium text-gray-200">
                                وشەی نهێنی
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <Lock className="h-5 w-5 text-gray-300" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="user_login_password"
                                    name="user_login_password"
                                    value={credentials.user_login_password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    className="w-full bg-[#1a1a1a] text-gray-100 placeholder:text-gray-300 rounded-md border border-gray-600 p-3 pr-10 text-right shadow-sm focus:outline-none"
                                    onFocus={(e) => e.target.style.borderColor = secondary}
                                    onBlur={(e) => e.target.style.borderColor = '#4a5565'}
                                    placeholder="وشەی نهێنیەکەت بنووسە"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 left-0 flex items-center pl-3 focus:outline-none"
                                >
                                    {showPassword ?
                                        <EyeOff className="h-5 w-5 text-gray-200 hover:text-gray-400" /> :
                                        <Eye className="h-5 w-5 text-gray-200 hover:text-gray-400" />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <a
                                style={{ color: secondary }}
                                onMouseEnter={(e) => e.target.style.color = tertiary}
                                onMouseLeave={(e) => e.target.style.color = secondary}
                                href="/forgotpassword" className="text-sm font-medium transition-colors duration-300">
                                وشەی نهێنیت لەبیرچووە؟
                            </a>
                        </div>

                        <div>
                            <button
                                type="submit"
                                style={{ backgroundColor: secondary }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = tertiary}
                                onMouseLeave={(e) => e.target.style.backgroundColor = secondary}
                                className="w-full rounded-md py-3 text-sm font-medium text-white ransition-colors duration-300 focus:outline-none"
                            >
                                چوونەژوورەوە
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-300">
                            هەژمارت نییە؟{' '}
                            <a
                                style={{ color: secondary }}
                                onMouseEnter={(e) => e.target.style.color = tertiary}
                                onMouseLeave={(e) => e.target.style.color = secondary}
                                href="/signup" className="font-medium transition-colors duration-300">
                                هەژمارێک دروست بکە
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
        </div>
    );
};

export default LoginForm;