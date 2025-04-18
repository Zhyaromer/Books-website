import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

const CustomSelect = ({ options, label, placeholder, value, onChange }) => {
    const { main, secondary, tertiary } = useTheme();
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
                    className="flex h-[41px] w-full items-center justify-between rounded-md border px-3 py-2 shadow-sm outline-none cursor-pointer border-gray-700"
                    style={{
                        transition: 'border-color 0.2s ease', 
                    }}
                    onClick={toggleDropdown}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        selectRef.current.style.borderColor = isOpen ? '#364153' : main;
                        selectRef.current.style.boxShadow = `0 0 0 1px ${isOpen ? '#364153' : main}`;
                    }}
                    onBlur={() => {
                        selectRef.current.style.borderColor = '#374151';
                        selectRef.current.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    }}
                >
                    <span className={selectedOption ? 'text-gray-100' : 'text-gray-400'}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '0.5rem 0.75rem',
                                        cursor: 'pointer',
                                        color: selectedOption?.value === option.value ? 'white' : '#f3f4f6',
                                        backgroundColor: selectedOption?.value === option.value ? main : 'transparent',
                                        transition: 'background-color 0.2s, color 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedOption?.value !== option.value) {
                                            e.currentTarget.style.backgroundColor = secondary;
                                            e.currentTarget.style.color = 'white';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedOption?.value !== option.value) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#f3f4f6';
                                        }
                                    }}
                                    onClick={() => handleSelect(option)}
                                >
                                    <span>{option.label}</span>
                                    {selectedOption?.value === option.value && (
                                        <Check style={{ height: '1rem', width: '1rem' }} />
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