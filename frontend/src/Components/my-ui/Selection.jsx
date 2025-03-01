import PropTypes from 'prop-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Selection = ({ options, label, placeholder, value, onChange }) => {
    return (
        <div dir='rtl' className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger dir='rtl' className="w-full border-gray-300 hover:border-blue-300 transition-all">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent dir='rtl'>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

Selection.propTypes = {
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

export default Selection;