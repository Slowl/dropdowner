import React from 'react'
import styled from 'styled-components'
import Search from '../icons/Search'

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  border: 1px solid #E0E0E0;
  border-radius: 2px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1em 1em 1em .5em;
  border:0;

  ::placeholder {
    color: #999999;
    font-size: 15px;
  }
`

const Icon = styled.div`
  padding: 1em .5em 1em 1em;
`

const SearchBox = ({ onChange }) => {
  return (
    <InputContainer>
      <Icon> <Search width="18px" height="18px" color="#BDBDBD" /> </Icon>
      <SearchInput placeholder="Search" onChange={onChange} />
    </InputContainer>
  )
}

export default SearchBox
