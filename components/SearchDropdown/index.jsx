import Select from 'react-select';

// IMPORTANT: there's an override for the dropdown in global.css - #react-select-2-listbox
export const SearchDropdown = (props) => (
    <Select
        {...props}
        classNamePrefix="bitch"
        isSearchable
        styles={{
            menu: (base) => ({
                ...base,
                backgroundColor: '#343434',
            }),
            control: (base) => ({
                ...base,
                backgroundColor: '#343434',
            }),
            singleValue: (base) => ({
                ...base,
                color: '#fff',
            }),
            input: (base) => ({
                ...base,
                color: '#fff',
            }),
        }}
    />
);
