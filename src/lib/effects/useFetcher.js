import { useEffect, useState, useReducer } from 'react'

const actionTypes = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
}

const initialState = {
  status: {
    isLoaded: false,
    isFetching: false,
  },
  response: { data: {} },
  error: null,
}

const reducer = (state, { type, response, error }) => {
  switch (type) {
    case actionTypes.FETCH_REQUEST:
      return { ...state, status: { ...state.status, isFetching: true } }

    case actionTypes.FETCH_SUCCESS:
      return { ...state, status: { isFetching: false, isLoaded: true }, response }

    case actionTypes.FETCH_FAILURE:
      return { ...state, status: { isFetching: false, isLoaded: false }, error }

    default:
      return state
  }
}

const useFetcher = ({ fetcher, enableReinitialize = false, initialParameters = {} } = {}) => {
  const [parameters, setParameters] = useState(initialParameters)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let didCancel = false
    const fetchData = async () => {
      dispatch({ type: actionTypes.FETCH_REQUEST })

      try {
        const response = await fetcher(parameters)

        if (!didCancel) {
          dispatch({ type: actionTypes.FETCH_SUCCESS, response })
        }
      } catch (error) {
        console.error(error)

        if (!didCancel) {
          dispatch({ type: actionTypes.FETCH_FAILURE, error })
        }
      }
    }

    fetchData()

    return () => (didCancel = true)
  }, [fetcher, parameters])

  useEffect(() => {
    if (enableReinitialize) {
      setParameters(initialParameters)
    }
  }, [enableReinitialize, initialParameters])

  const updateParameters = (newParameters = {}) => setParameters({ ...parameters, ...newParameters })

  return [state.response, state.status, updateParameters, state.error]
}

export default useFetcher
