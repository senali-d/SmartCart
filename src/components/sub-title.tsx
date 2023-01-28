import React from 'react'

interface SubTitleProps {
  title: string
}

const SubTitle = ({ title }: SubTitleProps) => {
  return (
    <div className="flex flex-col text-center w-full">
      <h2 className="text-2xl font-semibold title-font text-orange-900">
        {title}
      </h2>
    </div>
  )
}

export default SubTitle

SubTitle.defaultProps = {
  title: '',
}