const API_URL = 'http://localhost:3001';

/* =====================================================
   FUNCIÓN GENERAL
===================================================== */

const solicitud = async (url, opciones = {}) => {
  const respuesta = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...opciones,
  });

  if (!respuesta.ok) {
    throw new Error(
      `Error en la solicitud: ${respuesta.status}`
    );
  }

  return respuesta.json();
};


/* =====================================================
   USUARIOS
===================================================== */

export const obtenerUsuarios = () => {
  return solicitud('/usuarios');
};


/* =====================================================
   INSUMOS
===================================================== */

export const obtenerInsumos = () => {
  return solicitud('/insumos');
};

export const obtenerInsumo = (id) => {
  return solicitud(`/insumos/${id}`);
};

export const crearInsumo = (insumo) => {
  return solicitud('/insumos', {
    method: 'POST',
    body: JSON.stringify(insumo),
  });
};

export const actualizarInsumo = (id, insumo) => {
  return solicitud(`/insumos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(insumo),
  });
};

export const eliminarInsumo = (id) => {
  return solicitud(`/insumos/${id}`, {
    method: 'DELETE',
  });
};


/* =====================================================
   PRODUCTOS
===================================================== */

export const obtenerProductos = () => {
  return solicitud('/productos');
};

export const obtenerProducto = (id) => {
  return solicitud(`/productos/${id}`);
};

export const crearProducto = (producto) => {
  return solicitud('/productos', {
    method: 'POST',
    body: JSON.stringify(producto),
  });
};

export const actualizarProducto = (id, producto) => {
  return solicitud(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto),
  });
};

export const eliminarProducto = (id) => {
  return solicitud(`/productos/${id}`, {
    method: 'DELETE',
  });
};


/* =====================================================
   VENTAS
===================================================== */

export const obtenerVentas = () => {
  return solicitud('/ventas');
};

export const crearVenta = (venta) => {
  return solicitud('/ventas', {
    method: 'POST',
    body: JSON.stringify(venta),
  });
};


/* =====================================================
   GASTOS
===================================================== */

export const obtenerGastos = () => {
  return solicitud('/gastos');
};

export const crearGasto = (gasto) => {
  return solicitud('/gastos', {
    method: 'POST',
    body: JSON.stringify(gasto),
  });
};


/* =====================================================
   ESTADO DEL SERVIDOR
===================================================== */

export const comprobarConexion = async () => {
  try {
    const respuesta = await fetch(
      `${API_URL}/usuarios`
    );

    return respuesta.ok;
  } catch (error) {
    return false;
  }
};