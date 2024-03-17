import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
}

const StyledSelect = styled.select`
  width: fit-content;
  fontsize: 1rem;
  border: none;
  outline: none;
  borderradius: 8px;
  background: none;
  color: rgba(255, 255, 255, 0.5);
  margin: 0px;
  padding: 0px;
`;

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option: DropdownOption) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <StyledSelect
        value={selectedOption.value}
        onChange={(e) =>
          handleOptionChange(
            options.find((opt) => opt.value === e.target.value)!
          )
        }
      >
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
