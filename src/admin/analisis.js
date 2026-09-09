import React, { useMemo, useState } from 'react';
import '../styles/analisis.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Analisis() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [periodo, setPeriodo] = useState('Este mes');

  const datos = {
    'Este mes': {
      ventas: 8450000,
      costos: 5230000,
      utilidad: 3220000,
      margen: 38.1
    },

    'Mes anterior': {
      ventas: 7680000,
      costos: 4970000,
      utilidad: 2710000,
      margen: 35.3
    },

    'Últimos 3 meses': {
      ventas: 22150000,
      costos: 14680000,
      utilidad: 7470000,
      margen: 33.7
    }
  };

  const actual = datos[periodo];

  const variacionVentas = useMemo(() => {
    if (periodo === 'Mes anterior') return -8.4;
    if (periodo === 'Últimos 3 meses') return 12.7;
    return 10.0;
  }, [periodo]);

  const ventasMensuales = [
    { mes: 'Abr', valor: 6200000 },
    { mes: 'May', valor: 7100000 },
    { mes: 'Jun', valor: 6800000 },
    { mes: 'Jul', valor: 7450000 },
    { mes: 'Ago', valor: 7680000 },
    { mes: 'Sep', valor: 8450000 }
  ];

  const productos = [
    {
      nombre: 'Silla ergonómica',
      ventas: 2450000,
      unidades: 18
    },
    {
      nombre: 'Escritorio ejecutivo',
      ventas: 1980000,
      unidades: 9
    },
    {
      nombre: 'Mesa auxiliar',
      ventas: 1260000,
      unidades: 12
    },
    {
      nombre: 'Silla visitante',
      ventas: 980000,
      unidades: 14
    }
  ];

  const costos = [
    {
      nombre: 'Materiales',
      valor: 3150000
    },
    {
      nombre: 'Mano de obra',
      valor: 1280000
    },
    {
      nombre: 'Otros costos',
      valor: 800000
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

  const mostrarProximamente = (nombre) => {
    alert(`${nombre} estará disponible próximamente.`);
  };

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  const maxVenta = Math.max(
    ...ventasMensuales.map((item) => item.valor)
  );

  const maxProducto = Math.max(
    ...productos.map((item) => item.ventas)
  );

  const totalCostos = costos.reduce(
    (total, item) => total + item.valor,
    0
  );

  return (
    <div className="analisis-page">

      {/* ================= NAVBAR ================= */}

      <header className="analisis-navbar">

        <button
          className={`analisis-menu ${
            menuAbierto ? 'activo' : ''
          }`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="analisis-brand">
          <img src={logo} alt="LuckyPay" />
          <span>LuckyPay</span>
        </div>

        <div className="analisis-welcome">
          Panel administrativo
        </div>

      </header>

      {/* ================= OVERLAY ================= */}

      {menuAbierto && (
        <div
          className="analisis-menu-overlay"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`analisis-sidebar ${
          menuAbierto ? 'abierto' : ''
        }`}
      >

        <div className="analisis-sidebar-header">

          <span>Menú</span>

          <button
            className="analisis-sidebar-close"
            onClick={() => setMenuAbierto(false)}
          >
            ×
          </button>

        </div>

        <button
          className="analisis-sidebar-item"
          onClick={() => navegar('/panel')}
        >
          <span className="analisis-sidebar-icon">⌂</span>
          <span>Inicio</span>
        </button>

        <button
          className="analisis-sidebar-item"
          onClick={() => navegar('/insumos')}
        >
          <span className="analisis-sidebar-icon">▣</span>
          <span>Insumos</span>
        </button>

        <button
          className="analisis-sidebar-item"
          onClick={() => navegar('/productos')}
        >
          <span className="analisis-sidebar-icon">▤</span>
          <span>Productos</span>
        </button>

        <button
          className="analisis-sidebar-item"
          onClick={() => navegar('/costos')}
        >
          <span className="analisis-sidebar-icon">$</span>
          <span>Costos</span>
        </button>

        <button
          className="analisis-sidebar-item"
          onClick={() => navegar('/meta-ventas')}
        >
          <span className="analisis-sidebar-icon">◎</span>
          <span>Meta de Ventas</span>
        </button>

        <button
          className="analisis-sidebar-item"
          onClick={() => navegar('/usuarios')}
        >
          <span className="analisis-sidebar-icon">♙</span>
          <span>Usuarios y Roles</span>
        </button>

        <button
          className="analisis-sidebar-item activo"
          onClick={() => navegar('/analisis')}
        >
          <span className="analisis-sidebar-icon">▦</span>
          <span>Análisis</span>
        </button>

       <button
        className="analisis-sidebar-item"
          onClick={() => navegar('/reportes')}
           >
         <span className="analisis-sidebar-icon">▤</span>
         <span>Reportes</span>
         </button>

        <button
  className="analisis-sidebar-item"
  onClick={() => navegar('/auditoria')}
>
  <span className="analisis-sidebar-icon">☷</span>
  <span>Auditoría</span>
</button>

      <button
  className="analisis-sidebar-item"
  onClick={() => navegar('/configuracion')}
>
  <span className="analisis-sidebar-icon">⚙</span>
  <span>Configuración</span>
</button>

        <div className="analisis-sidebar-separator"></div>

        <button
          className="analisis-sidebar-item analisis-logout"
          onClick={cerrarSesion}
        >
          <span className="analisis-sidebar-icon">↪</span>
          <span>Cerrar sesión</span>
        </button>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="analisis-main">

        {/* ================= ENCABEZADO ================= */}

        <section className="analisis-heading">

          <div>

            <div className="analisis-eyebrow">
              INFORMACIÓN DEL NEGOCIO
            </div>

            <h1>Análisis</h1>

            <p>
              Revisa el comportamiento financiero y comercial
              de tu negocio.
            </p>

          </div>

          {/* ================= PERÍODO ================= */}

          <div
            className="analisis-periodo"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px'
            }}
          >

            <label
              style={{
                color: '#999',
                fontSize: '12px'
              }}
            >
              Período
            </label>

            <select
              value={periodo}
              onChange={(e) =>
                setPeriodo(e.target.value)
              }
              style={{
                width: '172px',
                height: '40px',
                padding: '0 42px 0 16px',
                borderRadius: '22px',
                border: '1px solid #806b20',
                backgroundColor: '#151515',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',

                backgroundImage:
                  'linear-gradient(45deg, transparent 50%, #d4af37 50%), linear-gradient(135deg, #d4af37 50%, transparent 50%)',

                backgroundPosition:
                  'calc(100% - 17px) 16px, calc(100% - 11px) 16px',

                backgroundSize:
                  '6px 6px, 6px 6px',

                backgroundRepeat: 'no-repeat'
              }}
            >

              <option
                style={{
                  background: '#151515',
                  color: '#fff'
                }}
              >
                Este mes
              </option>

              <option
                style={{
                  background: '#151515',
                  color: '#fff'
                }}
              >
                Mes anterior
              </option>

              <option
                style={{
                  background: '#151515',
                  color: '#fff'
                }}
              >
                Últimos 3 meses
              </option>

            </select>

          </div>

        </section>

        {/* ================= ESTADÍSTICAS ================= */}

        <section className="analisis-stats">

          <div className="analisis-stat-card">

            <div className="analisis-stat-icon">
              $
            </div>

            <div>
              <small>Ventas</small>

              <strong>
                {formatear(actual.ventas)}
              </strong>

              <p
                className={
                  variacionVentas >= 0
                    ? 'positive'
                    : 'negative'
                }
              >
                {variacionVentas >= 0 ? '↗' : '↘'}{' '}
                {Math.abs(variacionVentas)}% vs período anterior
              </p>
            </div>

          </div>

          <div className="analisis-stat-card">

            <div className="analisis-stat-icon">
              ◈
            </div>

            <div>
              <small>Costos</small>

              <strong>
                {formatear(actual.costos)}
              </strong>

              <p>
                Costos totales
              </p>
            </div>

          </div>

          <div className="analisis-stat-card">

            <div className="analisis-stat-icon">
              ↗
            </div>

            <div>
              <small>Utilidad</small>

              <strong>
                {formatear(actual.utilidad)}
              </strong>

              <p className="positive">
                Resultado positivo
              </p>
            </div>

          </div>

          <div className="analisis-stat-card">

            <div className="analisis-stat-icon">
              %
            </div>

            <div>
              <small>Margen de utilidad</small>

              <strong>
                {actual.margen}%
              </strong>

              <p>
                Margen promedio
              </p>
            </div>

          </div>

        </section>

        {/* ================= GRÁFICO DE VENTAS ================= */}

        <section className="analisis-card analisis-chart-card">

          <div className="analisis-card-header">

            <span className="analisis-card-label">
              Ventas mensuales
            </span>

            <span className="analisis-card-info">
              Comportamiento de las ventas
            </span>

          </div>

          <div className="analisis-chart">

            {ventasMensuales.map((item) => {

              const altura =
                (item.valor / maxVenta) * 100;

              return (
                <div
                  className="analisis-bar-column"
                  key={item.mes}
                >

                  <div className="analisis-bar-value">
                    {formatear(item.valor)}
                  </div>

                  <div className="analisis-bar-area">

                    <div
                      className="analisis-bar"
                      style={{
                        height: `${altura}%`
                      }}
                    ></div>

                  </div>

                  <div className="analisis-bar-label">
                    {item.mes}
                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* ================= PRODUCTOS Y COSTOS ================= */}

        <section className="analisis-two-columns">

          {/* PRODUCTOS */}

          <div className="analisis-card">

            <div className="analisis-card-header">

              <span className="analisis-card-label">
                Productos más vendidos
              </span>

              <span className="analisis-card-info">
                Ventas
              </span>

            </div>

            <div className="analisis-product-list">

              {productos.map((producto) => {

                const porcentaje =
                  (producto.ventas / maxProducto) * 100;

                return (
                  <div
                    className="analisis-product-row"
                    key={producto.nombre}
                  >

                    <div className="analisis-product-top">

                      <span className="analisis-product-name">
                        {producto.nombre}
                      </span>

                      <span className="analisis-product-number">
                        {formatear(producto.ventas)}
                      </span>

                    </div>

                    <div className="analisis-product-bar">

                      <div
                        style={{
                          width: `${porcentaje}%`
                        }}
                      ></div>

                    </div>

                    <small>
                      {producto.unidades} unidades vendidas
                    </small>

                  </div>
                );
              })}

            </div>

          </div>

          {/* COSTOS */}

          <div className="analisis-card">

            <div className="analisis-card-header">

              <span className="analisis-card-label">
                Distribución de costos
              </span>

              <span className="analisis-card-info">
                Total: {formatear(totalCostos)}
              </span>

            </div>

            <div className="analisis-cost-list">

              {costos.map((costo) => {

                const porcentaje =
                  (costo.valor / totalCostos) * 100;

                return (
                  <div
                    className="analisis-cost-row"
                    key={costo.nombre}
                  >

                    <div className="analisis-cost-top">

                      <span>
                        {costo.nombre}
                      </span>

                      <span>
                        {formatear(costo.valor)}
                      </span>

                    </div>

                    <div className="analisis-cost-bar">

                      <div
                        style={{
                          width: `${porcentaje}%`
                        }}
                      ></div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </section>

        {/* ================= RESUMEN ================= */}

        <section className="analisis-card analisis-summary">

          <div className="analisis-card-header">

            <span className="analisis-card-label">
              Resumen financiero
            </span>

            <span className="analisis-card-info">
              {periodo}
            </span>

          </div>

          <div className="analisis-summary-grid">

            <div>
              <span>
                Total ventas
              </span>

              <strong>
                {formatear(actual.ventas)}
              </strong>
            </div>

            <div>
              <span>
                Total costos
              </span>

              <strong>
                {formatear(actual.costos)}
              </strong>
            </div>

            <div>
              <span>
                Utilidad
              </span>

              <strong className="highlight">
                {formatear(actual.utilidad)}
              </strong>
            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="analisis-footer">
        © 2026 LuckyPay — Controla tu Negocio, Crece con Confianza
      </footer>

    </div>
  );
}

export default Analisis;