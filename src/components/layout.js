import React from "react"
import NavBar from "./nav"
import Helmet from 'react-helmet';

const Layout = ({ children }) => (
  <>
    <Helmet>
          <meta charSet="utf-8" />
          <title>The Best Collection App</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Helmet>
    <NavBar />
    {children}
  </>
)
export default Layout