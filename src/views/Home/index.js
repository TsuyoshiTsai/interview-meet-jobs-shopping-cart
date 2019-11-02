import React, { Suspense } from 'react'
import { Switch, Link, Route, Redirect, useRouteMatch } from 'react-router-dom'

function Home () {
  const match = useRouteMatch()

  return (
    <Suspense fallback='Loading...'>
      <Link to={`${match.url}product`}>商品列表</Link>
      <Link to={`${match.url}cart`}>購物車</Link>
      <Link to={`${match.url}orders`}>訂單</Link>
      <Link to={`${match.url}feedback`}>客訴表單</Link>

      <Switch>
        <Route strict sensitive path={`${match.url}product/:id`} component={React.lazy(() => import('views/HomeProductDetail'))} />
        <Route strict sensitive path={`${match.url}product`} component={React.lazy(() => import('views/HomeProduct'))} />
        <Route strict sensitive path={`${match.url}cart`} component={React.lazy(() => import('views/HomeCart'))} />
        <Route strict sensitive path={`${match.url}order`} component={React.lazy(() => import('views/HomeOrder'))} />
        <Route strict sensitive path={`${match.url}feedback`} component={React.lazy(() => import('views/HomeFeedback'))} />

        <Redirect replace from={match.url} to={`${match.url}product`} />
      </Switch>
    </Suspense>
  )
}

export default Home
