import React, { useState } from 'react';
import '../styles/reportes.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Reportes() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [periodo, setPeriodo] = useState('Este mes');

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  const datos = {
    'Este mes': {
      ventas: 8450000,
      costos: 5230000,
      utilidad: 3220000,
      productos: 53
    },
    'Mes anterior': {
      ventas: 7680000,
      costos: 4970000,
      utilidad: 2710000,
      productos: 47
    },
    'Últimos 3 meses': {
      ventas: 22150000,
      costos: 14680000,
      utilidad: 7470000,
      productos: 142
    }
  };

  const actual = datos[periodo];

  const formatear = (valor) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(valor);

  const reportes = [
    {
      icono: '📊',
      titulo: 'Reporte de ventas',
      descripcion:
        'Consulta las ventas realizadas durante el período seleccionado.',
      valor: formatear(actual.ventas)
    },
    {
      icono: '📦',
      titulo: 'Reporte de inventario',
      descripcion:
        'Revisa el estado actual de tus insumos y productos.',
      valor: `${actual.productos} productos`
    },
    {
      icono: '💰',
      titulo: 'Reporte de costos',
      descripcion:
        'Analiza los costos de producción y operación.',
      valor: formatear(actual.costos)
    },
    {
      icono: '📈',
      titulo: 'Reporte de utilidades',
      descripcion:
        'Consulta la utilidad generada en el período.',
      valor: formatear(actual.utilidad)
    }
  ];

  return (
    <div className="reportes-page">

      {/* NAVBAR */}
      <header className="reportes-navbar">

        <button
          type="button"
          className={`reportes-menu ${
            menuAbierto ? 'activo' : ''
          }`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="reportes-brand">
          <img src={logo} alt="LuckyPay" />
          <span>LuckyPay</span>
        </div>

        {/* USUARIO Y SALIR */}
        <div className="reportes-welcome">

          <div className="reportes-user-info">
            <strong>Bienvenido, Administrador</strong>
            <span>Gestión de reportes</span>
          </div>

          <button
            type="button"
            className="reportes-logout-btn"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </header>

      {/* OVERLAY */}
      {menuAbierto && (
        <div
          className="reportes-menu-overlay"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`reportes-sidebar ${
          menuAbierto ? 'abierto' : ''
        }`}
      >

        <div className="reportes-sidebar-header">

          <div className="reportes-sidebar-title">
            Menú
          </div>

          <button
            type="button"
            className="reportes-sidebar-close"
            onClick={() => setMenuAbierto(false)}
          >
            ×
          </button>

        </div>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/panel')}
        >
          <span className="reportes-sidebar-icon">⌂</span>
          <span>Inicio</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/insumos')}
        >
          <span className="reportes-sidebar-icon">▣</span>
          <span>Insumos</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/productos')}
        >
          <span className="reportes-sidebar-icon">▤</span>
          <span>Productos</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/costos')}
        >
          <span className="reportes-sidebar-icon">$</span>
          <span>Costos</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/meta-ventas')}
        >
          <span className="reportes-sidebar-icon">◎</span>
          <span>Meta de Ventas</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/usuarios')}
        >
          <span className="reportes-sidebar-icon">♙</span>
          <span>Usuarios y Roles</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/analisis')}
        >
          <span className="reportes-sidebar-icon">▦</span>
          <span>Análisis</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item activo"
          onClick={() => navegar('/reportes')}
        >
          <span className="reportes-sidebar-icon">▤</span>
          <span>Reportes</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/auditoria')}
        >
          <span className="reportes-sidebar-icon">☷</span>
          <span>Auditoría</span>
        </button>

        <button
          type="button"
          className="reportes-sidebar-item"
          onClick={() => navegar('/configuracion')}
        >
          <span className="reportes-sidebar-icon">⚙</span>
          <span>Configuración</span>
        </button>

        <div className="reportes-sidebar-separator"></div>

        <button
          type="button"
          className="reportes-logout"
          onClick={cerrarSesion}
        >
          <span>↪</span>
          <span>Cerrar sesión</span>
        </button>

      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="reportes-main">

        <section className="reportes-heading">

          <div>

            <div className="reportes-eyebrow">
              INFORMACIÓN DEL NEGOCIO
            </div>

            <h1>Reportes</h1>

            <p>
              Consulta y revisa los principales resultados de LuckyPay.
            </p>

          </div>

          <div className="reportes-periodo">

            <label>Período</label>

            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            >
              <option>Este mes</option>
              <option>Mes anterior</option>
              <option>Últimos 3 meses</option>
            </select>

          </div>

        </section>

        {/* ESTADÍSTICAS */}
        <section className="reportes-stats">

          <div className="reportes-stat-card">
            <div className="reportes-stat-icon">▤</div>

            <div>
              <span>Ventas</span>
              <strong>{formatear(actual.ventas)}</strong>
            </div>
          </div>

          <div className="reportes-stat-card">
            <div className="reportes-stat-icon">◈</div>

            <div>
              <span>Costos</span>
              <strong>{formatear(actual.costos)}</strong>
            </div>
          </div>

          <div className="reportes-stat-card">
            <div className="reportes-stat-icon">↗</div>

            <div>
              <span>Utilidad</span>
              <strong>{formatear(actual.utilidad)}</strong>
            </div>
          </div>

          <div className="reportes-stat-card">
            <div className="reportes-stat-icon">□</div>

            <div>
              <span>Productos vendidos</span>
              <strong>{actual.productos}</strong>
            </div>
          </div>

        </section>

        {/* REPORTES */}
        <section className="reportes-card">

          <div className="reportes-card-header">

            <div>

              <span className="reportes-card-label">
                REPORTES DISPONIBLES
              </span>

              <h2>Resumen de información</h2>

            </div>

            <button
              type="button"
              className="reportes-print-btn"
              onClick={() => window.print()}
            >
              🖨 Imprimir
            </button>

          </div>

          <div className="reportes-grid">

            {reportes.map((reporte, index) => (

              <div
                className="reportes-item"
                key={index}
              >

                <div className="reportes-item-icon">
                  {reporte.icono}
                </div>

                <div className="reportes-item-content">

                  <h3>{reporte.titulo}</h3>

                  <p>{reporte.descripcion}</p>

                  <strong>{reporte.valor}</strong>

                </div>

                <button
                  type="button"
                  className="reportes-view-btn"
                  onClick={() =>
                    alert(
                      `${reporte.titulo}\n\nPeríodo: ${periodo}\nResultado: ${reporte.valor}`
                    )
                  }
                >
                  Ver
                </button>

              </div>

            ))}

          </div>

        </section>

        {/* RESUMEN FINANCIERO */}
        <section className="reportes-summary">

          <div className="reportes-summary-header">

            <span className="reportes-card-label">
              RESUMEN FINANCIERO
            </span>

            <h2>Resultado del período</h2>

          </div>

          <div className="reportes-summary-grid">

            <div>
              <span>Total ventas</span>
              <strong>{formatear(actual.ventas)}</strong>
            </div>

            <div>
              <span>Total costos</span>
              <strong>{formatear(actual.costos)}</strong>
            </div>

            <div>
              <span>Utilidad neta</span>
              <strong>{formatear(actual.utilidad)}</strong>
            </div>

          </div>

        </section>

      </main>

      <footer className="reportes-footer">
        © 2026 LuckyPay — Controla tu Negocio, Crece con Confianza
      </footer>

    </div>
  );
}

export default Reportes;