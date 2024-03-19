import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useCountries from "../../hooks/useCountries";

const StyledSelect = styled.select`
  width: 150px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px;
  transition: background-color 0.2s ease 0s, box-shadow 0.2s ease 0s, color 0.4s ease 0s, padding 0.4s ease 0s;
  border: 0px;
  margin: 0px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: normal;
  font-size: 1.1rem;
  line-height: 32px;
  color: rgb(255, 255, 255);
  height: 32px;
  box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  background-color: rgba(255, 255, 255, 0.05);
`;

export type CountrySelectValue = {
    flag: string;
    label: string;
    value: string;
};

interface CountrySelectProps {
    value?: string;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const { getAll } = useCountries();
    const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedOption = getAll().find(option => option.value === selectedValue);
        if (selectedOption) {
            onChange(selectedOption);
        }
    };

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const options = getAll();

    console.log(selectedValue);

    return (
        <div>
            <StyledSelect
                value={selectedValue}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.flag} {option.label}
                    </option>
                ))}
            </StyledSelect>
        </div>
    );
};

export default CountrySelect;
