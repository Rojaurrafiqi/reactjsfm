import React from 'react'

const RadioButton = ({ value, checked, onChange }) => {
  return (
    <>
     <label>
      <input className='form-radio h-4 w-4 text-indigo-600"' type="radio" value={value} checked={checked} onChange={onChange} />
      {value}
    </label>
    </>
  )
}

export default RadioButton