import React, { useEffect, useMemo, useState } from 'react';
import '../styles/empleado/insumos.css';

import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

const datosIniciales = [
  {
    id: 1,
    nombre: 'Manteca de Karité',
    unidad: 'kg',
    stock: 4,
    minimo: 10,
  },
  {
    id: 2,
    nombre: 'Cera de Abeja',
    unidad: 'kg',
    stock: 18,
    minimo: 15,
  },
  {
    id: 3,
    nombre: 'Aceite de Lavanda',
    unidad: 'lt',
    stock: 2,
    minimo: 8,
  },
  {
    id: 4,
    nombre: 'Madera de Pino',
    unidad: 'm²',
    stock: 22,
    minimo: 20,
  },
  {
    id: 5,
    nombre: 'Aloe Vera (gel)',
    unidad: 'kg',
    stock: 5,
    minimo: 12,
  },
  {
    id: 6,
    nombre: 'Tela para Cojín',
    unidad: 'mts',
    stock: 30,
    minimo: 25,
  },
  {
    id: 7,
    nombre: 'Frascos de Vidrio',
    unidad: 'und',
    stock: 80,
    minimo: 100,
  },
  {
    id: 8,
    nombre: 'Aceite Esencial Mix',
    unidad: 'lt',
    stock: 3,
    minimo: 5,
  },
];

function InsumosEmpleado() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const [insumos, setInsumos] = useState(datosIniciales);

  const [busqueda, setBusqueda] = useState('');

  const [modal, setModal] = useState(false);

  const [insumoEditando, setInsumoEditando] = useState(null);

  const [modalEliminar, setModalEliminar] = useState(false);

  const [insumoEliminar, setInsumoEliminar] = useState(null);

  const [nombre, setNombre] = useState('');
  const [unidad, setUnidad] = useState('kg');
  const [stock, setStock] = useState('');
  const [minimo, setMinimo] = useState('');

  const [toast, setToast] = useState('');

  /* =========================================
     FONT AWESOME
  ========================================= */

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

  /* =========================================
     TOAST
  ========================================= */

  const mostrarToast = (mensaje) => {
    setToast(mensaje);

    setTimeout(() => {
      setToast('');
    }, 2500);
  };

  /* =========================================
     NAVEGACIÓN
  ========================================= */

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');

    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');

    window.location.href = '/';
  };

  /* =========================================
     FILTRO
  ========================================= */

  const insumosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return insumos;
    }

    return insumos.filter((insumo) =>
      insumo.nombre.toLowerCase().includes(texto)
    );
  }, [insumos, busqueda]);

  /* =========================================
     ESTADÍSTICAS
  ========================================= */

  const totalInsumos = insumos.length;

  const insumosCriticos = insumos.filter(
    (insumo) => insumo.stock < insumo.minimo
  ).length;

  const insumosOk = insumos.filter(
    (insumo) => insumo.stock >= insumo.minimo
  ).length;

  const stockTotal = insumos.reduce(
    (total, insumo) => total + Number(insumo.stock),
    0
  );

  /* =========================================
     MODAL NUEVO
  ========================================= */

  const abrirNuevo = () => {
    setInsumoEditando(null);

    setNombre('');
    setUnidad('kg');
    setStock('');
    setMinimo('');

    setModal(true);
  };

  /* =========================================
     MODAL EDITAR
  ========================================= */

  const abrirEditar = (insumo) => {
    setInsumoEditando(insumo);

    setNombre(insumo.nombre);
    setUnidad(insumo.unidad);
    setStock(insumo.stock);
    setMinimo(insumo.minimo);

    setModal(true);
  };

  const cerrarModal = () => {
    setModal(false);
    setInsumoEditando(null);
  };

  /* =========================================
     GUARDAR
  ========================================= */

  const guardarInsumo = (evento) => {
    evento.preventDefault();

    if (!nombre.trim()) {
      mostrarToast('Ingresa el nombre del insumo.');
      return;
    }

    if (stock === '' || Number(stock) < 0) {
      mostrarToast('Ingresa un stock válido.');
      return;
    }

    if (minimo === '' || Number(minimo) < 0) {
      mostrarToast('Ingresa un mínimo válido.');
      return;
    }

    if (insumoEditando) {
      setInsumos((anteriores) =>
        anteriores.map((insumo) =>
          insumo.id === insumoEditando.id
            ? {
                ...insumo,
                nombre: nombre.trim(),
                unidad,
                stock: Number(stock),
                minimo: Number(minimo),
              }
            : insumo
        )
      );

      mostrarToast('Insumo actualizado correctamente.');
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: nombre.trim(),
        unidad,
        stock: Number(stock),
        minimo: Number(minimo),
      };

      setInsumos((anteriores) => [
        ...anteriores,
        nuevo,
      ]);

      mostrarToast('Insumo registrado correctamente.');
    }

    cerrarModal();
  };

  /* =========================================
     ELIMINAR
  ========================================= */

  const solicitarEliminar = (insumo) => {
    setInsumoEliminar(insumo);
    setModalEliminar(true);
  };

  const cancelarEliminar = () => {
    setInsumoEliminar(null);
    setModalEliminar(false);
  };

  const confirmarEliminar = () => {
    if (!insumoEliminar) return;

    setInsumos((anteriores) =>
      anteriores.filter(
        (insumo) => insumo.id !== insumoEliminar.id
      )
    );

    mostrarToast('Insumo eliminado correctamente.');

    setInsumoEliminar(null);
    setModalEliminar(false);
  };

  /* =========================================
     ICONO UNIDAD
  ========================================= */

  const iconoUnidad = (valor) => {
    const iconos = {
      kg: 'fa-weight-hanging',
      g: 'fa-weight-hanging',
      lt: 'fa-flask',
      ml: 'fa-flask',
      mts: 'fa-ruler-horizontal',
      'm²': 'fa-ruler-combined',
      und: 'fa-box',
    };

    return iconos[valor] || 'fa-box';
  };

  /* =========================================
     PORCENTAJE STOCK
  ========================================= */

  const porcentajeStock = (insumo) => {
    if (insumo.minimo <= 0) return 100;

    return Math.min(
      (Number(insumo.stock) /
        Number(insumo.minimo)) *
        100,
      100
    );
  };

  return (
    <div className="insumos-empleado-page">

      {/* =====================================
          NAVBAR
      ===================================== */}

      <header className="insumos-navbar">

        <div className="insumos-navbar-left">

          <button
            type="button"
            className={`insumos-menu-btn ${
              menuAbierto ? 'active' : ''
            }`}
            onClick={() =>
              setMenuAbierto((estado) => !estado)
            }
            aria-label={
              menuAbierto
                ? 'Cerrar menú'
                : 'Abrir menú'
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="insumos-brand">

            <img
              src={logo}
              alt="LuckyPay"
            />

            <span>LuckyPay</span>

          </div>

        </div>

        <div className="insumos-user">

          <div className="insumos-user-text">

            <strong>
              Bienvenido, Empleado
            </strong>

            <span>
              Panel operativo
            </span>

          </div>

          <button
            type="button"
            className="insumos-logout"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </header>


      {/* =====================================
          MENÚ
      ===================================== */}

      {menuAbierto && (
        <>
          <div
            className="insumos-overlay"
            onClick={() =>
              setMenuAbierto(false)
            }
          ></div>

          <aside className="insumos-sidebar">

            <div className="insumos-sidebar-header">

              <span>
                MENÚ
              </span>

              <strong>
                Operaciones
              </strong>

            </div>

            <nav className="insumos-sidebar-nav">

              <button
                type="button"
                onClick={() =>
                  navegar('/empleado')
                }
              >
                <i className="fas fa-house"></i>
                <span>Inicio</span>
              </button>

              <button
                type="button"
                className="activo"
                onClick={() =>
                  navegar('/empleado/insumos')
                }
              >
                <i className="fas fa-flask"></i>
                <span>Insumos</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navegar('/empleado/productos')
                }
              >
                <i className="fas fa-box"></i>
                <span>Productos</span>
              </button>

              <div className="insumos-separador"></div>

              <button
                type="button"
                onClick={() =>
                  navegar('/empleado/costos')
                }
              >
                <i className="fas fa-dollar-sign"></i>
                <span>Costos</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navegar('/empleado/reportes')
                }
              >
                <i className="fas fa-file-lines"></i>
                <span>Reportes</span>
              </button>

            </nav>

            <div className="insumos-sidebar-bottom">

              <button
                type="button"
                onClick={cerrarSesion}
              >
                <i className="fas fa-right-from-bracket"></i>
                <span>Cerrar sesión</span>
              </button>

            </div>

          </aside>
        </>
      )}


      {/* =====================================
          CONTENIDO
      ===================================== */}

      <main className="insumos-main">

        <section className="insumos-heading">

          <div>

            <span className="insumos-eyebrow">
              INVENTARIO
            </span>

            <h1>
              Gestión de Insumos
            </h1>

            <p>
              Consulta y administra los insumos
              utilizados en la producción.
            </p>

          </div>

          <div className="insumos-fecha">

            <span>
              MÓDULO
            </span>

            <strong>
              Insumos
            </strong>

            <small>
              Panel de empleado
            </small>

          </div>

        </section>


        {/* =====================================
            ESTADÍSTICAS
        ===================================== */}

        <section className="insumos-stats">

          <article className="insumos-stat">

            <div className="insumos-stat-icon">
              <i className="fas fa-flask"></i>
            </div>

            <div>
              <span>
                INSUMOS
              </span>

              <strong>
                {totalInsumos}
              </strong>

              <small>
                Registrados
              </small>
            </div>

          </article>


          <article className="insumos-stat">

            <div className="insumos-stat-icon">
              <i className="fas fa-circle-check"></i>
            </div>

            <div>
              <span>
                STOCK OK
              </span>

              <strong>
                {insumosOk}
              </strong>

              <small>
                Sobre el mínimo
              </small>
            </div>

          </article>


          <article className="insumos-stat">

            <div className="insumos-stat-icon warning">
              <i className="fas fa-triangle-exclamation"></i>
            </div>

            <div>
              <span>
                ALERTAS
              </span>

              <strong>
                {insumosCriticos}
              </strong>

              <small>
                Requieren atención
              </small>
            </div>

          </article>


          <article className="insumos-stat">

            <div className="insumos-stat-icon">
              <i className="fas fa-boxes-stacked"></i>
            </div>

            <div>
              <span>
                STOCK TOTAL
              </span>

              <strong>
                {stockTotal}
              </strong>

              <small>
                Unidades registradas
              </small>
            </div>

          </article>

        </section>


        {/* =====================================
            TARJETA PRINCIPAL
        ===================================== */}

        <section className="insumos-card">

          <div className="insumos-card-header">

            <div>

              <span>
                INVENTARIO ACTUAL
              </span>

              <h2>
                Insumos registrados
              </h2>

              <p>
                Consulta el stock y actualiza
                la información de cada insumo.
              </p>

            </div>

            <button
              type="button"
              className="insumos-btn-primary"
              onClick={abrirNuevo}
            >
              <i className="fas fa-plus"></i>
              Nuevo insumo
            </button>

          </div>


          {/* BUSCADOR */}

          <div className="insumos-search">

            <i className="fas fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Buscar insumo por nombre..."
              value={busqueda}
              onChange={(evento) =>
                setBusqueda(
                  evento.target.value
                )
              }
            />

            {busqueda && (
              <button
                type="button"
                onClick={() =>
                  setBusqueda('')
                }
              >
                ×
              </button>
            )}

          </div>


          {/* TABLA */}

          {insumosFiltrados.length > 0 ? (

            <div className="insumos-table-wrapper">

              <table className="insumos-table">

                <thead>

                  <tr>
                    <th>Insumo</th>
                    <th>Unidad</th>
                    <th>Stock actual</th>
                    <th>Mínimo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>

                </thead>

                <tbody>

                  {insumosFiltrados.map(
                    (insumo) => {

                      const porcentaje =
                        porcentajeStock(
                          insumo
                        );

                      const critico =
                        insumo.stock <
                        insumo.minimo;

                      return (

                        <tr
                          key={insumo.id}
                        >

                          <td>

                            <div className="insumo-info">

                              <div className="insumo-avatar">

                                <i
                                  className={`fas ${
                                    iconoUnidad(
                                      insumo.unidad
                                    )
                                  }`}
                                ></i>

                              </div>

                              <div>

                                <strong>
                                  {insumo.nombre}
                                </strong>

                                <small>
                                  ID #{insumo.id}
                                </small>

                              </div>

                            </div>

                          </td>


                          <td>

                            <span className="insumo-unidad">

                              <i
                                className={`fas ${
                                  iconoUnidad(
                                    insumo.unidad
                                  )
                                }`}
                              ></i>

                              {insumo.unidad}

                            </span>

                          </td>


                          <td>

                            <div className="stock-cell">

                              <div className="stock-bar">

                                <div
                                  className={`stock-fill ${
                                    critico
                                      ? 'critico'
                                      : 'ok'
                                  }`}
                                  style={{
                                    width: `${porcentaje}%`,
                                  }}
                                ></div>

                              </div>

                              <strong>
                                {insumo.stock}
                              </strong>

                            </div>

                          </td>


                          <td>

                            <span className="minimo-text">
                              {insumo.minimo}
                            </span>

                          </td>


                          <td>

                            {critico ? (

                              <span className="estado-badge critico">
                                <i className="fas fa-triangle-exclamation"></i>
                                Bajo
                              </span>

                            ) : (

                              <span className="estado-badge ok">
                                <i className="fas fa-circle-check"></i>
                                OK
                              </span>

                            )}

                          </td>


                          <td>

                            <div className="insumo-acciones">

                              <button
                                type="button"
                                className="btn-editar-insumo"
                                title="Editar insumo"
                                onClick={() =>
                                  abrirEditar(
                                    insumo
                                  )
                                }
                              >
                                <i className="fas fa-pen"></i>
                              </button>

                              <button
                                type="button"
                                className="btn-eliminar-insumo"
                                title="Eliminar insumo"
                                onClick={() =>
                                  solicitarEliminar(
                                    insumo
                                  )
                                }
                              >
                                <i className="fas fa-trash"></i>
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="insumos-vacio">

              <div>
                <i className="fas fa-flask"></i>
              </div>

              <h3>
                No hay insumos registrados
              </h3>

              <p>
                {busqueda
                  ? 'No encontramos resultados para tu búsqueda.'
                  : 'Agrega el primer insumo para comenzar.'}
              </p>

              {busqueda && (
                <button
                  type="button"
                  onClick={() =>
                    setBusqueda('')
                  }
                >
                  Limpiar búsqueda
                </button>
              )}

            </div>

          )}

        </section>


        {/* =====================================
            FOOTER
        ===================================== */}

        <footer className="insumos-footer">

          © 2026 <strong>LuckyPay</strong> —
          Controla tu Negocio, Crece con Confianza

        </footer>

      </main>


      {/* =====================================
          MODAL NUEVO / EDITAR
      ===================================== */}

      {modal && (

        <div
          className="insumos-modal-overlay"
          onClick={cerrarModal}
        >

          <div
            className="insumos-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >

            <div className="insumos-modal-header">

              <div>

                <span>
                  {insumoEditando
                    ? 'EDITAR'
                    : 'NUEVO INSUMO'}
                </span>

                <h2>
                  {insumoEditando
                    ? 'Editar insumo'
                    : 'Nuevo insumo'}
                </h2>

              </div>

              <button
                type="button"
                onClick={cerrarModal}
              >
                ×
              </button>            </div>


            <form
              className="insumos-form"
              onSubmit={guardarInsumo}
            >

              <div className="campo">

                <label>
                  Nombre del insumo
                </label>

                <input
                  type="text"
                  value={nombre}
                  onChange={(evento) =>
                    setNombre(
                      evento.target.value
                    )
                  }
                  placeholder="Ej. Madera de Pino"
                />

              </div>


              <div className="form-grid">

                <div className="campo">

                  <label>
                    Unidad
                  </label>

                  <select
                    value={unidad}
                    onChange={(evento) =>
                      setUnidad(
                        evento.target.value
                      )
                    }
                  >

                    <option value="kg">
                      Kilogramos (kg)
                    </option>

                    <option value="g">
                      Gramos (g)
                    </option>

                    <option value="lt">
                      Litros (lt)
                    </option>

                    <option value="ml">
                      Mililitros (ml)
                    </option>

                    <option value="mts">
                      Metros (mts)
                    </option>

                    <option value="m²">
                      Metros cuadrados (m²)
                    </option>

                    <option value="und">
                      Unidad (und)
                    </option>

                  </select>

                </div>


                <div className="campo">

                  <label>
                    Stock actual
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(evento) =>
                      setStock(
                        evento.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="campo">

                <label>
                  Stock mínimo
                </label>

                <input
                  type="number"
                  min="0"
                  value={minimo}
                  onChange={(evento) =>
                    setMinimo(
                      evento.target.value
                    )
                  }
                />

                <small>
                  Cuando el stock sea inferior
                  a este valor se mostrará una alerta.
                </small>

              </div>


              <div className="insumos-modal-footer">

                <button
                  type="button"
                  className="btn-cancelar-insumo"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-guardar-insumo"
                >
                  <i className="fas fa-check"></i>

                  {insumoEditando
                    ? 'Guardar cambios'
                    : 'Registrar insumo'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =====================================
          MODAL ELIMINAR
      ===================================== */}

      {modalEliminar && insumoEliminar && (

        <div
          className="insumos-modal-overlay"
          onClick={cancelarEliminar}
        >

          <div
            className="insumos-modal eliminar-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >

            <div className="eliminar-icono">
              <i className="fas fa-trash"></i>
            </div>

            <h2>
              ¿Eliminar insumo?
            </h2>

            <p>
              ¿Estás seguro de eliminar
              <strong>
                {' '}
                {insumoEliminar.nombre}
              </strong>
              ?
            </p>

            <span>
              Esta acción eliminará el insumo
              de la lista actual.
            </span>

            <div className="insumos-modal-footer">

              <button
                type="button"
                className="btn-cancelar-insumo"
                onClick={cancelarEliminar}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-confirmar-eliminar"
                onClick={confirmarEliminar}
              >
                Eliminar
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          TOAST
      ===================================== */}

      {toast && (

        <div className="insumos-toast">

          <i className="fas fa-circle-check"></i>

          <span>
            {toast}
          </span>

        </div>

      )}

    </div>
  );
}

export default InsumosEmpleado;