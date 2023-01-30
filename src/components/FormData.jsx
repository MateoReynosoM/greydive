import React, {useEffect, useState} from 'react'
import items from '../data/jsonData'
import { useNavigate } from 'react-router-dom'
import appFirebase from '../firebaseCredentials'
import { getFirestore, collection, addDoc } from 'firebase/firestore' 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
/* import '../Styles/formData.css' */
import Input from './Inputs'


const db = getFirestore(appFirebase)


const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('Requerido'),
  selectOption: Yup.string()
    .required('Seleccione una opcion'),
  date: Yup.string()
    .required('Requerido'),
  email: Yup.string()
    .email("Ingrese un email valido")
    .required('Requerido'),
  checkbox: Yup.boolean().default(false).required('Requerido')
})
console.log(ErrorMessage);

const itemsMap = items[3].options.map((e, ind) =>(
  <option key={ind} value={e.value}>{e.label}</option>
))

const FormData = () => {

  const navigate = useNavigate()

  

  const dataProperties = {
    pregunta1: {
      label: "Nombre completo",
      name: ''
    },
    pregunta2: {
      label: "Correo electrónico",
      name: ''
    },
    pregunta3: {
      label: "Fecha de nacimiento",
      name: ''
    },
    pregunta4: {
      label: "¿Cuál es tu país de origen?",
      name: ''
    },
  }

  const [click, setClick] = useState(false)
  const [data, setData] = useState(dataProperties);
  const validateData = data.pregunta1.name && true

  useEffect(()=>{  
    const aux = async () => {
      await addDoc(collection(db, 'respuestas'), {
        ...data
      });
    }
     validateData && aux()

  }, [data, validateData])

  const handleSubmit = async (values) => {
    
    setData({
      ...data,
      pregunta1: {...data.pregunta1, name: values.name},
      pregunta2: {...data.pregunta2, name: values.email},
      pregunta3: {...data.pregunta3, name: values.date},
      pregunta4: {...data.pregunta4, name: values.selectOption}
    }); 

      

}

  const handleRedirect = () => {
    setTimeout(() => {      
      window.confirm('Presione "Aceptar" para navegar a las respuestas') && navigate('/responses')
    }, 10);
  }

  const handleCheckbox = () => {
    setClick(!click)
  }

   

  const renderError = (message) => <p className="help is-danger">{message}</p>;
  
  return (
    <Formik
      initialValues={{ name: '',email:"", selectOption: '', date: '', checkbox: false }}
      validationSchema={FormSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input
          type='text'
          name='name'
          placeholder='Nombre completo'
          className='name'
          render={renderError}
          />

          <Input
          type='email'
          name='email'
          placeholder='Email'
          className='email'
          render={renderError}
          /> 

          <Input
          type='date'
          name='date'
          className='date'
          render={renderError}
          placeholder=''
          />


        <div>
          <Field as="select" name="selectOption">
          <option value={'default'}>Selecciona tu país</option>
            {itemsMap}            
          </Field>
          <ErrorMessage
          name='selectOption'
          render={renderError}
          />
        </div>

          <input type="checkbox" value={click} onChange={handleCheckbox} />
          <label htmlFor="checkbox">
            Acepto los terminos y condiciones 
          </label>
          {
            click &&
          <button 
          type="submit" 
          disabled={isSubmitting}
          onClick={handleRedirect}
          >
            Submit
          </button> 
          }
        </Form>
      )}
    </Formik>
  )
}

export default FormData
