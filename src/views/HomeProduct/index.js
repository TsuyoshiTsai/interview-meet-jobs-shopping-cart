import React, { Fragment } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Product from 'components/Product'

import * as ProductApi from 'lib/api/product'
import withFetching from 'lib/hocs/withFetching'
import useFetcher from 'lib/effects/useFetcher'

const FragmentWithFetching = withFetching(Fragment)

function HomeProduct (props) {
  const [productResponse, status] = useFetcher({ fetcher: ProductApi.fetchProducts, initialParameters: { page: 1 } })
  const match = useRouteMatch()

  return (
    <FragmentWithFetching
      {...status}
      render={() => (
        <Product.List>
          {productResponse.data.map((product, index) => (
            <Link key={index} to={`${match.url}/${product.id}`}>
              <Product.Item product={product} />
            </Link>
          ))}
        </Product.List>
      )}
    />
  )
}

export default HomeProduct
