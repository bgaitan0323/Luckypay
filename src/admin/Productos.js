
import React, { useMemo, useState } from 'react';
import '../styles/Productos.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

const PRODUCTOS_INICIALES = [
  {
    id: 1,
    nombre: 'Silla ergonómica mod. A',
    descripcion: 'Silla de oficina con soporte lumbar ajustable.',
    unidad: 'Unidad',
    manoObra: 85000,
    insumos: [
      {
        id: 1,
        nombre: 'Madera pino',
        cantidad: 2
      },
      {
        id: 2,
        nombre: 'Tela tapizado',
        cantidad: 1
      },
      {
        id: 3,
        nombre: 'Espuma relleno',
        cantidad: 1
      }
    ]
  },
  {
    id: 2,
    nombre: 'Mesa de trabajo',
    descripcion: 'Mesa industrial para taller o bodega.',
    unidad: 'Unidad',
    manoObra: 100000,
    insumos: [
      {
        id: 4,
        nombre: 'Madera pino',
        cantidad: 4
      },
      {
        id: 5,
        nombre: 'Tornillos acero',
        cantidad: 1
      },
      {
        id: 6,
        nombre: 'Barniz acabado',
        cantidad: 1
      }
    ]
  }
];

const INSUMOS_DISPONIBLES = [
  'Madera pino',
  'Tornillos acero',
  'Pintura base',
  'Tela tapizado',
  'Espuma relleno',
  'Barniz acabado'
];

function formatearCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(Number(valor) || 0);
}

function crearInsumoVacio() {
  return {
    id: Date.now() + Math.random(),
    nombre: '',
    cantidad: 1
  };
}

function Productos() {
  /* =====================================================
     ESTADOS
     ===================================================== */

  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);

  const [menuAbierto, setMenuAbierto] = useState(false);

  const [busqueda, setBusqueda] = useState('');

  const [modalAbierto, setModalAbierto] = useState(false);

  const [modalEliminar, setModalEliminar] = useState(false);

  const [productoEditar, setProductoEditar] = useState(null);

  const [productoEliminar, setProductoEliminar] = useState(null);

  const [mensaje, setMensaje] = useState('');

  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    unidad: 'Unidad',
    manoObra: '',
    insumos: []
  });

  /* =====================================================
     FILTRO
     ===================================================== */

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return productos;
    }

    return productos.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(texto) ||
        producto.descripcion.toLowerCase().includes(texto)
      );
    });
  }, [productos, busqueda]);

  /* =====================================================
     MENSAJE TEMPORAL
     ===================================================== */

  const mostrarMensaje = (texto) => {
    setMensaje(texto);

    window.setTimeout(() => {
      setMensaje('');
    }, 2500);
  };

  /* =====================================================
     NAVEGACION
     ===================================================== */

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  /* =====================================================
     CERRAR SESION
     ===================================================== */

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = '/';
  };

  /* =====================================================
     ABRIR CREAR
     ===================================================== */

  const abrirCrear = () => {
    setProductoEditar(null);

    setFormulario({
      nombre: '',
      descripcion: '',
      unidad: 'Unidad',
      manoObra: '',
      insumos: []
    });

    setModalAbierto(true);
  };

  /* =====================================================
     ABRIR EDITAR
     ===================================================== */

  const abrirEditar = (producto) => {
    setProductoEditar(producto);

    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      unidad: producto.unidad,
      manoObra: producto.manoObra,
      insumos: producto.insumos.map((insumo) => ({
        ...insumo
      }))
    });

    setModalAbierto(true);
  };

  /* =====================================================
     CERRAR MODAL
     ===================================================== */

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoEditar(null);
  };

  /* =====================================================
     CAMBIAR FORMULARIO
     ===================================================== */

  const cambiarCampo = (campo, valor) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor
    }));
  };

  /* =====================================================
     AGREGAR INSUMO
     ===================================================== */

  const agregarInsumo = () => {
    setFormulario((actual) => ({
      ...actual,
      insumos: [
        ...actual.insumos,
        crearInsumoVacio()
      ]
    }));
  };

  /* =====================================================
     ACTUALIZAR INSUMO
     ===================================================== */

  const actualizarInsumo = (id, campo, valor) => {
    setFormulario((actual) => ({
      ...actual,
      insumos: actual.insumos.map((insumo) => {
        if (insumo.id !== id) {
          return insumo;
        }

        return {
          ...insumo,
          [campo]: campo === 'cantidad'
            ? Number(valor)
            : valor
        };
      })
    }));
  };

  /* =====================================================
     ELIMINAR INSUMO
     ===================================================== */

  const eliminarInsumo = (id) => {
    setFormulario((actual) => ({
      ...actual,
      insumos: actual.insumos.filter(
        (insumo) => insumo.id !== id
      )
    }));
  };

  /* =====================================================
     GUARDAR PRODUCTO
     ===================================================== */

  const guardarProducto = (evento) => {
    evento.preventDefault();

    const nombre = formulario.nombre.trim();

    if (!nombre) {
      mostrarMensaje('Debes ingresar el nombre del producto.');
      return;
    }

    const manoObra = Number(formulario.manoObra) || 0;

    const insumosLimpios = formulario.insumos
      .filter((insumo) => insumo.nombre.trim() !== '')
      .map((insumo) => ({
        ...insumo,
        nombre: insumo.nombre.trim(),
        cantidad: Number(insumo.cantidad) || 1
      }));

    if (productoEditar) {
      setProductos((actuales) =>
        actuales.map((producto) => {
          if (producto.id !== productoEditar.id) {
            return producto;
          }

          return {
            ...producto,
            nombre,
            descripcion: formulario.descripcion.trim(),
            unidad: formulario.unidad,
            manoObra,
            insumos: insumosLimpios
          };
        })
      );

      cerrarModal();

      mostrarMensaje('Producto actualizado correctamente.');

      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      nombre,
      descripcion: formulario.descripcion.trim(),
      unidad: formulario.unidad,
      manoObra,
      insumos: insumosLimpios
    };

    setProductos((actuales) => [
      ...actuales,
      nuevoProducto
    ]);

    cerrarModal();

    mostrarMensaje('Producto creado correctamente.');
  };

  /* =====================================================
     ABRIR ELIMINAR
     ===================================================== */

  const abrirEliminar = (producto) => {
    setProductoEliminar(producto);
    setModalEliminar(true);
  };

  /* =====================================================
     CERRAR ELIMINAR
     ===================================================== */

  const cerrarEliminar = () => {
    setModalEliminar(false);
    setProductoEliminar(null);
  };

  /* =====================================================
     CONFIRMAR ELIMINAR
     ===================================================== */

  const confirmarEliminar = () => {
    if (!productoEliminar) {
      return;
    }

    setProductos((actuales) =>
      actuales.filter(
        (producto) => producto.id !== productoEliminar.id
      )
    );

    cerrarEliminar();

    mostrarMensaje('Producto eliminado correctamente.');
  };

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div className="productos-page">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <header className="productos-navbar">

        <div className="productos-navbar-left">

          {/* BOTON MENU */}

          <button
            type="button"
            className={`productos-menu ${
              menuAbierto ? 'active' : ''
            }`}
            onClick={() => {
              setMenuAbierto((estado) => !estado);
            }}
            aria-label={
              menuAbierto
                ? 'Cerrar menú'
                : 'Abrir menú'
            }
          >
            {menuAbierto ? (
              <span className="productos-menu-x">
                ×
              </span>
            ) : (
              <>
                <span></span>
                <span></span>
                <span></span>
              </>
            )}
          </button>

          {/* MARCA */}

          <div className="productos-brand">

            <img
              src={logo}
              alt="LuckyPay"
            />

            <div className="productos-brand-text">
              <div className="productos-brand-title">
                LuckyPay
              </div>

              <div className="productos-brand-subtitle">
                Gestión de productos
              </div>
            </div>

          </div>

        </div>

        <div className="productos-admin">

          <button
            type="button"
            className="productos-salir"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>

        </div>

      </header>

      {/* =================================================
          MENU LATERAL
          SOLO EXISTE CUANDO menuAbierto === true
          ================================================= */}

      {menuAbierto && (
        <>
          <div
            className="productos-overlay"
            onClick={() => {
              setMenuAbierto(false);
            }}
            aria-hidden="true"
          />

          <aside className="productos-sidebar">

            <div className="productos-sidebar-header">
              <span>
                MENÚ PRINCIPAL
              </span>
            </div>

            <nav className="productos-sidebar-menu">

              <button
                type="button"
                onClick={() => navegar('/panel')}
              >
                <span className="productos-menu-icon">
                  ⌂
                </span>

                Inicio
              </button>

              <button
                type="button"
                onClick={() => navegar('/insumos')}
              >
                <span className="productos-menu-icon">
                  ▤
                </span>

                Insumos
              </button>

              <button
                type="button"
                className="active"
              >
                <span className="productos-menu-icon">
                  ◆
                </span>

                Productos
              </button>

              <button
                type="button"
                onClick={() => navegar('/costos')}
              >
                <span className="productos-menu-icon">
                  $
                </span>

                Costos
              </button>

              <button
                type="button"
                onClick={() => navegar('/meta-ventas')}
              >
                <span className="productos-menu-icon">
                  ◎
                </span>

                Meta de Ventas
              </button>

              <button
                type="button"
                onClick={() => navegar('/usuarios')}
              >
                <span className="productos-menu-icon">
                  ♙
                </span>

                Usuarios y Roles
              </button>

              <button
                type="button"
                onClick={() => navegar('/analisis')}
              >
                <span className="productos-menu-icon">
                  ◔
                </span>

                Análisis
              </button>

              <button
                type="button"
                onClick={() => navegar('/reportes')}
              >
                <span className="productos-menu-icon">
                  ▤
                </span>

                Reportes
              </button>

              <button
                type="button"
                onClick={() => navegar('/auditoria')}
              >
                <span className="productos-menu-icon">
                  ☷
                </span>

                Auditoría
              </button>

              <button
                type="button"
                onClick={() => navegar('/configuracion')}
              >
                <span className="productos-menu-icon">
                  ⚙
                </span>

                Configuración
              </button>

            </nav>

            <div className="productos-sidebar-bottom">

              <button
                type="button"
                onClick={cerrarSesion}
              >
                <span className="productos-menu-icon">
                  ↪
                </span>

                Cerrar sesión
              </button>

            </div>

          </aside>
        </>
      )}

      {/* =================================================
          CONTENIDO
          ================================================= */}

      <main className="productos-main">

        <section className="productos-header">

          <span className="productos-label">
            INVENTARIO
          </span>

          <h1>
            ◆ Gestión de Productos
          </h1>

          <p>
            Registra los productos que fabricas,
            sus insumos y costos de producción.
          </p>

        </section>

        {/* =================================================
            CARD
            ================================================= */}

        <section className="productos-card">

          <div className="productos-section-header">

            <div>
              <h2>
                ▤ Productos registrados
              </h2>

              <p>
                Consulta, edita o elimina los productos
                del sistema.
              </p>
            </div>

            <button
              type="button"
              className="btn-producto-primary"
              onClick={abrirCrear}
            >
              + Nuevo producto
            </button>

          </div>

          {/* =================================================
              MENSAJE
              ================================================= */}

          {mensaje && (
            <div className="productos-mensaje">
              {mensaje}
            </div>
          )}

          {/* =================================================
              BUSCADOR
              ================================================= */}

          <div className="productos-search">

            <input
              type="text"
              value={busqueda}
              onChange={(evento) => {
                setBusqueda(evento.target.value);
              }}
              placeholder="Buscar producto por nombre..."
              aria-label="Buscar producto"
            />

          </div>

          {/* =================================================
              TABLA
              ================================================= */}

          <div className="productos-table-wrapper">

            <table className="productos-table">

              <thead>
                <tr>
                  <th>
                    Producto
                  </th>

                  <th>
                    Unidad
                  </th>

                  <th>
                    Insumos
                  </th>

                  <th>
                    Mano de obra
                  </th>

                  <th>
                    Costo total
                  </th>

                  <th>
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>

                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map((producto) => (

                    <tr key={producto.id}>

                      <td>

                        <div className="producto-info">

                          <div className="producto-avatar">
                            ◆
                          </div>

                          <div>
                            <strong>
                              {producto.nombre}
                            </strong>

                            <span>
                              {producto.descripcion ||
                                'Sin descripción'}
                            </span>
                          </div>

                        </div>

                      </td>

                      <td>
                        <span className="badge-unidad">
                          {producto.unidad}
                        </span>
                      </td>

                      <td>

                        {producto.insumos.length > 0 ? (
                          <span className="badge-insumos">
                            {producto.insumos.length}{' '}
                            {producto.insumos.length === 1
                              ? 'insumo'
                              : 'insumos'}
                          </span>
                        ) : (
                          <span className="badge-sin-insumos">
                            Sin insumos
                          </span>
                        )}

                      </td>

                      <td>
                        <span className="precio-mano">
                          {formatearCOP(
                            producto.manoObra
                          )}
                        </span>
                      </td>

                      <td>
                        <span className="precio-total">
                          {formatearCOP(
                            producto.manoObra
                          )}
                        </span>
                      </td>

                      <td>

                        <div className="acciones-producto">

                          <button
                            type="button"
                            className="btn-editar"
                            onClick={() => {
                              abrirEditar(producto);
                            }}
                            title="Editar producto"
                            aria-label={`Editar ${producto.nombre}`}
                          >
                            ✎
                          </button>

                          <button
                            type="button"
                            className="btn-eliminar"
                            onClick={() => {
                              abrirEliminar(producto);
                            }}
                            title="Eliminar producto"
                            aria-label={`Eliminar ${producto.nombre}`}
                          >
                            ×
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>
                    <td colSpan="6">

                      <div className="productos-vacio">
                        No se encontraron productos.
                      </div>

                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              FOOTER
              ================================================= */}

          <div className="productos-footer">

            <span>
              {productosFiltrados.length}{' '}
              {productosFiltrados.length === 1
                ? 'producto registrado'
                : 'productos registrados'}
            </span>

            <span>
              LuckyPay
            </span>

          </div>

        </section>

      </main>

      {/* ===================================================
          MODAL CREAR / EDITAR
          =================================================== */}

      {modalAbierto && (
        <div
          className="producto-modal-overlay"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) {
              cerrarModal();
            }
          }}
        >

          <div
            className="producto-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="producto-modal-title"
          >

            <div className="producto-modal-header">

              <div>

                <h3 id="producto-modal-title">
                  {productoEditar
                    ? 'Editar producto'
                    : 'Nuevo producto'}
                </h3>

                <p>
                  Completa la información del producto.
                </p>

              </div>

              <button
                type="button"
                className="producto-modal-close"
                onClick={cerrarModal}
                aria-label="Cerrar"
              >
                ×
              </button>

            </div>

            <form
              className="producto-form"
              onSubmit={guardarProducto}
            >

              <div className="producto-modal-body">

                <div className="campo">

                  <label htmlFor="nombre-producto">
                    Nombre del producto{' '}
                    <span>*</span>
                  </label>

                  <input
                    id="nombre-producto"
                    type="text"
                    value={formulario.nombre}
                    onChange={(evento) => {
                      cambiarCampo(
                        'nombre',
                        evento.target.value
                      );
                    }}
                    placeholder="Ej. Silla ergonómica"
                    autoFocus
                  />

                </div>

                <br />

                <div className="campo">

                  <label htmlFor="descripcion-producto">
                    Descripción
                  </label>

                  <textarea
                    id="descripcion-producto"
                    value={formulario.descripcion}
                    onChange={(evento) => {
                      cambiarCampo(
                        'descripcion',
                        evento.target.value
                      );
                    }}
                    placeholder="Describe brevemente el producto..."
                  />

                </div>

                <br />

                <div className="campo-grid">

                  <div className="campo">

                    <label htmlFor="unidad-producto">
                      Unidad
                    </label>

                    <select
                      id="unidad-producto"
                      value={formulario.unidad}
                      onChange={(evento) => {
                        cambiarCampo(
                          'unidad',
                          evento.target.value
                        );
                      }}
                    >
                      <option value="Unidad">
                        Unidad
                      </option>

                      <option value="Docena">
                        Docena
                      </option>

                      <option value="Caja">
                        Caja
                      </option>

                      <option value="Lote">
                        Lote
                      </option>
                    </select>

                  </div>

                  <div className="campo">

                    <label htmlFor="mano-obra">
                      Mano de obra
                    </label>

                    <input
                      id="mano-obra"
                      type="number"
                      min="0"
                      step="1000"
                      value={formulario.manoObra}
                      onChange={(evento) => {
                        cambiarCampo(
                          'manoObra',
                          evento.target.value
                        );
                      }}
                      placeholder="0"
                    />

                  </div>

                </div>

                <br />

                <div className="producto-insumos">

                  <div className="producto-insumos-header">

                    <strong>
                      Insumos utilizados
                    </strong>

                    <button
                      type="button"
                      className="producto-agregar-insumo"
                      onClick={agregarInsumo}
                    >
                      + Agregar insumo
                    </button>

                  </div>

                  {formulario.insumos.length === 0 ? (

                    <div className="producto-delete-alert">
                      Este producto todavía no tiene
                      insumos registrados.
                    </div>

                  ) : (

                    formulario.insumos.map((insumo) => (

                      <div
                        className="producto-insumo-row"
                        key={insumo.id}
                      >

                        <select
                          value={insumo.nombre}
                          onChange={(evento) => {
                            actualizarInsumo(
                              insumo.id,
                              'nombre',
                              evento.target.value
                            );
                          }}
                        >

                          <option value="">
                            Seleccionar insumo
                          </option>

                          {INSUMOS_DISPONIBLES.map(
                            (nombreInsumo) => (
                              <option
                                key={nombreInsumo}
                                value={nombreInsumo}
                              >
                                {nombreInsumo}
                              </option>
                            )
                          )}

                        </select>

                        <input
                          type="number"
                          min="1"
                          value={insumo.cantidad}
                          onChange={(evento) => {
                            actualizarInsumo(
                              insumo.id,
                              'cantidad',
                              evento.target.value
                            );
                          }}
                          aria-label="Cantidad"
                        />

                        <button
                          type="button"
                          className="producto-insumo-remove"
                          onClick={() => {
                            eliminarInsumo(
                              insumo.id
                            );
                          }}
                          aria-label="Eliminar insumo"
                        >
                          ×
                        </button>

                      </div>

                    ))

                  )}

                </div>

              </div>

              <div className="producto-modal-footer">

                <button
                  type="button"
                  className="producto-btn-cancelar"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="producto-btn-guardar"
                >
                  {productoEditar
                    ? 'Guardar cambios'
                    : 'Crear producto'}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ===================================================
          MODAL ELIMINAR
          =================================================== */}

      {modalEliminar && productoEliminar && (
        <div
          className="producto-modal-overlay"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) {
              cerrarEliminar();
            }
          }}
        >

          <div
            className="producto-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="eliminar-producto-title"
          >

            <div className="producto-modal-header peligro">

              <div>

                <h3 id="eliminar-producto-title">
                  Eliminar producto
                </h3>

                <p>
                  Esta acción eliminará el registro.
                </p>

              </div>

              <button
                type="button"
                className="producto-modal-close"
                onClick={cerrarEliminar}
                aria-label="Cerrar"
              >
                ×
              </button>

            </div>

            <div className="producto-modal-body">

              <div className="producto-delete-confirm">

                ¿Estás seguro de que deseas eliminar
                <br />

                <strong>
                  {productoEliminar.nombre}
                </strong>

                ?

              </div>

              <br />

              <div className="producto-delete-alert">
                Esta acción no se puede deshacer.
              </div>

            </div>

            <div className="producto-modal-footer">

              <button
                type="button"
                className="producto-btn-cancelar"
                onClick={cerrarEliminar}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="producto-btn-eliminar-confirmar"
                onClick={confirmarEliminar}
              >
                Eliminar producto
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Productos;

