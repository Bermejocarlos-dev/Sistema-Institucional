import H2 from '@/components/system.h2'
import Main from '@/layouts/system.layouts'


import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


import { AiOutlineUser } from 'react-icons/ai'
import { addAdministrator } from '@/api/administrators.api'

export default function System_Administrators_Add() {

  const [fieldsValue, setFieldsValue] = useState({ name: '', surname: '', email: '', identificationCard: '' })

  const inputChange = ({ target }) => {

    const { name, value } = target;
    setFieldsValue({ ...fieldsValue, [name]: value })
  }

  const sendForm = async (e) => {

    e.preventDefault();

    const notification = toast.loading('Registrando...');
    const res = await addAdministrator(fieldsValue)

    res.data.status == 'success' ?
      toast.success(res.data.message, { id: notification }) :
      toast.error(res.data.message, { id: notification })
  }

  return (
    <Main>
      <H2 category={'Usuarios'} title={'Administradores'} />

      <div className='w-11/12 bg-white m-10 mt-10 p-10 rounded-3xl drop-shadow-sm dark:bg-dark-1'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-2xl'>Agregar Administrador</h2>
          <p className='text-gray-500'>Para registrar un nuevo Administrador, complete el siguiente formulario con los datos solicitado.</p>
        </div>
        
        <hr className='my-10 border-light-2 dark:border-dark-3' />

        <form className='py-10' onSubmit={sendForm}>
          <div className='flex items-center mb-8'>
            <div className='w-28 h-28 bg-light-2 flex justify-center items-center m-auto rounded-full text-blue-500 text-5xl' >
              <AiOutlineUser />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-y-6 gap-x-4'>
            <input type='text' name='name' value={fieldsValue.name} className='w-full bg-light-1 py-2 px-4 outline-none rounded-lg dark:bg-dark-3' onChange={inputChange} placeholder='Nombre(s)' />
            <input type='text' name='surname' value={fieldsValue.surname} className='w-full bg-light-1 py-2 px-4 outline-none rounded-lg dark:bg-dark-3' onChange={inputChange} placeholder='Apellido(s)' />

            <input type='text' name='email' value={fieldsValue.email} className='w-full bg-light-1 py-2 px-4 outline-none rounded-lg dark:bg-dark-3' onChange={inputChange} placeholder='Correo' />
            <input type='text' name='identificationCard' value={fieldsValue.identificationCard} className='w-full bg-light-1 py-2 px-4 outline-none rounded-lg' onChange={inputChange} placeholder='Documento de Identidad' />
          </div>

          <hr className='my-10 border-light-2 dark:border-dark-3' />

          <div className='flex justify-end'>
            <button type='submit' className='bg-blue-500 py-2 px-4 rounded-lg text-white duration-200 hover:bg-blue-700'>Registrar</button>
          </div>
        </form>
      </div>
    </Main>
  )
}