import React, { Suspense } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'

import propTypes from './prop-types'

const navigations = [
  { path: '/products', name: '商品列表', component: React.lazy(() => import('views/HomeProducts')) },
  { path: '/cart', name: '購物車', component: React.lazy(() => import('views/HomeCart')) },
  { path: '/orders', name: '訂單', component: React.lazy(() => import('views/HomeOrders')) },
  { path: '/feedback', name: '客訴表單', component: React.lazy(() => import('views/HomeFeedback')) },
]

function Home (props) {
  console.log('home', props)
  return (
    <Suspense fallback='Loading...'>
      {navigations.map((navigation, index) => (
        <Link key={index} to={navigation.path} style={{ padding: 20 }}>
          {navigation.name}
        </Link>
      ))}

      <Switch>
        {navigations.map((navigation, index) => (
          <Route key={index} strict sensetive path={navigation.path} component={navigation.component} />
        ))}

        <Redirect to={navigations[0].path} />
      </Switch>
    </Suspense>
  )
}

Home.propTypes = propTypes

export default Home
