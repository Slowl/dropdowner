import React from 'react'
import styled from 'styled-components'
import Selected from './icons/Selected'

const Item = styled.div`
  .title {
    padding-left: 10px;
    transition: .3s;
  }

  .selected {
    padding-left: 10px;
    color: #00A6F0;
  }
`

const Placeholder = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
`

const Items = ({ data, selectedId, selectedName }) => {
  return (
    <Item>
      <span>{selectedId.includes(data.id) ? <Selected width="10px" height="10px"/> : <Placeholder />}</span>
      <span className={selectedName.includes(data.title) ? "selected" : "title"}>{data.title}</span>
    </Item>
  )
}

export default Items
