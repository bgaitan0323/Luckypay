import React, { useMemo, useState } from 'react';
import '../styles/Panel.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function PanelPrincipal() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarAlertas, setMostrarAlertas] = useState(false);
  const [mostrarRecordatorios, setMostrarRecordatorios] = useState(false);
  const [toast, setToast] = useState('');

  const productos = [
    {
      nombre: 'Silla ergonómica mod. A',
      stock: 4,
      minimo: 10,
    },
    {
      nombre: 'Mesa de trabajo',
      stock: 7,
      minimo: 10,
    },
    {
      nombre: 'Escritorio ejecutivo',
      stock: 5,
      minimo: 10,
    },
    {
      nombre: 'Silla de oficina básica',
      stock: 8,
      minimo: 12,
    },
  ];

  const recordatorios = [
    {
      titulo: 'Revisar inventario',
      fecha: '05 de septiembre',
    },
    {
      titulo: 'Pago a proveedor',
      fecha: '07 de septiembre',
    },
  ];

  const actividades = [
    {
      titulo: 'Nuevo producto registrado',
      detalle: 'Silla ergonómica mod. A',
      fecha: 'Hoy, 11:42 AM',
    },
    {
      titulo: 'Insumo actualizado',
      detalle: 'Madera pino',
      fecha: 'Hoy, 10:30 AM',
    },
    {
      titulo: 'Producción registrada',
      detalle: '12 unidades fabricadas',
      fecha: 'Ayer, 4:15 PM',
    },
    {
      titulo: 'Usuario actualizado',
      detalle: 'Administrador',
      fecha: 'Ayer, 2:08 PM',
    },
  ];

  const rentabilidad = [
    {
      producto: 'Silla ergonómica mod. A',
      costo: 185000,
      venta: 290000,
      margen: 36.2,
    },
    {
      producto: 'Mesa de trabajo',
      costo: 320000,
      venta: 480000,
      margen: 33.3,
    },
    {
      producto: 'Escritorio ejecutivo',
      costo: 410000,
      venta: 620000,
      margen: 33.9,
    },
  ];

  const costos = [
    { nombre: 'Materia prima', valor: 68 },
    { nombre: 'Mano de obra', valor: 48 },
    { nombre: 'Gastos fijos', valor: 32 },
    { nombre: 'Otros', valor: 20 },
  ];

  const alertasStock = useMemo(
    () =>
      productos.filter(
        (producto) => producto.stock <= producto.minimo
      ),
    []
  );

  const costoPromedio = 185000;

  const mostrarToast = (mensaje) => {
    setToast(mensaje);

    setTimeout(() => {
      setToast('');
    }, 2500);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');

    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');

    window.location.href = '/';
  };

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  return (
    <div className="panel-page">

      {/* NAVBAR */}
      <header className="panel-navbar">

        <div className="navbar-left">

          <button
            className={`menu-btn ${menuAbierto ? 'active' : ''}`}
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="brand">
            <img src={logo} alt="LuckyPay" />
            <span>LuckyPay</span>
          </div>

        </div>

        <div className="welcome">

          <div className="welcome-text">
            <strong>Bienvenido, Administrador</strong>
            <span>Panel de administración</span>
          </div>

          <button
            className="logout-btn"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </header>


      {/* MENÚ DESPLEGABLE */}
      {menuAbierto && (
        <>
          <div
            className="menu-overlay"
            onClick={() => setMenuAbierto(false)}
          ></div>

          <aside className="panel-sidebar">

            <div className="sidebar-header">

              <div>
                <span className="sidebar-title">
                  MENÚ PRINCIPAL
                </span>

                <p>Administración</p>
              </div>

              <button
                className="sidebar-close"
                onClick={() => setMenuAbierto(false)}
              >
                ×
              </button>

            </div>


            <nav className="sidebar-nav">

              {/* INICIO */}
              <button
                className="sidebar-item active"
                onClick={() => navegar('/panel')}
              >
                <span className="sidebar-icon">⌂</span>
                <span>Inicio</span>
              </button>


              {/* INSUMOS */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/insumos')}
              >
                <span className="sidebar-icon">◆</span>
                <span>Insumos</span>
              </button>


              {/* PRODUCTOS */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/productos')}
              >
                <span className="sidebar-icon">▣</span>
                <span>Productos</span>
              </button>


              <div className="sidebar-separator"></div>


              {/* COSTOS */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/costos')}
              >
                <span className="sidebar-icon">▤</span>
                <span>Costos</span>
              </button>


              {/* META DE VENTAS */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/meta-ventas')}
              >
                <span className="sidebar-icon">◈</span>
                <span>Meta de Ventas</span>
              </button>


              {/* USUARIOS */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/usuarios')}
              >
                <span className="sidebar-icon">♙</span>
                <span>Usuarios y Roles</span>
              </button>


              {/* ANÁLISIS */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/analisis')}
              >
                <span className="sidebar-icon">◉</span>
                <span>Análisis</span>
              </button>


              {/* REPORTES */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/reportes')}
              >
                <span className="sidebar-icon">▤</span>
                <span>Reportes</span>
              </button>


              {/* AUDITORÍA */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/auditoria')}
              >
                <span className="sidebar-icon">☷</span>
                <span>Auditoría</span>
              </button>


              {/* CONFIGURACIÓN */}
              <button
                className="sidebar-item"
                onClick={() => navegar('/configuracion')}
              >
                <span className="sidebar-icon">⚙</span>
                <span>Configuración</span>
              </button>

            </nav>


            {/* CERRAR SESIÓN */}
            <div className="sidebar-bottom">

              <button
                className="sidebar-logout"
                onClick={cerrarSesion}
              >
                <span>↪</span>
                Cerrar sesión
              </button>

            </div>

          </aside>
        </>
      )}


      {/* CONTENIDO */}
      <main className="panel-main">

        <section className="panel-heading">

          <div>

            <span className="eyebrow">
              RESUMEN GENERAL
            </span>

            <h1>Panel Principal</h1>

            <p>
              Controla el estado de tu negocio desde un solo lugar.
            </p>

          </div>

          <div className="fecha-panel">

            <span>HOY</span>

            <strong>
              04 DE SEPTIEMBRE DE 2026
            </strong>

          </div>

        </section>


        {/* ESTADÍSTICAS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">◆</div>

            <div className="stat-content">
              <span>PRODUCTOS</span>
              <strong>7</strong>
              <small>Registrados</small>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">▣</div>

            <div className="stat-content">
              <span>INSUMOS</span>
              <strong>8</strong>
              <small>Registrados</small>
            </div>

          </div>


          <div
            className="stat-card clickable"
            onClick={() => setMostrarAlertas(true)}
          >

            <div className="stat-icon warning">!</div>

            <div className="stat-content">
              <span>ALERTAS</span>
              <strong>{alertasStock.length}</strong>
              <small>Requieren atención</small>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon money">$</div>

            <div className="stat-content">

              <span>COSTO PROMEDIO</span>

              <strong>
                ${costoPromedio.toLocaleString('es-CO')}
              </strong>

              <small>Por producto</small>

            </div>

          </div>

        </section>


        {/* GRID PRINCIPAL */}
        <section className="dashboard-grid">

          {/* ALERTAS */}
          <article className="dashboard-card">

            <div className="card-header">

              <div>
                <span className="card-label">
                  INVENTARIO
                </span>

                <h2>Alertas de stock</h2>
              </div>

              <button
                className="card-link"
                onClick={() => setMostrarAlertas(true)}
              >
                Ver todo
              </button>

            </div>


            <div className="alert-list">

              {alertasStock.slice(0, 4).map(
                (producto, index) => (

                  <div
                    className="alert-row"
                    key={index}
                  >

                    <div className="alert-product">

                      <div className="alert-icon">
                        !
                      </div>

                      <div>

                        <strong>
                          {producto.nombre}
                        </strong>

                        <span>
                          Stock mínimo: {producto.minimo}
                        </span>

                      </div>

                    </div>

                    <span className="stock">
                      {producto.stock} unidades
                    </span>

                  </div>

                )
              )}

            </div>

          </article>


          {/* RECORDATORIOS */}
          <article className="dashboard-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  PENDIENTES
                </span>

                <h2>Recordatorios</h2>

              </div>

              <button
                className="card-link"
                onClick={() =>
                  setMostrarRecordatorios(true)
                }
              >
                Ver todo
              </button>

            </div>


            <div className="reminder-list">

              {recordatorios.map(
                (recordatorio, index) => (

                  <div
                    className="reminder-row"
                    key={index}
                  >

                    <div className="reminder-icon">
                      ◷
                    </div>

                    <div>

                      <strong>
                        {recordatorio.titulo}
                      </strong>

                      <span>
                        {recordatorio.fecha}
                      </span>

                    </div>

                  </div>

                )
              )}


              <button
                className="add-reminder"
                onClick={() =>
                  mostrarToast(
                    'Crear recordatorio próximamente'
                  )
                }
              >
                + Agregar recordatorio
              </button>

            </div>

          </article>


          {/* COSTOS */}
          <article className="dashboard-card chart-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  DISTRIBUCIÓN
                </span>

                <h2>Costos de producción</h2>

              </div>

            </div>


            <div className="chart">

              <div className="chart-bars">

                {costos.map((costo, index) => (

                  <div
                    className="bar-column"
                    key={index}
                  >

                    <span>
                      {costo.valor}%
                    </span>

                    <div
                      className="bar"
                      style={{
                        height: `${costo.valor}%`
                      }}
                    ></div>

                    <small>
                      {costo.nombre}
                    </small>

                  </div>

                ))}

              </div>

            </div>

          </article>


          {/* RENTABILIDAD */}
          <article className="dashboard-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  ANÁLISIS
                </span>

                <h2>
                  Rentabilidad por producto
                </h2>

              </div>

            </div>


            <div className="profit-table">

              {rentabilidad.map(
                (item, index) => (

                  <div
                    className="profit-row"
                    key={index}
                  >

                    <div>

                      <strong>
                        {item.producto}
                      </strong>

                      <span>
                        Costo $
                        {item.costo.toLocaleString('es-CO')}
                        {' · '}
                        Venta $
                        {item.venta.toLocaleString('es-CO')}
                      </span>

                    </div>

                    <strong className="profit-value">
                      {item.margen}%
                    </strong>

                  </div>

                )
              )}

            </div>

          </article>


          {/* ACTIVIDAD */}
          <article className="dashboard-card activity-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  SISTEMA
                </span>

                <h2>Actividad reciente</h2>

              </div>

              <button
                className="card-link"
                onClick={() =>
                  mostrarToast(
                    'Historial completo próximamente'
                  )
                }
              >
                Ver historial
              </button>

            </div>


            <div className="activity-list">

              {actividades.map(
                (actividad, index) => (

                  <div
                    className="activity-row"
                    key={index}
                  >

                    <div className="activity-dot"></div>

                    <div className="activity-info">

                      <strong>
                        {actividad.titulo}
                      </strong>

                      <span>
                        {actividad.detalle}
                      </span>

                    </div>

                    <time>
                      {actividad.fecha}
                    </time>

                  </div>

                )
              )}

            </div>

          </article>


          {/* ACCIONES RÁPIDAS */}
          <article className="dashboard-card quick-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  ACCESOS
                </span>

                <h2>Acciones rápidas</h2>

              </div>

            </div>


            <div className="quick-grid">

              <button
                className="quick-action"
                onClick={() =>
                  (window.location.href = '/productos')
                }
              >

                <span>▣</span>

                <strong>Productos</strong>

                <small>
                  Gestionar productos
                </small>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  (window.location.href = '/insumos')
                }
              >

                <span>◆</span>

                <strong>Insumos</strong>

                <small>
                  Gestionar inventario
                </small>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  mostrarToast(
                    'Registrar producción próximamente'
                  )
                }
              >

                <span>＋</span>

                <strong>Producción</strong>

                <small>
                  Registrar producción
                </small>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  mostrarToast(
                    'Reportes próximamente'
                  )
                }
              >

                <span>▤</span>

                <strong>Reportes</strong>

                <small>
                  Consultar reportes
                </small>

              </button>

            </div>

          </article>

        </section>

      </main>


      {/* MODAL ALERTAS */}
      {mostrarAlertas && (

        <div
          className="modal-overlay"
          onClick={() => setMostrarAlertas(false)}
        >

          <div
            className="panel-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>

                <span className="eyebrow">
                  INVENTARIO
                </span>

                <h2>Alertas de stock</h2>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setMostrarAlertas(false)
                }
              >
                ×
              </button>

            </div>


            <div className="modal-list">

              {alertasStock.map(
                (producto, index) => (

                  <div
                    className="modal-list-row"
                    key={index}
                  >

                    <div>

                      <strong>
                        {producto.nombre}
                      </strong>

                      <span>
                        Stock mínimo: {producto.minimo}
                      </span>

                    </div>

                    <strong className="modal-stock">
                      {producto.stock}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}


      {/* MODAL RECORDATORIOS */}
      {mostrarRecordatorios && (

        <div
          className="modal-overlay"
          onClick={() =>
            setMostrarRecordatorios(false)
          }
        >

          <div
            className="panel-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>

                <span className="eyebrow">
                  PENDIENTES
                </span>

                <h2>Recordatorios</h2>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setMostrarRecordatorios(false)
                }
              >
                ×
              </button>

            </div>


            <div className="modal-list">

              {recordatorios.map(
                (recordatorio, index) => (

                  <div
                    className="modal-list-row"
                    key={index}
                  >

                    <div>

                      <strong>
                        {recordatorio.titulo}
                      </strong>

                      <span>
                        {recordatorio.fecha}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}


      {/* TOAST */}
      {toast && (
        <div className="panel-toast">
          {toast}
        </div>
      )}

    </div>
  );
}

export default PanelPrincipal;