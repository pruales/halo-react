import React from "react"
import { Link } from "gatsby"
import { getAccessToken, isLoggedIn } from "../services/auth"

import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>Hello {isLoggedIn() ? getAccessToken() : "world"}!</h1>
    <p>
      {isLoggedIn() ? (
        <>
          You are logged in, so check your{" "}
          <Link to="/app/collection">collection</Link>
        </>
      ) : (
        <>
          You should <Link to="/app/login">log in</Link> to see restricted
          content
        </>
      )}
    </p>
  </Layout>
)