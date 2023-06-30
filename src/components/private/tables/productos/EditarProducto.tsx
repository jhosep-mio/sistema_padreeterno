import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'
import axios from 'axios'
import { Global } from '../../../../helper/Global'
import Swal from 'sweetalert2'
import { Loading } from '../../../shared/Loading'
import { useFormik } from 'formik'
import { TitleBriefs } from '../../../shared/TitleBriefs'
import { InputsBriefs } from '../../../shared/InputsBriefs'
import { Errors } from '../../../shared/Errors'
import {
  type productosValuesModificate,
  type ImagenState,
  type categoriasValues,
  type arrayValues
} from '../../../shared/Interfaces'
import { ScheamaProductos } from '../../../shared/Schemas'
import Editor from '../../../shared/Editar'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ImageUpdate } from '../../../shared/ImageUpdate'

export const EditarProducto = (): JSX.Element => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [array, setArray] = useState<arrayValues[]>([
    { id: null, medida: '', precio: '', cantidad: '', oferta: '' }
  ])
  const [categorias, setCategorias] = useState([])
  const [content, setContent] = useState('')
  const { setTitle, loadingComponents, setLoadingComponents } = useAuth()
  const [imagen1, setImagen1] = useState('')
  const [imagenNueva1, setImagenNueva1] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })

  const [boton1, setBoton1] = useState(false)
  const [url1, setUrl1] = useState('')
  const [imagen2, setImagen2] = useState('')
  const [imagenNueva2, setImagenNueva2] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton2, setBoton2] = useState(false)
  const [url2, setUrl2] = useState('')
  const [imagen3, setImagen3] = useState('')
  const [imagenNueva3, setImagenNueva3] = useState<ImagenState>({
    archivo: null,
    archivoName: ''
  })
  const [boton3, setBoton3] = useState(false)
  const [url3, setUrl3] = useState('')

  const [medida, setMedida] = useState('')
  const [precio, setPrecio] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [oferta, setOferta] = useState('')

  useEffect(() => {
    setLoadingComponents(true)
    setTitle('Editar Producto')
    Promise.all([getCategorias(), getProducto()]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

  const updateProducto = async (
    values: productosValuesModificate
  ): Promise<void> => {
    setLoadingComponents(true)
    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('id_categoria', values.idCategoria)
    data.append('nombre', values.nombre)
    data.append('descripcion', values.descripcion)
    if (imagenNueva1.archivo != null) {
      data.append('imagen1', imagenNueva1.archivo)
    }
    if (imagenNueva2.archivo != null) {
      data.append('imagen2', imagenNueva2.archivo)
    }
    if (imagenNueva3.archivo != null) {
      data.append('imagen3', imagenNueva3.archivo)
    }
    data.append('caracteristicas', content)
    data.append('array_costo', JSON.stringify(array))
    data.append('_method', 'PUT')

    try {
      const respuesta = await axios.post(
        `${Global.url}/updateProducto/${id ?? ''}}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              token !== null && token !== '' ? token : ''
            }`
          }
        }
      )

      if (respuesta.data.status === 'success') {
        Swal.fire('Actualizado correctamente', '', 'success')
        navigate('/admin/productos')
      } else {
        Swal.fire('Error ', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', '', 'error')
    }
    setLoadingComponents(false)
  }

  const getCategorias = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/allCategorias`, {
      headers: {
        Authorization: `Bearer ${token !== null && token !== '' ? token : ''}`
      }
    })
    setCategorias(request.data)
  }

  const getProducto = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneProducto/${id ?? ''}`, {
      headers: {
        Authorization: `Bearer ${
          token !== null && token !== '' ? `Bearer ${token}` : ''
        }`
      }
    })
    setValues({
      ...values,
      idCategoria: request.data.id_categoria,
      nombre: request.data.nombre,
      descripcion: request.data.descripcion
    })
    setImagen1(request.data.imagen1)
    setImagen2(request.data.imagen2)
    setImagen3(request.data.imagen3)

    setContent(request.data.caracteristicas)
    setArray(
      request.data.array_costo ? JSON.parse(request.data.array_costo) : ''
    )
  }

  const agregarArray = (): void => {
    if (medida && precio && cantidad && oferta) {
      setArray([
        ...array,
        { id: Date.now(), medida, precio, cantidad, oferta }
      ])
      setMedida('')
      setPrecio('')
      setCantidad('')
      setOferta('')
    } else {
      Swal.fire('Complete todos los campos', '', 'error')
    }
  }

  const eliminarArray = (id: number | null): void => {
    const nuevoArray = array.filter((peso) => peso.id !== id)
    setArray(nuevoArray)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number | null,
    fieldName: string
  ): void => {
    let value = e.target.value
    if (fieldName === 'estado') {
      value = String(parseInt(value, 10)) // Convertir el valor a una cadena
    }

    const updatedArray = array.map((pro: arrayValues) => {
      if (pro.id === id) {
        return { ...pro, [fieldName]: value }
      }
      return pro
    })
    setArray(updatedArray)
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    setValues
  } = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      idCategoria: ''
    },
    validationSchema: ScheamaProductos,
    onSubmit: updateProducto
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
          onSubmit={handleSubmit}
        >
          <div className="w-full lg:relative mb-5 flex flex-col justify-between gap-2">
            <TitleBriefs titulo="Nombre del producto" />
            <InputsBriefs
              name="nombre"
              type="text"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Errors errors={errors.nombre} touched={touched.nombre} />
          </div>

          <div className="w-full lg:relative mb-5 flex justify-between gap-5">
            <div className="w-1/2">
              <TitleBriefs titulo="Asignar categoria" />
              <select
                className="border border-black  placeholder-gray-400 outline-none focus:outline-none
                                                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-secondary-900
                                                      rounded-md transition-all"
                name="idCategoria"
                value={values.idCategoria}
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar</option>
                {categorias.map((categoria: categoriasValues) => (
                  <option value={categoria.id} key={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <Errors
                errors={errors.idCategoria}
                touched={touched.idCategoria}
              />
            </div>
            <div className="w-1/2">
              <TitleBriefs titulo="Desccripción corta" />
              <InputsBriefs
                name="descripcion"
                type="text"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Errors
                errors={errors.descripcion}
                touched={touched.descripcion}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-secondary-100 pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-10px]">
              Imagenes del producto<span className="text-red-500">*</span>
            </p>
            <div className="flex-1 flex  items-center gap-4">
              <ImageUpdate
                globalUrl="productos"
                url={url1}
                setUrl={setUrl1}
                boton={boton1}
                setBoton={setBoton1}
                imagen={imagen1}
                setImagen={setImagenNueva1}
                clase="1"
              />
              <ImageUpdate
                globalUrl="productos"
                url={url2}
                setUrl={setUrl2}
                boton={boton2}
                setBoton={setBoton2}
                imagen={imagen2}
                setImagen={setImagenNueva2}
                clase="2"
              />
              <ImageUpdate
                globalUrl="productos"
                url={url3}
                setUrl={setUrl3}
                boton={boton3}
                imagen={imagen3}
                setBoton={setBoton3}
                setImagen={setImagenNueva3}
                clase="3"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-0 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Costo del producto
            </p>
            <div className="flex-1 flex-col md:flex-row flex items-center gap-4 border-">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Medida, Talla, Color"
                  value={medida}
                  onChange={(e) => {
                    setMedida(e.target.value)
                  }}
                />
              </div>
              <div className="w-full">
                <input
                  type="number"
                  step={0.1}
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Precio"
                  value={precio}
                  onChange={(e) => {
                    setPrecio(e.target.value)
                  }}
                />
              </div>
              <div className="w-full">
                <input
                  type="number"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Cantidad"
                  value={cantidad}
                  onChange={(e) => {
                    setCantidad(e.target.value)
                  }}
                />
              </div>
              <div className="w-full">
                <input
                  type="number"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Oferta"
                  value={oferta}
                  onChange={(e) => {
                    setOferta(e.target.value)
                  }}
                />
              </div>
              <div className="w-full md:w-52">
                <button
                  type="button"
                  className="w-full bg-green-500 text-black hover:bg-primary justify-center flex items-center gap-2 py-2 px-4 rounded-lg transition-colors"
                  onClick={(): void => {
                    agregarArray()
                  }}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-secondary-100 py-4 md:p-8 rounded-xl mb-10">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-5 p-4">
              <h5 className="md:text-center">Medida</h5>
              <h5 className="md:text-center">Precio</h5>
              <h5 className="md:text-center">Cantidad</h5>
              <h5 className="md:text-center">Oferta</h5>
              <h5 className="md:text-center">Acciones</h5>
            </div>
            {array.map((pro) => (
              <div
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
                key={pro.id}
              >
                <div className="md:text-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Medida
                  </h5>
                  <input
                    className="line-clamp-1 bg-transparent border-none outline-none text-center w-full"
                    type="text"
                    value={pro.medida}
                    onChange={(e) => {
                      handleInputChange(e, pro.id, 'medida')
                    }}
                  />
                </div>
                <div className="md:text-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Precio
                  </h5>
                  <input
                    className="line-clamp-1 bg-transparent border-none outline-none text-center w-full"
                    type="number"
                    value={pro.precio}
                    onChange={(e) => {
                      handleInputChange(e, pro.id, 'precio')
                    }}
                  />
                </div>
                <div className="md:text-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Cantidad
                  </h5>
                  <input
                    className="line-clamp-1 bg-transparent border-none outline-none text-center w-full"
                    type="number"
                    value={pro.cantidad}
                    onChange={(e) => {
                      handleInputChange(e, pro.id, 'cantidad')
                    }}
                  />
                </div>
                <div className="md:text-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Oferta
                  </h5>
                  <input
                    className="line-clamp-1 bg-transparent border-none outline-none text-center w-full"
                    type="number"
                    value={pro.oferta}
                    onChange={(e) => {
                      handleInputChange(e, pro.id, 'oferta')
                    }}
                  />
                </div>

                <div className="md:text-center md:flex md:justify-center">
                  <h5 className="md:hidden text-white font-bold mb-2">
                    Acciones
                  </h5>
                  {array.length > 1 && (
                    <RiDeleteBin6Line
                      className="cursor-pointer"
                      onClick={() => {
                        eliminarArray(pro.id)
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-10 relative">
            <p className="bg-transparent pt-0 pb-0 lg:pl-2  mr-0 mb-0 font-medium text-white text-md lg:absolute py-2 rounded-md top-[-25px]">
              Detalle del producto
            </p>
            <div className="flex-1 w-full md:w-3/4">
              <Editor content={content} setContent={setContent} />
            </div>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <input type="hidden" name="oculto" value="1" />
            <Link
              to="/admin/productos"
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
