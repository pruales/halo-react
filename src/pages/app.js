import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Layout from "../components/layout"
import Collection from "../components/collection"
import Login from "../components/login"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/collection" component={Collection} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App