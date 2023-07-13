import * as Yup from 'yup'

export const SchemaBrief = Yup.object().shape({
  nombres: Yup.string().required('Este campo es requerido').min(1),
  email: Yup.string()
    .email('Email invalido')
    .required('Este campo es requerido'),
  celular: Yup.string()
    .required('Este campo es requerido')
    .min(9, 'El numero debe tener 9 digitos')
    .max(9, 'El numero debe tener 9 digitos')
})
// CATEGORIAS
export const SchemaCategorias = Yup.object().shape({
  nombre: Yup.string().required('Este campo es requerido').min(1)
})

// DISTRITOS
export const SchemaDistrito = Yup.object().shape({
  nombre: Yup.string().required('Este campo es requerido').min(1),
  precio: Yup.string().required('Este campo es requerido').min(1),
  id_departamento: Yup.string().required('Este campo es requerido').min(1)
})

// PRODUCTOS
export const ScheamaProductos = Yup.object().shape({
  nombre: Yup.string().required('El campo es requerido'),
  descripcion: Yup.string().required('El campo es requerido'),
  idCategoria: Yup.number().required('El campo es requerido'),
  precio: Yup.number().required('El campo es requerido').positive('El valor no puede ser negativo'),
  cantidad: Yup.number().required('El campo es requerido').positive('El valor no puede ser negativo'),
  oferta: Yup.number().required('El campo es requerido').positive('El valor no puede ser negativo'),
  favoritos: Yup.string().required('El campo es requerido')
})

// PRIMERASECCION
export const ScheamaPrimeraSeccion = Yup.object().shape({
  nombre: Yup.string().required('El campo es requerido'),
  descripcion: Yup.string().required('El campo es requerido')
})

// SEGUNDA SECCION
export const ScheamaSegundaSeccion = Yup.object().shape({
  titulo: Yup.string().required('El campo es requerido'),
  descripcion: Yup.string().required('El campo es requerido')
})

// VALORES
export const ScheamaValores = Yup.object().shape({
  titulo: Yup.string().required('El campo es requerido')
})

// VALORES
export const SchemaValores = Yup.object().shape({
  mapa: Yup.string().required('El campo es requerido'),
  mapa2: Yup.string().required('El campo es requerido')
})

// CONFIGURACION
export const SchemaConfiguracion = Yup.object().shape({
  telefono: Yup.number().required('El campo es requerido'),
  celular1: Yup.number().required('El campo es requerido'),
  celular2: Yup.number().nullable(),
  correo1: Yup.string().email('Digite un email valido').required('El campo es requerido'),
  correo2: Yup.string().email('Digite un email valido').nullable(),
  horario1: Yup.string().required('El campo es requerido'),
  horario2: Yup.string().required('El campo es requerido'),
  direccion: Yup.string().required('El campo es requerido'),
  facebook: Yup.string().nullable(),
  instagram: Yup.string().nullable(),
  twiter: Yup.string().nullable(),
  linkedin: Yup.string().nullable(),
  youtube: Yup.string().nullable(),
  whatsapp: Yup.string().nullable()
})

// VALORES
export const ScheamaBanner = Yup.object().shape({
  titulo: Yup.string().required('El campo es requerido'),
  subTitulo: Yup.string().required('El campo es requerido')
})

// TRANSACCIONES

export const SchemaTransacciones = Yup.object().shape({
  id_transaccion: Yup.number().required('El campo es requerido'),
  nombres: Yup.string().required('El campo es requerido'),
  apellidos: Yup.string().required('El campo es requerido'),
  status: Yup.string().required('El campo es requerido'),
  tipo: Yup.string().required('El campo es requerido'),
  order_id: Yup.string().required('El campo es requerido'),
  email: Yup.string().required('El campo es requerido'),
  celular: Yup.string().required('El campo es requerido'),
  comentario: Yup.string().nullable(),
  delivery: Yup.string().required('El campo es requerido'),
  total_pago: Yup.string().required('El campo es requerido'),
  array_productos: Yup.string().required('El campo es requerido'),
  estado: Yup.number().required('El campo es requerido')
})
