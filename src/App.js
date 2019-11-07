import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Provider as CartProvider } from 'lib/effects/useCart'

const Admin = React.lazy(() => import('./views/Admin'))
const Home = React.lazy(() => import('./views/Home'))

function App () {
  return (
    <Suspense fallback='Loading...'>
      <Switch>
        <Route strict sensitive path='/admin' component={Admin} />
        <Route
          strict
          sensitive
          path='/'
          render={props => (
            <CartProvider>
              <Home {...props} />
            </CartProvider>
          )}
        />
      </Switch>
    </Suspense>
  )
}

export default App
