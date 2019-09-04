import React from 'react'
import styled from 'styled-components'

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5em 1.5em;
  border-bottom: 1px solid #E0E0E0;
  margin: .5em auto;
`

const Button = styled.span`
  align-self:flex-start;
  font-size: 13px;
  font-weight: 500;
  color: #999999;
  line-height: 26px;
  cursor: pointer;
  transition: .3s;

  :hover {
    color: #99DBF9;
  }
`

const Controls = ({ select, clear }) => {
  return (
    <ControlsContainer>
      <Button onClick={select}> Select all</Button>
      <Button onClick={clear}> Clear all</Button>
    </ControlsContainer>

  )
}

export default Controls
