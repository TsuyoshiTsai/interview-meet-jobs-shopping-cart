import React, { useContext } from 'react'

import * as CartApi from 'lib/api/cart'
import useFetcher from 'lib/effects/useFetcher'

const Context = React.createContext({})

function Provider (props) {
  const [response, status, updateParameters] = useFetcher({ fetcher: CartApi.fetchCart })

  const context = { response, status, updateParameters }

  return <Context.Provider value={context} {...props} />
}

function useCart () {
  const { response, updateParameters } = useContext(Context)

  return [response.data, updateParameters]
}

export { Provider }
export default useCart
