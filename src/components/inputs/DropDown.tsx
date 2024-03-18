import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  defaultValue?: string;
  onChange?: (selectedValue: string) => void; // Corrected type to accept string
}

const StyledSelect = styled.select`
  width: fit-content;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 8px;
  background: none;
  color: rgba(255, 255, 255, 0.5);
  margin: 0px;
  padding: 0px;
`;

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue || undefined
  );

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue); // Pass the value of the selected option
    }
  };

  return (
    <div>
      <StyledSelect value={selectedValue || ''} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};

export default Dropdown;
