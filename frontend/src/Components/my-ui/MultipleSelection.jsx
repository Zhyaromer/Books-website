import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from "../../context/ThemeContext";

const MultipleSelection = ({ options, label, placeholder, onChange, value }) => {
    const { secondary } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItems, setSelectedItems] = useState(value || []);
    const [inputValue, setInputValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (value && Array.isArray(value)) {
            setSelectedItems(value);
        }
    }, [value]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsDropdownOpen(true);
    };

    const handleSelectItem = (item) => {
        if (!selectedItems.find(i => i.value === item.value)) {
            const newSelectedItems = [...selectedItems, item];
            setSelectedItems(newSelectedItems);
            onChange(newSelectedItems);
        }
    };

    const handleRemoveItem = (itemValue) => {
        const newSelectedItems = selectedItems.filter(item => item.value !== itemValue);
        setSelectedItems(newSelectedItems);
        onChange(newSelectedItems);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            const existingItem = options.find(
                o => o.label.toLowerCase() === inputValue.trim().toLowerCase()
            );

            if (existingItem) {
                handleSelectItem(existingItem);
            } else {
                const newItem = {
                    value: inputValue.trim().toLowerCase().replace(/\s+/g, '-'),
                    label: inputValue.trim()
                };
                handleSelectItem(newItem);
            }
            e.preventDefault();
        } else if (e.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
            setSelectedItems(selectedItems.slice(0, -1));
        }
    };

    const filteredOptions = options.filter(option =>
        !selectedItems.find(i => i.value === option.value) &&
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div dir='rtl' className="space-y-2">
            <label className="text-sm font-medium text-gray-100">{label}</label>
            <div className="relative z-50">
                <div
                    tabIndex={0}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '8px',
                        border: isFocused ? `2px solid ${secondary}` : `1px solid #4a5565`,
                        outline: 'none',
                        borderRadius: '6px',
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onClick={() => inputRef.current.focus()}
                >
                    {selectedItems.map(item => (
                        <Badge
                            onClick={() => handleRemoveItem(item.value)}
                            key={item.value}
                            className="cursor-pointer text-white transform transition-colors duration-300 flex items-center gap-1 py-1 px-2"
                            style={{
                                backgroundColor: secondary,
                            }}
                        >
                            {item.label}
                            <X
                                className="h-3 w-3"
                            />
                        </Badge>
                    ))}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsDropdownOpen(true)}
                        className="flex-grow min-w-20 outline-none text-sm bg-transparent placeholder:text-gray-400 text-red-100"
                        placeholder={selectedItems.length ? "" : placeholder}
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto ml-auto hover:bg-[#1a1a1a]"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Button>
                </div>

                {isDropdownOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute z-10 mt-1 w-full bg-[#1a1a1a] rounded-md shadow-lg max-h-60 overflow-auto"
                    >
                        {filteredOptions.length > 0 ? (
                            <div className="py-1">
                                {filteredOptions.map(option => (
                                    <div
                                        key={option.value}
                                        className="flex items-center px-3 py-2 text-sm cursor-pointer"
                                        onClick={() => handleSelectItem(option)}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = secondary)}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                                    >
                                        <span className='text-gray-100'>{option.label}</span>
                                        {selectedItems.find(i => i.value === option.value) && (
                                            <Check className="ml-auto h-4 w-4 text-blue-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            inputValue && (
                                <div
                                    className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                                    onClick={() => {
                                        const newItem = {
                                            value: inputValue.trim().toLowerCase().replace(/\s+/g, '-'),
                                            label: inputValue.trim()
                                        };
                                        handleSelectItem(newItem);
                                    }}
                                >
                                    add {inputValue}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

MultipleSelection.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array
};

export default MultipleSelection;