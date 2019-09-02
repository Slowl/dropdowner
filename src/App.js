import React from 'react';
import { Router, Link } from "@reach/router";
import styled from 'styled-components'

import Default from './components/Default'

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

const App = () => {
  return(
    <div>
      <NavContainer>
        <NavLink to="/"> Default </NavLink>
      </NavContainer>

      <Router>
        <Default path="/" />
      </Router>
    </div>
  )
}

export default App;
