import React from 'react'
import { FormLabel, Textarea as ChakraTextarea } from '@chakra-ui/react'

interface TextareaProps {
  id: string
  name: string
  label?: string
  placeholder?: string
  type?: string
  onChange:  (e: any) => void,
  value: string
}

const Textarea = ({
  id,
  name,
  label,
  placeholder,
  onChange,
  value,
}: TextareaProps) => {
  return (
    <div>
      <FormLabel 
        htmlFor={id} 
        className="text-gray-600" style={{marginRight: 0}}>
          {label}
      </FormLabel>
      <ChakraTextarea
        id={id}
        name={name}
        onChange={onChange}
        variant="outline" 
        className="mt-0 text-gray-500"
        focusBorderColor="#FF6A3E" 
        placeholder={placeholder}
        borderColor="#FF6A3E"
        value={value}
      />
    </div>
  )
}

export default Textarea

Textarea.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  onchange: () => {},
  value: ''
}