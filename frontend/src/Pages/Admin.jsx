import { useState, useEffect } from 'react';
import { axiosInstance, AdminRoute } from "../context/AxiosInstance";
import DeleteConfirmationModal from '../Components/layout/DeleteConfirmationModal';
import Select from 'react-select';
import CommentDetailsModal from '../Components/layout/CommentDetailsModal';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { genreOptions as helperGenreOptions } from "../Helpers/options";
import BookstoreNavigation from "../Components/layout/Navigation";
import Footer from "../Components/layout/Footer";

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [bookSeries, setBookSeries] = useState([]);
    const [news, setNews] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [activeTab, setActiveTab] = useState('کتێب');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentItem, setCurrentItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [genres] = useState(helperGenreOptions.map(genre => (genre.value)));
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [selectedAuthoQuote, setSelectedAuthorQuote] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedBookComments, setSelectedBookComments] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [selectedSeriesQuote, setSelectedSeriesQuote] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedLanguageAuthor, setSelectedLanguageAuthor] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [isModalOpenComments, setIsModalOpenComments] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    useEffect(() => {
        const fetchbooks = async () => {
            try {
                const res = await axiosInstance.get(`/booksdashboard/getallbooks`);
                if (res.status === 200) {
                    setBooks(res.data);
                } else if (res.status === 401) {
                    toast.error("ڕێگەپێنەدراوە");
                } else if (res.status === 404) {
                    toast.error("هیچ کتێبێک نەدۆزرایەوە");
                }
            } catch {
                setBooks([]);
                toast.error("هەڵەیەک ڕوویدا تکایە هەوڵبدەوە");
            }
        }

        const fetchauthors = async () => {
            try {
                const res = await axiosInstance.get(`/authorsdashboard/getallauthors`);
                if (res.status === 200) {
                    setAuthors(res.data);

                } else if (res.status === 401) {
                    toast.error("ڕێگەپێنەدراوە");
                } else if (res.status === 404) {
                    toast.error("هیچ نووسەرێک نەدۆزرایەوە");
                }
            } catch {
                setAuthors([]);
                toast.error("هەڵەیەک ڕوویدا تکایە هەوڵبدەوە");
            }
        }

        const fetchbookSeries = async () => {
            try {
                const res = await axiosInstance.get(`/seriesdashboard/getallseries`);
                if (res.status === 200) {
                    setBookSeries(res.data);
                } else if (res.status === 401) {
                    toast.error("ڕێگەپێنەدراوە");
                } else if (res.status === 404) {
                    toast.error("هیچ زنجیرە کتێبێک نەدۆزرایەوە");
                }
            } catch {
                setBookSeries([]);
                toast.error("هەڵەیەک ڕوویدا تکایە هەوڵبدەوە");
            }
        }

        const fetchnews = async () => {
            try {
                const res = await axiosInstance.get(`/newsdashboard/getnews`);
                if (res.status === 200) {
                    setNews(res.data);
                } else if (res.status === 401) {
                    toast.error("ڕێگەپێنەدراوە");
                } else if (res.status === 404) {
                    toast.error("هیچ هەواڵێك نەدۆزرایەوە");
                }
            } catch {
                setNews([]);
                toast.error("هەڵەیەک ڕوویدا تکایە هەوڵبدەوە");
            }
        }

        const fetchquotes = async () => {
            try {
                const res = await axiosInstance.get(`/quotesdashboard/getquotes`);
                if (res.status === 200) {
                    setQuotes(res.data);
                } else if (res.status === 401) {
                    toast.error("ڕێگەپێنەدراوە");
                } else if (res.status === 404) {
                    toast.error("هیچ وتەیەک نەدۆزرایەوە");
                }
            } catch {
                setQuotes([]);
                toast.error("هەڵەیەک ڕوویدا تکایە هەوڵبدەوە");
            }
        }

        const fetchusers = async () => {
            try {
                const res = await axiosInstance.get(`/usersdashboard/getusers`);
                if (res.status === 200) {
                    setUsers(res.data);
                } else if (res.status === 401) {
                    toast.error("ڕێگەپێنەدراوە");
                } else if (res.status === 404) {
                    toast.error("هیچ ئەندامێک نەدۆزرایەوە");
                }
            } catch {
                setUsers([]);
                toast.error("هەڵەیەک ڕوویدا تکایە هەوڵبدەوە");
            }
        }

        const fetchcomments = async () => {
            try {
                const res = await axiosInstance.get(`/commentsdashboard/getcomments`);
                if (res.status === 200) {
                    setComments(res.data);
                } else if (res.status === 401) {
                    toast.error("ڕێگەپێنەدراوە");
                } else if (res.status === 404) {
                    toast.error("هیچ هەڵسەنگاندنێک نەدۆزرایەوە");
                }
            } catch {
                setComments([]);
                toast.error("هەڵەیەک ڕوویدا تکایە هەوڵبدەوە");
            }
        }

        fetchbooks();
        fetchauthors();
        fetchbookSeries();
        fetchnews();
        fetchquotes();
        fetchusers();
        fetchcomments();
    }, [searchTerm, activeTab]);

    const filteredData = () => {
        let filtered = [];

        switch (activeTab) {
            case 'کتێب':
                filtered = books.filter(book =>
                    (searchTerm === '' ||
                        book.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        String(book.id).toLowerCase().includes(searchTerm.toLowerCase().trim())) &&
                    (!selectedAuthor || book.author_id === selectedAuthor.value) &&
                    (!selectedSeries || book.series_id === selectedSeries.value) &&
                    (!selectedGenre || book.genre?.includes(selectedGenre.value)) &&
                    (!selectedLanguage || book.language?.includes(selectedLanguage.value))
                );
                break;
            case 'نووسەر':
                filtered = authors.filter(author =>
                    (searchTerm === '' ||
                        author.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        String(author.id).toLowerCase().includes(searchTerm.toLowerCase().trim())) &&
                    (!selectedLanguageAuthor || author.language?.includes(selectedLanguageAuthor.value))
                );
                break;
            case 'زنجیرە کتێب':
                filtered = bookSeries.filter(series =>
                    (searchTerm === '' ||
                        series.series_title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        String(series.id).toLowerCase().includes(searchTerm.toLowerCase().trim())) &&
                    (!selectedState || series.state === selectedState.value)
                );
                break;
            case 'هەواڵ':
                filtered = news.filter(item =>
                (searchTerm === '' ||
                    item.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                    String(item.id).toLowerCase().includes(searchTerm.toLowerCase().trim()))
                );
                break;
            case 'وتە':
                filtered = quotes.filter(quote =>
                    (searchTerm === '' ||
                        quote.quote.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        String(quote.id).toLowerCase().includes(searchTerm.toLowerCase().trim())) &&
                    (!selectedAuthoQuote || quote.author_id === selectedAuthoQuote.value) &&
                    (!selectedSeriesQuote ||
                        books.find(book => book.id === quote.book_id)?.series_id === selectedSeriesQuote.value) &&
                    (!selectedBook || quote.book_id === selectedBook.value)
                );
                break;
            case 'ئەندام':
                filtered = users.filter(user =>
                    (searchTerm === '' ||
                        user.username.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        user.name?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        String(user.id).toLowerCase().includes(searchTerm.toLowerCase().trim())) &&
                    (!selectedRole || user.role === selectedRole.value)
                );
                break;
            case 'هەڵسەنگاندن':
                filtered = comments.filter(comment =>
                    (searchTerm === '' ||
                        comment.comment.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        comment.username.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                        String(comment.id).toLowerCase().includes(searchTerm.toLowerCase().trim())) &&
                    (!selectedBookComments || comment.book_id === selectedBookComments.value)
                );
                break;
            default:
                filtered = [];
        }

        return filtered;
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const openDeleteModal = (id) => {
        setItemToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    const handleDelete = async (id) => {
        openDeleteModal(id);
    };

    const confirmDelete = async () => {
        const id = itemToDelete;

        try {
            let endpoint = '';
            let itemType = '';
            switch (activeTab) {
                case 'کتێب':
                    endpoint = `/booksdashboard/removebook/${id}`;
                    itemType = 'کتێبەکە';
                    break;
                case 'نووسەر':
                    endpoint = `/authorsdashboard/removeAuthor/${id}`;
                    itemType = 'نووسەرەکە';
                    break;
                case 'زنجیرە کتێب':
                    endpoint = `/seriesdashboard/removeseries/${id}`;
                    itemType = 'زنجیرە کتێبەکە';
                    break;
                case 'هەواڵ':
                    endpoint = `/newsdashboard/deletenews/${id}`;
                    itemType = 'هەوالەکە';
                    break;
                case 'وتە':
                    endpoint = `/quotesdashboard/deleteqoute/${id}`;
                    itemType = 'وتەکە';
                    break;
                case 'ئەندام':
                    endpoint = `/usersdashboard/deleteuser/${id}`;
                    itemType = 'ئەندامەکە';
                    break;
                case 'هەڵسەنگاندن':
                    endpoint = `/commentsdashboard/deletecomment/${id}`;
                    itemType = 'هەڵسەنگاندنەکە';
                    break;
                default:
                    break;
            }

            if (endpoint) {
                const res = await axiosInstance.delete(endpoint);
                if (res.status === 200) {
                    toast.success(`${itemType} سڕایەوە`);
                } else {
                    toast.error('هەلەیەک للە سرینەوە رویدا');
                }
            }
        } catch {
            toast.error('هەلەیەک للە سرینەوە رویدا');
        } finally {
            closeModal();
        }
    };

    const ModalForm = () => {
        const [formData, setFormData] = useState(
            modalMode === 'edit' ? { ...currentItem } :
                activeTab === 'کتێب' ? { title: '', author_id: '', series_id: '', genre: '', part_num: '', language: '', description: '', published_date: '', rating: 1, page_count: '', views: 0 } :
                    activeTab === 'نووسەر' ? { name: '', bio: '', language: '', dateOfBirth: '', country: '', views: 0 } :
                        activeTab === 'زنجیرە کتێب' ? { series_title: '', state: '', description: '' } :
                            activeTab === 'هەواڵ' ? { title: '', description: '', views: 0 } :
                                activeTab === 'وتە' ? { book_id: '', author_id: '', quote: '' } :
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
            } else if (activeRelationField === 'genre') {
                return genres.filter(genre =>
                    genre.toLowerCase().includes(relationSearchTerm.toLowerCase())
                );
            }
            return [];
        };

        const handleFormSubmit = async () => {
            if (modalMode === 'add' && activeTab === 'کتێب') {
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
                        toast.success('کتێبێک زیاکرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە زیادکردنی کتێبێک تکایە هەوڵبدەوە');
                }
            } else if (modalMode === 'edit' && activeTab === 'کتێب') {
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
                        toast.success('کتێبەکە گۆڕدرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە گۆڕینی کتێبەکە تکایە هەوڵبدەوە');
                }
            }

            if (modalMode === 'add' && activeTab === 'نووسەر') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('name', formData.name);
                    formDataToSend.append('bio', formData.bio);
                    formDataToSend.append('language', formData.language);
                    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
                    formDataToSend.append('country', formData.country);

                    if (formData.author_cover) {
                        formDataToSend.append('author_cover', formData.author_cover);
                    }

                    const res = await axiosInstance.post('/authorsdashboard/addAuthor', formDataToSend, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    if (res.status === 200) {
                        toast.success('نووسەرێک زیاکرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە زیادکردنی نووسەرێک تکایە هەوڵبدەوە');
                }
            } else if (modalMode === 'edit' && activeTab === 'نووسەر') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('name', formData.name);
                    formDataToSend.append('bio', formData.bio);
                    formDataToSend.append('language', formData.language);
                    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
                    formDataToSend.append('country', formData.country);

                    if (formData.author_cover) {
                        formDataToSend.append('author_cover', formData.author_cover);
                    }

                    const res = await axiosInstance.patch(
                        `/authorsdashboard/updateAuthor/${formData.id}`, formDataToSend, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    if (res.status === 200) {
                        toast.success('نووسەرەکە گۆڕدرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە گۆڕینی نووسەرەکە تکایە هەوڵبدەوە');
                }
            }

            if (modalMode === 'add' && activeTab === 'زنجیرە کتێب') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('title', formData.series_title);
                    formDataToSend.append('state', formData.state);
                    formDataToSend.append('description', formData.description);

                    if (formData.series_cover) {
                        formDataToSend.append('series_cover', formData.series_cover);
                    }

                    const res = await axiosInstance.post('/seriesdashboard/addseries', formDataToSend, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    if (res.status === 200) {
                        toast.success('زنجیرە کتێبێک زیاکرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە زیادکردنی زنجیرە کتێبێک تکایە هەوڵبدەوە');
                }
            } else if (modalMode === 'edit' && activeTab === 'زنجیرە کتێب') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('title', formData.series_title);
                    formDataToSend.append('state', formData.state);
                    formDataToSend.append('description', formData.description);

                    if (formData.series_cover) {
                        formDataToSend.append('series_cover', formData.series_cover);
                    }

                    const res = await axiosInstance.patch(
                        `/seriesdashboard/updateseries/${formData.id}`, formDataToSend, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    if (res.status === 200) {
                        toast.success('زنجیرە کتێبێک گۆڕدرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە گۆڕینی زنجیرە کتێبێک تکایە هەوڵبدەوە');
                }
            }

            if (modalMode === 'add' && activeTab === 'هەواڵ') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('title', formData.title);
                    formDataToSend.append('description', formData.description);

                    if (formData.news_cover) {
                        formDataToSend.append('news_cover', formData.news_cover);
                    }
                    const res = await axiosInstance.post('/newsdashboard/addnews', formDataToSend, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    if (res.status === 200) {
                        toast.success('هەواڵێك زیاکرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە زیادکردنی هەواڵێك تکایە هەوڵبدەوە');
                }

            } else if (modalMode === 'edit' && activeTab === 'هەواڵ') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('title', formData.title);
                    formDataToSend.append('description', formData.description);

                    if (formData.news_cover) {
                        formDataToSend.append('news_cover', formData.news_cover);
                    }

                    const res = await axiosInstance.patch(
                        `/newsdashboard/updatenews/${formData.id}`, formDataToSend, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    if (res.status === 200) {
                        toast.success('هەواڵێك گۆڕدرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە گۆڕینی هەواڵێك تکایە هەوڵبدەوە');
                }
            }

            if (modalMode === 'add' && activeTab === 'وتە') {
                try {
                    const res = await axiosInstance.post('/quotesdashboard/addquote', formData);
                    if (res.status === 200) {
                        toast.success('وتەیەک زیاکرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە زیادکردنی وتەیەک تکایە هەوڵبدەوە');
                }
            } else if (modalMode === 'edit' && activeTab === 'وتە') {
                try {
                    const res = await axiosInstance.patch(`/quotesdashboard/updatequote/${formData.id}`, formData);
                    if (res.status === 200) {
                        toast.success('وتەیەک گۆڕدرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە گۆڕینی وتەیەک تکایە هەوڵبدەوە');
                }
            }

            if (modalMode === 'add' && activeTab === 'ئەندام') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('username', formData.username);
                    formDataToSend.append('email', formData.email);
                    formDataToSend.append('role', formData.role);
                    formDataToSend.append('password', formData.password_hash);
                    formDataToSend.append('name', formData.name);
                    formDataToSend.append('bio', formData.bio);

                    if (formData.profilepic) {
                        formDataToSend.append('profilepic', formData.profilepic);
                    }

                    const res = await axiosInstance.post('/usersdashboard/adduser', formDataToSend, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    if (res.status === 200) {
                        toast.success('ئەدامێک زیاکرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە زیادکردنی ئەدامێک تکایە هەوڵبدەوە');
                }
            } else if (modalMode === 'edit' && activeTab === 'ئەندام') {
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('username', formData.username);
                    formDataToSend.append('email', formData.email);
                    formDataToSend.append('role', formData.role);
                    formDataToSend.append('name', formData.name);
                    formDataToSend.append('bio', formData.bio);

                    if (formData.profilepic) {
                        formDataToSend.append('profilepic', formData.profilepic);
                    }

                    const res = await axiosInstance.patch(
                        `/usersdashboard/updateuser/${formData.id}`, formDataToSend, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    if (res.status === 200) {
                        toast.success('ئەدامێک گۆڕدرا');
                        setShowModal(false);
                    }
                } catch {
                    toast.error('هەڵەیەک ڕوویدا لە گۆڕینی ئەدامێک تکایە هەوڵبدەوە');
                }
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
                    <div dir='rtl' className={`flex justify-between items-center mb-6`}>
                        <h2 className="text-xl font-bold">
                            {modalMode === 'add' ? `زیادکردن ${activeTab}` : `دەستکاریکردنی ${activeTab}`}
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
                        {activeTab === 'کتێب' && (
                            <div dir='rtl' className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">ناوی کتێب</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder='ناوی کتێب بنووسە'
                                        value={formData.title || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">نووسەر</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData?.author_id || ''}
                                            onClick={() => handleRelationSearch('author_id')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="بە دوای نووسەر بگەڕی..."
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
                                                        autoFocus
                                                        required
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
                                    <label className="block text-sm font-medium text-gray-700">زنجیرە کتێب</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.series_id || ''}
                                            onClick={() => handleRelationSearch('series_id')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="بە دوای زنجیرە کتێب بگەڕی..."
                                            readOnly
                                            required={formData.part_num ? true : false}
                                        />
                                        {activeRelationField === 'series_id' && showRelationDropdown && (
                                            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        value={relationSearchTerm}
                                                        onChange={(e) => setRelationSearchTerm(e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                        autoFocus
                                                        required
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
                                    <label className="block text-sm font-medium text-gray-700">چەشن</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.genre || ''}
                                            onClick={() => handleRelationSearch('genre')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="بە دوای چەشن بگەڕی..."
                                            readOnly
                                            required
                                        />
                                        {activeRelationField === 'genre' && showRelationDropdown && (
                                            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        value={relationSearchTerm}
                                                        onChange={(e) => setRelationSearchTerm(e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                        autoFocus
                                                        required
                                                    />
                                                </div>
                                                <ul className="max-h-60 overflow-auto">
                                                    {filteredRelations().map(genre => (
                                                        <li
                                                            key={genre}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleRelationSelect(genre, 'genre')}
                                                        >
                                                            {genre}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">چەنەم بەشی زنجیرەکەیە (ئەگەر هەیە)</label>
                                    <input
                                        type="number"
                                        name="part_num"
                                        value={formData.part_num || ''}
                                        onChange={handleChange}
                                        placeholder='بەشی زنجیرەکەیە بنووسە (ئارەزوومەندانایە)'
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        min="1"
                                        required={formData.series_id ? true : false}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">زمان</label>
                                    <select
                                        name="language"
                                        value={formData.language || ''}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="">زمانێک هەڵبژێرە</option>
                                        <option value="Kurdish">کوردی</option>
                                        <option value="English">ئینگلیزی</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">بەرواری بڵاوکردنەوە</label>
                                    <input
                                        type="date"
                                        name="published_date"
                                        value={formData.published_date ? new Date(formData.published_date).toISOString().split('T')[0] : ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">نمرە</label>
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
                                    <label className="block text-sm font-medium text-gray-700">ژمارەی پەڕە</label>
                                    <input
                                        type="number"
                                        name="page_count"
                                        value={formData.page_count || ''}
                                        required
                                        placeholder='ژمارەی پەڕە بنووسە'
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        min="1"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">کورتە</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder='کورتەیەک دەربارەی ئەم کتێبە بنووسە'
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">وێنە</label>
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

                        {activeTab === 'نووسەر' && (
                            <div dir='rtl' className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">ناو</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="ناوی نووسەر بنووسە"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">زمان</label>
                                    <select
                                        name="language"
                                        value={formData.language || ''}
                                        required
                                        placeholder='زمانی نووسەر بنووسە'
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="">زمانێک هەڵبژێرە</option>
                                        <option value="Kurdish">کوردی</option>
                                        <option value="English">ئینگلیزی</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">بەرواری لەدایکبوون</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        required
                                        value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">وڵات</label>
                                    <input
                                        type="text"
                                        name="country"
                                        required
                                        placeholder='وڵاتی نووسەر بنووسە'
                                        value={formData.country || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">ژیاننامە</label>
                                    <textarea
                                        name="bio"
                                        placeholder='ژیاننامەی نووسەر بنووسە'
                                        required
                                        value={formData.bio || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">وێنە</label>
                                    <input
                                        type="file"
                                        name="author_cover"
                                        required
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

                        {activeTab === 'زنجیرە کتێب' && (
                            <div dir='rtl' className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ناوی زنجیرە کتێب</label>
                                    <input
                                        type="text"
                                        name="series_title"
                                        placeholder='ناوی زنجیرە کتێب بنووسە'
                                        value={formData.series_title || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">دۆخ</label>
                                    <select
                                        name="state"
                                        required
                                        value={formData.state || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="">دۆخێک هەڵبژێرە</option>
                                        <option value="بەردەوامە">بەردەوامە</option>
                                        <option value="تەواوبوە">تەواوبوە</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">کورتە</label>
                                    <textarea
                                        name="description"
                                        placeholder='کورتەی زنجیرە کتێب بنووسە'
                                        required
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">وێنە</label>
                                    <input
                                        type="file"
                                        name="series_cover"
                                        required
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

                        {activeTab === 'هەواڵ' && (
                            <div dir='rtl' className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">سەردێڕ</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder='سەردێڕی هەواڵەکە بنووسە'
                                        value={formData.title || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">هەواڵەکە</label>
                                    <textarea
                                        name="description"
                                        placeholder='زانیاری هەوالەکە بنووسە'
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        rows="8"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">وێنە</label>
                                    <input
                                        type="file"
                                        name="news_cover"
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                        required
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

                        {activeTab === 'وتە' && (
                            <div dir='rtl' className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">کتێب</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.book_id || ''}
                                            onClick={() => handleRelationSearch('book_id')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="بە دوای کتێبدا بگەڕی..."
                                            readOnly
                                            required
                                        />
                                        {activeRelationField === 'book_id' && showRelationDropdown && (
                                            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        value={relationSearchTerm}
                                                        onChange={(e) => setRelationSearchTerm(e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                        autoFocus
                                                    />
                                                </div>
                                                <ul className="max-h-60 overflow-auto">
                                                    {filteredRelations().map(book => (
                                                        <li
                                                            key={book.id}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleRelationSelect(book.id, 'book_id')}
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
                                    <label className="block text-sm font-medium text-gray-700">نووسەر</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.author_id || ''}
                                            onClick={() => handleRelationSearch('author_id')}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            placeholder="بە دوای نووسەر بگەڕی..."
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
                                    <label className="block text-sm font-medium text-gray-700">وتەکە</label>
                                    <textarea
                                        name="quote"
                                        value={formData.quote || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder='وتەکە بنووسە '
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        {activeTab === 'ئەندام' && (
                            <div dir='rtl' className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">نازناو</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                        placeholder='نازناو بنووسە'
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ئیمەیڵ</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                        placeholder='ئیمەیڵ بنووسە'
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ناو</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder='ناو بنووسە'
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">پلە</label>
                                    <select
                                        name="role"
                                        value={formData.role || 'user'}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="user">ئەندام</option>
                                        <option value="admin">ئادمین</option>
                                    </select>
                                </div>

                                {modalMode === 'add' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">وشەی نهێنی</label>
                                        <input
                                            type="password"
                                            name="password_hash"
                                            placeholder='وشەی نهێنی بنووسە'
                                            value={formData.password_hash || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                            required={modalMode === 'add'}
                                        />
                                    </div>
                                )}

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">ژیاننامە</label>
                                    <textarea
                                        name="bio"
                                        placeholder='ژیاننامە بنووسە'
                                        value={formData.bio || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    ></textarea>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">وێنە</label>
                                    <input
                                        type="file"
                                        name="profilepic"
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

                        <div dir='rtl' className="mt-6 flex flex-row-reverse justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                بگەڕێوە
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                {modalMode === 'add' ? 'زیادکردن' : 'تازەکردنەوە'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const authorOptions = authors.map(author => ({ value: author.id, label: author.name }));
    const seriesOptions = bookSeries.map(series => ({ value: series.id, label: series.series_title }));
    const booksOptions = books.map(book => ({ value: book.id, label: book.title }));
    const genreOptions = Array.isArray(genres) ? genres.map(genre => ({ value: genre, label: genre })) : [];
    const languageOptions = [
        { value: '', label: 'هەمووی' },
        { value: 'Kurdish', label: 'کوردی' },
        { value: 'English', label: 'ئینگلیزی' }
    ];
    const roleOptions = [
        { value: 'user', label: 'ئەندام' },
        { value: 'admin', label: 'ئەدمین' }
    ];
    const seriesStateOptions = [
        { value: 'بەردەوامە', label: 'بەردەوامە' },
        { value: 'تەواوبوە', label: 'تەواوبوە' }
    ]

    const seeDetails = (id) => {
        const reviews = comments.filter(review => review.id === id);
        setSelectedComment(reviews[0]);
        setIsModalOpenComments(true);
    };

    const renderTable = () => {
        const data = filteredData();

        switch (activeTab) {
            case 'کتێب':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئایدی</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وێنە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ناوی کتێب</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نووسەر</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">زنجیرەی</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کاتی زیادکردن</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کردارەکان</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.sort((a, b) => b.id - a.id).map(book => (
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book?.title?.length > 25 ? `${book.title.slice(0, 25)}...` : book.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {book?.name?.length > 25 ? `${book.name.slice(0, 25)}...` : book.name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {book?.series_title?.length > 25 ? `${book.series_title.slice(0, 25)}...` : book.series_title || `نیەتی`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(book.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="text-green-600 hover:text-indigo-900 ml-3"
                                        >
                                            گۆڕین
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            سڕینەوە
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'نووسەر':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئایدی</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وێنە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ناوی نووسەر</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ژ.کتێب</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کاتی زیادکردن</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کردارەکان</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data
                                .sort((a, b) => b.id - a.id)
                                .map((author) => (
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{author?.name?.length > 30 ? `${author.name.slice(0, 30)}...` : author.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {author.totalbooks || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(author.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(author)}
                                                className="text-green-600 hover:text-indigo-900 ml-3"
                                            >
                                                گۆڕین
                                            </button>
                                            <button
                                                onClick={() => handleDelete(author.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                سڕینەوە
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>

                    </table>
                );

            case 'زنجیرە کتێب':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئایدی</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وێنە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ناوی زنجیرە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">دۆخ</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ژ.کتێب</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کردارەکان</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.sort((a, b) => b.id - a.id).map(series => (
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{series?.series_title?.length > 40 ? `${series.series_title.slice(0, 40)}...` : series.series_title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{series.state}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {series.totalbooks || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(series)}
                                            className="text-green-600 hover:text-indigo-900 ml-3"
                                        >
                                            گۆرین
                                        </button>
                                        <button
                                            onClick={() => handleDelete(series.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            سڕینەوە
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'هەواڵ':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئایدی</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وێنە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">سەردێڕ</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">بینەر</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کاتی زیادکردن</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کردارەکان</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.sort((a, b) => b.id - a.id).map(item => (
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.title?.length > 50 ? `${item.title.slice(0, 50)}...` : item.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.views}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-green-600 hover:text-indigo-900 ml-3"
                                        >
                                            گۆرین
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            سڕینەوە
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'وتە':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئایدی</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وێنە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وتە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ناوی کتێب</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ناوی نووسەر</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کردارەکان</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.sort((a, b) => b.id - a.id).map(quote => (
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
                                        {books.find(b => b.id === quote.book_id)?.title?.length > 20 ? books.find(b => b.id === quote.book_id)?.title.substring(0, 20) + '...' : books.find(b => b.id === quote.book_id)?.title || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {authors.find(a => a.id === quote.author_id)?.name?.length > 20 ? authors.find(a => a.id === quote.author_id)?.name.substring(0, 20) + '...' : authors.find(a => a.id === quote.author_id)?.name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(quote)}
                                            className="text-green-600 hover:text-indigo-900 ml-3"
                                        >
                                            گۆرین
                                        </button>
                                        <button
                                            onClick={() => handleDelete(quote.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            سرینەوە
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'ئەندام':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئایدی</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وێنە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نازناو</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئیمەیڵ</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ناو</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">پلە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کاتی زیادکردن</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کردارەکان</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.sort((a, b) => b.id - a.id).map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {user.coverImgURL ? (
                                                <img className="h-10 w-10 rounded-full" src={user.coverImgURL} />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user?.username?.length > 25 ? user.username.substring(0, 25) + '...' : user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email.length > 25 ? user.email.substring(0, 25) + '...' : user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user?.name?.length > 15 ? user.name.substring(0, 15) + '...' : user.name || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.role === 'admin' ? 'ئەدمین' : 'ئەندام'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.created_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-green-600 hover:text-indigo-900 ml-3"
                                        >
                                            گۆرین
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            سرینەوە
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'هەڵسەنگاندن':
                return (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئایدی</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وێنە</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نازناو</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ناوی کتێب</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ئایا سپۆیلەرە؟</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کاتی زیادکردن</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کردارەکان</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.sort((a, b) => b.id - a.id).map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {user.coverImgURL ? (
                                                <img className="h-10 w-10 rounded-full" src={user.coverImgURL} alt={user.username.slice(0, 2)} />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username.length > 20 ? `${user.username.slice(0, 20)}...` : user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.title.length > 30 ? `${user.title.slice(0, 30)}...` : user.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.isSpoiler ? 'بەڵێ' : 'نەخێر'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.created_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => seeDetails(user.id)}
                                            className="text-green-600 hover:text-indigo-900 ml-3"
                                        >
                                            بینینی زیاتر
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            سرینەوە
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            default:
                return <div>هیچ داتایەک بەردەست نییە</div>;
        }
    };

    return (
        <AdminRoute>
            <div>
                <BookstoreNavigation />
                <div dir='rtl' className="min-h-screen bg-gray-50 pt-20">
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold text-gray-900">داشبۆردی ئەدمین</h1>
                        </div>
                    </header>

                    <DeleteConfirmationModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onConfirm={confirmDelete}
                        itemType={
                            activeTab === 'کتێب'
                                ? 'کتێب'
                                : activeTab === 'نووسەر'
                                    ? 'نووسەر'
                                    : activeTab === 'زنجیرە کتێب'
                                        ? 'زنجیرە کتێب'
                                        : activeTab === 'هەواڵ'
                                            ? 'هەواڵ'
                                            : activeTab === 'هەڵسەنگاندن'
                                                ? 'هەڵسەنگاندن'
                                                : activeTab === 'وتە'
                                                    ? 'وتە'
                                                    : activeTab === 'ئەندام'
                                                        ? 'ئەندام'
                                                        : 'item'
                        }
                    />

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="mb-6 border-b border-gray-200">
                            <nav className="-mb-px flex gap-x-6" aria-label="Tabs">
                                {['کتێب', 'نووسەر', 'زنجیرە کتێب', 'هەواڵ', 'وتە', 'هەڵسەنگاندن', 'ئەندام'].map(tab => (
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
                                        {tab === 'زنجیرە کتێب' ? 'زنجیرە کتێب' : tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {(() => {
                            switch (activeTab) {
                                case 'کتێب':
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">نووسەر</label>
                                                <Select
                                                    isClearable
                                                    options={authorOptions}
                                                    value={selectedAuthor}
                                                    onChange={setSelectedAuthor}
                                                    placeholder="گەڕان بە ناوی نووسەر"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">زنجیرە</label>
                                                <Select
                                                    isClearable
                                                    options={seriesOptions}
                                                    value={selectedSeries}
                                                    onChange={setSelectedSeries}
                                                    placeholder="گەڕان بە ناوی زنجیرە"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">چەشن</label>
                                                <Select
                                                    isClearable
                                                    options={genreOptions}
                                                    value={selectedGenre}
                                                    onChange={setSelectedGenre}
                                                    placeholder="گەڕان بە چەشن"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">زمان</label>
                                                <Select
                                                    isClearable
                                                    options={languageOptions}
                                                    value={selectedLanguage}
                                                    onChange={setSelectedLanguage}
                                                    placeholder="گەڕان بە زمان"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    );
                                case 'نووسەر':
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">زمان</label>
                                                <Select
                                                    isClearable
                                                    options={languageOptions}
                                                    value={selectedLanguageAuthor}
                                                    onChange={setSelectedLanguageAuthor}
                                                    placeholder="گەڕان بە زمان"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    );
                                case 'زنجیرە کتێب':
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">دۆخ</label>
                                                <Select
                                                    isClearable
                                                    options={seriesStateOptions}
                                                    value={selectedState}
                                                    onChange={setSelectedState}
                                                    placeholder="گەڕان بە دۆخی زنجیرە"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    );
                                case 'وتە':
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">نوسەر</label>
                                                <Select
                                                    isClearable
                                                    options={authorOptions}
                                                    value={selectedAuthoQuote}
                                                    onChange={setSelectedAuthorQuote}
                                                    placeholder="گەڕان بە ناوی نووسەر"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">کتێب</label>
                                                <Select
                                                    isClearable
                                                    options={booksOptions}
                                                    value={selectedBook}
                                                    onChange={setSelectedBook}
                                                    placeholder="گەڕان بە ناوی نووسەر"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">زنجیرە</label>
                                                <Select
                                                    isClearable
                                                    options={seriesOptions}
                                                    value={selectedSeriesQuote}
                                                    onChange={setSelectedSeriesQuote}
                                                    placeholder="گەڕان بە ناوی زنجیرە"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    );
                                case 'ئەندام':
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">پلە</label>
                                                <Select
                                                    isClearable
                                                    options={roleOptions}
                                                    value={selectedRole}
                                                    onChange={setSelectedRole}
                                                    placeholder="گەڕان بە پلە"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    );
                                case 'هەڵسەنگاندن':
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">کتێب</label>
                                                <Select
                                                    isClearable
                                                    options={booksOptions}
                                                    value={selectedBookComments}
                                                    onChange={setSelectedBookComments}
                                                    placeholder="گەڕان بە ناوی کتێب"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    )
                                default:
                                    return null;
                            }
                        })()}

                        <div className="flex flex-col md:flex-row md:justify-between mb-6 space-y-4 md:space-y-0">
                            <div className="w-full md:w-1/3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={`گەڕان بە ${activeTab === 'زنجیرە کتێب' ? 'ناوی زنجیرە یان ئایدی' : activeTab === 'ئەندام' ? 'ناو یان نازناو یان ئیمەیڵ' :
                                            activeTab === 'هەوال' ? 'سەردێر یان ئایدی' : activeTab === 'وتە' ? 'وتەکە یان ئایدی' :
                                                activeTab === 'نووسەر' ? 'ناو یان ئایدی' : activeTab === 'هەڵسەنگاندن' ? 'نازناو یان ئایدی' : 'ناو یان ئایدی'}`}
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

                            <div className={`${activeTab === 'هەڵسەنگاندن' ? 'hidden' : ''}`}>
                                <button
                                    onClick={handleAdd}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    زیادکردنی {activeTab}
                                </button>
                            </div>
                        </div>

                        <div className="bg-white shadow overflow-hidden rounded-lg">
                            <div className="overflow-x-auto">
                                {renderTable()}
                            </div>
                        </div>
                    </main>

                    <CommentDetailsModal
                        isOpen={isModalOpenComments}
                        onClose={() => setIsModalOpenComments(false)}
                        comment={selectedComment}
                    />
                    {showModal && <ModalForm />}
                    <ToastContainer transition={Slide} />
                </div>
                <Footer />
            </div>
        </AdminRoute>
    );
};

export default AdminDashboard;