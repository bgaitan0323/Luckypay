import React, { useMemo, useState, useEffect } from 'react';
import '../styles/empleado/reportes.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

const movimientosIniciales = [
  {
    id: 1,
    fecha: '18/09/2026',
    tipo: 'Venta',
    descripcion: 'Venta de productos',
    categoria: 'Ventas',
    valor: 450000,
    estado: 'Completado',
  },
  {
    id: 2,
    fecha: '17/09/2026',
    tipo: 'Compra',
    descripcion: 'Compra de materia prima',
    categoria: 'Insumos',
    valor: 180000,
    estado: 'Completado',
  },
  {
    id: 3,
    fecha: '17/09/2026',
    tipo: 'Costo',
    descripcion: 'Pago de transporte',
    categoria: 'Logística',
    valor: 95000,
    estado: 'Completado',
  },
  {
    id: 4,
    fecha: '16/09/2026',
    tipo: 'Venta',
    descripcion: 'Venta de productos',
    categoria: 'Ventas',
    valor: 320000,
    estado: 'Completado',
  },
  {
    id: 5,
    fecha: '15/09/2026',
    tipo: 'Compra',
    descripcion: 'Compra de empaques',
    categoria: 'Producción',
    valor: 75000,
    estado: 'Pendiente',
  },
];

function ReportesEmpleado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [periodo, setPeriodo] = useState('Este mes');
  const [busqueda, setBusqueda] = useState('');

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
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';

      link.setAttribute(
        'data-luckypay-fontawesome',
        'true'
      );

      document.head.appendChild(link);
    }
  }, []);

  /* =========================================
     DATOS
  ========================================= */

  const movimientos = movimientosIniciales;

  /* =========================================
     VENTAS
  ========================================= */

  const ventas = useMemo(() => {
    return movimientos
      .filter((item) => item.tipo === 'Venta')
      .reduce(
        (total, item) => total + item.valor,
        0
      );
  }, [movimientos]);

  /* =========================================
     GASTOS
  ========================================= */

  const gastos = useMemo(() => {
    return movimientos
      .filter((item) => item.tipo !== 'Venta')
      .reduce(
        (total, item) => total + item.valor,
        0
      );
  }, [movimientos]);

  /* =========================================
     BALANCE
  ========================================= */

  const utilidad = ventas - gastos;

  /* =========================================
     BÚSQUEDA
  ========================================= */

  const filtrados = useMemo(() => {
    const texto = busqueda
      .toLowerCase()
      .trim();

    if (!texto) {
      return movimientos;
    }

    return movimientos.filter(
      (item) =>
        item.descripcion
          .toLowerCase()
          .includes(texto) ||
        item.tipo
          .toLowerCase()
          .includes(texto) ||
        item.categoria
          .toLowerCase()
          .includes(texto) ||
        item.estado
          .toLowerCase()
          .includes(texto)
    );
  }, [busqueda, movimientos]);

  /* =========================================
     FORMATO DINERO
  ========================================= */

  const formatearDinero = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor);
  };

  /* =========================================
     NAVEGACIÓN
  ========================================= */

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  /* =========================================
     CERRAR SESIÓN
  ========================================= */

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = '/';
  };

  return (
    <div className="reportes-empleado-app">

      {/* =================================================
          NAVBAR
      ================================================= */}

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
              <i className="fa-solid fa-xmark"></i>
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

            <span>LuckyPay</span>

          </div>

        </div>

      </header>

      {/* =================================================
          OVERLAY
      ================================================= */}

      {menuAbierto && (
        <div
          className="menu-overlay"
          onClick={() =>
            setMenuAbierto(false)
          }
        ></div>
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      {menuAbierto && (
        <aside className="panel-sidebar">

          <div className="sidebar-title">
            <span>MENÚ EMPLEADO</span>
          </div>

          <nav>

            <button
              type="button"
              onClick={() =>
                navegar('/empleado')
              }
            >
              <i className="fa-solid fa-house"></i>

              <span>
                Panel principal
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                navegar('/empleado/insumos')
              }
            >
              <i className="fa-solid fa-boxes-stacked"></i>

              <span>
                Insumos
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                navegar('/empleado/productos')
              }
            >
              <i className="fa-solid fa-cube"></i>

              <span>
                Productos
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                navegar('/empleado/costos')
              }
            >
              <i className="fa-solid fa-money-bill-wave"></i>

              <span>
                Costos
              </span>
            </button>

            <button
              type="button"
              className="active"
              onClick={() =>
                setMenuAbierto(false)
              }
            >
              <i className="fa-solid fa-chart-line"></i>

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
              <i className="fa-solid fa-right-from-bracket"></i>

              <span>
                Cerrar sesión
              </span>
            </button>

          </div>

        </aside>
      )}

      {/* =================================================
          CONTENIDO
      ================================================= */}

      <main className="panel-main reportes-main">

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div className="reportes-heading">

          <div>

            <span className="reportes-eyebrow">
              INFORMACIÓN OPERATIVA
            </span>

            <h1>
              Reportes
            </h1>

            <p>
              Consulta el comportamiento de ventas,
              gastos y movimientos registrados en LuckyPay.
            </p>

          </div>

          <button
            type="button"
            className="reporte-imprimir"
            onClick={() => window.print()}
          >
            <i className="fa-solid fa-print"></i>

            Imprimir reporte
          </button>

        </div>

        {/* =================================================
            FILTROS
        ================================================= */}

        <section className="reportes-filtros">

          <div className="filtro-periodo">

            <label>
              Período
            </label>

            <select
              value={periodo}
              onChange={(e) =>
                setPeriodo(e.target.value)
              }
            >
              <option>
                Este mes
              </option>

              <option>
                Últimos 7 días
              </option>

              <option>
                Últimos 30 días
              </option>

              <option>
                Este año
              </option>
            </select>

          </div>

          <div className="reportes-busqueda">

            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Buscar en reportes..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
            />

          </div>

        </section>

        {/* =================================================
            ESTADÍSTICAS
        ================================================= */}

        <section className="reportes-stats">

          <div className="reporte-stat-card">

            <div className="reporte-stat-icon ventas-icon">

              <i className="fa-solid fa-sack-dollar"></i>

            </div>

            <div>

              <span>
                Ventas
              </span>

              <strong>
                {formatearDinero(ventas)}
              </strong>

              <small>
                Ingresos registrados
              </small>

            </div>

          </div>

          <div className="reporte-stat-card">

            <div className="reporte-stat-icon gastos-icon">

              <i className="fa-solid fa-money-bill-transfer"></i>

            </div>

            <div>

              <span>
                Gastos
              </span>

              <strong>
                {formatearDinero(gastos)}
              </strong>

              <small>
                Salidas registradas
              </small>

            </div>

          </div>

          <div className="reporte-stat-card">

            <div className="reporte-stat-icon balance-icon">

              <i className="fa-solid fa-chart-line"></i>

            </div>

            <div>

              <span>
                Balance
              </span>

              <strong>
                {formatearDinero(utilidad)}
              </strong>

              <small>
                Resultado del período
              </small>

            </div>

          </div>

          <div className="reporte-stat-card">

            <div className="reporte-stat-icon movimientos-icon">

              <i className="fa-solid fa-file-invoice-dollar"></i>

            </div>

            <div>

              <span>
                Movimientos
              </span>

              <strong>
                {movimientos.length}
              </strong>

              <small>
                Registros encontrados
              </small>

            </div>

          </div>

        </section>

        {/* =================================================
            TABLA
        ================================================= */}

        <section className="reportes-panel">

          <div className="reportes-panel-header">

            <div>

              <span className="reportes-panel-eyebrow">
                PERÍODO: {periodo.toUpperCase()}
              </span>

              <h2>
                Resumen de movimientos
              </h2>

            </div>

          </div>

          <div className="reportes-tabla-wrapper">

            <table className="reportes-tabla">

              <thead>

                <tr>

                  <th>
                    Fecha
                  </th>

                  <th>
                    Tipo
                  </th>

                  <th>
                    Descripción
                  </th>

                  <th>
                    Categoría
                  </th>

                  <th>
                    Valor
                  </th>

                  <th>
                    Estado
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtrados.length > 0 ? (

                  filtrados.map(
                    (movimiento) => (

                      <tr
                        key={movimiento.id}
                      >

                        <td>
                          {movimiento.fecha}
                        </td>

                        <td>

                          <span
                            className={`tipo-reporte tipo-${movimiento.tipo.toLowerCase()}`}
                          >
                            {movimiento.tipo}
                          </span>

                        </td>

                        <td className="reporte-descripcion">
                          {movimiento.descripcion}
                        </td>

                        <td>
                          {movimiento.categoria}
                        </td>

                        <td className="reporte-valor">
                          {formatearDinero(
                            movimiento.valor
                          )}
                        </td>

                        <td>

                          <span
                            className={`estado-reporte ${
                              movimiento.estado ===
                              'Completado'
                                ? 'completado'
                                : 'pendiente'
                            }`}
                          >
                            {movimiento.estado}
                          </span>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="sin-resultados"
                    >
                      No se encontraron movimientos.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            RESUMEN
        ================================================= */}

        <section className="reportes-resumen-grid">

          <div className="reportes-panel resumen-categorias">

            <div className="reportes-panel-header">

              <div>

                <span className="reportes-panel-eyebrow">
                  DISTRIBUCIÓN
                </span>

                <h2>
                  Movimientos por categoría
                </h2>

              </div>

            </div>

            <div className="categoria-reporte">

              <div>
                <span>
                  Ventas
                </span>

                <strong>
                  2 movimientos
                </strong>
              </div>

              <div className="categoria-barra">
                <span
                  style={{
                    width: '85%',
                  }}
                ></span>
              </div>

            </div>

            <div className="categoria-reporte">

              <div>
                <span>
                  Insumos
                </span>

                <strong>
                  1 movimiento
                </strong>
              </div>

              <div className="categoria-barra">
                <span
                  style={{
                    width: '55%',
                  }}
                ></span>
              </div>

            </div>

            <div className="categoria-reporte">

              <div>
                <span>
                  Logística
                </span>

                <strong>
                  1 movimiento
                </strong>
              </div>

              <div className="categoria-barra">
                <span
                  style={{
                    width: '35%',
                  }}
                ></span>
              </div>

            </div>

            <div className="categoria-reporte">

              <div>
                <span>
                  Producción
                </span>

                <strong>
                  1 movimiento
                </strong>
              </div>

              <div className="categoria-barra">
                <span
                  style={{
                    width: '25%',
                  }}
                ></span>
              </div>

            </div>

          </div>

          <div className="reportes-panel estado-resumen">

            <div className="reportes-panel-header">

              <div>

                <span className="reportes-panel-eyebrow">
                  ESTADO
                </span>

                <h2>
                  Resumen operativo
                </h2>

              </div>

            </div>

            <div className="estado-item">

              <span>

                <i className="fa-solid fa-circle-check"></i>

                Completados

              </span>

              <strong>
                4
              </strong>

            </div>

            <div className="estado-item">

              <span>

                <i className="fa-solid fa-clock"></i>

                Pendientes

              </span>

              <strong>
                1
              </strong>

            </div>

            <div className="estado-item total">

              <span>
                Total de movimientos
              </span>

              <strong>
                {movimientos.length}
              </strong>

            </div>

          </div>

        </section>

        {/* =================================================
            PIE DE PÁGINA
        ================================================= */}

        <footer className="empleado-footer">

          <span>
            © 2026 LuckyPay — Controla tu Negocio,
            Crece con Confianza
          </span>

        </footer>

      </main>

    </div>
  );
}

export default ReportesEmpleado;