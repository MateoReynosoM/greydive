import React from 'react'
import jsonData from '../data/jsonData'
import FormData from './FormData'

const Data = () => {

  const handleOptions = (array) => {
     if(array.length > 0){
      array.map((val, ind)=>{
          return (
            <select key={ind} >
              {val}
            </select>
          )
      })
     }
  }

  return (
    <>
       {
        jsonData.map((val, ind)=>{
            return (
                <FormData 
                key={ind}
                type={val.type}
                label={val.label}
                name={val.name}
                required={val.required}
                options={()=> handleOptions(val.options)}
                />
            )
        })
       }
    </>
  )
}

export default Data