import React from 'react'
import styled from 'styled-components'
import Items from './elements/Items'
import CaretDown from './icons/CaretDown'

const DropdownContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
  font-family: 'Roboto', sans-serif;
`

const Header = styled.div`
  display: inline-block;
  padding: .5em;
  color: #111111;
  font-weight: 500;
  cursor: pointer;
  :before {
    content:"message";
    display: block;
    text-transform: uppercase;
    color: #999999;
    font-size: 10px;
  }
`

const TitleContainer = styled.div`
  padding-top: .3em;
  transition: .3s;
  svg g {
    transition: .3s;
  }

  span {
    padding-right: 5px;
  }

  ${Header}:hover & {
    color: #00A6F0;
    svg g {
      fill: #00A6F0;
    }
  }
`

const ListContainer = styled.div`
  display: ${props => props.isOpen ? "block" : "none"};
  background-color: #FFFFFF;
  box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.12);
  min-width: 17em;
  max-width: 25em;
  position: relative;
  top: -40px;
  padding: 1em;
`

const ItemsContainer = styled.div`
  padding: .3em;
  cursor: pointer;
  transition: .3s;

  :hover {
    color: #00A6F0;
  }
`

class Listing extends React.Component {

  state = {
    isOpen: false,
    selectedId: [],
    selectedName: [],
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.closeDropdown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeDropdown, false)
  }

  openDropdown = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }))
  }

  closeDropdown = e => {
    if (this.node.contains(e.target)) {
      return
    } else {
        this.setState({ isOpen: false })
      }
  }

  handleSelection = data => {

    this.setState((prevState) => {
      const selectedIdUniq = [...new Set([...prevState.selectedId, ...[data.id]])]
      const selectedNameUniq = [...new Set([...prevState.selectedName, ...[data.title]])]
      return { selectedId: selectedIdUniq, selectedName: selectedNameUniq }
   })
  }

  render(){
    const { selectedName, selectedId, isOpen } = this.state

    return (
      <DropdownContainer>
        <Header onClick={this.openDropdown}>
          <TitleContainer>
            <span> {selectedName.length > 0 ? `... ${selectedName[selectedName.length - 1]}` : "Select"} </span>
            <CaretDown width="8px" height="5px" color="#111111" />
          </TitleContainer>
        </Header>
        <ListContainer isOpen={isOpen} ref={node => this.node = node}>
          {this.props.data.map(items => (
              <ItemsContainer onClick={() => this.handleSelection(items)} key={items.id}>
                <Items data={items} selectedId={selectedId} selectedName={selectedName} />
              </ItemsContainer>
          )
        )}
        </ListContainer>
      </DropdownContainer>
    )
  }
}

export default Listing
