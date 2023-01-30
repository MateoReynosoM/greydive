import React, {useEffect, useState} from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import appFirebase from '../firebaseCredentials'
import './Responses.css'

const db = getFirestore(appFirebase)


const Reponses = () => {

    const [list, setList] = useState([]);

    useEffect(() =>{
        const getList = async () =>{
          try {
            const querySnapshot = await getDocs(collection(db, 'respuestas'))
            const docs = []
            querySnapshot.forEach((doc) =>{
              docs.push({...doc.data(), id:doc.id})
            })
            setList(docs)
          } catch (error) {
            console.log(error)
          }
        }
    
        getList()
      }, [list])
      

  return (
<div className='responses-container'>
        {
            list.map(lista =>{
                return(
                <div 
                className='responses-cards'
                key={lista.id}
                >            
                    <label className='label'>Nombre completo:</label>
                    <p className='p'> {lista.pregunta1.name} </p>
                                
                    <label className='label'>Correo electrónico:</label>
                    <p className='p'>{lista.pregunta2.name}</p>
                    
                    <label className='label'>Fecha de Nacimiento:</label>
                    <p className='p'>{lista.pregunta3.name}</p>
                
                    <label className='label'>Pais de orígen</label>
                    <p className='p'>{lista.pregunta4.name}</p>
                                 
                </div>
            )})
        }
    </div>
  
  )
}

export default Reponses;