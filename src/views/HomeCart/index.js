import React, { Fragment } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Product from 'components/Product'

import * as CartApi from 'lib/api/cart'
import useFetcher from 'lib/effects/useFetcher'
import withFetching from 'lib/hocs/withFetching'

const FragmentWithFetching = withFetching(Fragment)

function HomeCart () {
  const [cartResponse, cartStatus] = useFetcher({ fetcher: CartApi.fetchCart })

  const match = useRouteMatch()
  const replacedUrl = match.url.replace('cart', '')

  return (
    <FragmentWithFetching
      {...cartStatus}
      render={() => {
        return cartResponse.data.orderProducts.length > 0 ? (
          <>
            <Product.List>
              {cartResponse.data.orderProducts.map((orderProduct, index) => (
                <Product.Item key={index} toPath={`${replacedUrl}product/${orderProduct.productId}`} product={orderProduct} />
              ))}
            </Product.List>

            <div>小計：{cartResponse.data.amount}</div>

            <Link to={`${replacedUrl}checkout`}>去買單</Link>
          </>
        ) : (
          <>
            <div>您還沒有購買任何商品</div>

            <Link to={`${replacedUrl}product`}>去買東西</Link>
          </>
        )
      }}
    />
  )
}

export default HomeCart
