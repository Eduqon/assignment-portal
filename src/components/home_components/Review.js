import React from 'react'
import { FooterHome } from './footer_home'
import MegaMenu from './MegaMenu'
import Testomonial from './Testomonial'

export default function Review() {
  return (
    <>
    <MegaMenu />
    <div className="row p-0 m-0">
                <div className="col set-Back">
                        <h1 className='set-contact'>Reviews</h1>
                </div>
            </div>
        <Testomonial />
        <FooterHome />
    </>
  )
}
