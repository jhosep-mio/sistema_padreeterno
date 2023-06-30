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

// PRODUCTOS
export const ScheamaProductos = Yup.object().shape({
  nombre: Yup.string().required('El campo es requerido'),
  descripcion: Yup.string().required('El campo es requerido'),
  idCategoria: Yup.number().required('El campo es requerido'),
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
