import React from 'react';
import { Router, Link } from "@reach/router";
import styled from 'styled-components'

import Default from './components/Default'
import Hovered from './components/Hovered'
import Title from './components/Title'
import Listing from './components/Listing'

const NavContainer = styled.nav`
  background-color: #1d1d1d;
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

const App = () => {
  return(
    <div>
      <NavContainer>
        <NavLink to="/"> Default </NavLink>
        <NavLink to="/hovered"> Hovered </NavLink>
        <NavLink to="/title"> Title </NavLink>
        <NavLink to="/listing"> Listing </NavLink>
      </NavContainer>

      <RouterContainer>
        <Default path="/" />
        <Hovered path="/hovered" />
        <Title path="/title" />
        <Listing path="/listing" />
      </RouterContainer>
    </div>
  )
}

export default App;
