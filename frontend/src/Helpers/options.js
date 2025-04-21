const genreOptions = [
    { value: "ڕۆمان", label: "ڕۆمان" },
    { value: "شیعر", label: "شیعر" },
    { value: "چیرۆک", label: "چیرۆک" },
    { value: "چیرۆکی کورت", label: "چیرۆکی کورت" },
    { value: "فانتاسی", label: "فانتاسی" },
    { value: "خەیاڵی", label: "خەیاڵی" },
    { value: "ڕۆمانس", label: "ڕۆمانس" },
    { value: "خەیاڵی ئەدەبی", label: "خەیاڵی ئەدەبی" },
    { value: "زانستی خەیاڵی", label: "زانستی خەیاڵی" },
    { value: "ترسناک", label: "ترسناک" },
    { value: "زمانەوانی", label: "زمانەوانی" },
    { value: "مێژووی", label: "مێژووی" },
    { value: "نادیار", label: "نادیار" }
];

const sortOptions = [
    { value: "newest", label: "تازەترین" },
    { value: "views", label: "زۆرترین بینەر" },
    { value: "maost page_count", label: "زۆرترین لاپەڕە" },
    { value: "lowest page_count", label: "کەمترین لاپەڕە" },
    { value: "year", label: "ساڵ" }
];

const languageOptions = [
    { value: "all", label: "هەمووی" },
    { value: "Kurdish", label: "کوردی" },
    { value: "English", label: "ئینگلیزی" }
];

const sortOptionsAuthors = [
    { value: "newest", label: "تازەترین" },
    { value: "views", label: "زۆرترین بینەر" },
];

const sortOptionsNews = [
    { value: "newest", label: "تازەترین" },
    { value: "views", label: "زۆرترین بینەر" },
    { value: "oldest", label: "کۆنترین" }
];

const categoryOptions = [
    { value: "all", label: "هەمووی" },
    { value: "books", label: "کتێب" },
    { value: "authors", label: "نووسەر" },
    { value: "events", label: "بۆنەکان" }
];

export { 
    genreOptions, 
    sortOptions, 
    languageOptions, 
    sortOptionsAuthors,
    sortOptionsNews,
    categoryOptions
};