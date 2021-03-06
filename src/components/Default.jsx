import React from 'react'
import styled from 'styled-components'
import CaretDown from './icons/CaretDown'

const DropdownContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
  font-family: 'Roboto', sans-serif;
`
const Header = styled.div`
  display: inline-block;
  padding: 1em;
  color: #111111;
  font-weight: 500;
  cursor: pointer;

  span {
    padding-right: 5px;
  }
`

class Default extends React.Component {
  render(){
    return(
      <DropdownContainer>
        <Header>
          <span>First option </span> <CaretDown width="8px" height="5px" color="#111111" />
        </Header>
      </DropdownContainer>
    )
  }
}

export default Default
