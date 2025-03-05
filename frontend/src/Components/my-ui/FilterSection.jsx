import Selection from "./Selection";
import MultipleSelection from "./MultipleSelection";
import PropTypes from 'prop-types';

const FilterSection = ({
    showGenre = false,
    genreOptions,
    selectedGenres,
    onGenreChange,
    languageOptions,
    language,
    onLanguageChange,
    sortOptions,
    sort,
    onSortChange,
    languageLabel = "زمان",
    className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
}) => {
    return (
        <div className="relative z-30 space-y-6 px-4 sm:px-6 lg:px-8 py-6 pt-20 md:pt-32">
            <div dir="rtl" className={className}>
                {showGenre && (
                    <div className="w-full">
                        <MultipleSelection
                            options={genreOptions}
                            label="چەشنەکان"
                            placeholder="چەشنێک هەڵبژێرە"
                            onChange={onGenreChange}
                            value={selectedGenres}
                            className="w-full"
                        />
                    </div>
                )}
                <div className="w-full">
                    <Selection
                        options={languageOptions}
                        label={languageLabel}
                        placeholder="زمانێک هەڵبژێرە"
                        value={language}
                        onChange={onLanguageChange}
                        className="w-full h-[42px]"
                    />
                </div>
                <div className="w-full">
                    <Selection
                        options={sortOptions}
                        label="ڕیزبەندی"
                        placeholder="ڕیزبەندیەک هەڵبژێرە"
                        value={sort}
                        onChange={onSortChange}
                        className="w-full h-[42px]"
                    />
                </div>
            </div>
        </div>
    );
};

FilterSection.propTypes = {
    showGenre: PropTypes.bool,
    genreOptions: PropTypes.array,
    selectedGenres: PropTypes.array,
    onGenreChange: PropTypes.func,
    languageOptions: PropTypes.array,
    language: PropTypes.string,
    onLanguageChange: PropTypes.func,
    sortOptions: PropTypes.array,
    sort: PropTypes.string,
    onSortChange: PropTypes.func,
    languageLabel: PropTypes.string,
    className: PropTypes.string,
};

export default FilterSection; 