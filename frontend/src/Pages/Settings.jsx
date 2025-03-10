import { useState } from 'react';
import { User, Mail, Key, Edit, Camera, FileText, Save } from 'lucide-react';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('username');

    const originalData = {
        username: 'user123',
        name: 'ئاسۆ محەمەد',
        email: 'asomohamed@email.com',
        bio: 'سڵاو، من ئاسۆم. خوێندکاری زانکۆم لە بواری کۆمپیوتەر.',
        currentPassword: '',
        password: '',
        confirmPassword: '',
    };

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        bio: originalData.bio,
        currentPassword: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const changedFields = {};
        Object.keys(formData).forEach(key => {
            if (formData[key] && formData[key] !== originalData[key]) {
                changedFields[key] = formData[key];
            }
        });

    };

    const handleFileChange = (e) => {
        console.log('File selected:', e.target.files[0]);
    };

    const isSubmitDisabled = (field) => {
        if (field === 'bio') {
            return !formData.bio || formData.bio === originalData.bio;
        } else if (field === 'password') {
            return !formData.currentPassword || !formData.password || !formData.confirmPassword ||
                formData.password !== formData.confirmPassword;
        } else {
            return !formData[field] || formData[field] === originalData[field];
        }
    };

    const tabs = [
        { id: 'username', label: 'ناوی بەکارهێنەر', icon: <User size={20} /> },
        { id: 'name', label: 'ناوی تەواو', icon: <Edit size={20} /> },
        { id: 'email', label: 'ئیمەیل', icon: <Mail size={20} /> },
        { id: 'cover', label: 'وێنەی سەرەکی', icon: <Camera size={20} /> },
        { id: 'bio', label: 'ژیاننامە', icon: <FileText size={20} /> },
        { id: 'password', label: 'وشەی نهێنی', icon: <Key size={20} /> },
    ];

    return (
        <div className="font-sans bg-gray-50 min-h-screen" dir="rtl">
            <div className="container mx-auto py-8 px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 p-6 border-b">ڕێکخستنەکانی ئەکاونت</h1>

                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 bg-gray-50 md:border-l">
                            <nav className="p-4">
                                <ul className="space-y-2">
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <button
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'hover:bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                <span className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}>
                                                    {tab.icon}
                                                </span>
                                                <span className="font-medium">{tab.label}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <div className="flex-1 p-6">
                            <form onSubmit={handleSubmit}>
                                {activeTab === 'username' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <User size={24} className="text-blue-600" />
                                            <h2 className="text-xl font-medium text-gray-800">ناوی بەکارهێنەر</h2>
                                        </div>
                                        <p className="text-gray-600 mb-2">ئەو ناوەی کە بەکارهێنەران پێی دەتناسنەوە، دەتوانیت جارێک بەس بیگۆڕیت.</p>

                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg mb-4">
                                            <span className="text-gray-700 font-medium ml-2">ناوی بەکارهێنەری ئێستا:</span>
                                            <span className="text-gray-900">{originalData.username}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">ناوی بەکارهێنەری نوێ</label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                placeholder="ناوی بەکارهێنەرت بنووسە"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitDisabled('username')}
                                                className={`font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${isSubmitDisabled('username')
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    }`}
                                            >
                                                <Save size={18} />
                                                پاشەکەوتکردن
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'name' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Edit size={24} className="text-blue-600" />
                                            <h2 className="text-xl font-medium text-gray-800">ناوی تەواو</h2>
                                        </div>
                                        <p className="text-gray-600 mb-2">ناوی تەواوی خۆت بنووسە تاکو بەکارهێنەران بتوانن باشتر بتناسن.</p>

                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg mb-4">
                                            <span className="text-gray-700 font-medium ml-2">ناوی ئێستا:</span>
                                            <span className="text-gray-900">{originalData.name}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ناوی تەواوی نوێ</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                placeholder="ناوی تەواوت بنووسە"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitDisabled('name')}
                                                className={`font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${isSubmitDisabled('name')
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    }`}
                                            >
                                                <Save size={18} />
                                                پاشەکەوتکردن
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'email' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Mail size={24} className="text-blue-600" />
                                            <h2 className="text-xl font-medium text-gray-800">ئیمەیل</h2>
                                        </div>

                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg mb-4">
                                            <span className="text-gray-700 font-medium ml-2">ئیمەیلی ئێستا:</span>
                                            <span className="text-gray-900 break-all">{originalData.email}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ئیمەیلی نوێ</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                placeholder="ئیمەیلی نوێ بنووسە"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitDisabled('email')}
                                                className={`font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${isSubmitDisabled('email')
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    }`}
                                            >
                                                <Save size={18} />
                                                پاشەکەوتکردن
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'cover' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Camera size={24} className="text-blue-600" />
                                            <h2 className="text-xl font-medium text-gray-800">وێنەی سەرەکی</h2>
                                        </div>
                                        <p className="text-gray-600 mb-6">وێنەیەک هەڵبژێرە کە دەبێتە وێنەی سەرەکی پڕۆفایلەکەت.</p>

                                        <div className="mb-6">
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg mb-4">
                                                <span className="text-gray-700 font-medium">وێنەی ئێستای سەرەکی:</span>
                                            </div>

                                            <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                                                <div className="text-gray-500">وێنەی سەرەکی</div>
                                            </div>

                                            <div className="mt-4">
                                                <label htmlFor="coverUpload" className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 inline-flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition">
                                                    <Camera size={18} />
                                                    هەڵبژاردنی وێنەی نوێ
                                                    <input
                                                        type="file"
                                                        id="coverUpload"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                                <span id="selectedFileName" className="mr-2 text-gray-600"></span>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={true}
                                                className="bg-gray-300 text-gray-500 cursor-not-allowed font-medium px-6 py-3 rounded-lg flex items-center gap-2"
                                            >
                                                <Save size={18} />
                                                پاشەکەوتکردن
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'bio' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <FileText size={24} className="text-blue-600" />
                                            <h2 className="text-xl font-medium text-gray-800">ژیاننامە</h2>
                                        </div>
                                        <p className="text-gray-600 mb-6">کورتەیەک لەسەر خۆت بنووسە تاکو خەڵک باشتر بتناسن.</p>
                                        <div className="mb-6">
                                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">ژیاننامە</label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                rows="4"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                placeholder="ژیاننامەیەکی کورت بنووسە"
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitDisabled('bio')}
                                                className={`font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${isSubmitDisabled('bio')
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    }`}
                                            >
                                                <Save size={18} />
                                                پاشەکەوتکردن
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'password' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Key size={24} className="text-blue-600" />
                                            <h2 className="text-xl font-medium text-gray-800">گۆڕینی وشەی نهێنی</h2>
                                        </div>
                                        <p className="text-gray-600 mb-6">بۆ پارێزگاری زیاتر، وشەی نهێنیەکی بەهێز بەکاربهێنە کە پێکهاتبێت لە پیت، ژمارە و نیشانەکان.</p>
                                        <div className="mb-4">
                                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">وشەی نهێنی ئێستا</label>
                                            <input
                                                type="password"
                                                id="currentPassword"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                placeholder="وشەی نهێنی ئێستا"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">وشەی نهێنی نوێ</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                placeholder="وشەی نهێنی نوێ"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">دووبارەکردنەوەی وشەی نهێنی</label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                                placeholder="دووبارەکردنەوەی وشەی نهێنی"
                                            />
                                            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                                <p className="text-red-500 text-sm mt-1">وشە نهێنیەکان یەکسان نین</p>
                                            )}
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitDisabled('password')}
                                                className={`font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${isSubmitDisabled('password')
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    }`}
                                            >
                                                <Save size={18} />
                                                پاشەکەوتکردن
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;