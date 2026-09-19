import React, { useEffect, useMemo, useState } from 'react';
import '../styles/empleado/productos.css';

import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

const productosIniciales = [
  {
    id: 1,
    nombre: 'Jabón Karité',
    categoria: 'Cuidado personal',
    precio: 18000,
    stock: 15,
  },
  {
    id: 2,
    nombre: 'Vela Aromática Lavanda',
    categoria: 'Decoración',
    precio: 22000,
    stock: 8,
  },
  {
    id: 3,
    nombre: 'Silla Mod. A',
    categoria: 'Mobiliario',
    precio: 145000,
    stock: 4,
  },
  {
    id: 4,
    nombre: 'Crema Corporal Aloe',
    categoria: 'Cuidado personal',
    precio: 28000,
    stock: 12,
  },
  {
    id: 5,
    nombre: 'Cojín Tapizado',
    categoria: 'Decoración',
    precio: 35000,
    stock: 3,
  },
  {
    id: 6,
    nombre: 'Difusor de Aromas',
    categoria: 'Aromas',
    precio: 32000,
    stock: 10,
  },
  {
    id: 7,
    nombre: 'Banco Auxiliar',
    categoria: 'Mobiliario',
    precio: 95000,
    stock: 6,
  },
];

function ProductosEmpleado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [productos, setProductos] = useState(productosIniciales);

  const [busqueda, setBusqueda] = useState('');

  const [modal, setModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [productoActual, setProductoActual] = useState(null);

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const [toast, setToast] = useState('');

  // ==========================
  // FONT AWESOME
  // ==========================
  useEffect(() => {
    const existe = document.querySelector(
      'link[data-luckypay-fontawesome]'
    );

    if (!existe) {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.href =
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';

      link.setAttribute(
        'data-luckypay-fontawesome',
        'true'
      );

      document.head.appendChild(link);
    }
  }, []);

  // ==========================
  // TOAST
  // ==========================
  const mostrarToast = (mensaje) => {
    setToast(mensaje);

    setTimeout(() => {
      setToast('');
    }, 2500);
  };

  // ==========================
  // NAVEGACIÓN
  // ==========================
  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  // ==========================
  // CERRAR SESIÓN
  // ==========================
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');

    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');

    window.location.href = '/';
  };

  // ==========================
  // FILTRO DE PRODUCTOS
  // ==========================
  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    if (!texto) {
      return productos;
    }

    return productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto)
    );
  }, [productos, busqueda]);

  // ==========================
  // ESTADÍSTICAS
  // ==========================
  const disponibles = productos.filter(
    (producto) => producto.stock > 0
  ).length;

  const stockBajo = productos.filter(
    (producto) =>
      producto.stock > 0 &&
      producto.stock <= 5
  ).length;

  const valorInventario = productos.reduce(
    (total, producto) =>
      total +
      producto.precio *
        producto.stock,
    0
  );

  // ==========================
  // FORMATO DE PRECIO
  // ==========================
  const formatearPrecio = (valor) => {
    return `$${Number(valor).toLocaleString('es-CO')}`;
  };

  // ==========================
  // NUEVO PRODUCTO
  // ==========================
  const abrirNuevo = () => {
    setModoEdicion(false);
    setProductoActual(null);

    setNombre('');
    setCategoria('');
    setPrecio('');
    setStock('');

    setModal(true);
  };

  // ==========================
  // EDITAR PRODUCTO
  // ==========================
  const abrirEditar = (producto) => {
    setModoEdicion(true);
    setProductoActual(producto);

    setNombre(producto.nombre);
    setCategoria(producto.categoria);
    setPrecio(producto.precio);
    setStock(producto.stock);

    setModal(true);
  };

  // ==========================
  // CERRAR MODAL
  // ==========================
  const cerrarModal = () => {
    setModal(false);
    setProductoActual(null);
  };

  // ==========================
  // GUARDAR PRODUCTO
  // ==========================
  const guardarProducto = () => {
    if (
      !nombre.trim() ||
      !categoria.trim() ||
      precio === '' ||
      stock === ''
    ) {
      mostrarToast(
        'Completa todos los campos.'
      );
      return;
    }

    const precioNumero = Number(precio);
    const stockNumero = Number(stock);

    if (
      Number.isNaN(precioNumero) ||
      precioNumero < 0 ||
      Number.isNaN(stockNumero) ||
      stockNumero < 0
    ) {
      mostrarToast(
        'Ingresa valores válidos.'
      );
      return;
    }

    // EDITAR
    if (
      modoEdicion &&
      productoActual
    ) {
      setProductos((anteriores) =>
        anteriores.map((producto) =>
          producto.id ===
          productoActual.id
            ? {
                ...producto,
                nombre:
                  nombre.trim(),
                categoria:
                  categoria.trim(),
                precio:
                  precioNumero,
                stock:
                  stockNumero,
              }
            : producto
        )
      );

      mostrarToast(
        'Producto actualizado correctamente.'
      );
    }

    // NUEVO
    else {
      const nuevoProducto = {
        id: Date.now(),
        nombre: nombre.trim(),
        categoria:
          categoria.trim(),
        precio: precioNumero,
        stock: stockNumero,
      };

      setProductos((anteriores) => [
        ...anteriores,
        nuevoProducto,
      ]);

      mostrarToast(
        'Producto registrado correctamente.'
      );
    }

    cerrarModal();
  };

  // ==========================
  // ELIMINAR PRODUCTO
  // ==========================
  const eliminarProducto = (
    producto
  ) => {
    const confirmar =
      window.confirm(
        `¿Deseas eliminar "${producto.nombre}"?`
      );

    if (!confirmar) {
      return;
    }

    setProductos((anteriores) =>
      anteriores.filter(
        (item) =>
          item.id !== producto.id
      )
    );

    mostrarToast(
      'Producto eliminado correctamente.'
    );
  };

  // ==========================
  // ESTADO DEL PRODUCTO
  // ==========================
  const obtenerEstado = (
    stockProducto
  ) => {
    if (stockProducto <= 0) {
      return {
        texto: 'Agotado',
        clase: 'agotado',
      };
    }

    if (stockProducto <= 5) {
      return {
        texto: 'Stock bajo',
        clase: 'bajo',
      };
    }

    return {
      texto: 'Disponible',
      clase: 'disponible',
    };
  };

  return (
    <div className="productos-empleado-app">

      {/* ==========================
          NAVBAR
      ========================== */}
      <header className="panel-navbar">

        <div className="navbar-left">

          <button
            type="button"
            className={`menu-btn ${
              menuAbierto
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setMenuAbierto(
                (estado) =>
                  !estado
              )
            }
            aria-label={
              menuAbierto
                ? 'Cerrar menú'
                : 'Abrir menú'
            }
          >
            {menuAbierto ? (
              <i className="fas fa-xmark"></i>
            ) : (
              <>
                <span></span>
                <span></span>
                <span></span>
              </>
            )}
          </button>

          <div className="brand">

            <img
              src={logo}
              alt="LuckyPay"
            />

            <span>
              LuckyPay
            </span>

          </div>

        </div>

        <div className="welcome">

          <div className="welcome-text">

            <strong>
              Bienvenido, Empleado
            </strong>

            <span>
              Gestión de productos
            </span>

          </div>

          <button
            type="button"
            className="logout-btn"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </header>

      {/* ==========================
          OVERLAY
      ========================== */}
      {menuAbierto && (
        <div
          className="menu-overlay"
          onClick={() =>
            setMenuAbierto(false)
          }
        ></div>
      )}

      {/* ==========================
          SIDEBAR
      ========================== */}
      {menuAbierto && (
        <aside className="panel-sidebar">

          <div className="sidebar-header">

            <span className="sidebar-title">
              Menú
            </span>

          </div>

          <nav className="sidebar-nav">

            {/* INICIO */}
            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar(
                  '/empleado'
                )
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-home"></i>
              </span>

              <span>
                Inicio
              </span>

            </button>

            {/* INSUMOS */}
            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar(
                  '/empleado/insumos'
                )
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-box"></i>
              </span>

              <span>
                Insumos
              </span>

            </button>

            {/* PRODUCTOS */}
            <button
              type="button"
              className="sidebar-item active"
              onClick={() =>
                setMenuAbierto(false)
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-cube"></i>
              </span>

              <span>
                Productos
              </span>

            </button>

            {/* COSTOS */}
            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar(
                  '/empleado/costos'
                )
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-dollar-sign"></i>
              </span>

              <span>
                Costos
              </span>

            </button>

            {/* REPORTES */}
            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar(
                  '/empleado/reportes'
                )
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-file-alt"></i>
              </span>

              <span>
                Reportes
              </span>

            </button>

          </nav>

          <div className="sidebar-separator"></div>

          <div className="sidebar-bottom">

            <button
              type="button"
              className="sidebar-logout"
              onClick={cerrarSesion}
            >
              <i className="fas fa-sign-out-alt"></i>

              <span>
                Cerrar sesión
              </span>

            </button>

          </div>

        </aside>
      )}

      {/* ==========================
          CONTENIDO PRINCIPAL
      ========================== */}
      <main className="panel-main">

        {/* ENCABEZADO */}
        <section className="productos-heading">

          <div>

            <span className="eyebrow">
              MÓDULO EMPLEADO
            </span>

            <h1>
              Productos
            </h1>

            <p>
              Consulta y gestiona los
              productos disponibles.
            </p>

          </div>

          <button
            type="button"
            className="producto-primary-btn"
            onClick={abrirNuevo}
          >
            <i className="fas fa-plus"></i>

            Nuevo producto

          </button>

        </section>

        {/* ==========================
            ESTADÍSTICAS
        ========================== */}
        <section className="productos-stats">

          {/* PRODUCTOS */}
          <div className="producto-stat-card">

            <div className="producto-stat-icon">
              <i className="fas fa-cube"></i>
            </div>

            <div>

              <span>
                PRODUCTOS
              </span>

              <strong>
                {productos.length}
              </strong>

              <small>
                Registrados
              </small>

            </div>

          </div>

          {/* DISPONIBLES */}
          <div className="producto-stat-card">

            <div className="producto-stat-icon">
              <i className="fas fa-circle-check"></i>
            </div>

            <div>

              <span>
                DISPONIBLES
              </span>

              <strong>
                {disponibles}
              </strong>

              <small>
                Con stock
              </small>

            </div>

          </div>

          {/* STOCK BAJO */}
          <div className="producto-stat-card">

            <div className="producto-stat-icon warning">
              <i className="fas fa-triangle-exclamation"></i>
            </div>

            <div>

              <span>
                STOCK BAJO
              </span>

              <strong>
                {stockBajo}
              </strong>

              <small>
                Requieren atención
              </small>

            </div>

          </div>

          {/* INVENTARIO */}
          <div className="producto-stat-card">

            <div className="producto-stat-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>

            <div>

              <span>
                INVENTARIO
              </span>

              <strong>
                {formatearPrecio(
                  valorInventario
                )}
              </strong>

              <small>
                Valor estimado
              </small>

            </div>

          </div>

        </section>

        {/* ==========================
            PANEL DE PRODUCTOS
        ========================== */}
        <section className="productos-panel">

          <div className="productos-panel-header">

            <div>

              <span>
                INVENTARIO
              </span>

              <h2>
                <i className="fas fa-boxes-stacked"></i>

                Lista de productos

              </h2>

              <p>
                Productos registrados
                en LuckyPay.
              </p>

            </div>

            <div className="productos-busqueda">

              <i className="fas fa-search"></i>

              <input
                type="text"
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
                placeholder="Buscar producto..."
              />

            </div>

          </div>

          {/* TABLA */}
          <div className="productos-tabla-wrap">

            <table className="productos-tabla">

              <thead>

                <tr>
                  <th>
                    Producto
                  </th>

                  <th>
                    Categoría
                  </th>

                  <th>
                    Precio
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Estado
                  </th>

                  <th>
                    Acciones
                  </th>
                </tr>

              </thead>

              <tbody>

                {productosFiltrados.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="productos-vacio"
                    >

                      <i className="fas fa-box-open"></i>

                      <strong>
                        No se encontraron
                        productos
                      </strong>

                      <span>
                        Intenta con otra
                        búsqueda.
                      </span>

                    </td>

                  </tr>

                ) : (

                  productosFiltrados.map(
                    (producto) => {

                      const estado =
                        obtenerEstado(
                          producto.stock
                        );

                      return (
                        <tr
                          key={
                            producto.id
                          }
                        >

                          {/* PRODUCTO */}
                          <td>

                            <div className="producto-nombre">

                              <div className="producto-icon">

                                <i className="fas fa-cube"></i>

                              </div>

                              <strong>
                                {
                                  producto.nombre
                                }
                              </strong>

                            </div>

                          </td>

                          {/* CATEGORÍA */}
                          <td>

                            <span className="producto-categoria">
                              {
                                producto.categoria
                              }
                            </span>

                          </td>

                          {/* PRECIO */}
                          <td>

                            <strong className="producto-precio">

                              {formatearPrecio(
                                producto.precio
                              )}

                            </strong>

                          </td>

                          {/* STOCK */}
                          <td>

                            <strong>
                              {
                                producto.stock
                              }
                            </strong>

                          </td>

                          {/* ESTADO */}
                          <td>

                            <span
                              className={`producto-badge ${estado.clase}`}
                            >
                              {
                                estado.texto
                              }
                            </span>

                          </td>

                          {/* ACCIONES */}
                          <td>

                            <div className="producto-acciones">

                              <button
                                type="button"
                                className="accion editar"
                                onClick={() =>
                                  abrirEditar(
                                    producto
                                  )
                                }
                                title="Editar"
                              >
                                <i className="fas fa-pen"></i>
                              </button>

                              <button
                                type="button"
                                className="accion eliminar"
                                onClick={() =>
                                  eliminarProducto(
                                    producto
                                  )
                                }
                                title="Eliminar"
                              >
                                <i className="fas fa-trash"></i>
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* ==========================
            FOOTER
        ========================== */}
        <footer className="empleado-footer">

          © 2026 <strong>LuckyPay</strong> —
          Controla tu Negocio, Crece con Confianza

        </footer>

      </main>

      {/* ==========================
          MODAL
      ========================== */}
      {modal && (

        <div
          className="producto-modal-overlay"
          onClick={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              cerrarModal();
            }

          }}
        >

          <div className="producto-modal">

            {/* CABECERA */}
            <div className="producto-modal-head">

              <div>

                <span>
                  {modoEdicion
                    ? 'EDITAR'
                    : 'NUEVO'}
                </span>

                <h2>

                  {modoEdicion
                    ? 'Editar producto'
                    : 'Nuevo producto'}

                </h2>

              </div>

              <button
                type="button"
                onClick={
                  cerrarModal
                }
                aria-label="Cerrar"
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            {/* CUERPO */}
            <div className="producto-modal-body">

              <label>
                Nombre del producto
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(e) =>
                  setNombre(
                    e.target.value
                  )
                }
                placeholder="Ej: Jabón Karité"
              />

              <label>
                Categoría
              </label>

              <input
                type="text"
                value={categoria}
                onChange={(e) =>
                  setCategoria(
                    e.target.value
                  )
                }
                placeholder="Ej: Cuidado personal"
              />

              <div className="producto-form-grid">

                <div>

                  <label>
                    Precio
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={precio}
                    onChange={(e) =>
                      setPrecio(
                        e.target.value
                      )
                    }
                    placeholder="0"
                  />

                </div>

                <div>

                  <label>
                    Stock
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) =>
                      setStock(
                        e.target.value
                      )
                    }
                    placeholder="0"
                  />

                </div>

              </div>

            </div>

            {/* FOOTER MODAL */}
            <div className="producto-modal-footer">

              <button
                type="button"
                className="producto-btn-sec"
                onClick={
                  cerrarModal
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="producto-btn-pri"
                onClick={
                  guardarProducto
                }
              >

                <i className="fas fa-save"></i>

                {modoEdicion
                  ? 'Guardar cambios'
                  : 'Registrar'}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* ==========================
          TOAST
      ========================== */}
      {toast && (

        <div className="productos-toast">

          <i className="fas fa-circle-check"></i>

          <span>
            {toast}
          </span>

        </div>

      )}

    </div>
  );
}

export default ProductosEmpleado;