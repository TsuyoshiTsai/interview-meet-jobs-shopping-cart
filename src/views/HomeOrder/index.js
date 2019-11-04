import React, { Fragment } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import OrderProduct from 'components/OrderProduct'

import * as OrderApi from 'lib/api/order'
import useFetcher from 'lib/effects/useFetcher'
import withFetching from 'lib/hocs/withFetching'
import * as formatter from 'lib/utils/formatter'

const FragmentWithFetching = withFetching(Fragment)

function HomeOrder (props) {
  const [orderResponse, orderStatus] = useFetcher({ fetcher: OrderApi.fetchOrders })
  const match = useRouteMatch()
  const replacedUrl = match.url.replace('order', '')

  return (
    <FragmentWithFetching
      {...orderStatus}
      render={() => {
        return orderResponse.data.length > 0 ? (
          orderResponse.data.map((order, index) => (
            <div key={index} style={{ margin: 20, padding: '0 20px', border: '1px solid #eee' }}>
              <h3>
                訂單編號: {order.id} - 訂單總金額 <span style={{ color: 'red' }}>${formatter.amount(order.amount)}</span>
              </h3>

              <OrderProduct.List>
                {order.orderProducts.map((orderProduct, index) => (
                  <OrderProduct.Item key={index} orderProduct={orderProduct} isEditable={false} isRemovable={false}></OrderProduct.Item>
                ))}
              </OrderProduct.List>
            </div>
          ))
        ) : (
          <div style={{ padding: 20 }}>
            <div>您還沒有購買任何商品</div>

            <Link to={`${replacedUrl}product`}>去買東西</Link>
          </div>
        )
      }}
    />
  )
}

export default HomeOrder
