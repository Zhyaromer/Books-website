import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ options, label, placeholder, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        value ? options.find(option => option.value === value) : null
    );
    const selectRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (value) {
            setSelectedOption(options.find(option => option.value === value));
        }
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onChange(option.value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown();
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'Tab') {
            if (isOpen) setIsOpen(false);
        }
    };

    return (
        <div dir="rtl" className="space-y-2">
            <label className="text-sm font-medium text-gray-100">{label}</label>
            <div className="relative">
                <div
                    ref={selectRef}
                    tabIndex={0}
                    className={`flex h-[41px] w-full items-center justify-between rounded-md border px-3 py-2 shadow-sm outline-none cursor-pointer ${isOpen
                            ? ' ring-offset-black'
                            : 'border-gray-700'
                        } focus:border-green-400 focus:ring-1 focus:ring-green-400`}
                    onClick={toggleDropdown}
                    onKeyDown={handleKeyDown}
                    onFocus={() => { }}
                >
                    <span className={selectedOption ? 'text-gray-100' : 'text-gray-400'}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-full right-0 z-50 mt-1 w-full rounded-md border border-gray-700 bg-[#1a1a1a] py-1 shadow-lg"
                    >
                        <ul className="max-h-60 overflow-auto">
                            {options.map((option) => (
                                <li
                                    key={option.value}
                                    className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-green-500 hover:text-white ${selectedOption && selectedOption.value === option.value
                                            ? 'bg-green-500 text-white'
                                            : 'text-gray-100'
                                        }`}
                                    onClick={() => handleSelect(option)}
                                >
                                    <span>{option.label}</span>
                                    {selectedOption && selectedOption.value === option.value && (
                                        <Check className="h-4 w-4" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

CustomSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default CustomSelect;