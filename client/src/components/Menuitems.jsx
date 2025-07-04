import React from 'react'
import { menulist } from '../assets/fooditems'

export default function Menuitems() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className='menu-container-total'>
                        <div className='d-flex flex-row justify-content-between menu-container mt-3'>
                            {

                                menulist.concat(menulist).map((item, index) => (
                                    <div key={index} className='m-3 menu-item'>
                                        <img src={item.url} alt={item.name} style={{ height: "160px",width:"160px" }} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
