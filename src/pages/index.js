import React from "react"
import { Link, navigate } from "gatsby"
import { getAccessToken, isLoggedIn } from "../services/auth"

import Layout from "../components/layout"

export default () => (
  <Layout>
    {navigate('/app/login')}
  </Layout>
)