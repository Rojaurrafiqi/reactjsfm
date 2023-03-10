import React, {useState} from 'react'
import RadioButton from './RadioButton';

const RadioGroup = ({ name, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(name, value);
  };

  return (
    <div>
         {options.map((option) => (
          <RadioButton
          key={option.value}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={handleRadioChange}
          name={name}
        />
      ))}
    </div>
  )
}

export default RadioGroup