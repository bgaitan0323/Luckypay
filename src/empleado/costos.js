import React, { useEffect, useMemo, useState } from 'react';
import '../styles/empleado/costos.css';

import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

const costosIniciales = [
  {
    id: 1,
    concepto: 'Materia prima',
    categoria: 'Producción',
    descripcion: 'Compra de materias primas para producción',
    valor: 850000,
  },
  {
    id: 2,
    concepto: 'Mano de obra',
    categoria: 'Personal',
    descripcion: 'Costos asociados al personal de producción',
    valor: 1200000,
  },
  {
    id: 3,
    concepto: 'Empaque',
    categoria: 'Producción',
    descripcion: 'Materiales para empaque de productos',
    valor: 320000,
  },
  {
    id: 4,
    concepto: 'Transporte',
    categoria: 'Logística',
    descripcion: 'Transporte y distribución',
    valor: 450000,
  },
  {
    id: 5,
    concepto: 'Servicios públicos',
    categoria: 'Operativo',
    descripcion: 'Agua, energía y otros servicios',
    valor: 280000,
  },
  {
    id: 6,
    concepto: 'Mantenimiento',
    categoria: 'Operativo',
    descripcion: 'Mantenimiento de equipos',
    valor: 190000,
  },
];

function CostosEmpleado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [costos, setCostos] = useState(costosIniciales);
  const [busqueda, setBusqueda] = useState('');

  const [modal, setModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [costoActual, setCostoActual] = useState(null);

  const [concepto, setConcepto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');

  const [toast, setToast] = useState('');

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

  const mostrarToast = (mensaje) => {
    setToast(mensaje);

    setTimeout(() => {
      setToast('');
    }, 2500);
  };

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

  const costosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    if (!texto) {
      return costos;
    }

    return costos.filter(
      (costo) =>
        costo.concepto.toLowerCase().includes(texto) ||
        costo.categoria.toLowerCase().includes(texto) ||
        costo.descripcion.toLowerCase().includes(texto)
    );
  }, [costos, busqueda]);

  const totalCostos = costos.reduce(
    (total, costo) => total + costo.valor,
    0
  );

  const costoPromedio =
    costos.length > 0
      ? totalCostos / costos.length
      : 0;

  const mayorCosto =
    costos.length > 0
      ? Math.max(...costos.map((costo) => costo.valor))
      : 0;

  const categorias = new Set(
    costos.map((costo) => costo.categoria)
  ).size;

  const formatearPrecio = (valorNumerico) => {
    return `$${Number(valorNumerico).toLocaleString('es-CO')}`;
  };

  const abrirNuevo = () => {
    setModoEdicion(false);
    setCostoActual(null);

    setConcepto('');
    setCategoria('');
    setDescripcion('');
    setValor('');

    setModal(true);
  };

  const abrirEditar = (costo) => {
    setModoEdicion(true);
    setCostoActual(costo);

    setConcepto(costo.concepto);
    setCategoria(costo.categoria);
    setDescripcion(costo.descripcion);
    setValor(costo.valor);

    setModal(true);
  };

  const cerrarModal = () => {
    setModal(false);
    setCostoActual(null);
  };

  const guardarCosto = () => {
    if (
      !concepto.trim() ||
      !categoria.trim() ||
      !descripcion.trim() ||
      valor === ''
    ) {
      mostrarToast('Completa todos los campos.');
      return;
    }

    const valorNumero = Number(valor);

    if (
      Number.isNaN(valorNumero) ||
      valorNumero < 0
    ) {
      mostrarToast('Ingresa un valor válido.');
      return;
    }

    if (modoEdicion && costoActual) {
      setCostos((anteriores) =>
        anteriores.map((costo) =>
          costo.id === costoActual.id
            ? {
                ...costo,
                concepto: concepto.trim(),
                categoria: categoria.trim(),
                descripcion: descripcion.trim(),
                valor: valorNumero,
              }
            : costo
        )
      );

      mostrarToast(
        'Costo actualizado correctamente.'
      );
    } else {
      const nuevoCosto = {
        id: Date.now(),
        concepto: concepto.trim(),
        categoria: categoria.trim(),
        descripcion: descripcion.trim(),
        valor: valorNumero,
      };

      setCostos((anteriores) => [
        ...anteriores,
        nuevoCosto,
      ]);

      mostrarToast(
        'Costo registrado correctamente.'
      );
    }

    cerrarModal();
  };

  const eliminarCosto = (costo) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar "${costo.concepto}"?`
    );

    if (!confirmar) {
      return;
    }

    setCostos((anteriores) =>
      anteriores.filter(
        (item) => item.id !== costo.id
      )
    );

    mostrarToast(
      'Costo eliminado correctamente.'
    );
  };

  return (
    <div className="costos-empleado-app">

      {/* NAVBAR */}
      <header className="panel-navbar">

        <div className="navbar-left">

          <button
            type="button"
            className={`menu-btn ${
              menuAbierto ? 'active' : ''
            }`}
            onClick={() =>
              setMenuAbierto(
                (estado) => !estado
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
              Gestión de costos
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

      {/* OVERLAY */}
      {menuAbierto && (
        <div
          className="menu-overlay"
          onClick={() =>
            setMenuAbierto(false)
          }
        ></div>
      )}

      {/* SIDEBAR */}
      {menuAbierto && (
        <aside className="panel-sidebar">

          <div className="sidebar-header">
            <span className="sidebar-title">
              Menú
            </span>
          </div>

          <nav className="sidebar-nav">

            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar('/empleado')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-home"></i>
              </span>

              <span>
                Inicio
              </span>
            </button>

            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar('/empleado/insumos')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-box"></i>
              </span>

              <span>
                Insumos
              </span>
            </button>

            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar('/empleado/productos')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-cube"></i>
              </span>

              <span>
                Productos
              </span>
            </button>

            <button
              type="button"
              className="sidebar-item active"
              onClick={() =>
                setMenuAbierto(false)
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-dollar-sign"></i>
              </span>

              <span>
                Costos
              </span>
            </button>

            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar('/empleado/reportes')
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

      {/* CONTENIDO */}
      <main className="panel-main">

        <section className="costos-heading">

          <div>

            <span className="eyebrow">
              MÓDULO EMPLEADO
            </span>

            <h1>
              Costos
            </h1>

            <p>
              Consulta y gestiona los costos
              operativos de LuckyPay.
            </p>

          </div>

          <button
            type="button"
            className="costo-primary-btn"
            onClick={abrirNuevo}
          >
            <i className="fas fa-plus"></i>

            Nuevo costo
          </button>

        </section>

        {/* ESTADÍSTICAS */}
        <section className="costos-stats">

          <div className="costo-stat-card">

            <div className="costo-stat-icon">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>

            <div>
              <span>
                COSTOS
              </span>

              <strong>
                {costos.length}
              </strong>

              <small>
                Registrados
              </small>
            </div>

          </div>

          <div className="costo-stat-card">

            <div className="costo-stat-icon">
              <i className="fas fa-coins"></i>
            </div>

            <div>
              <span>
                TOTAL
              </span>

              <strong>
                {formatearPrecio(
                  totalCostos
                )}
              </strong>

              <small>
                Valor acumulado
              </small>
            </div>

          </div>

          <div className="costo-stat-card">

            <div className="costo-stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>

            <div>
              <span>
                PROMEDIO
              </span>

              <strong>
                {formatearPrecio(
                  costoPromedio
                )}
              </strong>

              <small>
                Por registro
              </small>
            </div>

          </div>

          <div className="costo-stat-card">

            <div className="costo-stat-icon">
              <i className="fas fa-tags"></i>
            </div>

            <div>
              <span>
                CATEGORÍAS
              </span>

              <strong>
                {categorias}
              </strong>

              <small>
                Mayor:{' '}
                {formatearPrecio(
                  mayorCosto
                )}
              </small>
            </div>

          </div>

        </section>

        {/* PANEL */}
        <section className="costos-panel">

          <div className="costos-panel-header">

            <div>

              <span>
                COSTOS OPERATIVOS
              </span>

              <h2>
                <i className="fas fa-money-bill-wave"></i>
                Lista de costos
              </h2>

              <p>
                Costos registrados en LuckyPay.
              </p>

            </div>

            <div className="costos-busqueda">

              <i className="fas fa-search"></i>

              <input
                type="text"
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
                placeholder="Buscar costo..."
              />

            </div>

          </div>

          {/* TABLA */}
          <div className="costos-tabla-wrap">

            <table className="costos-tabla">

              <thead>

                <tr>
                  <th>Concepto</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Valor</th>
                  <th>Acciones</th>
                </tr>

              </thead>

              <tbody>

                {costosFiltrados.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="costos-vacio"
                    >

                      <i className="fas fa-folder-open"></i>

                      <strong>
                        No se encontraron costos
                      </strong>

                      <span>
                        Intenta con otra búsqueda.
                      </span>

                    </td>

                  </tr>

                ) : (

                  costosFiltrados.map(
                    (costo) => {

                      return (
                        <tr
                          key={costo.id}
                        >

                          <td>

                            <div className="costo-nombre">

                              <div className="costo-icon">

                                <i className="fas fa-dollar-sign"></i>

                              </div>

                              <strong>
                                {costo.concepto}
                              </strong>

                            </div>

                          </td>

                          <td>

                            <span className="costo-categoria">
                              {costo.categoria}
                            </span>

                          </td>

                          <td>

                            <span className="costo-descripcion">
                              {costo.descripcion}
                            </span>

                          </td>

                          <td>

                            <strong className="costo-precio">
                              {formatearPrecio(
                                costo.valor
                              )}
                            </strong>

                          </td>

                          <td>

                            <div className="costo-acciones">

                              <button
                                type="button"
                                className="accion editar"
                                onClick={() =>
                                  abrirEditar(
                                    costo
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
                                  eliminarCosto(
                                    costo
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

        {/* FOOTER */}
        <footer className="empleado-footer">

          © 2026 <strong>LuckyPay</strong> —
          Controla tu Negocio, Crece con Confianza

        </footer>

      </main>

      {/* MODAL */}
      {modal && (

        <div
          className="costo-modal-overlay"
          onClick={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              cerrarModal();
            }

          }}
        >

          <div className="costo-modal">

            <div className="costo-modal-head">

              <div>

                <span>
                  {modoEdicion
                    ? 'EDITAR'
                    : 'NUEVO'}
                </span>

                <h2>
                  {modoEdicion
                    ? 'Editar costo'
                    : 'Nuevo costo'}
                </h2>

              </div>

              <button
                type="button"
                onClick={cerrarModal}
                aria-label="Cerrar"
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="costo-modal-body">

              <label>
                Concepto
              </label>

              <input
                type="text"
                value={concepto}
                onChange={(e) =>
                  setConcepto(
                    e.target.value
                  )
                }
                placeholder="Ej: Materia prima"
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
                placeholder="Ej: Producción"
              />

              <label>
                Descripción
              </label>

              <textarea
                value={descripcion}
                onChange={(e) =>
                  setDescripcion(
                    e.target.value
                  )
                }
                placeholder="Describe el costo..."
                rows="4"
              ></textarea>

              <label>
                Valor
              </label>

              <input
                type="number"
                min="0"
                value={valor}
                onChange={(e) =>
                  setValor(
                    e.target.value
                  )
                }
                placeholder="0"
              />

            </div>

            <div className="costo-modal-footer">

              <button
                type="button"
                className="costo-btn-sec"
                onClick={cerrarModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="costo-btn-pri"
                onClick={guardarCosto}
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

      {/* TOAST */}
      {toast && (

        <div className="costos-toast">

          <i className="fas fa-circle-check"></i>

          <span>
            {toast}
          </span>

        </div>

      )}

    </div>
  );
}

export default CostosEmpleado;