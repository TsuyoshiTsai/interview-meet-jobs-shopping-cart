import React, { Fragment } from 'react'

import Product from 'components/Product'

import * as ProductApi from 'lib/api/product'
import withFetching from 'lib/hocs/withFetching'
import useFetcher from 'lib/effects/useFetcher'

const FragmentWithFetching = withFetching(Fragment)

function Products (props) {
  const [productResponse, status] = useFetcher({ fetcher: ProductApi.fetchProducts, initialParameters: { page: 1 } })

  return (
    <FragmentWithFetching
      {...status}
      render={() => (
        <Product.List>
          {productResponse.data.map((product, index) => (
            <Product.Item key={index} product={product} />
          ))}
        </Product.List>
      )}
    />
  )
}

export default Products
