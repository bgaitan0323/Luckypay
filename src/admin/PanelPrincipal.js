import React, { useEffect, useMemo, useState } from 'react';
import '../styles/Panel.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

// =====================================================
// DATOS INICIALES
// =====================================================

const productosIniciales = [
  {
    id: 1,
    nombre: 'Jabón Karité',
    mp: 3200,
    mo: 1100,
    cif: 700,
    pv: 8900,
    cf: 1800000,
  },
  {
    id: 2,
    nombre: 'Vela Aromática Lavanda',
    mp: 2100,
    mo: 900,
    cif: 500,
    pv: 6500,
    cf: 1200000,
  },
  {
    id: 3,
    nombre: 'Silla Mod. A',
    mp: 45000,
    mo: 18000,
    cif: 9000,
    pv: 98000,
    cf: 3500000,
  },
  {
    id: 4,
    nombre: 'Crema Corporal Aloe',
    mp: 4800,
    mo: 1600,
    cif: 900,
    pv: 13900,
    cf: 1500000,
  },
  {
    id: 5,
    nombre: 'Cojín Tapizado',
    mp: 22000,
    mo: 9000,
    cif: 4000,
    pv: 52000,
    cf: 2200000,
  },
  {
    id: 6,
    nombre: 'Difusor de Aromas',
    mp: 6200,
    mo: 2200,
    cif: 1100,
    pv: 7500,
    cf: 900000,
  },
  {
    id: 7,
    nombre: 'Banco Auxiliar',
    mp: 38000,
    mo: 15000,
    cif: 7000,
    pv: 89000,
    cf: 2600000,
  },
];

const insumosIniciales = [
  {
    id: 1,
    nombre: 'Manteca de Karité',
    u: 'kg',
    s: 4,
    m: 10,
  },
  {
    id: 2,
    nombre: 'Cera de Abeja',
    u: 'kg',
    s: 18,
    m: 15,
  },
  {
    id: 3,
    nombre: 'Aceite de Lavanda',
    u: 'lt',
    s: 2,
    m: 8,
  },
  {
    id: 4,
    nombre: 'Madera de Pino',
    u: 'm²',
    s: 22,
    m: 20,
  },
  {
    id: 5,
    nombre: 'Aloe Vera (gel)',
    u: 'kg',
    s: 5,
    m: 12,
  },
  {
    id: 6,
    nombre: 'Tela para Cojín',
    u: 'mts',
    s: 30,
    m: 25,
  },
  {
    id: 7,
    nombre: 'Frascos de Vidrio',
    u: 'und',
    s: 80,
    m: 100,
  },
  {
    id: 8,
    nombre: 'Aceite Esencial Mix',
    u: 'lt',
    s: 3,
    m: 5,
  },
];

const actividadInicial = [
  {
    ini: 'AD',
    desc: 'Administrador actualizó el costo de Silla Mod. A',
    mod: 'Costos',
    t: 'Hace 12 min',
  },
  {
    ini: 'MR',
    desc: 'María R. agregó insumo Aceite de Palma',
    mod: 'Insumos',
    t: 'Hace 38 min',
  },
  {
    ini: 'JP',
    desc: 'Juan P. exportó reporte de costos en PDF',
    mod: 'Reportes',
    t: 'Hace 1 h',
  },
  {
    ini: 'AD',
    desc: 'Administrador creó producto Loción Corporal',
    mod: 'Productos',
    t: 'Hace 2 h',
  },
  {
    ini: 'LC',
    desc: 'Laura C. configuró umbrales de stock mínimo',
    mod: 'Insumos',
    t: 'Ayer 4:30 pm',
  },
  {
    ini: 'JP',
    desc: 'Juan P. revisó la meta de ventas de Cojín Tapizado',
    mod: 'Meta de Ventas',
    t: 'Ayer 2:10 pm',
  },
];

const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const diasSemana = [
  'Do',
  'Lu',
  'Ma',
  'Mi',
  'Ju',
  'Vi',
  'Sá',
];

// =====================================================
// FUNCIONES AUXILIARES
// =====================================================

const dinero = (valor) =>
  `$${Math.round(valor).toLocaleString('es-CO')}`;

function calcularProducto(producto) {
  const costoVariable = producto.mp + producto.mo;
  const costoTotal = costoVariable + producto.cif;

  const margenContribucion =
    producto.pv - costoVariable;

  const alerta = margenContribucion <= 0;

  const puntoEquilibrio = alerta
    ? null
    : Math.ceil(
        producto.cf / margenContribucion
      );

  const margenPct =
    producto.pv > 0
      ? ((producto.pv - costoTotal) /
          producto.pv) *
        100
      : 0;

  return {
    ...producto,
    costoVariable,
    costoTotal,
    margenContribucion,
    puntoEquilibrio,
    margenPct,
    alerta,
  };
}

function obtenerFechaActual() {
  const ahora = new Date();

  return {
    dia: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ][ahora.getDay()],

    numero: ahora.getDate(),

    mes: meses[ahora.getMonth()],

    año: ahora.getFullYear(),

    hora: ahora.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  };
}

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

function PanelPrincipal() {
  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const [fechaActual, setFechaActual] =
    useState(obtenerFechaActual());

  const [insumos, setInsumos] =
    useState(insumosIniciales);

  const [alertasResueltas, setAlertasResueltas] =
    useState(new Set());

  const [actividad] =
    useState(actividadInicial);

  // ===================================================
  // CALENDARIO
  // ===================================================

  const ahora = new Date();

  const [calYear, setCalYear] =
    useState(ahora.getFullYear());

  const [calMonth, setCalMonth] =
    useState(ahora.getMonth());

  const [diaSeleccionado, setDiaSeleccionado] =
    useState(null);

  const [eventos, setEventos] =
    useState([]);

  // ===================================================
  // MODALES
  // ===================================================

  const [modalAlertas, setModalAlertas] =
    useState(false);

  const [modalUmbrales, setModalUmbrales] =
    useState(false);

  const [modalEvento, setModalEvento] =
    useState(false);

  const [umbralesTemporales, setUmbralesTemporales] =
    useState({});

  const [eventoFecha, setEventoFecha] =
    useState('');

  const [eventoTipo, setEventoTipo] =
    useState('auditoria');

  const [eventoDesc, setEventoDesc] =
    useState('');

  const [toast, setToast] =
    useState('');

  // ===================================================
  // FONT AWESOME
  // ===================================================

  useEffect(() => {
    const existe = document.querySelector(
      'link[data-luckypay-fontawesome]'
    );

    if (!existe) {
      const link =
        document.createElement('link');

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

  // ===================================================
  // RELOJ
  // ===================================================

  useEffect(() => {
    const actualizar = () => {
      setFechaActual(
        obtenerFechaActual()
      );
    };

    const intervalo =
      setInterval(actualizar, 1000);

    return () =>
      clearInterval(intervalo);
  }, []);

  // ===================================================
  // TOAST
  // ===================================================

  const mostrarToast = (mensaje) => {
    setToast(mensaje);

    window.clearTimeout(
      window.__luckypayToast
    );

    window.__luckypayToast =
      window.setTimeout(() => {
        setToast('');
      }, 3000);
  };

  // ===================================================
  // NAVEGACIÓN
  // ===================================================

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  // ===================================================
  // CERRAR SESIÓN
  // ===================================================

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');

    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');

    window.location.href = '/';
  };

  // ===================================================
  // PRODUCTOS
  // ===================================================

  const productos = useMemo(
    () =>
      productosIniciales.map(
        calcularProducto
      ),
    []
  );

  // ===================================================
  // TOTALES
  // ===================================================

  const totales = useMemo(
    () => ({
      costo: productos.reduce(
        (total, item) =>
          total + item.costoTotal,
        0
      ),

      ingresos: productos.reduce(
        (total, item) =>
          total + item.pv,
        0
      ),

      ganancia: productos.reduce(
        (total, item) =>
          total +
          (item.pv - item.costoTotal),
        0
      ),
    }),
    [productos]
  );

  // ===================================================
  // ALERTAS
  // ===================================================

  const alertasStock = useMemo(
    () =>
      insumos
        .filter(
          (item) =>
            item.s < item.m &&
            !alertasResueltas.has(item.id)
        )
        .sort(
          (a, b) =>
            a.s / a.m -
            b.s / b.m
        ),
    [insumos, alertasResueltas]
  );

  const alertasTotales = useMemo(
    () =>
      insumos.filter(
        (item) =>
          item.s < item.m
      ),
    [insumos]
  );

  // ===================================================
  // CALENDARIO
  // ===================================================

  const diasDelMes = useMemo(() => {
    const primerDia =
      new Date(
        calYear,
        calMonth,
        1
      ).getDay();

    const cantidadDias =
      new Date(
        calYear,
        calMonth + 1,
        0
      ).getDate();

    const dias = [];

    for (
      let i = 0;
      i < primerDia;
      i += 1
    ) {
      dias.push(null);
    }

    for (
      let dia = 1;
      dia <= cantidadDias;
      dia += 1
    ) {
      dias.push(dia);
    }

    return dias;
  }, [calYear, calMonth]);

  const eventosIniciales =
    useMemo(() => {
      const prefijo =
        `${calYear}-${String(
          calMonth + 1
        ).padStart(2, '0')}`;

      return eventos
        .filter((evento) =>
          evento.fecha.startsWith(
            prefijo
          )
        )
        .sort((a, b) =>
          a.fecha.localeCompare(
            b.fecha
          )
        );
    }, [
      eventos,
      calYear,
      calMonth,
    ]);

  const tieneEvento = (dia) => {
    const fecha =
      `${calYear}-${String(
        calMonth + 1
      ).padStart(2, '0')}-${String(
        dia
      ).padStart(2, '0')}`;

    return eventos.some(
      (evento) =>
        evento.fecha === fecha
    );
  };

  const eventosMostrar =
    diaSeleccionado
      ? eventosIniciales.filter(
          (evento) =>
            Number(
              evento.fecha.split('-')[2]
            ) === diaSeleccionado
        )
      : eventosIniciales;

  const cambiarMes = (direccion) => {
    setDiaSeleccionado(null);

    if (
      direccion === 'anterior'
    ) {
      if (calMonth === 0) {
        setCalMonth(11);
        setCalYear(
          (valor) => valor - 1
        );
      } else {
        setCalMonth(
          (valor) => valor - 1
        );
      }
    } else {
      if (calMonth === 11) {
        setCalMonth(0);
        setCalYear(
          (valor) => valor + 1
        );
      } else {
        setCalMonth(
          (valor) => valor + 1
        );
      }
    }
  };

  const fechaEsHoy = (dia) =>
    fechaActual.año === calYear &&
    meses.indexOf(
      fechaActual.mes
    ) === calMonth &&
    fechaActual.numero === dia;

  // ===================================================
  // ALERTAS
  // ===================================================

  const abrirAlertas = () => {
    setModalAlertas(true);
  };

  const resolverAlerta = (id) => {
    setAlertasResueltas(
      (anteriores) => {
        const nuevo =
          new Set(anteriores);

        nuevo.add(id);

        return nuevo;
      }
    );

    mostrarToast(
      'Alerta marcada como resuelta.'
    );
  };

  // ===================================================
  // UMBRALES
  // ===================================================

  const abrirUmbrales = () => {
    const valores = {};

    insumos.forEach((item) => {
      valores[item.id] =
        item.m;
    });

    setUmbralesTemporales(
      valores
    );

    setModalAlertas(false);
    setModalUmbrales(true);
  };

  const guardarUmbrales = () => {
    setInsumos(
      (anteriores) =>
        anteriores.map((item) => {
          const valor =
            Number(
              umbralesTemporales[
                item.id
              ]
            );

          if (
            Number.isFinite(valor) &&
            valor >= 0
          ) {
            return {
              ...item,
              m: valor,
            };
          }

          return item;
        })
    );

    setAlertasResueltas(
      new Set()
    );

    setModalUmbrales(false);

    mostrarToast(
      'Umbrales actualizados correctamente.'
    );
  };

  // ===================================================
  // EVENTOS
  // ===================================================

  const abrirEvento = () => {
    const hoy = new Date();

    setEventoFecha(
      `${hoy.getFullYear()}-${String(
        hoy.getMonth() + 1
      ).padStart(2, '0')}-${String(
        hoy.getDate()
      ).padStart(2, '0')}`
    );

    setEventoTipo(
      'auditoria'
    );

    setEventoDesc('');

    setModalEvento(true);
  };

  const guardarEvento = () => {
    if (
      !eventoFecha ||
      !eventoDesc.trim()
    ) {
      mostrarToast(
        'Completa la fecha y la descripción.'
      );

      return;
    }

    setEventos(
      (anteriores) => [
        ...anteriores,
        {
          fecha: eventoFecha,
          tipo: eventoTipo,
          desc: eventoDesc.trim(),
        },
      ]
    );

    const [año, mes] =
      eventoFecha
        .split('-')
        .map(Number);

    setCalYear(año);
    setCalMonth(mes - 1);
    setDiaSeleccionado(null);

    setModalEvento(false);

    mostrarToast(
      'Recordatorio agregado al calendario.'
    );
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="panel-page">

      {/* =============================================
          NAVBAR
      ============================================= */}

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
              LuckyPay <b>ADMIN</b>
            </span>

          </div>

        </div>

        <div className="welcome">

          <div className="welcome-text">

            <strong>
              Bienvenido Administrador
            </strong>

            <span>
              Panel de administración
            </span>

          </div>

          <button
            type="button"
            className="logout-btn"
            onClick={cerrarSesion}
          >
            <i className="fas fa-right-from-bracket"></i>
            Salir
          </button>

        </div>

      </header>

      {/* =============================================
          OVERLAY
      ============================================= */}

      {menuAbierto && (
        <div
          className="menu-overlay"
          onClick={() =>
            setMenuAbierto(false)
          }
        ></div>
      )}

      {/* =============================================
          MENÚ LATERAL
      ============================================= */}

      {menuAbierto && (
        <aside className="panel-sidebar">

          <div className="sidebar-header">

            <span className="sidebar-title">
              MENÚ PRINCIPAL
            </span>

          </div>

          <nav className="sidebar-nav">

            {/* INICIO */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/panel'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar('/panel')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-house"></i>
              </span>

              <span>
                Inicio
              </span>
            </button>

            {/* INSUMOS */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/insumos'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar('/insumos')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-boxes-stacked"></i>
              </span>

              <span>
                Insumos
              </span>
            </button>

            {/* PRODUCTOS */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/productos'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar('/productos')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-box-open"></i>
              </span>

              <span>
                Productos
              </span>
            </button>

            {/* COSTOS */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/costos'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar('/costos')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-dollar-sign"></i>
              </span>

              <span>
                Costos
              </span>
            </button>

            {/* META DE VENTAS */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/meta-ventas'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar(
                  '/meta-ventas'
                )
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-bullseye"></i>
              </span>

              <span>
                Meta de ventas
              </span>
            </button>

            {/* USUARIOS */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/usuarios'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar('/usuarios')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-users"></i>
              </span>

              <span>
                Usuarios y roles
              </span>
            </button>

            {/* ANÁLISIS */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/analisis'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar('/analisis')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-chart-line"></i>
              </span>

              <span>
                Análisis
              </span>
            </button>

            {/* REPORTES */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/reportes'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar('/reportes')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-file-lines"></i>
              </span>

              <span>
                Reportes
              </span>
            </button>

            {/* AUDITORÍA */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/auditoria'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar('/auditoria')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-clipboard-check"></i>
              </span>

              <span>
                Auditoría
              </span>
            </button>

            {/* CONFIGURACIÓN */}

            <button
              type="button"
              className={`sidebar-item ${
                window.location.pathname ===
                '/configuracion'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navegar(
                  '/configuracion'
                )
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-gear"></i>
              </span>

              <span>
                Configuración
              </span>
            </button>

            {/* CERRAR SESIÓN
                QUEDA DIRECTAMENTE DEBAJO
                DE CONFIGURACIÓN */}

            <button
              type="button"
              className="sidebar-logout"
              onClick={cerrarSesion}
            >
              <i className="fas fa-right-from-bracket"></i>

              <span>
                Cerrar sesión
              </span>
            </button>

          </nav>

        </aside>
      )}

      {/* =============================================
          CONTENIDO PRINCIPAL
      ============================================= */}

      <main className="panel-main">

        {/* ===========================================
            ENCABEZADO
        =========================================== */}

        <section className="panel-heading">

          <div>

            <span className="eyebrow">
              PANEL ADMINISTRATIVO
            </span>

            <h1>
              ¡Bienvenido, Administrador!
              <span className="heading-wave">
                👋
              </span>
            </h1>

            <p>
              Aquí tienes el resumen financiero
              de LuckyPay actualizado en tiempo real.
            </p>

            <div className="badge-live">

              <span className="dot"></span>

              Dashboard activo

            </div>

          </div>

          <div className="fecha-panel">

            <span>
              {fechaActual.dia.toUpperCase()}
            </span>

            <strong>
              {fechaActual.numero} DE{' '}
              {fechaActual.mes.toUpperCase()} DE{' '}
              {fechaActual.año}
            </strong>

            <small>
              {fechaActual.hora}
            </small>

          </div>

        </section>

        {/* ===========================================
            ACCESOS RÁPIDOS
        =========================================== */}

        <section className="quick-card dashboard-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                GESTIÓN
              </span>

              <h2>
                Accesos rápidos
              </h2>

            </div>

          </div>

          <div className="quick-grid">

            {[
              [
                '/insumos',
                'plus',
                'Nuevo insumo',
                'Registrar insumo',
              ],
              [
                '/productos',
                'box-open',
                'Nuevo producto',
                'Registrar producto',
              ],
              [
                '/costos',
                'dollar-sign',
                'Registrar costo',
                'Gestionar costos',
              ],
              [
                '/meta-ventas',
                'bullseye',
                'Meta de ventas',
                'Consultar meta',
              ],
              [
                '/reportes',
                'file-lines',
                'Ver reportes',
                'Consultar información',
              ],
              [
                '/analisis',
                'chart-line',
                'Análisis',
                'Ver indicadores',
              ],
              [
                '/auditoria',
                'clipboard-check',
                'Auditoría',
                'Revisar movimientos',
              ],
              [
                '/usuarios',
                'users',
                'Usuarios',
                'Gestionar usuarios',
              ],
            ].map(
              ([
                ruta,
                icono,
                titulo,
                subtitulo,
              ]) => (
                <button
                  key={ruta}
                  type="button"
                  className="quick-action"
                  onClick={() =>
                    navegar(ruta)
                  }
                >
                  <span>
                    <i
                      className={`fas fa-${icono}`}
                    ></i>
                  </span>

                  <strong>
                    {titulo}
                  </strong>

                  <small>
                    {subtitulo}
                  </small>
                </button>
              )
            )}

          </div>

        </section>

        {/* ===========================================
            TARJETAS KPI
        =========================================== */}

        <section className="stats-grid">

          <div className="stat-card kpi-card">

            <div className="stat-icon">
              <i className="fas fa-industry"></i>
            </div>

            <div className="stat-content">

              <span>
                COSTO TOTAL PRODUCCIÓN
              </span>

              <strong>
                {dinero(totales.costo)}
              </strong>

              <small>
                {productos.length} productos registrados
              </small>

            </div>

          </div>

          <div className="stat-card kpi-card">

            <div className="stat-icon">
              <i className="fas fa-sack-dollar"></i>
            </div>

            <div className="stat-content">

              <span>
                INGRESOS ESTIMADOS
              </span>

              <strong>
                {dinero(totales.ingresos)}
              </strong>

              <small>
                Suma de precios de venta
              </small>

            </div>

          </div>

          <div className="stat-card kpi-card">

            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>

            <div className="stat-content">

              <span>
                GANANCIA BRUTA
              </span>

              <strong>
                {dinero(totales.ganancia)}
              </strong>

              <small>
                Ingresos sobre costos
              </small>

            </div>

          </div>

          <button
            type="button"
            className="stat-card clickable kpi-card"
            onClick={abrirAlertas}
          >

            <div className="stat-icon">

              <i
                className={`fas ${
                  alertasStock.length
                    ? 'fa-bell'
                    : 'fa-bell-slash'
                }`}
              ></i>

            </div>

            <div className="stat-content">

              <span>
                ALERTAS DE STOCK
              </span>

              <strong>
                {alertasStock.length}
              </strong>

              <small>
                Insumos bajo el umbral
              </small>

            </div>

          </button>

        </section>

        {/* ===========================================
            CALENDARIO
        =========================================== */}

        <section className="dashboard-card calendar-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                PLANIFICACIÓN
              </span>

              <h2>
                <i className="fas fa-calendar-days"></i>
                {' '}
                Calendario de recordatorios
              </h2>

              <p>
                Auditorías, revisión de costos y stock
              </p>

            </div>

            <button
              type="button"
              className="gold-btn"
              onClick={abrirEvento}
            >
              <i className="fas fa-plus"></i>
              {' '}
              Agregar evento
            </button>

          </div>

          <div className="calendar-layout">

            <div className="calendar-box">

              <div className="cal-nav">

                <button
                  type="button"
                  className="cal-btn"
                  onClick={() =>
                    cambiarMes('anterior')
                  }
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <strong>
                  {meses[calMonth]} {calYear}
                </strong>

                <button
                  type="button"
                  className="cal-btn"
                  onClick={() =>
                    cambiarMes('siguiente')
                  }
                >
                  <i className="fas fa-chevron-right"></i>
                </button>

              </div>

              <div className="cal-grid">

                {diasSemana.map(
                  (dia) => (
                    <div
                      key={dia}
                      className="cal-dia-label"
                    >
                      {dia}
                    </div>
                  )
                )}

                {diasDelMes.map(
                  (
                    dia,
                    indice
                  ) => {
                    if (
                      dia === null
                    ) {
                      return (
                        <div
                          key={`vacio-${indice}`}
                          className="cal-dia vacio"
                        ></div>
                      );
                    }

                    return (
                      <button
                        type="button"
                        key={dia}
                        className={`cal-dia ${
                          fechaEsHoy(dia)
                            ? 'hoy'
                            : ''
                        } ${
                          tieneEvento(dia)
                            ? 'tiene-evento'
                            : ''
                        }`}
                        onClick={() => {
                          if (
                            tieneEvento(
                              dia
                            )
                          ) {
                            setDiaSeleccionado(
                              dia
                            );
                          }
                        }}
                      >
                        {dia}

                        {tieneEvento(
                          dia
                        ) && (
                          <span></span>
                        )}
                      </button>
                    );
                  }
                )}

              </div>

            </div>

            <div className="calendar-events">

              <div className="events-title">
                {diaSeleccionado
                  ? `Eventos del día ${diaSeleccionado}`
                  : 'Eventos del mes'}
              </div>

              {eventosMostrar.length ? (
                eventosMostrar.map(
                  (
                    evento,
                    indice
                  ) => (
                    <div
                      className={`calendar-event event-${evento.tipo}`}
                      key={`${evento.fecha}-${indice}`}
                    >

                      <div className="event-icon">

                        <i
                          className={`fas fa-${
                            evento.tipo ===
                            'auditoria'
                              ? 'clipboard-check'
                              : evento.tipo ===
                                'stock'
                              ? 'box'
                              : 'dollar-sign'
                          }`}
                        ></i>

                      </div>

                      <div>

                        <strong>
                          {evento.desc}
                        </strong>

                        <span>
                          Día{' '}
                          {Number(
                            evento.fecha.split(
                              '-'
                            )[2]
                          )}
                        </span>

                      </div>

                    </div>
                  )
                )
              ) : (
                <div className="empty-event">
                  No hay recordatorios.
                </div>
              )}

            </div>

          </div>

        </section>

        {/* ===========================================
            GRÁFICAS Y ACTIVIDAD
        =========================================== */}

        <section className="dashboard-grid">

          {/* COSTO POR PRODUCTO */}

          <div className="dashboard-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  COSTOS
                </span>

                <h2>
                  <i className="fas fa-chart-bar"></i>
                  {' '}
                  Costo total por producto
                </h2>

                <p>
                  Ordenado de mayor a menor
                </p>

              </div>

            </div>

            <div className="card-body cost-list">

              {[
                ...productos,
              ]
                .sort(
                  (a, b) =>
                    b.costoTotal -
                    a.costoTotal
                )
                .map(
                  (item) => {

                    const costoMaximo =
                      Math.max(
                        ...productos.map(
                          (producto) =>
                            producto.costoTotal
                        )
                      );

                    const porcentaje =
                      costoMaximo > 0
                        ? (item.costoTotal /
                            costoMaximo) *
                          100
                        : 0;

                    return (
                      <div
                        className="cost-row"
                        key={item.id}
                      >

                        <span
                          title={
                            item.nombre
                          }
                        >
                          {item.nombre}
                        </span>

                        <div className="cost-track">

                          <div
                            className="cost-fill"
                            style={{
                              width: `${porcentaje}%`,
                            }}
                          ></div>

                        </div>

                        <strong>
                          {dinero(
                            item.costoTotal
                          )}
                        </strong>

                      </div>
                    );
                  }
                )}

            </div>

          </div>

          {/* DISTRIBUCIÓN */}

          <div className="dashboard-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  DISTRIBUCIÓN
                </span>

                <h2>
                  <i className="fas fa-chart-pie"></i>
                  {' '}
                  Distribución de costos
                </h2>

                <p>
                  MP · MO · CIF global
                </p>

              </div>

            </div>

            <div className="card-body distribution-wrap">

              {(() => {
                const mp =
                  productos.reduce(
                    (suma, producto) =>
                      suma + producto.mp,
                    0
                  );

                const mo =
                  productos.reduce(
                    (suma, producto) =>
                      suma + producto.mo,
                    0
                  );

                const cif =
                  productos.reduce(
                    (suma, producto) =>
                      suma + producto.cif,
                    0
                  );

                const total =
                  mp + mo + cif;

                const items = [
                  {
                    nombre:
                      'Materia Prima',
                    valor: mp,
                  },
                  {
                    nombre:
                      'Mano de Obra',
                    valor: mo,
                  },
                  {
                    nombre: 'CIF',
                    valor: cif,
                  },
                ];

                const porcentajeMP =
                  total > 0
                    ? (mp / total) * 100
                    : 0;

                const porcentajeMPMO =
                  total > 0
                    ? ((mp + mo) /
                        total) *
                      100
                    : 0;

                return (
                  <>
                    <div
                      className="donut"
                      style={{
                        '--p1': `${porcentajeMP}%`,
                        '--p2': `${porcentajeMPMO}%`,
                      }}
                    >

                      <div>

                        <strong>
                          {dinero(total)}
                        </strong>

                        <span>
                          total
                        </span>

                      </div>

                    </div>

                    <div className="donut-legend">

                      {items.map(
                        (item) => (
                          <div
                            className="legend-row"
                            key={
                              item.nombre
                            }
                          >

                            <span className="legend-dot"></span>

                            <span>
                              {item.nombre}
                            </span>

                            <strong>
                              {dinero(
                                item.valor
                              )}
                            </strong>

                            <small>
                              {(
                                (item.valor /
                                  total) *
                                100
                              ).toFixed(1)}
                              %
                            </small>

                          </div>
                        )
                      )}

                    </div>
                  </>
                );
              })()}

            </div>

          </div>

          {/* RENTABILIDAD */}

          <div className="dashboard-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  RENTABILIDAD
                </span>

                <h2>
                  <i className="fas fa-table"></i>
                  {' '}
                  Rentabilidad por producto
                </h2>

                <p>
                  Margen y meta de ventas
                </p>

              </div>

            </div>

            <div className="table-wrap">

              <table className="profit-table">

                <thead>

                  <tr>
                    <th>Producto</th>
                    <th>Costo</th>
                    <th>Venta</th>
                    <th>Margen</th>
                    <th>Meta</th>
                  </tr>

                </thead>

                <tbody>

                  {[
                    ...productos,
                  ]
                    .sort(
                      (a, b) =>
                        b.margenPct -
                        a.margenPct
                    )
                    .map(
                      (item) => (
                        <tr
                          key={
                            item.id
                          }
                        >

                          <td>

                            <div className="product-cell">

                              <span className="product-icon">
                                <i className="fas fa-cube"></i>
                              </span>

                              {item.nombre}

                            </div>

                          </td>

                          <td>
                            {dinero(
                              item.costoTotal
                            )}
                          </td>

                          <td>
                            {dinero(
                              item.pv
                            )}
                          </td>

                          <td
                            className={
                              item.margenPct >=
                              0
                                ? 'margin-positive'
                                : 'margin-negative'
                            }
                          >
                            {item.margenPct.toFixed(
                              1
                            )}
                            %
                          </td>

                          <td>

                            {item.alerta ? (
                              <span className="badge-na">
                                N/A
                              </span>
                            ) : (
                              <span className="badge-meta">
                                {item.puntoEquilibrio.toLocaleString(
                                  'es-CO'
                                )}{' '}
                                und
                              </span>
                            )}

                          </td>

                        </tr>
                      )
                    )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ACTIVIDAD */}

          <div className="dashboard-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  SISTEMA
                </span>

                <h2>
                  <i className="fas fa-clock-rotate-left"></i>
                  {' '}
                  Actividad reciente
                </h2>

                <p>
                  Últimos cambios en el sistema
                </p>

              </div>

            </div>

            <div className="activity-list">

              {actividad.map(
                (
                  item,
                  indice
                ) => (
                  <div
                    className="activity-row"
                    key={`${item.ini}-${indice}`}
                  >

                    <div className="activity-avatar">
                      {item.ini}
                    </div>

                    <div className="activity-info">

                      <strong>
                        {item.desc}
                      </strong>

                      <span>
                        {item.mod}
                      </span>

                    </div>

                    <time>
                      {item.t}
                    </time>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* ===========================================
            FOOTER
        =========================================== */}

        <footer className="panel-footer">

          © 2026{' '}

          <strong>
            LuckyPay
          </strong>

          {' '}— Controla tu Negocio,
          Crece con Confianza

        </footer>

      </main>

      {/* =============================================
          MODAL ALERTAS
      ============================================= */}

      {modalAlertas && (
        <div
          className="modal-overlay"
          onClick={() =>
            setModalAlertas(false)
          }
        >

          <div
            className="panel-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="card-label">
                  INVENTARIO
                </span>

                <h2>

                  <i className="fas fa-bell"></i>
                  {' '}
                  Alertas de stock

                  <span className="modal-count">
                    {alertasTotales.length}
                  </span>

                </h2>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setModalAlertas(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-tools">

              <span>
                Insumos bajo el umbral mínimo
              </span>

              <button
                type="button"
                className="gold-outline"
                onClick={abrirUmbrales}
              >
                <i className="fas fa-sliders"></i>
                {' '}
                Umbrales
              </button>

            </div>

            <div className="modal-list">

              {alertasTotales.length ? (
                alertasTotales.map(
                  (item) => {

                    const resuelta =
                      alertasResueltas.has(
                        item.id
                      );

                    const porcentaje =
                      item.m > 0
                        ? Math.min(
                            (item.s /
                              item.m) *
                              100,
                            100
                          )
                        : 0;

                    return (
                      <div
                        className={`modal-alert-row ${
                          resuelta
                            ? 'resuelta'
                            : ''
                        }`}
                        key={item.id}
                      >

                        <div className="alert-icon">

                          <i
                            className={`fas ${
                              resuelta
                                ? 'fa-check'
                                : 'fa-triangle-exclamation'
                            }`}
                          ></i>

                        </div>

                        <div className="modal-alert-info">

                          <strong>
                            {item.nombre}
                          </strong>

                          <span>
                            {resuelta
                              ? 'Resuelta · '
                              : ''}
                            Mínimo:{' '}
                            {item.m}{' '}
                            {item.u}
                          </span>

                        </div>

                        <div className="modal-alert-stock">

                          <strong>
                            {item.s}{' '}
                            {item.u}
                          </strong>

                          <div className="stock-bar">

                            <span
                              style={{
                                width: `${porcentaje}%`,
                              }}
                            ></span>

                          </div>

                        </div>

                        {!resuelta && (
                          <button
                            type="button"
                            className="resolve-btn"
                            onClick={() =>
                              resolverAlerta(
                                item.id
                              )
                            }
                          >
                            <i className="fas fa-check"></i>
                          </button>
                        )}

                      </div>
                    );
                  }
                )
              ) : (
                <div className="empty-modal">

                  <i className="fas fa-circle-check"></i>

                  <p>
                    No hay alertas activas.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* =============================================
          MODAL UMBRALES
      ============================================= */}

      {modalUmbrales && (
        <div
          className="modal-overlay"
          onClick={() =>
            setModalUmbrales(false)
          }
        >

          <div
            className="panel-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="card-label">
                  CONFIGURACIÓN
                </span>

                <h2>

                  <i className="fas fa-sliders"></i>
                  {' '}
                  Umbrales mínimos

                </h2>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setModalUmbrales(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-list thresholds">

              {insumos.map(
                (item) => (
                  <div
                    className="threshold-row"
                    key={item.id}
                  >

                    <span>
                      {item.nombre}
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={
                        umbralesTemporales[
                          item.id
                        ] ??
                        item.m
                      }
                      onChange={(evento) =>
                        setUmbralesTemporales(
                          (anteriores) => ({
                            ...anteriores,
                            [item.id]:
                              evento.target
                                .value,
                          })
                        )
                      }
                    />

                    <small>
                      {item.u}
                    </small>

                  </div>
                )
              )}

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="ghost-btn"
                onClick={() =>
                  setModalUmbrales(false)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="gold-btn"
                onClick={guardarUmbrales}
              >
                <i className="fas fa-save"></i>
                {' '}
                Guardar
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =============================================
          MODAL NUEVO EVENTO
      ============================================= */}

      {modalEvento && (
        <div
          className="modal-overlay"
          onClick={() =>
            setModalEvento(false)
          }
        >

          <div
            className="panel-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="card-label">
                  PLANIFICACIÓN
                </span>

                <h2>

                  <i className="fas fa-calendar-plus"></i>
                  {' '}
                  Agregar recordatorio

                </h2>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setModalEvento(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="event-form">

              <label>
                Tipo
              </label>

              <div className="type-grid">

                {[
                  [
                    'auditoria',
                    'clipboard-check',
                    'Auditoría',
                  ],
                  [
                    'stock',
                    'box',
                    'Stock',
                  ],
                  [
                    'costo',
                    'dollar-sign',
                    'Costos',
                  ],
                ].map(
                  ([
                    tipo,
                    icono,
                    nombre,
                  ]) => (
                    <button
                      type="button"
                      key={tipo}
                      className={`type-btn ${
                        eventoTipo === tipo
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() =>
                        setEventoTipo(
                          tipo
                        )
                      }
                    >

                      <i
                        className={`fas fa-${icono}`}
                      ></i>

                      {nombre}

                    </button>
                  )
                )}

              </div>

              <label>
                Fecha
              </label>

              <input
                type="date"
                value={eventoFecha}
                onChange={(evento) =>
                  setEventoFecha(
                    evento.target
                      .value
                  )
                }
              />

              <label>
                Descripción
              </label>

              <input
                type="text"
                value={eventoDesc}
                onChange={(evento) =>
                  setEventoDesc(
                    evento.target
                      .value
                  )
                }
                placeholder="Ej. Revisar inventario"
              />

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="ghost-btn"
                onClick={() =>
                  setModalEvento(false)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="gold-btn"
                onClick={guardarEvento}
              >
                <i className="fas fa-save"></i>
                {' '}
                Guardar
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =============================================
          TOAST
      ============================================= */}

      {toast && (
        <div className="panel-toast">
          {toast}
        </div>
      )}

    </div>
  );
}

export default PanelPrincipal;