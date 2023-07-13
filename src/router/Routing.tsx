import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { Login } from '../components/public/Login'
import { PrivateLayout } from '../components/private/PrivateLayout'
import Home from '../components/private/tables/Home'
import { ListaBanners } from '../components/private/tables/banners/ListaBanners'
import { CrearBanner } from '../components/private/tables/banners/CrearBanner'
import { EditarBanner } from '../components/private/tables/banners/EditarBanner'
import { ListaCategorias } from '../components/private/tables/categorias/ListaCategorias'
import { CrearCategoria } from '../components/private/tables/categorias/CrearCategoria'
import { EditarCategoria } from '../components/private/tables/categorias/EditarCategoria'
import { ListaProductos } from '../components/private/tables/productos/ListaProductos'
import { CrearProducto } from '../components/private/tables/productos/CrearProducto'
import { EditarProducto } from '../components/private/tables/productos/EditarProducto'
import { EditarConfiguracion } from '../components/private/tables/configuracion/EditarConfiguracion'
import { ListaTransacciones } from '../components/private/tables/transacciones/ListaTransacciones'
import { EditarTransaccion } from '../components/private/tables/transacciones/EditarTransaccion'
import { ListaDepartamentos } from '../components/private/tables/departamentos/ListaDepartamentos'
import { CrearDepartamento } from '../components/private/tables/departamentos/CrearDepartamento'
import { EditarDepartamento } from '../components/private/tables/departamentos/EditarDepartamento'
import { ListaDistritos } from '../components/private/tables/distritos/ListaDistritos'
import { CrearDistrito } from '../components/private/tables/distritos/CrearDistrito'
import { EditarDistrito } from '../components/private/tables/distritos/EditarDistrito'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<PrivateLayout />}>
            <Route index element={<Home />} />
            {/* BANNERS */}
            <Route path="banners" element={<ListaBanners />} />
            <Route path="banners/agregar" element={<CrearBanner />} />
            <Route path="banners/editar/:id" element={<EditarBanner />} />
            {/* SECCIONUNO */}

            {/* CATEGORIAS */}
            <Route path="categorias" element={<ListaCategorias />} />
            <Route path="categorias/agregar" element={<CrearCategoria />} />
            <Route path="categorias/editar/:id" element={<EditarCategoria />} />
            {/* PRODUCTOS */}
            <Route path="productos" element={<ListaProductos />} />
            <Route path="productos/agregar" element={<CrearProducto />} />
            <Route path="productos/editar/:id" element={<EditarProducto />} />

            {/* CONFIGURACION */}
            <Route path="configuracion/:id" element={<EditarConfiguracion />} />
            <Route path="transacciones" element={<ListaTransacciones />} />
            <Route path="transacciones/viewTransaccion/:id" element={<EditarTransaccion />} />

            {/* DEPARTAMENTOS */}
            <Route path="departamentos" element={<ListaDepartamentos/>} />
            <Route path="departamentos/agregar" element={<CrearDepartamento/>} />
            <Route path="departamentos/editar/:id" element={<EditarDepartamento/>} />

            {/* DISTRITO */}
            <Route path="distritos" element={<ListaDistritos/>} />
            <Route path="distritos/agregar" element={<CrearDistrito/>} />
            <Route path="distritos/editar/:id" element={<EditarDistrito/>} />

          </Route>
          <Route path="*" element={<>Error 404</>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
