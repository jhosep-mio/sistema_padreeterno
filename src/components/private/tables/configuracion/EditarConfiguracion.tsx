import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'

export const EditarConfiguracion = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()

  useEffect(() => {
    setTitle('CONFIGURACION')
    getBanner()
  }, [])

  const upadateBanner = async (): Promise<void> => {
    setLoadingComponents(true)
    const data = new FormData()
    data.append('_method', 'PUT')

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateMarca/1`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
          }
        }
      )

      if (respuesta.data.status === 'success') {
        Swal.fire('Actualizado correctamente', '', 'success')
        navigate('/admin/marcas')
      } else {
        Swal.fire('Error al realizar la edicion', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const getBanner = async (): Promise<void> => {
    setLoadingComponents(true)
    await axios.get(`${Global.url}/oneConfi/1`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== '' ? `Bearer ${token}` : ''
        }`
      }
    })
    setLoadingComponents(false)
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    setValues,
    touched,
    handleBlur
  } = useFormik({
    initialValues: {
      nombre: '',
      descripcion: ''
    },
    validationSchema: ScheamaPrimeraSeccion,
    onSubmit: saveCategoria
  })

  return (
    <>
      {loadingComponents
        ? (
        <Loading />
          )
        : (
        <form
          className="bg-secondary-100 p-8 rounded-xl"
          onSubmit={() => {
            void upadateBanner()
          }}
        >

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/marcas"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Editar"
            />
          </div>
        </form>
          )}
    </>
  )
}
