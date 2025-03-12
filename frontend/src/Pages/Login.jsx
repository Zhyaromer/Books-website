import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";
import { axiosInstance,useCheckAuth } from "../context/AxiosInstance";

const KurdishLoginForm = () => {
    const {isAuthenticated} = useCheckAuth();
    console.log(isAuthenticated);
    if (isAuthenticated === true) {
        window.location.href = '/';
    }
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
        axiosInstance.post('http://localhost:3000/auth/login', {
            email: credentials.user_login_email,
            password: credentials.user_login_password
        }, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    const token = response.data.token;
                    const userId = response.data.userId;
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    window.location.href = '/';
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div>
            <BookstoreNavigation />
            <div dir="rtl" className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                    <h2 className="mb-6 text-right text-2xl font-bold text-gray-800">چوونەژوورەوە</h2>
                    <form onSubmit={handleSubmit} className="space-y-6" autoComplete="new-password">
                        <div className="space-y-2">
                            <label htmlFor="user_login_email" className="block text-right text-sm font-medium text-gray-700">
                                ئیمەیڵ
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="user_login_email"
                                    name="user_login_email"
                                    value={credentials.user_login_email}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    className="w-full rounded-md border border-gray-300 p-3 pr-10 text-right shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="ئیمەیڵیەکەت بنووسە"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="user_login_password" className="block text-right text-sm font-medium text-gray-700">
                                وشەی نهێنی
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="user_login_password"
                                    name="user_login_password"
                                    value={credentials.user_login_password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    className="w-full rounded-md border border-gray-300 p-3 pr-10 text-right shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="وشەی نهێنیەکەت بنووسە"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 left-0 flex items-center pl-3 focus:outline-none"
                                >
                                    {showPassword ?
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" /> :
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                وشەی نهێنیت لەبیرچووە؟
                            </a>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                چوونەژوورەوە
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            هەژمارت نییە؟{' '}
                            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                                هەژمارێک دروست بکە
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default KurdishLoginForm;