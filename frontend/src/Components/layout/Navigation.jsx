import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Book, User, ChevronDown, Settings, LogOut, UserCog2 } from 'lucide-react';
import { useCheckAuth, logout, axiosInstance } from "../../context/AxiosInstance";
import LoadingUi from '../my-ui/Loading';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext";

const BookstoreNavigation = () => {
    const { main, secondary, tertiary } = useTheme();
    const navigate = useNavigate();
    const searchContainerRef = useRef(null);
    const userDropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
    const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
    const [bestSellerDropdownOpen, setBestSellerDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userIcon, setUserIcon] = useState(null);
    const [userIconText, setUserIconText] = useState(null);
    const { isAuthenticated, setIsAuthenticated, userRole } = useCheckAuth();
    const [isAdmin, setisAdmin] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [activeTab, setActiveTab] = useState('books');
    const [results, setResults] = useState({
        books: [],
        authors: [],
        users: []
    });
    const searchRef = useRef(null);

    setTimeout(() => {
        if (isLoading === true) {
            return <LoadingUi />
        } else {
            setIsLoading(false)
            if ((isAuthenticated === true) && (userRole != null) && (userRole === 'admin')) {
                setisAdmin(true)
            }
        }
    }, 500);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowResults(false);
            }

            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchTerm.length >= 1) {
            const delayDebounceFn = setTimeout(() => {
                handleSearch();
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setShowResults(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setSearchLoading(true);
        setShowResults(true);
        try {
            setTimeout(async () => {
                const res = await axiosInstance.get(`/user/search/${searchTerm}`);
                if (res.status === 200) {
                    setResults(res.data);
                    setSearchLoading(false);
                }
            }, 800);

        } catch (error) {
            console.error('Error searching:', error);
            setSearchLoading(false);
        }
    };

    const handleResultClick = (item, type) => {
        if (type === 'book') {
            navigate(`/booksDetail/${item}`)
        } else if (type === 'authors') {
            navigate(`/AuthorDetails/${item}`);
        } else {
            navigate(`/userprofile?username=${item}`);
        }
        setShowResults(false);
    };

    const truncateBio = (text, maxLength = 60) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    useEffect(() => {
        setIsLoggedIn(isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        const profilePic = async () => {
            setIsLoading(true);
            try {
                const res = await axiosInstance.get('/user/getusernameandpic');
                if (res.status === 200 && res.data.coverImgURL) {
                    setUserIcon(res.data.coverImgURL);
                } else if (res.status === 200 && res.data.username) {
                    setUserIconText(res.data.username[0]?.toUpperCase());
                } else {
                    setUserIcon(null);
                    setUserIconText(null);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        profilePic();
    }, [isAuthenticated]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.dropdown-container') && !e.target.closest('.search-container')) {
                setHomeDropdownOpen(false);
                setBooksDropdownOpen(false);
                setBestSellerDropdownOpen(false);
                setUserDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleNavigation = (href) => {
        if (href !== '#') {
            window.location.href = href;
        }
    };

    const handleDropdownToggle = (e, navItem, index) => {
        e.stopPropagation();
        setHomeDropdownOpen(false);
        setBooksDropdownOpen(false);
        setBestSellerDropdownOpen(false);

        if (navItem.hasDropdown) {
            switch (index) {
                case 0:
                    setHomeDropdownOpen(!homeDropdownOpen);
                    break;
                case 1:
                    setBooksDropdownOpen(!booksDropdownOpen);
                    break;
                case 5:
                    setBestSellerDropdownOpen(!bestSellerDropdownOpen);
                    break;
                default:
                    break;
            }
        } else {
            handleNavigation(navItem.href);
        }
    };

    const handleLogout = async () => {
        try {
            await logout(setIsAuthenticated);
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const navLinks = [
        {
            name: 'کتێب',
            href: '#',
            hasDropdown: true,
            dropdownOpen: homeDropdownOpen,
            setDropdownOpen: setHomeDropdownOpen,
            dropdownItems: [
                { name: 'هەموو کتێبەکان', href: `/books` },
                { name: 'زنجیرە کتێب', href: '/bookseries' },
                { name: 'کتێبی کوردی', href: '/books?language=Kurdish' },
                { name: 'کتێبی ئینگلیزی', href: '/books?language=English' },
                { name: 'کتێبی ڕۆمانسی', href: '/books?genre=ڕۆمانس' },
                { name: 'کتێبی زانستی', href: '/books?genre=زانستی' },
                { name: 'کتێبی شیعر', href: '/books?genre=شیعر' },
                { name: 'کتێبی خەیاڵی', href: '/books?genre=خەیاڵی' },
                { name: 'کتێبی ترسناک', href: '/books?genre=ترسناک' },
                { name: 'کتێبی چیرۆک', href: '/books?genre=چیرۆک' },
                { name: 'کتێبی نادیار', href: '/books?genre=نادیار' },
                { name: 'ڕۆمان', href: '/books?genre=ڕۆمان' },
            ]
        },
        {
            name: 'نووسەر',
            href: '#',
            hasDropdown: true,
            dropdownOpen: booksDropdownOpen,
            setDropdownOpen: setBooksDropdownOpen,
            dropdownItems: [
                { name: 'هەموو نووسەرەکان', href: '/authors' },
                { name: 'نووسەری کوردی', href: '/authors?language=Kurdish' },
                { name: 'نووسەر ئینگلیزی', href: '/authors?language=English' },
            ]
        },
        { name: 'وتە', href: '/quotes' },
        { name: 'هەواڵ', href: '/news' },
        { name: 'پێشنیاری ئێمە', href: '/suggestions' },
        {
            name: 'زیاتر',
            href: '#',
            hasDropdown: true,
            dropdownOpen: bestSellerDropdownOpen,
            setDropdownOpen: setBestSellerDropdownOpen,
            dropdownItems: [
                { name: 'دەربارە', href: '/about' },
                { name: 'پەیوەندی کردن', href: '/contact' },
            ]
        },
    ];

    const userDropdownItems = isLoggedIn
        ? [
            { icon: <User className="h-4 w-4 ml-2" />, name: 'پڕۆفایل', onClick: () => { window.location.href = '/profile'; } },
            { icon: <Settings className="h-4 w-4 ml-2" />, name: 'ڕێکخستنەکان', onClick: () => { window.location.href = '/settings'; } },
            ...(isAdmin ? [{ icon: <UserCog2 className="h-4 w-4 ml-2" />, name: 'ئەدمین', onClick: () => { window.location.href = '/admin'; } }] : []),
            { icon: <LogOut className="h-4 w-4 ml-2" />, name: 'چوونەدەرەوە', onClick: handleLogout },
        ]
        : [
            { icon: null, name: 'چوونەژوورەوە', onClick: () => { window.location.href = '/login'; } },
            { icon: null, name: 'تۆمارکردن', onClick: () => { window.location.href = '/signup'; } },
        ];

    const handleUserDropdownToggle = (e) => {
        e.stopPropagation();
        setUserDropdownOpen(!userDropdownOpen);
    };

    return (
        <div>
            {isLoading ? <LoadingUi /> :
                <nav dir="rtl" className={`fixed w-full z-50 transition-all duration-300 bg-[#1a1a1a]`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <a href="/" className="flex items-center">
                                    <Book style={{ color: secondary }} className="h-8 w-8" />
                                    <span className="mr-2 text-xl font-bold text-gray-100">خانەی کتێب</span>
                                </a>
                            </div>

                            <div className="hidden sm:flex items-center space-x-reverse">
                                <div className="hidden lg:flex space-x-reverse space-x-6">
                                    {navLinks.map((link, index) => (
                                        <div key={link.name} className="relative dropdown-container">
                                            <div
                                                className="flex items-center cursor-pointer text-gray-100 rounded-xl transition-colors lg:px-2 py-2 text-sm font-medium"
                                                style={{ backgroundColor: "transparent", color: '#f3f4f6' }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = secondary;
                                                    e.currentTarget.style.color = '#f3f4f6';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.color = '#f3f4f6';
                                                }}
                                                onClick={(e) => handleDropdownToggle(e, link, index)}
                                            >
                                                <span style={{ color: '#f3f4f6' }}>{link.name}</span>
                                                {link.hasDropdown && <ChevronDown className="h-4 w-4 mr-1" />}
                                            </div>

                                            {link.hasDropdown && link.dropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#1a1a1a] ring-1 ring-black ring-opacity-5 z-50">
                                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                                        {link.dropdownItems.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                style={{ backgroundColor: 'transparent', color: '#f3f4f6' }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.backgroundColor = secondary;
                                                                    e.currentTarget.style.color = '#f3f4f6';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                                    e.currentTarget.style.color = '#f3f4f6';
                                                                }}
                                                                className="block px-4 py-2 text-sm text-gray-100"
                                                                role="menuitem"
                                                            >
                                                                {item.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden lg:flex items-center space-x-reverse space-x-6">
                                <div className="relative search-container" ref={searchContainerRef}>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="گەڕان بۆ کتێب..."
                                            className="w-full text-gray-300 bg-black border-2 border-transparent placeholder:text-gray-400 pr-10 pl-4 py-2 rounded-full focus:outline-none"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onFocus={(e) => { searchTerm, e.currentTarget.style.borderColor = secondary }}
                                            onBlur={(e) => { searchTerm, e.currentTarget.style.borderColor = 'transparent' }}
                                        />
                                        <div className="absolute right-3 top-2.5">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {showResults && (
                                        <div className="absolute left-0 mt-2 w-[470px] bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-600 z-50 overflow-hidden">
                                            <div className="flex">
                                                <button
                                                    className={`flex-1 py-3 px-4 text-sm border-b-2 font-medium text-gray-100 hover:text-gray-300`}
                                                    style={{
                                                        borderColor: activeTab === 'books' ? secondary : 'transparent',
                                                        color: activeTab === 'books' ? secondary : '#f3f4f6'
                                                    }}
                                                    onClick={() => setActiveTab('books')}
                                                >
                                                    کتێبەکان ({results.books.length})
                                                </button>
                                                <button
                                                    className={`flex-1 py-3 px-4 text-sm border-b-2 font-medium text-gray-100 hover:text-gray-300`}
                                                    style={{
                                                        borderColor: activeTab === 'authors' ? secondary : 'transparent',
                                                        color: activeTab === 'authors' ? secondary : '#f3f4f6'
                                                    }} onClick={() => setActiveTab('authors')}
                                                >
                                                    نووسەرەکان ({results.authors.length})
                                                </button>
                                                <button
                                                    className={`flex-1 py-3 px-4 text-sm border-b-2 font-medium text-gray-100 hover:text-gray-300`}
                                                    style={{
                                                        borderColor: activeTab === 'users' ? secondary : 'transparent',
                                                        color: activeTab === 'users' ? secondary : '#f3f4f6'
                                                    }} onClick={() => setActiveTab('users')}
                                                >
                                                    بەکارهێنەران ({results.users.length})
                                                </button>
                                            </div>

                                            <div className="max-h-80 overflow-y-auto">
                                                {searchLoading && (
                                                    <div className="flex flex-col gap-2 items-center justify-center py-12">
                                                        <div
                                                            style={{ borderColor: secondary }}
                                                            className="animate-spin rounded-full h-8 w-8 border-b-2"></div>
                                                        <div>
                                                            <p className='text-gray-100'>تکایە چاوەڕوانبە...</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {!searchLoading && activeTab === 'books' && (
                                                    <>
                                                        {results.books.length > 0 ? (
                                                            results.books.map(book => (
                                                                <div
                                                                    key={book.id}
                                                                    className="flex items-center p-4 hover:bg-[#121212] cursor-pointer border-b border-gray-100"
                                                                    onClick={() => handleResultClick(book.id, 'book')}
                                                                >
                                                                    <div className="flex-shrink-0 w-16 h-20 bg-[#1db954] rounded flex items-center justify-center shadow-md">
                                                                        {book.cover_image ? (
                                                                            <img src={book.cover_image} alt={book.title} className="w-16 h-20 object-cover rounded" />
                                                                        ) : (
                                                                            <Book className="h-8 w-8 text-white" />
                                                                        )}
                                                                    </div>
                                                                    <div className="mr-4 flex-1">
                                                                        <div className="text-base font-bold text-gray-100 mb-1">{book.title}</div>
                                                                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                                                {book.genre}
                                                                            </span>
                                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                                {book.language}
                                                                            </span>
                                                                        </div>
                                                                        <div className="text-xs text-gray-100 line-clamp-2">{book.description}</div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="py-8 text-center text-gray-100">
                                                                هیچ کتێبێک نەدۆزرایەوە
                                                            </div>
                                                        )}
                                                    </>
                                                )}

                                                {!searchLoading && activeTab === 'authors' && (
                                                    <>
                                                        {results.authors.length > 0 ? (
                                                            results.authors.map(author => (
                                                                <div
                                                                    key={author.id}
                                                                    className="flex items-center p-4 hover:bg-[#121212] cursor-pointer border-b border-gray-100"
                                                                    onClick={() => handleResultClick(author.id, 'authors')}
                                                                >
                                                                    <div style={{ backgroundColor: secondary }} className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                                                                        {author.imgURL ? (
                                                                            <img src={author.imgURL} className="w-14 h-14 object-cover rounded-full" />
                                                                        ) : (
                                                                            <span className="text-lg font-bold text-white">{author.name.charAt(0)}</span>
                                                                        )}
                                                                    </div>
                                                                    <div className="mr-4 flex-1">
                                                                        <div className="text-base font-bold text-gray-100">{author.name}</div>
                                                                        <div className="text-xs text-gray-200 mt-1 line-clamp-2">{truncateBio(author.bio)}</div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="py-8 text-center text-gray-100">
                                                                هیچ نووسەرێک نەدۆزرایەوە
                                                            </div>
                                                        )}
                                                    </>
                                                )}

                                                {!searchLoading && activeTab === 'users' && (
                                                    <>
                                                        {results.users.length > 0 ? (
                                                            results.users.map(user => (
                                                                <div
                                                                    key={user.username}
                                                                    className="flex items-center p-4 hover:bg-[#121212] cursor-pointer border-b border-gray-100"
                                                                    onClick={() => handleResultClick(user.username, 'users')}
                                                                >
                                                                    <div style={{ backgroundColor: user.coverImgURL ? '' : secondary }} className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md ${user.coverImgURL ? '' : 'bg-[#1db954]'}`}>
                                                                        {user.coverImgURL ? (
                                                                            <img src={user.coverImgURL} alt={user.username} className="w-12 h-12 object-cover rounded-full" />
                                                                        ) : (
                                                                            <span className="text-base font-bold text-white">{user.username.charAt(0)}</span>
                                                                        )}
                                                                    </div>
                                                                    <div className="mr-4 flex-1">
                                                                        <div className="text-base font-bold text-gray-100">{user.name}</div>
                                                                        <div className="text-xs text-gray-400">@{user.username}</div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="py-8 text-center text-gray-100">
                                                                هیچ بەکارهێنەرێک نەدۆزرایەوە
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="relative dropdown-container" ref={userDropdownRef}>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleUserDropdownToggle}
                                            className="h-[36px] w-[36px] text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300"
                                        >
                                            {userIcon ? <img className="rounded-full h-[36px] w-[36px]" src={userIcon} alt="" />
                                                :
                                                userIconText
                                            }
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleUserDropdownToggle}
                                            className="flex items-center justify-center p-2 h-[36px] w-[36px] text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300"
                                        >
                                            <User className="h-[36px] w-[36px]" />
                                        </button>
                                    )}

                                    {userDropdownOpen && (
                                        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#1a1a1a] ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-1" role="menu" aria-orientation="vertical">
                                                {userDropdownItems.map((item) => (
                                                    <p
                                                        key={item.name}
                                                        onClick={item.onClick}
                                                        style={{ backgroundColor: 'transparent', color: '#f3f4f6' }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = secondary;
                                                            e.currentTarget.style.color = '#f3f4f6';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                            e.currentTarget.style.color = '#f3f4f6';
                                                        }}
                                                        className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-100"
                                                        role="menuitem"
                                                    >
                                                        {item.icon}
                                                        {item.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex lg:hidden items-center space-x-reverse space-x-4">
                                <button
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className="text-gray-700"
                                >
                                    <Search className="h-6 w-6 text-gray-200" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="text-gray-700"
                                >
                                    {isOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-200" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {isSearchOpen && (
                        <div className="sm:hidden px-4 pb-4">
                            <div className="relative z-50 search-container" ref={searchContainerRef}>
                                <input
                                    type="text"
                                    placeholder="گەڕان بۆ کتێب..."
                                    className="w-full text-gray-300 bg-black border-2 border-transparent placeholder:text-gray-400 pr-10 pl-4 py-2 rounded-full focus:outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={(e) => { searchTerm, e.currentTarget.style.borderColor = secondary }}
                                    onBlur={(e) => { searchTerm, e.currentTarget.style.borderColor = 'transparent' }}
                                />

                                <div className="absolute right-3 top-2.5">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>

                                {showResults && (
                                    <div className="absolute mt-2 w-full bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-600 z-50 overflow-hidden">
                                        <div className="flex border-b border-gray-600">
                                            <button
                                                className={`flex-1 py-3 px-4 text-xs border-b-2 font-medium text-gray-100 hover:text-gray-300`}
                                                style={{
                                                    borderColor: activeTab === 'books' ? secondary : 'transparent',
                                                    color: activeTab === 'books' ? secondary : '#f3f4f6'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveTab('books');
                                                }}
                                            >
                                                کتێبەکان ({results.books.length})
                                            </button>
                                            <button
                                                className={`flex-1 py-3 px-4 text-xs border-b-2 font-medium text-gray-100 hover:text-gray-300`}
                                                style={{
                                                    borderColor: activeTab === 'authors' ? secondary : 'transparent',
                                                    color: activeTab === 'authors' ? secondary : '#f3f4f6'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveTab('authors');
                                                }}
                                            >
                                                نووسەرەکان ({results.authors.length})
                                            </button>
                                            <button
                                                className={`flex-1 py-3 px-4 text-xs border-b-2 font-medium text-gray-100 hover:text-gray-300`}
                                                style={{
                                                    borderColor: activeTab === 'users' ? secondary : 'transparent',
                                                    color: activeTab === 'users' ? secondary : '#f3f4f6'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveTab('users');
                                                }}
                                            >
                                                بەکارهێنەران ({results.users.length})
                                            </button>
                                        </div>

                                        <div className="max-h-80 overflow-y-auto">
                                            {searchLoading && (
                                                <div className="flex flex-col gap-2 items-center justify-center py-12">
                                                    <div style={{ borderColor: secondary }} className="animate-spin rounded-full h-8 w-8 border-b-2"></div>
                                                    <div>
                                                        <p className="text-sm text-gray-200">تکایە چاوەڕوانبە...</p>
                                                    </div>
                                                </div>
                                            )}

                                            {!searchLoading && activeTab === 'books' && (
                                                <>
                                                    {results.books.length > 0 ? (
                                                        results.books.map(book => (
                                                            <div
                                                                key={book.id}
                                                                className="flex items-center p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-600"
                                                                onClick={() => handleResultClick(book.id, 'book')}
                                                            >
                                                                <div className="flex-shrink-0 w-16 h-20 bg-gradient-to-b from-indigo-200 to-indigo-400 rounded flex items-center justify-center shadow-md">
                                                                    {book.cover_image ? (
                                                                        <img src={book.cover_image} alt={book.title} className="w-16 h-20 object-cover rounded" />
                                                                    ) : (
                                                                        <Book className="h-8 w-8 text-white" />
                                                                    )}
                                                                </div>
                                                                <div className="mr-4 flex-1">
                                                                    <div className="text-base font-bold text-gray-100 mb-1">{book.title}</div>
                                                                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                                            {book.genre}
                                                                        </span>
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                            {book.language}
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-xs text-gray-300 line-clamp-2">{book.description}</div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="py-8 text-center text-gray-200">
                                                            هیچ کتێبێک نەدۆزرایەوە
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {!searchLoading && activeTab === 'authors' && (
                                                <>
                                                    {results.authors.length > 0 ? (
                                                        results.authors.map(author => (
                                                            <div
                                                                key={author.id}
                                                                className="flex items-center p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-600"
                                                                onClick={() => handleResultClick(author.id, 'authors')}
                                                            >
                                                                <div style={{ backgroundColor: secondary }} className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                                                                    {author.imgURL ? (
                                                                        <img src={author.imgURL} className="w-14 h-14 object-cover rounded-full" />
                                                                    ) : (
                                                                        <span className="text-lg font-bold text-white">{author.name.charAt(0)}</span>
                                                                    )}
                                                                </div>
                                                                <div className="mr-4 flex-1">
                                                                    <div className="text-base font-bold text-gray-100">{author.name}</div>
                                                                    <div className="text-xs text-gray-300 mt-1 line-clamp-2">{truncateBio(author.bio)}</div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="py-8 text-center text-gray-300">
                                                            هیچ نووسەرێک نەدۆزرایەوە
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {!searchLoading && activeTab === 'users' && (
                                                <>
                                                    {results.users.length > 0 ? (
                                                        results.users.map(user => (
                                                            <div
                                                                key={user.username}
                                                                className="flex items-center p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-600"
                                                                onClick={() => handleResultClick(user.username, 'users')}
                                                            >
                                                                <div style={{ backgroundColor: user.coverImgURL ? '' : secondary }} className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md`}>
                                                                    {user.coverImgURL ? (
                                                                        <img src={user.coverImgURL} className="w-12 h-12 object-cover rounded-full" />
                                                                    ) : (
                                                                        <span className="text-base font-bold text-white">{user.username.charAt(0)}</span>
                                                                    )}
                                                                </div>
                                                                <div className="mr-4 flex-1">
                                                                    <div className="text-base font-bold text-gray-100">{user.name}</div>
                                                                    <div className="text-xs text-gray-300">@{user.username}</div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="py-8 text-center text-gray-300">
                                                            هیچ بەکارهێنەرێک نەدۆزرایەوە
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isOpen && (
                        <div className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1a1a1a] border-t border-gray-600">
                                {navLinks.map((link, index) => (
                                    <div key={link.name}>
                                        <div
                                            className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-[#242323]"
                                            onClick={(e) => handleDropdownToggle(e, link, index)}
                                        >
                                            <a href={link.hasDropdown ? undefined : link.href}>
                                                {link.name}
                                            </a>
                                            {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
                                        </div>

                                        {link.hasDropdown && link.dropdownOpen && (
                                            <div style={{ borderColor: secondary }} className="pr-6 mt-1 space-y-1 border-r-2">
                                                {link.dropdownItems.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-3 py-1 text-sm text-gray-300"
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="border-t border-gray-600 mt-4 pt-4">
                                    <div className="px-3 py-2 text-base font-medium text-gray-100">
                                        {isLoggedIn ? 'هەژماری من' : 'چوونەژوورەوە'}
                                    </div>
                                    {isLoggedIn ? (
                                        <div className="space-y-1 pr-6">
                                            <a href="/profile" className="flex items-center px-3 py-1 text-sm text-gray-200 hover:text-gray-300">
                                                <User className="h-4 w-4 ml-2" />
                                                پروفایل
                                            </a>
                                            <a href="/settings" className="flex items-center px-3 py-1 text-sm text-gray-200 hover:text-gray-300">
                                                <Settings className="h-4 w-4 ml-2" />
                                                ڕێکخستنەکان
                                            </a>
                                            {isAdmin && (
                                                <a href="/admin" className="flex items-center px-3 py-1 text-sm text-gray-200 hover:text-gray-300">
                                                    <Settings className="h-4 w-4 ml-2" />
                                                    ئەدمین
                                                </a>
                                            )}
                                            <a href="/logout" className="flex items-center px-3 py-1 text-sm text-gray-200 hover:text-gray-300">
                                                <LogOut className="h-4 w-4 ml-2" />
                                                چوونەدەرەوە
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="space-y-1 pr-6">
                                            <a href="/login" className="block px-3 py-1 text-sm text-gray-200 hover:text-gray-300">
                                                چوونەژوورەوە
                                            </a>
                                            <a href="/signup" className="block px-3 py-1 text-sm text-gray-200 hover:text-gray-300">
                                                تۆمارکردن
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            }
        </div >
    );
};

export default BookstoreNavigation;