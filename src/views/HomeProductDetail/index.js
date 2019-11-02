import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import Product from 'components/Product'

// import * as ProductApi from 'lib/api/product'
import withFetching from 'lib/hocs/withFetching'
// import useFetcher from 'lib/effects/useFetcher'

const FragmentWithFetching = withFetching(Fragment)

function HomeProductDetail (props) {
  // // const [productResponse, status] = useFetcher({ fetcher: ProductApi.fetchProducts, initialParameters: { page: 1 } })
  const params = useParams()

  return <FragmentWithFetching render={() => <Product.List>{params.id}</Product.List>} />
}

export default HomeProductDetail
