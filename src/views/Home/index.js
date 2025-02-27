import React, { Suspense } from 'react'
import { Switch, Link, Route, Redirect, useRouteMatch } from 'react-router-dom'

import useCart from 'lib/effects/useCart'

const HomeCart = React.lazy(() => import('views/HomeCart'))
const HomeCheckout = React.lazy(() => import('views/HomeCheckout'))
const HomeCheckoutSuccess = React.lazy(() => import('views/HomeCheckoutSuccess'))
const HomeFeedback = React.lazy(() => import('views/HomeFeedback'))
const HomeOrder = React.lazy(() => import('views/HomeOrder'))
const HomeProduct = React.lazy(() => import('views/HomeProduct'))
const HomeProductDetail = React.lazy(() => import('views/HomeProductDetail'))

function Home () {
  const [cart, updateCart] = useCart()
  const match = useRouteMatch()

  return (
    <>
      <div>
        <Link to={`${match.url}product`} style={{ padding: 20 }} onClick={updateCart}>
          商品列表
        </Link>
        <Link to={`${match.url}cart`} style={{ padding: 20 }} onClick={updateCart}>
          購物車 {cart.itemCount}
        </Link>
        <Link to={`${match.url}order`} style={{ padding: 20 }} onClick={updateCart}>
          訂單
        </Link>
        <Link to={`${match.url}feedback`} style={{ padding: 20 }} onClick={updateCart}>
          客訴表單
        </Link>
      </div>

      <Suspense fallback='Loading...'>
        <Switch>
          <Route strict sensitive path={`${match.url}product/:id`} component={HomeProductDetail} />
          <Route strict sensitive path={`${match.url}product`} component={HomeProduct} />
          <Route strict sensitive path={`${match.url}cart`} component={HomeCart} />
          <Route strict sensitive path={`${match.url}checkout/success`} component={HomeCheckoutSuccess} />
          <Route strict sensitive path={`${match.url}checkout`} component={HomeCheckout} />
          <Route strict sensitive path={`${match.url}order`} component={HomeOrder} />
          <Route strict sensitive path={`${match.url}feedback`} component={HomeFeedback} />

          <Redirect replace from={match.url} to={`${match.url}product`} />
        </Switch>
      </Suspense>
    </>
  )
}

export default Home
