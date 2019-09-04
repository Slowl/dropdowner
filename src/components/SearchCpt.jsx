import React from 'react'
import styled from 'styled-components'
import Items from './elements/Items'
import SearchBox from './elements/SearchBox'
import Controls from './elements/Controls'
import CaretDown from './icons/CaretDown'

const DropdownContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
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

const ParentListContainer = styled.div`
  display: ${props => props.isOpen ? "block" : "none"};
  background-color: #FFFFFF;
  box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.12);
  min-width: 17em;
  max-width: 25em;
  position: relative;
  padding: .5em .5em 0em;
  top: -40px;
`

const ChildListContainer = styled.div`
  max-height: 250px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  :-webkit-scrollbar {
    display: none;
  }
`

const ItemsContainer = styled.div`
  padding: .3em;
  cursor: pointer;
  transition: .3s;

  :hover {
    color: #00A6F0;
  }
`

const DropdownFooter = styled.div`
  text-align: center;
  padding: .2em 0;
`

const EmptySearch = styled.div`
  color: #111111;
  font-size: 15px;
  font-weight: 300;
  padding: 1em;
`

class SearchCpt extends React.Component {

  state = {
    isOpen: false,
    selectedId: [],
    selectedName: [],
    inputValue: "",
    childListHeight: NaN,
  }

  componentDidMount() {
    this.getChildListHeight()
  }

  componentDidUpdate() {
    this.getChildListHeight()
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

  handleInputChange = e => {
    const value = e.target.value
    this.setState({ inputValue: value})
  }

  getChildListHeight = () => {
    if (this.childListHeight && (this.state.childListHeight !== this.childListHeight.clientHeight)) {
      this.setState({ childListHeight: this.childListHeight.clientHeight })
    } else if (this.childListHeight === null && (this.state.childListHeight !== 0)) {
      this.setState({ childListHeight: 0 })
    }
  }

  selectAll = datas => {
    const allElemsId = []
    const allElemsName = []

    datas.forEach(elem => {
      allElemsId.push(elem.id)
      allElemsName.push(elem.title)
    })

    this.setState({ selectedId : allElemsId, selectedName: allElemsName })
  }

  clearAll = () => {
    this.setState({ selectedId : [], selectedName: [] })
  }

  render(){
    const { selectedName, selectedId, isOpen, inputValue, childListHeight } = this.state

    const data = [
      {id:1, title: "Option 1"},
      {id:2, title: "Option 2"},
      {id:3, title: "Option 3"},
      {id:4, title: "Option 4"},
      {id:5, title: "Option 5"},
      {id:6, title: "Option 6"},
      {id:7, title: "Option 7"},
      {id:8, title: "Option 8"},
      {id:9, title: "Option 9"},
      {id:10, title: "Option 10"},
      {id:11, title: "Option 11"},
      {id:12, title: "Option 12"},
      {id:13, title: "Option 13"},
      {id:14, title: "Option 14"},
      {id:15, title: "Option 15"},
      {id:16, title: "Option 16"},
    ]

    let filteredData = data
    if (inputValue.length > 0) {
      filteredData = data.filter(letter => {
        const formatedInputValue = inputValue.toLowerCase().trim()
        const formatedDataTitle = letter.title.toLowerCase().trim()
        return formatedDataTitle.match(formatedInputValue);
      })
    }

    return (
      <DropdownContainer>
        <Header onClick={this.openDropdown}>
          <TitleContainer>
            <span> {selectedName.length > 0 ? `... ${selectedName[selectedName.length - 1]}` : "Select"} </span>
            <CaretDown width="8px" height="5px" color="#111111" />
          </TitleContainer>
        </Header>
          <ParentListContainer isOpen={isOpen} ref={node => this.node = node}>
            <SearchBox onChange={this.handleInputChange} />

            {filteredData.length > 0 ? (
              <div>
                <Controls select={() => this.selectAll(filteredData)} clear={this.clearAll}/>
                <ChildListContainer ref={childListHeight => this.childListHeight = childListHeight}>
                  {filteredData.map(items => (
                      <ItemsContainer onClick={() => this.handleSelection(items)} key={items.id}>
                        <Items
                          data={items}
                          selectedId={selectedId}
                          selectedName={selectedName} />
                      </ItemsContainer>
                    )
                  )}
                </ChildListContainer>
              </div>
            ): (
              <EmptySearch> Aucun résultat </EmptySearch>
            )}

            {childListHeight >= 250 && <DropdownFooter><CaretDown width="10px" height="6px" color="#BDBDBD" /></DropdownFooter>}

          </ParentListContainer>

      </DropdownContainer>
    )
  }
}

export default SearchCpt
