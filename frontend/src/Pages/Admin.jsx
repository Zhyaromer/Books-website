import { useState, useEffect } from 'react';
import { axiosInstance } from "../context/AxiosInstance";

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [bookSeries, setBookSeries] = useState([]);
    const [news, setNews] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('books');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentItem, setCurrentItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchbooks = async () => {
            const res = await axiosInstance.get(`/booksdashboard/getallbooks`);
            setBooks(res.data);
        }

        const fetchauthors = async () => {
            const res = await axiosInstance.get(`/authorsdashboard/getallauthors`);
            setAuthors(res.data);
        }

        const fetchbookSeries = async () => {
            const res = await axiosInstance.get(`/seriesdashboard/getallseries`);
            setBookSeries(res.data);
        }

        const fetchnews = async () => {
            const res = await axiosInstance.get(`/newsdashboard/getnews`);
            setNews(res.data);
        }

        const fetchquotes = async () => {
            const res = await axiosInstance.get(`/quotesdashboard/getquotes`);
            setQuotes(res.data);
        }

        const fetchusers = async () => {
            const res = await axiosInstance.get(`/usersdashboard/getusers`);
            setUsers(res.data);
        }

        fetchbooks();
        fetchauthors();
        fetchbookSeries();
        fetchnews();
        fetchquotes();
        fetchusers();
    }, [searchTerm, activeTab]);

    const filteredData = () => {
        switch (activeTab) {
            case 'books':
                return books.filter(book =>
                    book.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    book.series_title?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    String(book.id).toLowerCase().includes(searchTerm.toLowerCase().trim())
                );
            case 'authors':
                return authors.filter(author =>
                    author.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    String(author.id).toLowerCase().includes(searchTerm.toLowerCase().trim())
                );
            case 'bookSeries':
                return bookSeries.filter(series =>
                    series.series_title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    String(series.id).toLowerCase().includes(searchTerm.toLowerCase().trim())
                );
            case 'news':
                return news.filter(item =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    String(item.id).toLowerCase().includes(searchTerm.toLowerCase().trim())
                );
            case 'quotes':
                return quotes.filter(quote =>
                    quote.quote.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    quote.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    String(quote.id).toLowerCase().includes(searchTerm.toLowerCase().trim())
                );
            case 'users':
                return users.filter(user =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    user.name?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    String(user.id).toLowerCase().includes(searchTerm.toLowerCase().trim())
                );
            default:
                return [];
        }
    };

    const handleAdd = () => {
        setModalMode('add');
        setCurrentItem(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setModalMode('edit');
        setCurrentItem(item);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            switch (activeTab) {
                case 'books': {
                    const res = await axiosInstance.delete(`/booksdashboard/removebook/${id}`);
                    if (res.status === 200) {
                        console.log('Book deleted successfully');
                    } else {
                        console.error("an error occurred while deleting the book");
                    }
                    break;
                }
                case 'authors':
                    setAuthors(authors.filter(author => author.id !== id));
                    break;
                case 'bookSeries':
                    setBookSeries(bookSeries.filter(series => series.id !== id));
                    break;
                case 'news':
                    setNews(news.filter(item => item.id !== id));
                    break;
                case 'quotes':
                    setQuotes(quotes.filter(quote => quote.id !== id));
                    break;
                case 'users':
                    setUsers(users.filter(user => user.id !== id));
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = (formData) => {
        if (modalMode === 'add') {
            const newId = Math.max(...(activeTab === 'books' ? books.map(b => b.id) :
                activeTab === 'authors' ? authors.map(a => a.id) :
                    activeTab === 'bookSeries' ? bookSeries.map(s => s.id) :
                        activeTab === 'news' ? news.map(n => n.id) :
                            activeTab === 'quotes' ? quotes.map(q => q.id) :
                                users.map(u => u.id)), 0) + 1;

            const newItem = {
                ...formData,
                id: newId,
                created_at: new Date()
            };

            switch (activeTab) {
                case 'books':
                    setBooks([...books, newItem]);
                    break;
                case 'authors':
                    setAuthors([...authors, newItem]);
                    break;
                case 'bookSeries':
                    setBookSeries([...bookSeries, newItem]);
                    break;
                case 'news':
                    setNews([...news, newItem]);
                    break;
                case 'quotes':
                    setQuotes([...quotes, newItem]);
                    break;
                case 'users':
                    setUsers([...users, newItem]);
                    break;
                default:
                    break;
            }
        } else if (modalMode === 'edit') {
            switch (activeTab) {
                case 'books':
                    setBooks(books.map(book => book.id === currentItem.id ? { ...book, ...formData } : book));
                    break;
                case 'authors':
                    setAuthors(authors.map(author => author.id === currentItem.id ? { ...author, ...formData } : author));
                    break;
                case 'bookSeries':
                    setBookSeries(bookSeries.map(series => series.id === currentItem.id ? { ...series, ...formData } : series));
                    break;
                case 'news':
                    setNews(news.map(item => item.id === currentItem.id ? { ...item, ...formData } : item));
                    break;
                case 'quotes':
                    setQuotes(quotes.map(quote => quote.id === currentItem.id ? { ...quote, ...formData } : quote));
                    break;
                case 'users':
                    setUsers(users.map(user => user.id === currentItem.id ? { ...user, ...formData } : user));
                    break;
                default:
                    break;
            }
        }

        setShowModal(false);
    };

    const ModalForm = () => {
        const [formData, setFormData] = useState(
            modalMode === 'edit' ? { ...currentItem } :
                activeTab === 'books' ? { title: '', author_id: '', series_id: '', genre: '', part_num: '', language: '', description: '', published_date: '', rating: 1, page_count: '', views: 0 } :
                    activeTab === 'authors' ? { name: '', bio: '', language: '', dateOfBirth: '', country: '', views: 0 } :
                        activeTab === 'bookSeries' ? { series_title: '', state: '', description: '' } :
                            activeTab === 'news' ? { title: '', description: '', views: 0 } :
                                activeTab === 'quotes' ? { book_id: '', author_id: '', quote: '' } :
                                    { username: '', email: '', password_hash: '', role: 'user', name: '', bio: '' }
        );

        const [filePreview, setFilePreview] = useState(null);

        const handleChange = (e) => {
            const { name, value, type, files } = e.target;
            if (type === 'file' && files[0]) {
                setFilePreview(URL.createObjectURL(files[0]));
                setFormData({
                    ...formData,
                    [name]: files[0]
                });
            } else if (type === 'number') {
                setFormData({
                    ...formData,
                    [name]: value === '' ? '' : Number(value)
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: value
                });
            }
        };

        const [relationSearchTerm, setRelationSearchTerm] = useState('');
        const [showRelationDropdown, setShowRelationDropdown] = useState(false);
        const [activeRelationField, setActiveRelationField] = useState(null);

        const handleRelationSearch = (field) => {
            setActiveRelationField(field);
            setShowRelationDropdown(true);
        };

        const handleRelationSelect = (id, field) => {
            setFormData({
                ...formData,
                [field]: id
            });

            setShowRelationDropdown(false);
            setRelationSearchTerm('');
        };

        const filteredRelations = () => {
            if (activeRelationField === 'author_id') {
                return authors.filter(author =>
                    author.name.toLowerCase().includes(relationSearchTerm.toLowerCase())
                );
            } else if (activeRelationField === 'series_id') {
                return bookSeries.filter(series =>
                    series.series_title.toLowerCase().includes(relationSearchTerm.toLowerCase())
                );
            } else if (activeRelationField === 'book_id') {
                return books.filter(book =>
                    book.title.toLowerCase().includes(relationSearchTerm.toLowerCase())
                );
            }
            return [];
        };

        const handleFormSubmit = async (e) => {
            e.preventDefault();
            if (modalMode === 'add' && activeTab === 'books') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('title', formData.title);
                    formDataToSend.append('description', formData.description);
                    formDataToSend.append('author_id', formData.author_id);
                    formDataToSend.append('series_id', formData.series_id);
                    formDataToSend.append('genre', formData.genre);
                    formDataToSend.append('part_num', formData.part_num);
                    formDataToSend.append('language', formData.language);
                    formDataToSend.append('page_count', formData.page_count);
                    formDataToSend.append('published_date', formData.published_date);

                    if (formData.cover_image) {
                        formDataToSend.append('cover_image', formData.cover_image);
                    }

                    const res = await axiosInstance.post('/booksdashboard/addnewbook',
                        formDataToSend
                    );

                    if (res.status === 200) {
                        console.log('Book added successfully');
                        setShowModal(false);
                        handleSubmit(formData);
                    } else {
                        console.error("res.data.error");
                    }
                } catch (error) {
                    console.error('Error adding book:', error);
                }
            }
            else if (modalMode === 'edit' && activeTab === 'books') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append("title", formData.title);
                    formDataToSend.append("description", formData.description);
                    formDataToSend.append("author_id", formData.author_id);
                    formDataToSend.append("series_id", formData.series_id);
                    formDataToSend.append("genre", formData.genre);
                    formDataToSend.append("part_num", formData.part_num);
                    formDataToSend.append("language", formData.language);
                    formDataToSend.append("page_count", formData.page_count);
                    formDataToSend.append("published_date", formData.published_date);
                    if (formData.cover_image) {
                        formDataToSend.append("cover_image", formData.cover_image);
                    }

                    const res = await axiosInstance.patch(
                        `/booksdashboard/updatebook/${formData.id}`,
                        formDataToSend,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    );

                    if (res.status === 200) {
                        console.log('Book added successfully');
                        setShowModal(false);
                        handleSubmit(formData);
                    } else {
                        console.error("res.data.error");
                    }
                } catch (error) {
                    console.error('Error adding book:', error);
                }
            }

        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">
                            {modalMode === 'add' ? `Add New ${activeTab.slice(0, -1)}` : `Edit ${activeTab.slice(0, -1)}`}
                        </h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        {activeTab === 'books' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Author</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData?.author_id || ''}
                                            onClick={() => handleRelationSearch('author_id')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Search for author..."
                                            readOnly
                                            required
                                        />
                                        {activeRelationField === 'author_id' && showRelationDropdown && (
                                            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        value={relationSearchTerm}
                                                        onChange={(e) => setRelationSearchTerm(e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                        placeholder="Filter authors..."
                                                        autoFocus
                                                    />
                                                </div>
                                                <ul className="max-h-60 overflow-auto">
                                                    {filteredRelations().map(author => (
                                                        <li
                                                            key={author.id}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleRelationSelect(author.id, 'author_id')}
                                                        >
                                                            {author.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Series</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.series_id || ''}
                                            onClick={() => handleRelationSearch('series_id')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Search for series..."
                                            readOnly
                                            required
                                        />
                                        {activeRelationField === 'series_id' && showRelationDropdown && (
                                            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        value={relationSearchTerm}
                                                        onChange={(e) => setRelationSearchTerm(e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                        placeholder="Filter series..."
                                                        autoFocus
                                                    />
                                                </div>
                                                <ul className="max-h-60 overflow-auto">
                                                    {filteredRelations().map(series => (
                                                        <li
                                                            key={series.id}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleRelationSelect(series.id, 'series_id')}
                                                        >
                                                            {series.series_title}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Genre</label>
                                    <input
                                        type="text"
                                        name="genre"
                                        value={formData.genre || ''}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Part Number</label>
                                    <input
                                        type="number"
                                        name="part_num"
                                        value={formData.part_num || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Language</label>
                                    <select
                                        name="language"
                                        value={formData.language || ''}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="">Select Language</option>
                                        <option value="Kurdish">Kurdish</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Published Date</label>
                                    <input
                                        type="date"
                                        name="published_date"
                                        value={formData.published_date ? new Date(formData.published_date).toISOString().split('T')[0] : ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating || 1}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        min="1"
                                        max="5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Page Count</label>
                                    <input
                                        type="number"
                                        name="page_count"
                                        value={formData.page_count || ''}
                                        required
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        min="1"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                    <input
                                        type="file"
                                        name="cover_image"
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                    />
                                    {(filePreview || formData.cover_image) && (
                                        <div className="mt-2">
                                            <img
                                                src={filePreview || formData.cover_image}
                                                alt="Cover preview"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'authors' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Language</label>
                                    <select
                                        name="language"
                                        value={formData.language || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="">Select Language</option>
                                        <option value="Kurdish">Kurdish</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={new Date(formData.dateOfBirth).toISOString().split('T')[0] || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Image</label>
                                    <input
                                        type="file"
                                        name="imgURL"
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                    />
                                    {(filePreview || formData.imgURL) && (
                                        <div className="mt-2">
                                            <img
                                                src={filePreview || formData.imgURL}
                                                alt="Author image"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'bookSeries' && (
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Series Title</label>
                                    <input
                                        type="text"
                                        name="series_title"
                                        value={formData.series_title || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    <select
                                        name="state"
                                        value={formData.state || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="">Select State</option>
                                        <option value="بەردەوامە">بەردەوامە</option>
                                        <option value="تەواوبوە">تەواوبوە</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                    <input
                                        type="file"
                                        name="cover_img"
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                    />
                                    {(filePreview || formData.cover_img) && (
                                        <div className="mt-2">
                                            <img
                                                src={filePreview || formData.cover_img}
                                                alt="Cover preview"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'news' && (
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        rows="8"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                    <input
                                        type="file"
                                        name="cover_image"
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                    />
                                    {(filePreview || formData.cover_image) && (
                                        <div className="mt-2">
                                            <img
                                                src={filePreview || formData.cover_image}
                                                alt="Cover preview"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'quotes' && (
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Book</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.title || ''}
                                            onClick={() => handleRelationSearch('book_id')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Search for book..."
                                            readOnly
                                        />
                                        {activeRelationField === 'book_id' && showRelationDropdown && (
                                            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        value={relationSearchTerm}
                                                        onChange={(e) => setRelationSearchTerm(e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                        placeholder="Filter books..."
                                                        autoFocus
                                                    />
                                                </div>
                                                <ul className="max-h-60 overflow-auto">
                                                    {filteredRelations().map(book => (
                                                        <li
                                                            key={book.id}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleRelationSelect(book.id, book.title, 'book_id')}
                                                        >
                                                            {book.title}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Author</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.name || ''}
                                            onClick={() => handleRelationSearch('author_id')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="Search for author..."
                                            readOnly
                                        />
                                        {activeRelationField === 'author_id' && showRelationDropdown && (
                                            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        value={relationSearchTerm}
                                                        onChange={(e) => setRelationSearchTerm(e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                        placeholder="Filter authors..."
                                                        autoFocus
                                                    />
                                                </div>
                                                <ul className="max-h-60 overflow-auto">
                                                    {filteredRelations().map(author => (
                                                        <li
                                                            key={author.id}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleRelationSelect(author.id, author.name, 'author_id')}
                                                        >
                                                            {author.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quote</label>
                                    <textarea
                                        name="quote"
                                        value={formData.quote || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <select
                                        name="role"
                                        value={formData.role || 'user'}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                {modalMode === 'add' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            name="password_hash"
                                            value={formData.password_hash || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            required={modalMode === 'add'}
                                        />
                                    </div>
                                )}

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                                    <input
                                        type="file"
                                        name="coverImgURL"
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                    />
                                    {(filePreview || formData.coverImgURL) && (
                                        <div className="mt-2">
                                            <img
                                                src={filePreview || formData.coverImgURL}
                                                alt="Profile image"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                {modalMode === 'add' ? 'Add' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderTable = () => {
        const data = filteredData();

        switch (activeTab) {
            case 'books':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Series</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(book => (
                                <tr key={book.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex-shrink-0 h-16 w-12">
                                            {book.cover_image ? (
                                                <img className="h-16 w-12 object-cover rounded shadow" src={book.cover_image} alt={book.title} />
                                            ) : (
                                                <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {book.name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {book.series_title || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(book.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'authors':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(author => (
                                <tr key={author.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{author.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex-shrink-0 h-16 w-16">
                                            {author.imgURL ? (
                                                <img className="h-16 w-16 rounded-full object-cover" src={author.imgURL} alt={author.name} />
                                            ) : (
                                                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{author.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {author.totalbooks || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(author.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(author)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(author.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'bookSeries':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(series => (
                                <tr key={series.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{series.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex-shrink-0 h-16 w-16">
                                            {series.cover_img ? (
                                                <img className="h-16 w-16 object-cover rounded" src={series.cover_img} alt={series.name} />
                                            ) : (
                                                <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{series.series_title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {series.totalbooks || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(series)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(series.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'news':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex-shrink-0 h-16 w-24">
                                            {item.cover_image ? (
                                                <img className="h-16 w-24 object-cover rounded" src={item.cover_image} alt={item.title} />
                                            ) : (
                                                <div className="h-16 w-24 bg-gray-200 rounded flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.views}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'quotes':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Cover</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(quote => (
                                <tr key={quote.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex-shrink-0 h-16 w-12">
                                            {books.find(b => b.id === quote.book_id)?.cover_image ? (
                                                <img
                                                    className="h-16 w-12 object-cover rounded shadow"
                                                    src={books.find(b => b.id === quote.book_id)?.cover_image}
                                                    alt={books.find(b => b.id === quote.book_id)?.title || 'Book cover'}
                                                />
                                            ) : (
                                                <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{quote.quote.length > 50 ? quote.quote.substring(0, 50) + '...' : quote.quote}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {books.find(b => b.id === quote.book_id)?.title || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {authors.find(a => a.id === quote.author_id)?.name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(quote)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(quote.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'users':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {user.coverImgURL ? (
                                                <img className="h-10 w-10 rounded-full" src={user.coverImgURL} alt={user.username} />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.created_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            default:
                return <div>No data available</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {['books', 'authors', 'bookSeries', 'news', 'quotes', 'users'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setSearchTerm('');
                                }}
                                className={`${activeTab === tab
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                            >
                                {tab === 'bookSeries' ? 'Book Series' : tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between mb-6 space-y-4 md:space-y-0">
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                            placeholder={`Search ${activeTab === 'bookSeries' ? 'by series title or ID' : activeTab === '`by name or username or email or ID`' ? 'User' : activeTab === 'news' ? 'by title or ID' : activeTab === 'quotes' ? 'search by quote or book title or ID ' : activeTab === 'authors' ? 'by name or ID' : 'by Title or series title or ID'}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleAdd}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New {activeTab.slice(0, -1)}
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="overflow-x-auto">
                        {renderTable()}
                    </div>
                </div>
            </main>

            {showModal && <ModalForm />}
        </div>
    );
};

export default AdminDashboard;