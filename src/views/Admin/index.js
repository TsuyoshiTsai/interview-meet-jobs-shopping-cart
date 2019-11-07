import React, { Suspense } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'

import propTypes from './prop-types'

const navigations = [{ path: '/products', name: '商品列表', component: React.lazy(() => import('views/AdminProducts')) }]

function Admin (props) {
  const { match } = props

  return (
    <Suspense fallback='Loading...'>
      {navigations.map((navigation, index) => (
        <Link key={index} to={navigation.path} style={{ padding: 20 }}>
          {navigation.name}
        </Link>
      ))}

      <Switch>
        {navigations.map((navigation, index) => (
          <Route key={index} strict sensetive path={`${match.url}${navigation.path}`} component={navigation.component} />
        ))}

        <Redirect to={`${match.url}${navigations[0].path}`} />
      </Switch>
    </Suspense>
  )
}

Admin.propTypes = propTypes

export default Admin
