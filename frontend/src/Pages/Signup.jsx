import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { useState } from "react";
import { axiosInstance, useCheckAuth } from "../context/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {
    const { main, secondary, tertiary } = useTheme();
    const navigate = useNavigate();
    const { isAuthenticated } = useCheckAuth();
    if (isAuthenticated === true) {
        navigate("/");
    }
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "تکایە ناوت بنووسە";
        }

        if (!formData.username.trim()) {
            newErrors.username = "تکایە نازناوەکەت بنووسە";
        } else if (formData.username.length < 3) {
            newErrors.username = "نازناوەکەت دەبێت لە ٣ پیت زیاتر بێت";
        }

        if (!formData.email.trim()) {
            newErrors.email = "تکایە ئیمەیڵ بنووسە";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "تکایە ئیمەیڵێکی دروست بنووسە";
        }

        if (!formData.password) {
            newErrors.password = "تکایە وشەی نهێنی بنووسە";
        } else if (formData.password.length < 8) {
            newErrors.password = "وشەی نهێنی دەبێت لە 8 پیت زیاتر بێت";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "وشە نهێنییەکان یەک ناگرنەوە";
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "وشەی نهێنی دەبێت لانیکەم یەک پیتی گەورە، یەک ژمارە، یەک کارەکتەری تایبەت و لانیکەم 8 کارەکتەری تێدا بێت";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await axiosInstance.post("/auth/signup", {
                    username: formData.username,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    conformPassword: formData.confirmPassword
                });
                console.log(res.data);

                if (res.status === 201) {
                    navigate("/login");
                } else if (res.status === 400) {
                    setErrors({ error: res.data.message });
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                    setErrors({ error: error.response.data.message });
                }
                setErrors({ error: "An error occurred while signing up" });
            }
        }
    };

    return (
        <div>
            <BookstoreNavigation />
            <div dir="rtl" className="max-w-4xl mx-auto px-4 py-12 pt-20 md:pt-32">
                <div className="bg-[#1a1a1a] rounded-lg shadow-md p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-100 mb-2">دروستکردنی هەژمار</h1>
                        <p className="text-gray-300">
                            زانیاریەکان پڕ بکەرەوە بۆ بەردەوام بوون
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">ناو</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={(e) => e.target.style.borderColor = secondary}
                                    onBlur={(e) => e.target.style.borderColor = '#4a5565'}
                                    className={`w-full px-4 text-gray-100 py-2 border bg-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-2 ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md`}
                                    placeholder="ناوەکەت بنووسە"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">نازناو</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onFocus={(e) => e.target.style.borderColor = secondary}
                                    onBlur={(e) => e.target.style.borderColor = '#4a5565'}
                                    onChange={handleChange}
                                    className={`w-full text-gray-100 px-4 py-2 border bg-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-2 ${errors.username ? 'border-red-500' : 'border-gray-600'} rounded-md`}
                                    placeholder="نازناوەکەت بنووسە"
                                />
                                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">وشەی نهێنی</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={(e) => e.target.style.borderColor = secondary}
                                        onBlur={(e) => e.target.style.borderColor = '#4a5565'}
                                        className={`w-full px-4 text-gray-100 py-2 pl-10 border bg-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-2 ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-md`}
                                        placeholder="وشەی نهێنی"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>

                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                <p className="mt-1 text-xs text-gray-300">وشەی نهێنی پێویستە لانیکەم ٨ پیت بێت</p>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">ئیمەیل</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={(e) => e.target.style.borderColor = secondary}
                                    onBlur={(e) => e.target.style.borderColor = '#4a5565'}
                                    className={`w-full px-4 text-gray-100 py-2 border bg-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-2 ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md`}
                                    placeholder="ئیمەیل"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">دڵنیاکردنەوەی وشەی نهێنی</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onFocus={(e) => e.target.style.borderColor = secondary}
                                        onBlur={(e) => e.target.style.borderColor = '#4a5565'}
                                        className={`w-full px-4 text-gray-100 py-2 pl-10 border bg-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-md`}
                                        placeholder="دڵنیاکردنەوەی وشەی نهێنی"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-600 focus:outline-none"
                                    >
                                        {showConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                style={{ backgroundColor: secondary }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = tertiary}
                                onMouseLeave={(e) => e.target.style.backgroundColor = secondary}
                                className="w-full text-gray-100 py-3 px-4 rounded-md transition duration-300"
                            >
                                دروستکردنی هەژمار
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-300 text-sm">
                                پێشتر هەژمارت هەیە؟{" "}
                                <a
                                    style={{ color: secondary }}
                                    onMouseEnter={(e) => e.target.style.color = main}
                                    onMouseLeave={(e) => e.target.style.color = secondary}
                                    href="/login" className="transition-colors duration-300">
                                    چوونە ژوورەوە
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
            <Footer />
        </div>
    );
};

export default SignUp;