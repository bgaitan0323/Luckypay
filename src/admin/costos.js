import React, { useMemo, useState } from 'react';
import '../styles/costos.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Costos() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(
    'Silla ergonómica mod. A'
  );
  const [cantidad, setCantidad] = useState(1);

  const productos = [
    {
      id: 1,
      nombre: 'Silla ergonómica mod. A',
      unidad: 'unidad',
      manoObra: 25000,
      insumos: [
        { nombre: 'Madera pino', cantidad: 3, precio: 18000 },
        { nombre: 'Tornillos acero', cantidad: 12, precio: 350 },
        { nombre: 'Tela tapizado', cantidad: 1.5, precio: 22000 },
        { nombre: 'Espuma relleno', cantidad: 1, precio: 15000 },
        { nombre: 'Barniz acabado', cantidad: 0.5, precio: 32000 },
      ],
    },
    {
      id: 2,
      nombre: 'Mesa de trabajo',
      unidad: 'unidad',
      manoObra: 40000,
      insumos: [
        { nombre: 'Madera pino', cantidad: 5, precio: 18000 },
        { nombre: 'Tornillos acero', cantidad: 20, precio: 350 },
        { nombre: 'Barniz acabado', cantidad: 1, precio: 32000 },
      ],
    },
    {
      id: 3,
      nombre: 'Producto personalizado',
      unidad: 'unidad',
      manoObra: 30000,
      insumos: [
        { nombre: 'Madera pino', cantidad: 2, precio: 18000 },
        { nombre: 'Pintura base', cantidad: 0.5, precio: 28000 },
      ],
    },
  ];

  const productoActual = productos.find(
    (producto) => producto.nombre === productoSeleccionado
  );

  const calculo = useMemo(() => {
    if (!productoActual) {
      return {
        materiales: 0,
        manoObra: 0,
        costoUnitario: 0,
        costoProduccion: 0,
      };
    }

    const materiales = productoActual.insumos.reduce(
      (total, insumo) =>
        total + insumo.cantidad * insumo.precio,
      0
    );

    const manoObra = productoActual.manoObra;
    const costoUnitario = materiales + manoObra;
    const costoProduccion = costoUnitario * cantidad;

    return {
      materiales,
      manoObra,
      costoUnitario,
      costoProduccion,
    };
  }, [productoActual, cantidad]);

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor);
  };

  /* =========================
     NAVEGACIÓN
  ========================= */

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

  return (
    <div className="costos-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="costos-navbar">

        {/* BOTÓN MENÚ */}

        <button
          className={`costos-menu-btn ${
            menuAbierto ? 'active' : ''
          }`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>


        {/* MARCA */}

        <div className="costos-brand">

          <img
            src={logo}
            alt="LuckyPay"
          />

          <div>
            <strong>LuckyPay</strong>
            <small>Control de costos</small>
          </div>

        </div>


        {/* USUARIO */}

        <div className="costos-welcome">

          <div className="costos-welcome-text">

            <strong>
              Bienvenido, Administrador
            </strong>

            <small>
              Gestión de costos
            </small>

          </div>

          <button
            className="costos-logout-btn"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </header>


      {/* =========================
          OVERLAY
      ========================= */}

      {menuAbierto && (
        <div
          className="costos-menu-overlay"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`costos-sidebar ${
          menuAbierto ? 'open' : ''
        }`}
      >

        <div className="costos-sidebar-header">

          <div>
            <strong>Menú</strong>
            <span>Administración</span>
          </div>

          <button
            className="costos-sidebar-close"
            onClick={() => setMenuAbierto(false)}
          >
            ×
          </button>

        </div>


        <nav>

          {/* INICIO */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/panel')}
          >
            <span className="sidebar-icon">⌂</span>
            <span>Inicio</span>
          </button>


          {/* INSUMOS */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/insumos')}
          >
            <span className="sidebar-icon">▣</span>
            <span>Insumos</span>
          </button>


          {/* PRODUCTOS */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/productos')}
          >
            <span className="sidebar-icon">◈</span>
            <span>Productos</span>
          </button>


          {/* COSTOS */}

          <button className="costos-sidebar-item active">
            <span className="sidebar-icon">▤</span>
            <span>Costos</span>
          </button>


          {/* META DE VENTAS */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/meta-ventas')}
          >
            <span className="sidebar-icon">◉</span>
            <span>Meta de Ventas</span>
          </button>


          {/* USUARIOS */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/usuarios')}
          >
            <span className="sidebar-icon">♙</span>
            <span>Usuarios y Roles</span>
          </button>


          <div className="costos-sidebar-separator"></div>


          {/* ANÁLISIS */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/analisis')}
          >
            <span className="sidebar-icon">◫</span>
            <span>Análisis</span>
          </button>


          {/* REPORTES */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/reportes')}
          >
            <span className="costos-sidebar-icon">▤</span>
            <span>Reportes</span>
          </button>


          {/* AUDITORÍA */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/auditoria')}
          >
            <span className="costos-sidebar-icon">☷</span>
            <span>Auditoría</span>
          </button>


          {/* CONFIGURACIÓN */}

          <button
            className="costos-sidebar-item"
            onClick={() => navegar('/configuracion')}
          >
            <span className="sidebar-icon">⚙</span>
            <span>Configuración</span>
          </button>


          <div className="costos-sidebar-separator"></div>


          {/* CERRAR SESIÓN */}

          <button
            className="costos-sidebar-item logout"
            onClick={cerrarSesion}
          >
            <span className="sidebar-icon">↪</span>
            <span>Cerrar sesión</span>
          </button>

        </nav>

      </aside>


      {/* =========================
          CONTENIDO
      ========================= */}

      <main className="costos-main">

        <div className="costos-heading">

          <div>

            <span className="costos-eyebrow">
              ADMINISTRACIÓN
            </span>

            <h1>
              Cálculo de Costos
            </h1>

            <p>
              Consulta y calcula el costo estimado de
              producción de tus productos.
            </p>

          </div>


          <div className="costos-fecha">

            <span>Estado</span>

            <strong>
              ● Sistema activo
            </strong>

          </div>

        </div>


        {/* =========================
            SELECTOR
        ========================= */}

        <section className="costos-card costos-selector-card">

          <div className="costos-card-header">

            <div>

              <span className="costos-card-label">
                CALCULADORA
              </span>

              <h2>
                Seleccionar producto
              </h2>

            </div>

          </div>


          <div className="costos-selector-grid">

            <div className="costos-field">

              <label>
                Producto
              </label>

              <select
                value={productoSeleccionado}
                onChange={(e) =>
                  setProductoSeleccionado(e.target.value)
                }
              >

                {productos.map((producto) => (

                  <option
                    key={producto.id}
                    value={producto.nombre}
                  >
                    {producto.nombre}
                  </option>

                ))}

              </select>

            </div>


            <div className="costos-field">

              <label>
                Cantidad a producir
              </label>

              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => {

                  const valor = Number(e.target.value);

                  if (
                    valor < 1 ||
                    Number.isNaN(valor)
                  ) {
                    setCantidad(1);
                  } else {
                    setCantidad(valor);
                  }

                }}
              />

            </div>

          </div>

        </section>


        {/* =========================
            RESUMEN
        ========================= */}

        <section className="costos-summary-grid">

          <div className="costos-summary-card">

            <div className="costos-summary-icon">
              ◈
            </div>

            <div>

              <span>
                Materiales
              </span>

              <strong>
                {formatearPrecio(calculo.materiales)}
              </strong>

            </div>

          </div>


          <div className="costos-summary-card">

            <div className="costos-summary-icon">
              ♙
            </div>

            <div>

              <span>
                Mano de obra
              </span>

              <strong>
                {formatearPrecio(calculo.manoObra)}
              </strong>

            </div>

          </div>


          <div className="costos-summary-card highlight">

            <div className="costos-summary-icon">
              ▤
            </div>

            <div>

              <span>
                Costo unitario
              </span>

              <strong>
                {formatearPrecio(calculo.costoUnitario)}
              </strong>

            </div>

          </div>


          <div className="costos-summary-card">

            <div className="costos-summary-icon">
              ▣
            </div>

            <div>

              <span>
                Costo producción
              </span>

              <strong>
                {formatearPrecio(calculo.costoProduccion)}
              </strong>

            </div>

          </div>

        </section>


        {/* =========================
            DETALLE
        ========================= */}

        <section className="costos-card">

          <div className="costos-card-header">

            <div>

              <span className="costos-card-label">
                DESGLOSE
              </span>

              <h2>
                Detalle del costo
              </h2>

            </div>

            <span className="costos-product-badge">
              {productoActual?.unidad || 'unidad'}
            </span>

          </div>


          <div className="costos-table-wrapper">

            <table className="costos-table">

              <thead>

                <tr>
                  <th>Concepto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Total</th>
                </tr>

              </thead>


              <tbody>

                {productoActual?.insumos.map(
                  (insumo, index) => {

                    const total =
                      insumo.cantidad *
                      insumo.precio;

                    return (

                      <tr
                        key={`${insumo.nombre}-${index}`}
                      >

                        <td>

                          <div className="costos-concepto">

                            <span className="costos-row-icon">
                              ◆
                            </span>

                            <div>

                              <strong>
                                {insumo.nombre}
                              </strong>

                              <small>
                                Insumo
                              </small>

                            </div>

                          </div>

                        </td>

                        <td>
                          {insumo.cantidad}
                        </td>

                        <td>
                          {formatearPrecio(
                            insumo.precio
                          )}
                        </td>

                        <td className="costos-total-cell">
                          {formatearPrecio(total)}
                        </td>

                      </tr>

                    );
                  }
                )}


                <tr className="costos-mano-obra-row">

                  <td>

                    <div className="costos-concepto">

                      <span className="costos-row-icon">
                        ♙
                      </span>

                      <div>

                        <strong>
                          Mano de obra
                        </strong>

                        <small>
                          Producción
                        </small>

                      </div>

                    </div>

                  </td>

                  <td>
                    1
                  </td>

                  <td>
                    {formatearPrecio(
                      calculo.manoObra
                    )}
                  </td>

                  <td className="costos-total-cell">
                    {formatearPrecio(
                      calculo.manoObra
                    )}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>


          {/* TOTAL */}

          <div className="costos-total-box">

            <div>

              <span>
                Costo estimado por unidad
              </span>

              <strong>
                {formatearPrecio(
                  calculo.costoUnitario
                )}
              </strong>

            </div>


            <div>

              <span>
                Costo estimado para {cantidad}{' '}
                {cantidad === 1
                  ? 'unidad'
                  : 'unidades'}
              </span>

              <strong>
                {formatearPrecio(
                  calculo.costoProduccion
                )}
              </strong>

            </div>

          </div>

        </section>


        {/* =========================
            INFORMACIÓN
        ========================= */}

        <section className="costos-info-grid">

          <div className="costos-info-card">

            <div className="costos-info-icon">
              i
            </div>

            <div>

              <h3>
                ¿Cómo se calcula?
              </h3>

              <p>
                El costo unitario corresponde a la suma
                de los materiales utilizados más la mano
                de obra necesaria para fabricar una unidad
                del producto.
              </p>

            </div>

          </div>


          <div className="costos-info-card">

            <div className="costos-info-icon">
              ✓
            </div>

            <div>

              <h3>
                Costos estimados
              </h3>

              <p>
                Los valores mostrados son estimaciones
                basadas en los precios registrados
                actualmente para cada insumo.
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            FOOTER
        ========================= */}

        <footer className="costos-footer">

          <span>
            © 2026 LuckyPay
          </span>

          <span>
            Control de costos de producción
          </span>

        </footer>

      </main>

    </div>
    
  );
}

export default Costos;