import { useState, useEffect } from 'react';
import { Menu, X, Search, Book, User, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useCheckAuth, logout } from "../../context/AxiosInstance";

const BookstoreNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
    const [booksDropdownOpen, setBooksDropdownOpen] = useState(false);
    const [bestSellerDropdownOpen, setBestSellerDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { isAuthenticated, setIsAuthenticated } = useCheckAuth();

    useEffect(() => {
        setIsLoggedIn(isAuthenticated);
    }, [isAuthenticated]);

    const mockBookResults = [
        { id: 1, title: 'مەم و زین', author: 'ئەحمەدی خانی', cover: 'book1.jpg' },
        { id: 2, title: 'دیوانی نالی', author: 'نالی', cover: 'book2.jpg' },
        { id: 3, title: 'چیرۆکی کوردستان', author: 'محەمەد ئەمین زەکی', cover: 'book3.jpg' },
    ];

    const mockAuthorResults = [
        { id: 1, name: 'ئەحمەدی خانی', books: 5, image: 'author1.jpg' },
        { id: 2, name: 'نالی', books: 8, image: 'author2.jpg' },
        { id: 3, name: 'مەحوی', books: 3, image: 'author3.jpg' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.dropdown-container') && !e.target.closest('.search-container')) {
                setHomeDropdownOpen(false);
                setBooksDropdownOpen(false);
                setBestSellerDropdownOpen(false);
                setUserDropdownOpen(false);
                setShowSearchResults(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        setShowSearchResults(query.length > 0);
    };

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
        setShowSearchResults(false);

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
            window.location.href = '/';
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
            { icon: <LogOut className="h-4 w-4 ml-2" />, name: 'چوونەدەرەوە', onClick: handleLogout },
        ]
        : [
            { icon: null, name: 'چوونەژوورەوە', onClick: () => { window.location.href = '/login'; } },
            { icon: null, name: 'تۆمارکردن', onClick: () => { window.location.href = '/signup'; } },
        ];


    const handleUserDropdownToggle = (e) => {
        e.stopPropagation();
        setUserDropdownOpen(!userDropdownOpen);
        setShowSearchResults(false);
    };

    const handleSearchResultClick = () => {
        setShowSearchResults(false);
        setSearchQuery('');
    };
    return (
        <nav dir="rtl" className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <a href="/" className="flex items-center">
                            <Book className="h-8 w-8 text-indigo-600" />
                            <span className="mr-2 text-xl font-bold text-gray-900">خانەی کتێب</span>
                        </a>
                    </div>

                    <div className="hidden sm:flex items-center space-x-reverse">
                        <div className="hidden lg:flex space-x-reverse space-x-6">
                            {navLinks.map((link, index) => (
                                <div key={link.name} className="relative dropdown-container">
                                    <div
                                        className="flex items-center cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2 text-sm font-medium"
                                        onClick={(e) => handleDropdownToggle(e, link, index)}
                                    >
                                        <span>{link.name}</span>
                                        {link.hasDropdown && <ChevronDown className="h-4 w-4 mr-1" />}
                                    </div>

                                    {link.hasDropdown && link.dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="py-1" role="menu" aria-orientation="vertical">
                                                {link.dropdownItems.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
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

                        <div className="sm:flex lg:hidden">
                            <div className="relative dropdown-container mr-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(!isOpen);
                                    }}
                                    className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md border border-gray-200"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                        <div className="py-1" role="menu" aria-orientation="vertical">
                                            {navLinks.map((link, index) => (
                                                <div key={link.name}>
                                                    <div
                                                        className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
                                                        onClick={(e) => handleDropdownToggle(e, link, index)}
                                                    >
                                                        <a href={link.hasDropdown ? undefined : link.href} className="block w-full">
                                                            {link.name}
                                                        </a>
                                                        {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
                                                    </div>

                                                    {link.hasDropdown && link.dropdownOpen && (
                                                        <div className="pr-4 bg-gray-50">
                                                            {link.dropdownItems.map((item) => (
                                                                <a
                                                                    key={item.name}
                                                                    href={item.href}
                                                                    className="block px-4 py-2 text-sm text-gray-600 hover:text-indigo-600"
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center space-x-reverse space-x-6">
                        <div className="relative search-container">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="گەڕان بۆ کتێب..."
                                    className="w-full pr-10 pl-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onClick={() => searchQuery && setShowSearchResults(true)}
                                />
                                <div className="absolute right-3 top-2.5">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            {showSearchResults && (
                                <div className="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 max-h-96 overflow-y-auto">
                                    <div className="py-2">
                                        <h3 className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                                            کتێبەکان
                                        </h3>
                                        <div className="py-1">
                                            {mockBookResults.map(book => (
                                                <a
                                                    key={book.id}
                                                    href={`/books/${book.id}`}
                                                    className="block px-4 py-2 hover:bg-indigo-50"
                                                    onClick={handleSearchResultClick}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                                                            <Book className="h-6 w-6 text-gray-400" />
                                                        </div>
                                                        <div className="mr-3">
                                                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                            <div className="text-xs text-gray-500">{book.author}</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        <h3 className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                                            نووسەرەکان
                                        </h3>
                                        <div className="py-1">
                                            {mockAuthorResults.map(author => (
                                                <a
                                                    key={author.id}
                                                    href={`/authors/${author.id}`}
                                                    className="block px-4 py-2 hover:bg-indigo-50"
                                                    onClick={handleSearchResultClick}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <User className="h-6 w-6 text-gray-400" />
                                                        </div>
                                                        <div className="mr-3">
                                                            <div className="text-sm font-medium text-gray-900">{author.name}</div>
                                                            <div className="text-xs text-gray-500">{author.books} کتێب</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative dropdown-container">
                            <button
                                onClick={handleUserDropdownToggle}
                                className="text-gray-700 hover:text-indigo-600 p-1 rounded-full hover:bg-gray-100"
                            >
                                <User className={`h-6 w-6 ${isLoggedIn ? 'text-indigo-600' : 'text-red-500'}`} />
                            </button>

                            {userDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        {userDropdownItems.map((item) => (
                                            <p
                                                key={item.name}
                                                onClick={item.onClick}
                                                className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
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

                    <div className="flex sm:hidden items-center space-x-reverse space-x-4">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-gray-700"
                        >
                            <Search className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isSearchOpen && (
                <div className="sm:hidden px-4 pb-4">
                    <div className="relative search-container">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="گەڕان..."
                                className="w-full pr-10 pl-1 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onClick={() => searchQuery && setShowSearchResults(true)}
                            />
                        </div>
                        <div className="absolute right-3 top-2.5">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>

                        {showSearchResults && (
                            <div className="absolute right-0 left-0 mt-2 mx-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 max-h-96 overflow-y-auto">
                                <div className="py-2">
                                    <h3 className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                                        کتێبەکان
                                    </h3>
                                    <div className="py-1">
                                        {mockBookResults.map(book => (
                                            <a
                                                key={book.id}
                                                href={`/books/${book.id}`}
                                                className="block px-4 py-2 hover:bg-indigo-50"
                                                onClick={handleSearchResultClick}
                                            >
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                                                        <Book className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <div className="mr-3">
                                                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                        <div className="text-xs text-gray-500">{book.author}</div>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className="py-2">
                                    <h3 className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                                        نووسەرەکان
                                    </h3>
                                    <div className="py-1">
                                        {mockAuthorResults.map(author => (
                                            <a
                                                key={author.id}
                                                href={`/authors/${author.id}`}
                                                className="block px-4 py-2 hover:bg-indigo-50"
                                                onClick={handleSearchResultClick}
                                            >
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <User className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <div className="mr-3">
                                                        <div className="text-sm font-medium text-gray-900">{author.name}</div>
                                                        <div className="text-xs text-gray-500">{author.books} کتێب</div>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                        {navLinks.map((link, index) => (
                            <div key={link.name}>
                                <div
                                    className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                    onClick={(e) => handleDropdownToggle(e, link, index)}
                                >
                                    <a href={link.hasDropdown ? undefined : link.href}>
                                        {link.name}
                                    </a>
                                    {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
                                </div>

                                {link.hasDropdown && link.dropdownOpen && (
                                    <div className="pr-6 mt-1 space-y-1 border-r-2 border-indigo-200">
                                        {link.dropdownItems.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="block px-3 py-1 text-sm text-gray-600 hover:text-indigo-600"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <div className="px-3 py-2 text-base font-medium text-gray-900">
                                {isLoggedIn ? 'هەژماری من' : 'چوونەژوورەوە'}
                            </div>
                            {isLoggedIn ? (
                                <div className="space-y-1 pr-6">
                                    <a href="/settings" className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-indigo-600">
                                        <Settings className="h-4 w-4 ml-2" />
                                        ڕێکخستنەکان
                                    </a>
                                    <a href="/logout" className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-indigo-600">
                                        <LogOut className="h-4 w-4 ml-2" />
                                        چوونەدەرەوە
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-1 pr-6">
                                    <a href="/login" className="block px-3 py-1 text-sm text-gray-600 hover:text-indigo-600">
                                        چوونەژوورەوە
                                    </a>
                                    <a href="/signup" className="block px-3 py-1 text-sm text-gray-600 hover:text-indigo-600">
                                        تۆمارکردن
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default BookstoreNavigation;