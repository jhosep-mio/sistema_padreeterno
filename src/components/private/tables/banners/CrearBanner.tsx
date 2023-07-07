import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { type ImagenState } from '../../../shared/Interfaces'
import { ImageUploader } from '../../../shared/ImageUploader'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import { useFormik } from 'formik'
import { ScheamaBanner } from '../../../shared/Schemas'

export const CrearBanner = (): JSX.Element => {
  const navigate = useNavigate()
  const { setTitle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [imagen1, setImagen1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')
  useEffect(() => {
    setTitle('Registrar Banner')
  }, [])

  const saveCategoria = async (): Promise<void> => {
    setLoading(true)
    const token = localStorage.getItem('token')
    const data = new FormData()

    data.append('titulo', values.titulo)
    data.append('subtitulo', values.subTitulo)

    if (imagen1.archivo != null) {
      data.append('imagen1', imagen1.archivo)
    }
    try {
      const respuesta = await axios.post(`${Global.url}/saveBanner`, data, {
        headers: {
          Authorization: `Bearer ${
            token !== null && token !== '' ? token : ''
          }`
        }
      })

      if (respuesta.data.status == 'success') {
        Swal.fire('Agregado correctamente', '', 'success')
        navigate('/admin/banners')
      } else {
        Swal.fire('Error ', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
    setLoading(false)
  }

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        titulo: '',
        subTitulo: ''
      },
      validationSchema: ScheamaBanner,
      onSubmit: saveCategoria
    })

  return (
    <>
      {loading
        ? (
        <Loading />
          )
        : (
        <form
          className="bg-secondary-100 p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
          <section className="w-full flex gap-2">
            <div className="w-full lg:relative mb-5">
              <TitleBriefs titulo="Titulo" />
              <InputsBriefs
                name="titulo"
                type="text"
                value={values.titulo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.titulo} touched={touched.titulo} />
            </div>
            <div className="w-full lg:relative mb-5">
              <TitleBriefs titulo="Subtitulo" />
              <InputsBriefs
                name="subTitulo"
                type="text"
                value={values.subTitulo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors errors={errors.subTitulo} touched={touched.subTitulo} />
            </div>
          </section>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Imagen<span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex  items-center gap-4">
              <ImageUploader
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                setImagen={setImagen1}
                clase="1"
              />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/banners"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </Link>
            <input
              type="submit"
              className="bg-green-500 text-black hover:bg-green-600 flex items-center gap-2 py-2 px-4 rounded-lg transition-colors cursor-pointer"
              value="Registrar"
            />
          </div>
        </form>
          )}
    </>
  )
}
