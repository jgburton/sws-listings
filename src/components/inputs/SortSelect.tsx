import React, { useState } from 'react';
import styled from 'styled-components';

interface SortSelectOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  options: SortSelectOption[];
  defaultValue?: string;
  onChange?: (selectedValue: string) => void;
}

const StyledSelect = styled.select`
  width: fit-content;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 8px;
  background: none;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  padding: 0;
`;

const SortSelect: React.FC<SortSelectProps> = ({
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
      onChange(newValue);
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

export default SortSelect;
