import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <>
        <div className='d-flex justify-content-center  align-items-center vh-100'>
        <Spinner animation="grow" variant="light" />
        </div>
       
    </>
  )
}
