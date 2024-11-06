import React, { ReactNode, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import SearchModal from './SearchModal'

const SearchBar = ({ actionBtn }: { actionBtn?: ReactNode }) => {
  const [isOPen, setIsOpen] = useState(false)

  return (
    <>
      <span onClick={() => setIsOpen(true)} >
        {actionBtn ? actionBtn :  <MdSearch className="text-2xl cursor-pointer" />}
      </span>
      <SearchModal 
        setIsOpen={setIsOpen}
        isOpen={isOPen}
      />
    </>
  )
}

export default SearchBar
