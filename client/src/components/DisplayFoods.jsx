import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../context/Context'
import FoodCard from './FoodCard';

export default function DisplayFoods() {

  const { fooditems } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = searchTerm ? fooditems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : fooditems;



  return (
    <div className='container mt-5'>
      <div className="row">

        <div className="col-12">
          <h1 className="text-center mb-3">Explore menu</h1>
          <div className="m-auto p-3">
            <form className="w-75 m-auto" >
              <div className="input-group">

                <input className="form-control w-75 border border-3" type="search" placeholder="Search Foods Here..." aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="btn text-white bg-danger" type="button"><i className="bi bi-search"></i> </button>
              </div>
            </form>

          </div>
        </div>


        {filteredItems.length > 0
          ?
          filteredItems.map((item, index) => {
            return <FoodCard key={index} item={item} />
          })
          :
          (<div className="text-center mt-5 mb-5">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status"></div>
            <p>Loading...</p>
          </div>
          )
        }
      </div>
    </div>
  )
}
