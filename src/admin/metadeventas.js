
import React, { useMemo, useState } from 'react';
import '../styles/metadeventas.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function MetaDeVentas() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const [metaMensual, setMetaMensual] = useState(5000000);
  const [ventasActuales] = useState(3250000);

  const progreso = useMemo(() => {
    if (metaMensual <= 0) return 0;

    return Math.min(
      (ventasActuales / metaMensual) * 100,
      100
    );
  }, [metaMensual, ventasActuales]);

  const falta = Math.max(
    metaMensual - ventasActuales,
    0
  );

  const diasRestantes = 12;

  const ventaDiaria =
    diasRestantes > 0
      ? falta / diasRestantes
      : 0;

  const ventasSemana = [
    { dia: 'Lun', valor: 420000 },
    { dia: 'Mar', valor: 510000 },
    { dia: 'Mié', valor: 380000 },
    { dia: 'Jue', valor: 620000 },
    { dia: 'Vie', valor: 540000 },
    { dia: 'Sáb', valor: 710000 },
    { dia: 'Dom', valor: 470000 }
  ];

  const ventasRecientes = [
    {
      producto: 'Silla ergonómica',
      cliente: 'Cliente general',
      fecha: '04 Sep 2026',
      valor: 650000
    },
    {
      producto: 'Escritorio ejecutivo',
      cliente: 'Empresa ABC',
      fecha: '03 Sep 2026',
      valor: 1200000
    },
    {
      producto: 'Mesa auxiliar',
      cliente: 'Cliente general',
      fecha: '02 Sep 2026',
      valor: 420000
    },
    {
      producto: 'Silla ergonómica',
      cliente: 'Empresa XYZ',
      fecha: '01 Sep 2026',
      valor: 980000
    }
  ];

  const formatear = (valor) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(valor);

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

  const guardarMeta = () => {
    alert('Meta de ventas actualizada correctamente.');
  };

  return (
    <div className="meta-page">

      {/* =========================
          NAVBAR
      ========================== */}
      <header className="meta-navbar">

        <div className="meta-navbar-left">

          <button
            type="button"
            className={`meta-menu-btn ${
              menuAbierto ? 'activo' : ''
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
            {menuAbierto ? (
              <span className="meta-menu-x">×</span>
            ) : (
              <>
                <span></span>
                <span></span>
                <span></span>
              </>
            )}
          </button>

          <div className="meta-brand">
            <img src={logo} alt="LuckyPay" />

            <div>
              <strong>LuckyPay</strong>
              <small>Control de ventas</small>
            </div>
          </div>

        </div>

        <div className="meta-welcome">

          <div className="meta-user-info">
            <strong>Bienvenido, Administrador</strong>
            <span>Gestión de meta de ventas</span>
          </div>

          <button
            type="button"
            className="meta-logout-btn"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </header>

      {/* =========================
          OVERLAY
      ========================== */}
      {menuAbierto && (
        <div
          className="meta-menu-overlay"
          onClick={() => setMenuAbierto(false)}
          aria-hidden="true"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside
        className={`meta-sidebar ${
          menuAbierto ? 'abierto' : ''
        }`}
      >

        <div className="meta-sidebar-header">

          <div>
            <span className="meta-sidebar-title">
              MENÚ PRINCIPAL
            </span>

            <p>Administración</p>
          </div>

          <button
            type="button"
            className="meta-sidebar-close"
            onClick={() => setMenuAbierto(false)}
            aria-label="Cerrar menú"
          >
            ×
          </button>

        </div>

        <nav className="meta-sidebar-nav">

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/panel')}
          >
            <span className="meta-sidebar-icon">⌂</span>
            <span>Inicio</span>
          </button>

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/insumos')}
          >
            <span className="meta-sidebar-icon">▤</span>
            <span>Insumos</span>
          </button>

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/productos')}
          >
            <span className="meta-sidebar-icon">◆</span>
            <span>Productos</span>
          </button>

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/costos')}
          >
            <span className="meta-sidebar-icon">$</span>
            <span>Costos</span>
          </button>

          <button
            type="button"
            className="meta-sidebar-item activo"
            onClick={() => setMenuAbierto(false)}
          >
            <span className="meta-sidebar-icon">◇</span>
            <span>Meta de Ventas</span>
          </button>

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/usuarios')}
          >
            <span className="meta-sidebar-icon">♙</span>
            <span>Usuarios y Roles</span>
          </button>

          <div className="meta-sidebar-separator"></div>

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/analisis')}
          >
            <span className="meta-sidebar-icon">◫</span>
            <span>Análisis</span>
          </button>

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/reportes')}
          >
            <span className="meta-sidebar-icon">▤</span>
            <span>Reportes</span>
          </button>

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/auditoria')}
          >
            <span className="meta-sidebar-icon">☷</span>
            <span>Auditoría</span>
          </button>

          <button
            type="button"
            className="meta-sidebar-item"
            onClick={() => navegar('/configuracion')}
          >
            <span className="meta-sidebar-icon">⚙</span>
            <span>Configuración</span>
          </button>

        </nav>

        <div className="meta-sidebar-bottom">

          <button
            type="button"
            className="meta-sidebar-logout"
            onClick={cerrarSesion}
          >
            <span className="meta-sidebar-icon">↪</span>
            <span>Cerrar sesión</span>
          </button>

        </div>

      </aside>

      {/* =========================
          CONTENIDO PRINCIPAL
      ========================== */}
      <main className="meta-main">

        <div className="meta-heading">

          <div>
            <span className="meta-eyebrow">
              VENTAS
            </span>

            <h1>Meta de Ventas</h1>

            <p>
              Define y controla el objetivo de ventas
              de tu negocio.
            </p>
          </div>

          <div className="meta-fecha">
            Septiembre 2026
          </div>

        </div>

        {/* =========================
            ESTADÍSTICAS
        ========================== */}
        <section className="meta-stats">

          <div className="meta-stat-card">

            <div className="meta-stat-icon">
              🎯
            </div>

            <div>
              <span>Meta mensual</span>

              <strong>
                {formatear(metaMensual)}
              </strong>
            </div>

          </div>

          <div className="meta-stat-card">

            <div className="meta-stat-icon">
              💰
            </div>

            <div>
              <span>Ventas actuales</span>

              <strong>
                {formatear(ventasActuales)}
              </strong>
            </div>

          </div>

          <div className="meta-stat-card">

            <div className="meta-stat-icon">
              📈
            </div>

            <div>
              <span>Progreso</span>

              <strong>
                {progreso.toFixed(1)}%
              </strong>
            </div>

          </div>

          <div className="meta-stat-card">

            <div className="meta-stat-icon">
              ⏳
            </div>

            <div>
              <span>Falta por vender</span>

              <strong>
                {formatear(falta)}
              </strong>
            </div>

          </div>

        </section>

        {/* =========================
            PROGRESO + CONFIGURACIÓN
        ========================== */}
        <section className="meta-grid">

          <div className="meta-card meta-progress-card">

            <div className="meta-card-header">

              <div>
                <span className="meta-card-label">
                  OBJETIVO DEL MES
                </span>

                <h2>
                  Progreso de ventas
                </h2>
              </div>

              <span className="meta-percent">
                {progreso.toFixed(0)}%
              </span>

            </div>

            <div className="meta-progress-track">

              <div
                className="meta-progress-bar"
                style={{
                  width: `${progreso}%`
                }}
              ></div>

            </div>

            <div className="meta-progress-values">

              <span>
                {formatear(ventasActuales)}
              </span>

              <span>
                {formatear(metaMensual)}
              </span>

            </div>

            <div className="meta-message">

              {progreso >= 100
                ? '¡Meta alcanzada! Excelente trabajo.'
                : `Te faltan ${formatear(
                    falta
                  )} para alcanzar la meta.`}

            </div>

          </div>

          <div className="meta-card">

            <div className="meta-card-header">

              <div>
                <span className="meta-card-label">
                  CONFIGURACIÓN
                </span>

                <h2>
                  Actualizar meta
                </h2>
              </div>

            </div>

            <label
              className="meta-input-label"
              htmlFor="meta-mensual"
            >
              Meta mensual
            </label>

            <div className="meta-input-money">

              <span>$</span>

              <input
                id="meta-mensual"
                type="number"
                min="0"
                value={metaMensual}
                onChange={(e) =>
                  setMetaMensual(
                    Number(e.target.value)
                  )
                }
              />

            </div>

            <button
              type="button"
              className="meta-save-btn"
              onClick={guardarMeta}
            >
              Guardar meta
            </button>

          </div>

        </section>

        {/* =========================
            INFORMACIÓN
        ========================== */}
        <section className="meta-info-grid">

          <div className="meta-info-card">

            <span className="meta-info-icon">
              📅
            </span>

            <div>
              <span>Días restantes</span>

              <strong>
                {diasRestantes} días
              </strong>
            </div>

          </div>

          <div className="meta-info-card">

            <span className="meta-info-icon">
              🚀
            </span>

            <div>
              <span>
                Venta diaria recomendada
              </span>

              <strong>
                {formatear(ventaDiaria)}
              </strong>
            </div>

          </div>

          <div className="meta-info-card">

            <span className="meta-info-icon">
              🏆
            </span>

            <div>
              <span>
                Estado de la meta
              </span>

              <strong>
                {progreso >= 80
                  ? 'Muy buen ritmo'
                  : 'En progreso'}
              </strong>
            </div>

          </div>

        </section>

        {/* =========================
            GRÁFICA
        ========================== */}
        <section className="meta-card meta-chart-card">

          <div className="meta-card-header">

            <div>
              <span className="meta-card-label">
                RENDIMIENTO
              </span>

              <h2>
                Ventas de la semana
              </h2>
            </div>

          </div>

          <div className="meta-chart">

            {ventasSemana.map((venta) => {

              const maxVenta = Math.max(
                ...ventasSemana.map(
                  (item) => item.valor
                )
              );

              const altura =
                maxVenta > 0
                  ? (venta.valor / maxVenta) * 100
                  : 0;

              return (
                <div
                  className="meta-bar-column"
                  key={venta.dia}
                >

                  <span className="meta-bar-value">
                    {formatear(venta.valor)}
                  </span>

                  <div className="meta-bar-area">

                    <div
                      className="meta-bar"
                      style={{
                        height: `${altura}%`
                      }}
                    ></div>

                  </div>

                  <span className="meta-bar-day">
                    {venta.dia}
                  </span>

                </div>
              );
            })}

          </div>

        </section>

        {/* =========================
            VENTAS RECIENTES
        ========================== */}
        <section className="meta-card meta-sales-card">

          <div className="meta-card-header">

            <div>
              <span className="meta-card-label">
                REGISTRO
              </span>

              <h2>
                Ventas recientes
              </h2>
            </div>

            <span className="meta-count">
              {ventasRecientes.length} ventas
            </span>

          </div>

          <div className="meta-sales-table">

            <div className="meta-sales-row meta-sales-head">

              <span>Producto</span>
              <span>Cliente</span>
              <span>Fecha</span>
              <span>Valor</span>

            </div>

            {ventasRecientes.map(
              (venta, index) => (

                <div
                  className="meta-sales-row"
                  key={`${venta.producto}-${index}`}
                >

                  <span className="meta-product-name">
                    {venta.producto}
                  </span>

                  <span>
                    {venta.cliente}
                  </span>

                  <span>
                    {venta.fecha}
                  </span>

                  <strong>
                    {formatear(venta.valor)}
                  </strong>

                </div>

              )
            )}

          </div>

        </section>

        <footer className="meta-footer">
          © 2026 LuckyPay — Controla tu Negocio,
          Crece con Confianza
        </footer>

      </main>

    </div>
  );
}

export default MetaDeVentas;

