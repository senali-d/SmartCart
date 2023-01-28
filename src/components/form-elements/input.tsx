import React from 'react'
import { FormLabel, Input as ChakraInput } from '@chakra-ui/react'

interface InputProps {
  id: string
  name: string
  label?: string
  placeholder?: string
  type?: string
  onChange:  (e: any) => void
  value?: string
}

const Input = ({
  id,
  name,
  label,
  placeholder,
  type,
  onChange,
  value,
}: InputProps) => {
  return (
    <div>
      <FormLabel 
        htmlFor={id} 
        className="text-gray-600" style={{marginRight: 0}}>
          {label}
      </FormLabel>
      <ChakraInput
        id={id}
        name={name}
        onChange={onChange}
        variant="outline" 
        className="mt-0 text-gray-500"
        focusBorderColor="#FF6A3E" 
        placeholder={placeholder}
        type={type}
        borderColor="#FF6A3E"
        value={value}
      />
    </div>
  )
}

export default Input

Input.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  onchange: () => {},
  value: '',
}