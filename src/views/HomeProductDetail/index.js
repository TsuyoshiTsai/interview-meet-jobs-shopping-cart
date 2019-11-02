import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import * as ProductApi from 'lib/api/product'
import withFetching from 'lib/hocs/withFetching'
import useFetcher from 'lib/effects/useFetcher'

const FragmentWithFetching = withFetching(Fragment)

function HomeProductDetail () {
  const params = useParams()
  const [productResponse, status] = useFetcher({ fetcher: ProductApi.fetchProductDetail, initialParameters: { id: params.id } })

  return (
    <FragmentWithFetching
      {...status}
      render={() => (
        <div>
          <div>{productResponse.data.name}</div>
          <div>{productResponse.data.inventory}</div>
          <div>{productResponse.data.unit}</div>
          <div>{productResponse.data.price}</div>
        </div>
      )}
    />
  )
}

export default HomeProductDetail
