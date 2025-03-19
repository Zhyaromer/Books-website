import { useState } from 'react';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';
import { axiosInstance } from "../context/AxiosInstance";
import { useParams } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const PasswordResetPage = () => {
    const { token } = useParams();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        token: token,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const validationRules = [
        { id: 'length', label: 'لانیکەم ٨ پیت', test: pwd => pwd.length >= 8 },
        { id: 'uppercase', label: 'لانیکەم یەک پیتی گەورە', test: pwd => /[A-Z]/.test(pwd) },
        { id: 'number', label: 'لانیکەم یەک ژمارە', test: pwd => /\d/.test(pwd) },
        { id: 'special', label: 'لانیکەم یەک کاراکتەری تایبەت', test: pwd => /[@$!%*?&]/.test(pwd) },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        const { password, confirmPassword } = formData;

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            newErrors.password = 'وشەی نهێنی پێویستە بەلایەنی کەم یەک پیتی گەورە، یەک ژمارە، یەک کاراکتەری تایبەت و ٨ پیت بێت';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'وشەی نهێنی و دڵنیاکردنەوەی وشەی نهێنی یەکسان نین';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axiosInstance.post('/auth/resetPassword', { token: formData.token, password: formData.password, confirmPassword: formData.confirmPassword });

            if (res.status === 200) {
                toast.success('Password reset successfully');
            } else {
                throw new Error('Password reset failed');
            }
            setResetSuccess(true);
        } catch {
            toast.error('Password reset failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" dir="rtl">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                        <Lock className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        گۆڕینی وشەی نهێنی
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        تکایە وشەی نهێنی نوێت بنووسە
                    </p>
                </div>

                {resetSuccess ? (
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="flex justify-center mb-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <Check className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-lg font-medium text-green-800">
                            وشەی نهێنی بە سەرکەوتوویی گۆڕدرا!
                        </h2>
                        <p className="text-green-600 mt-2">
                            ئێستا دەتوانیت بە وشەی نهێنی نوێت بچیتە ژوورەوە.
                        </p>
                        <a
                            href="/login"
                            className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            چوونە ژوورەوە
                        </a>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                وشەی نهێنی نوێ
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pr-4 pl-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="وشەی نهێنی نوێت بنووسە"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('password')}
                                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                                >
                                    {showPassword ?
                                        <EyeOff className="h-5 w-5 text-gray-400" /> :
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    }
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}

                            <div className="mt-2 space-y-1">
                                {validationRules.map(rule => (
                                    <div key={rule.id} className="flex items-center">
                                        <div className={`h-4 w-4 rounded-full flex items-center justify-center ${rule.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}>
                                            {rule.test(formData.password) && <Check className="h-3 w-3 text-white" />}
                                        </div>
                                        <span className={`text-xs mr-2 ${rule.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                                            {rule.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                دڵنیاکردنەوەی وشەی نهێنی
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pr-4 pl-10 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="وشەی نهێنی نوێت دووبارە بنووسەوە"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                                >
                                    {showConfirmPassword ?
                                        <EyeOff className="h-5 w-5 text-gray-400" /> :
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    }
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 rounded-md transition duration-200 flex items-center justify-center ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}
                        >
                            {isSubmitting ? 'چاوەڕوانبە...' : 'گۆڕینی وشەی نهێنی'}
                        </button>
                    </form>
                )}
            </div>
            <ToastContainer draggable={true} transition={Slide} autoClose={2000} />
        </div>
    );
};

export default PasswordResetPage;