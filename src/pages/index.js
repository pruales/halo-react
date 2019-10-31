import React from "react"
import { Link } from "gatsby"
import Button from '@material-ui/core/Button'
import Layout from "../components/layout"

export default () => (
    <Layout>
        <Button
            style={{ marginTop: '12px'}}
            variant="contained"
            color="secondary"
        > <Link to="/app/login"> Login</Link> </Button>
    </Layout>
)