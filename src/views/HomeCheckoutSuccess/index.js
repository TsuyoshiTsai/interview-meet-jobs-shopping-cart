import React from 'react'
import { Link } from 'react-router-dom'

function HomeCheckoutSuccess () {
  return (
    <>
      <div>購買成功</div>

      <Link to='/'>繼續購買</Link>
    </>
  )
}

export default HomeCheckoutSuccess
