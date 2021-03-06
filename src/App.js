import React from 'react';
import { Router, Link } from "@reach/router";
import styled from 'styled-components'

import Default from './components/Default'
import Hovered from './components/Hovered'
import Title from './components/Title'
import Listing from './components/Listing'
import SearchCpt from './components/SearchCpt'
import FinalIsolated from './components/FinalIsolated'

const NavContainer = styled.nav`
  background-color: #1d1d1d;
  display: flex;
  justify-content: center;
`
const NavLink = styled(Link)`
  display: inline-block;
  padding: 1em;
  color: #ffffff;
  text-decoration: none;
  outline: 0;
`

const RouterContainer = styled(Router)`
  padding-top: 3em;
  display: flex;
  justify-content: center;
`

class App extends React.Component {

  state = {
    data: '',
    projects: '',
    customStructure: [],
    loading: false,
  }

  dataTransform = ( dataToTransform ) => {
    const projects = dataToTransform.projects
    projects.forEach(item => {
      this.setState(prevState => ({
        customStructure: [
          ...prevState.customStructure,
          {
            id:item.id,
            title: item.name_fr,
            description:item.subtitle_fr,
            image:item.main_image.versions.small.url,
            goal:item.goal,
            reached: item.amount_raised,
            nb_products_sold: item.nb_products_sold,
            currency: item.currency_display,
            type: item.type
          }
          ],
          data: dataToTransform, projects: [...prevState.projects, ...projects] // state.projects used for the first Final component
      }))
    })
  }

  componentDidMount(){
    fetch("https://cors-anywhere.herokuapp.com/https://api.ulule.com/v1/search/projects?lang=fr&limit=16")
      .then(res => res.json())
      .then(data => {
        this.setState({data: data})
        this.dataTransform(data)
    })
  }

  dispatchRequest = e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight

    if (bottom) {
      this.setState(prevState => ({ loading: !prevState.loading}))
      fetch(`https://cors-anywhere.herokuapp.com/https://api.ulule.com/v1/search/projects${this.state.data.meta.next}`)
        .then(res => res.json())
        .then(data => {
          this.setState(prevState => ({ loading: !prevState.loading}))
          this.dataTransform(data)
      })
    }
  }

  render(){
    const dataOld = [
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

    return (
      <div>
        <NavContainer>
          <NavLink to="/"> Default </NavLink>
          <NavLink to="/hovered"> Hovered </NavLink>
          <NavLink to="/title"> Title </NavLink>
          <NavLink to="/listing"> Listing </NavLink>
          <NavLink to="/search"> Search </NavLink>
          <NavLink to="/final-isolated"> Final </NavLink>
        </NavContainer>

        <RouterContainer>
          <Default path="/" />
          <Hovered path="/hovered" />
          <Title path="/title" />
          <Listing path="/listing" data={dataOld} />
          <SearchCpt path="/search" data={dataOld} />
          <FinalIsolated
            path="/final-isolated"
            data={this.state.customStructure}
            request={this.dispatchRequest}
            loading={this.state.loading}
           />
        </RouterContainer>
      </div>
    )
  }
}

export default App
