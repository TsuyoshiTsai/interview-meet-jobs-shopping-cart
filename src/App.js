import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const Home = React.lazy(() => import('./views/Home'))

function App () {
  return (
    <Suspense fallback='Loading...'>
      <Switch>
        <Route strict sensitive path='/' component={Home} />
      </Switch>
    </Suspense>
  )
}

export default App
