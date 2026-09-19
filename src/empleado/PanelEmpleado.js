import React, { useEffect, useMemo, useState } from 'react';
import '../styles/empleado/PanelEmpleado.css';

import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

const productosIniciales = [
  { id: 1, nombre: 'Jabón Karité', insumos: [1, 2, 7] },
  { id: 2, nombre: 'Vela Aromática Lavanda', insumos: [3, 7] },
  { id: 3, nombre: 'Silla Mod. A', insumos: [4] },
  { id: 4, nombre: 'Crema Corporal Aloe', insumos: [5, 2, 7] },
  { id: 5, nombre: 'Cojín Tapizado', insumos: [6, 4] },
  { id: 6, nombre: 'Difusor de Aromas', insumos: [8, 7] },
  { id: 7, nombre: 'Banco Auxiliar', insumos: [4] },
];

const insumosIniciales = [
  { id: 1, nombre: 'Manteca de Karité', u: 'kg', s: 4, m: 10 },
  { id: 2, nombre: 'Cera de Abeja', u: 'kg', s: 18, m: 15 },
  { id: 3, nombre: 'Aceite de Lavanda', u: 'lt', s: 2, m: 8 },
  { id: 4, nombre: 'Madera de Pino', u: 'm²', s: 22, m: 20 },
  { id: 5, nombre: 'Aloe Vera (gel)', u: 'kg', s: 5, m: 12 },
  { id: 6, nombre: 'Tela para Cojín', u: 'mts', s: 30, m: 25 },
  { id: 7, nombre: 'Frascos de Vidrio', u: 'und', s: 80, m: 100 },
  { id: 8, nombre: 'Aceite Esencial Mix', u: 'lt', s: 3, m: 5 },
];

const diasSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

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

const diasNombre = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

function obtenerFecha() {
  const ahora = new Date();

  return {
    dia: diasNombre[ahora.getDay()],
    numero: ahora.getDate(),
    mes: meses[ahora.getMonth()],
    año: ahora.getFullYear(),
    hora: ahora.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

function fechaISO() {
  const ahora = new Date();

  return `${ahora.getFullYear()}-${String(
    ahora.getMonth() + 1
  ).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
}

function PanelEmpleado() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const [productos] = useState(productosIniciales);
  const [insumos, setInsumos] = useState(insumosIniciales);

  const [fechaHoy, setFechaHoy] = useState(obtenerFecha());

  const [alertasResueltas, setAlertasResueltas] = useState(new Set());

  const ahora = new Date();

  const [calYear, setCalYear] = useState(ahora.getFullYear());
  const [calMonth, setCalMonth] = useState(ahora.getMonth());

  const [eventos, setEventos] = useState([
    {
      fecha: `${ahora.getFullYear()}-${String(
        ahora.getMonth() + 1
      ).padStart(2, '0')}-08`,
      desc: 'Revisar stock de Manteca de Karité',
    },
    {
      fecha: `${ahora.getFullYear()}-${String(
        ahora.getMonth() + 1
      ).padStart(2, '0')}-15`,
      desc: 'Reponer Aceite de Lavanda',
    },
    {
      fecha: `${ahora.getFullYear()}-${String(
        ahora.getMonth() + 1
      ).padStart(2, '0')}-22`,
      desc: 'Conteo físico de Frascos de Vidrio',
    },
  ]);

  const [modalAlertas, setModalAlertas] = useState(false);
  const [modalUmbrales, setModalUmbrales] = useState(false);
  const [modalEvento, setModalEvento] = useState(false);

  const [umbralesTemporales, setUmbralesTemporales] = useState({});

  const [eventoFecha, setEventoFecha] = useState('');
  const [eventoDesc, setEventoDesc] = useState('');

  const [toastMensaje, setToastMensaje] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

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

  useEffect(() => {
    const actualizar = () => {
      setFechaHoy(obtenerFecha());
    };

    const intervalo = setInterval(actualizar, 30000);

    return () => clearInterval(intervalo);
  }, []);

  const mostrarToast = (mensaje) => {
    setToastMensaje(mensaje);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
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

  const alertasStock = useMemo(() => {
    return insumos
      .filter(
        (insumo) =>
          insumo.s < insumo.m &&
          !alertasResueltas.has(insumo.id)
      )
      .sort(
        (a, b) =>
          a.s / a.m - b.s / b.m
      );
  }, [insumos, alertasResueltas]);

  const insumosSaludables = useMemo(() => {
    return insumos.filter(
      (insumo) => insumo.s >= insumo.m
    ).length;
  }, [insumos]);

  const rankingInsumos = useMemo(() => {
    const conteo = {};

    productos.forEach((producto) => {
      producto.insumos.forEach((id) => {
        conteo[id] = (conteo[id] || 0) + 1;
      });
    });

    return Object.entries(conteo)
      .map(([id, cantidad]) => ({
        insumo: insumos.find(
          (item) => item.id === Number(id)
        ),
        cantidad,
      }))
      .filter((item) => item.insumo)
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 8);
  }, [productos, insumos]);

  const maxRanking = Math.max(
    ...rankingInsumos.map((item) => item.cantidad),
    1
  );

  const stockCritico = useMemo(() => {
    return [...insumos]
      .sort(
        (a, b) =>
          a.s / a.m - b.s / b.m
      )
      .slice(0, 8);
  }, [insumos]);

  const diasDelMes = useMemo(() => {
    const primerDia = new Date(
      calYear,
      calMonth,
      1
    ).getDay();

    const cantidadDias = new Date(
      calYear,
      calMonth + 1,
      0
    ).getDate();

    const resultado = [];

    for (let i = 0; i < primerDia; i++) {
      resultado.push({
        vacio: true,
        numero: null,
      });
    }

    for (let dia = 1; dia <= cantidadDias; dia++) {
      resultado.push({
        vacio: false,
        numero: dia,
      });
    }

    return resultado;
  }, [calYear, calMonth]);

  const eventosMes = useMemo(() => {
    const prefijo = `${calYear}-${String(
      calMonth + 1
    ).padStart(2, '0')}`;

    return eventos
      .filter((evento) =>
        evento.fecha.startsWith(prefijo)
      )
      .sort((a, b) =>
        a.fecha.localeCompare(b.fecha)
      );
  }, [eventos, calYear, calMonth]);

  const tieneEvento = (dia) => {
    const fecha = `${calYear}-${String(
      calMonth + 1
    ).padStart(2, '0')}-${String(dia).padStart(
      2,
      '0'
    )}`;

    return eventos.some(
      (evento) => evento.fecha === fecha
    );
  };

  const eventosParaMostrar = diaSeleccionado
    ? eventosMes.filter(
        (evento) =>
          Number(evento.fecha.split('-')[2]) ===
          diaSeleccionado
      )
    : eventosMes;

  const cambiarMes = (direccion) => {
    if (direccion === 'anterior') {
      if (calMonth === 0) {
        setCalMonth(11);
        setCalYear((año) => año - 1);
      } else {
        setCalMonth((mes) => mes - 1);
      }
    } else {
      if (calMonth === 11) {
        setCalMonth(0);
        setCalYear((año) => año + 1);
      } else {
        setCalMonth((mes) => mes + 1);
      }
    }

    setDiaSeleccionado(null);
  };

  const seleccionarDia = (dia) => {
    if (tieneEvento(dia)) {
      setDiaSeleccionado(dia);
    }
  };

  const abrirUmbrales = () => {
    const valores = {};

    insumos.forEach((insumo) => {
      valores[insumo.id] = insumo.m;
    });

    setUmbralesTemporales(valores);
    setModalAlertas(false);
    setModalUmbrales(true);
  };

  const guardarUmbrales = () => {
    setInsumos((anteriores) =>
      anteriores.map((insumo) => {
        const valor = Number(
          umbralesTemporales[insumo.id]
        );

        if (!Number.isNaN(valor) && valor >= 0) {
          return {
            ...insumo,
            m: valor,
          };
        }

        return insumo;
      })
    );

    setAlertasResueltas(new Set());
    setModalUmbrales(false);

    mostrarToast(
      'Umbrales actualizados correctamente.'
    );
  };

  const resolverAlerta = (id) => {
    setAlertasResueltas((anteriores) => {
      const nuevo = new Set(anteriores);
      nuevo.add(id);
      return nuevo;
    });

    mostrarToast('Alerta marcada como resuelta.');
  };

  const abrirEvento = () => {
    setEventoFecha(fechaISO());
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

    setEventos((anteriores) => [
      ...anteriores,
      {
        fecha: eventoFecha,
        desc: eventoDesc.trim(),
      },
    ]);

    const [año, mes] = eventoFecha
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

  const hoy = new Date();

  const esMesActual =
    hoy.getFullYear() === calYear &&
    hoy.getMonth() === calMonth;

  return (
    <div className="panel-empleado-app">

      {/* NAVBAR */}
      <header className="panel-navbar">

        <div className="navbar-left">

          {/* =================================================
              BOTÓN MENÚ — CAMBIA ☰ / ✕
          ================================================= */}
          <button
            type="button"
            className={`menu-btn ${
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

          {/* LOGO REAL */}
          <div className="brand">
            <img
              src={logo}
              alt="LuckyPay"
            />
            <span>LuckyPay</span>
          </div>

        </div>

        <div className="welcome">

          <div className="welcome-text">
            <strong>
              Bienvenido, Empleado
            </strong>

            <span>
              Panel operativo
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
              className="sidebar-item active"
              onClick={() =>
                setMenuAbierto(false)
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-home"></i>
              </span>

              <span>Inicio</span>
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

              <span>Insumos</span>
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

              <span>Productos</span>
            </button>

            <button
              type="button"
              className="sidebar-item"
              onClick={() =>
                navegar('/empleado/costos')
              }
            >
              <span className="sidebar-icon">
                <i className="fas fa-dollar-sign"></i>
              </span>

              <span>Costos</span>
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

              <span>Reportes</span>
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
              <span>Cerrar sesión</span>
            </button>

          </div>

        </aside>
      )}

      {/* CONTENIDO */}
      <main className="panel-main">

        {/* ENCABEZADO */}
        <section className="panel-heading">

          <div>
            <span className="eyebrow">
              PANEL DEL EMPLEADO
            </span>

            <h1>
              Resumen operativo
            </h1>

            <p>
              Control de insumos, productos y stock.
            </p>
          </div>

          <div className="fecha-panel">

            <span>
              FECHA ACTUAL
            </span>

            <strong>
              {fechaHoy.dia},{' '}
              {fechaHoy.numero} de{' '}
              {fechaHoy.mes} de{' '}
              {fechaHoy.año}
            </strong>

            <strong>
              {fechaHoy.hora}
            </strong>

          </div>

        </section>

        {/* ESTADÍSTICAS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              <i className="fas fa-flask"></i>
            </div>

            <div className="stat-content">
              <span>INSUMOS</span>

              <strong>
                {insumos.length}
              </strong>

              <small>
                Registrados
              </small>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <i className="fas fa-cube"></i>
            </div>

            <div className="stat-content">
              <span>PRODUCTOS</span>

              <strong>
                {productos.length}
              </strong>

              <small>
                Registrados
              </small>
            </div>

          </div>

          <div
            className="stat-card clickable"
            onClick={() =>
              setModalAlertas(true)
            }
          >

            <div className="stat-icon warning">
              <i className="fas fa-bell"></i>
            </div>

            <div className="stat-content">
              <span>ALERTAS</span>

              <strong>
                {alertasStock.length}
              </strong>

              <small>
                Requieren atención
              </small>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <i className="fas fa-warehouse"></i>
            </div>

            <div className="stat-content">
              <span>STOCK OK</span>

              <strong>
                {insumosSaludables}/
                {insumos.length}
              </strong>

              <small>
                Sobre el mínimo
              </small>
            </div>

          </div>

        </section>

        {/* ACCIONES RÁPIDAS */}
        <section className="empleado-section">

          <div className="empleado-section-title">
            <i className="fas fa-bolt"></i>
            Acciones rápidas
          </div>

          <div className="empleado-quick-grid">

            <button
              type="button"
              className="empleado-quick-card"
              onClick={() =>
                navegar('/empleado/insumos')
              }
            >
              <i className="fas fa-plus"></i>
              <strong>Nuevo insumo</strong>
              <span>Registrar insumo</span>
            </button>

            <button
              type="button"
              className="empleado-quick-card"
              onClick={() =>
                navegar('/empleado/productos')
              }
            >
              <i className="fas fa-cube"></i>
              <strong>Productos</strong>
              <span>Gestionar productos</span>
            </button>

            <button
              type="button"
              className="empleado-quick-card"
              onClick={() =>
                navegar('/empleado/costos')
              }
            >
              <i className="fas fa-dollar-sign"></i>
              <strong>Costos</strong>
              <span>Consultar costos</span>
            </button>

            <button
              type="button"
              className="empleado-quick-card"
              onClick={() =>
                navegar('/empleado/reportes')
              }
            >
              <i className="fas fa-file-alt"></i>
              <strong>Reportes</strong>
              <span>Consultar reportes</span>
            </button>

          </div>

        </section>

        {/* CALENDARIO */}
        <section className="empleado-panel">

          <div className="empleado-panel-header">

            <div>
              <span>PLANIFICACIÓN</span>

              <h2>
                <i className="fas fa-calendar-days"></i>
                Calendario de stock
              </h2>

              <p>
                Recordatorios de reposición
              </p>
            </div>

            <button
              type="button"
              className="empleado-gold-btn"
              onClick={abrirEvento}
            >
              <i className="fas fa-plus"></i>
              Agregar recordatorio
            </button>

          </div>

          <div className="empleado-calendar-layout">

            <div className="empleado-calendar">

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

                {diasSemana.map((dia) => (
                  <div
                    key={dia}
                    className="cal-dia-label"
                  >
                    {dia}
                  </div>
                ))}

                {diasDelMes.map(
                  (dia, indice) => {

                    if (dia.vacio) {
                      return (
                        <div
                          key={`vacio-${indice}`}
                          className="cal-dia vacio"
                        ></div>
                      );
                    }

                    const esHoy =
                      esMesActual &&
                      dia.numero ===
                        hoy.getDate();

                    const evento =
                      tieneEvento(dia.numero);

                    return (
                      <button
                        type="button"
                        key={dia.numero}
                        className={`cal-dia ${
                          esHoy ? 'hoy' : ''
                        } ${
                          evento
                            ? 'tiene-evento'
                            : ''
                        }`}
                        onClick={() =>
                          seleccionarDia(
                            dia.numero
                          )
                        }
                      >
                        {dia.numero}

                        {evento && (
                          <span></span>
                        )}
                      </button>
                    );
                  }
                )}

              </div>

            </div>

            <div className="empleado-eventos">

              <div className="empleado-eventos-title">
                {diaSeleccionado
                  ? `Recordatorios del día ${diaSeleccionado}`
                  : 'Recordatorios del mes'}
              </div>

              {eventosParaMostrar.length === 0 ? (
                <div className="sin-eventos">
                  No hay recordatorios.
                </div>
              ) : (
                eventosParaMostrar.map(
                  (evento, indice) => {

                    const dia =
                      Number(
                        evento.fecha.split('-')[2]
                      );

                    return (
                      <div
                        className="empleado-evento"
                        key={`${evento.fecha}-${indice}`}
                      >
                        <div className="evento-icon">
                          <i className="fas fa-box"></i>
                        </div>

                        <div>
                          <strong>
                            {evento.desc}
                          </strong>

                          <span>
                            Día {dia}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )
              )}

            </div>

          </div>

        </section>

        {/* PARTE INFERIOR */}
        <section className="empleado-bottom-grid">

          {/* RANKING */}
          <div className="empleado-panel">

            <div className="empleado-panel-simple-header">

              <span>
                INVENTARIO
              </span>

              <h2>
                <i className="fas fa-ranking-star"></i>
                Insumos más usados
              </h2>

              <p>
                Según cantidad de productos que los usan
              </p>

            </div>

            <div className="ranking-lista">

              {rankingInsumos.map(
                (item, indice) => {

                  const porcentaje =
                    (item.cantidad /
                      maxRanking) *
                    100;

                  return (
                    <div
                      className="ranking-fila"
                      key={item.insumo.id}
                    >

                      <div
                        className={`ranking-pos ${
                          indice === 0
                            ? 'top1'
                            : ''
                        }`}
                      >
                        {indice + 1}
                      </div>

                      <span className="ranking-nombre">
                        {item.insumo.nombre}
                      </span>

                      <div className="ranking-track">
                        <div
                          className="ranking-fill"
                          style={{
                            width: `${porcentaje}%`,
                          }}
                        ></div>
                      </div>

                      <strong className="ranking-val">
                        {item.cantidad}
                      </strong>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          {/* STOCK CRÍTICO */}
          <div className="empleado-panel">

            <div className="empleado-panel-simple-header">

              <span>
                INVENTARIO
              </span>

              <h2>
                <i className="fas fa-box-open"></i>
                Stock más crítico
              </h2>

              <p>
                Insumos a punto de agotarse
              </p>

            </div>

            <div className="tabla-wrap">

              <table className="t-panel">

                <thead>
                  <tr>
                    <th>Insumo</th>
                    <th>Stock</th>
                  </tr>
                </thead>

                <tbody>

                  {stockCritico.map(
                    (insumo) => {

                      const porcentaje =
                        Math.min(
                          (insumo.s /
                            insumo.m) *
                            100,
                          100
                        );

                      const critico =
                        insumo.s <
                        insumo.m;

                      return (
                        <tr key={insumo.id}>

                          <td>
                            <div className="prod-cell">

                              <div className="prod-ic">
                                <i className="fas fa-flask"></i>
                              </div>

                              {insumo.nombre}

                            </div>
                          </td>

                          <td>

                            <div className="mini-stock-bar">

                              <div
                                className={`mini-stock-fill ${
                                  critico
                                    ? 'critico'
                                    : 'normal'
                                }`}
                                style={{
                                  width: `${porcentaje}%`,
                                }}
                              ></div>

                            </div>

                            <strong>
                              {insumo.s}{' '}
                              {insumo.u}
                            </strong>

                            <span
                              className={
                                critico
                                  ? 'badge-na'
                                  : 'badge-eq'
                              }
                            >
                              {critico
                                ? 'bajo'
                                : 'ok'}
                            </span>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="empleado-footer">
          © 2026{' '}
          <strong>LuckyPay</strong>{' '}
          — Controla tu Negocio,
          Crece con Confianza
        </footer>

      </main>

      {/* MODAL ALERTAS */}
      {modalAlertas && (
        <div
          className="modal-overlay activo"
          onClick={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setModalAlertas(false);
            }
          }}
        >

          <div className="modal-box">

            <div className="modal-head">

              <h2>
                <i className="fas fa-bell"></i>
                Alertas de stock
              </h2>

              <button
                type="button"
                className="modal-cerrar"
                onClick={() =>
                  setModalAlertas(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-body">

              <div className="modal-info">

                <span>
                  Insumos por debajo del
                  mínimo establecido.
                </span>

                <button
                  type="button"
                  className="btn-sec"
                  onClick={abrirUmbrales}
                >
                  <i className="fas fa-sliders"></i>
                  Umbrales
                </button>

              </div>

              {alertasStock.length === 0 ? (

                <div className="sin-alertas">
                  <i className="fas fa-circle-check"></i>
                  <span>
                    Sin alertas activas
                  </span>
                </div>

              ) : (

                <div className="alertas-lista">

                  {alertasStock.map(
                    (insumo) => {

                      const porcentaje =
                        Math.min(
                          (insumo.s /
                            insumo.m) *
                            100,
                          100
                        );

                      return (
                        <div
                          className="alerta-item"
                          key={insumo.id}
                        >

                          <div className="al-ic">
                            <i className="fas fa-triangle-exclamation"></i>
                          </div>

                          <div className="al-info">

                            <strong>
                              {insumo.nombre}
                            </strong>

                            <span>
                              Mínimo: {insumo.m}{' '}
                              {insumo.u}
                            </span>

                          </div>

                          <div className="al-stock">

                            <strong>
                              {insumo.s}{' '}
                              {insumo.u}
                            </strong>

                            <div className="stock-bar">
                              <div
                                className="stock-fill"
                                style={{
                                  width: `${porcentaje}%`,
                                }}
                              ></div>
                            </div>

                          </div>

                          <button
                            type="button"
                            className="btn-res"
                            onClick={() =>
                              resolverAlerta(
                                insumo.id
                              )
                            }
                          >
                            <i className="fas fa-check"></i>
                          </button>

                        </div>
                      );
                    }
                  )}

                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* MODAL UMBRALES */}
      {modalUmbrales && (
        <div
          className="modal-overlay activo"
          onClick={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setModalUmbrales(false);
            }
          }}
        >

          <div className="modal-box">

            <div className="modal-head">

              <h2>
                <i className="fas fa-sliders"></i>
                Umbrales mínimos
              </h2>

              <button
                type="button"
                className="modal-cerrar"
                onClick={() =>
                  setModalUmbrales(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-body">

              <p className="modal-description">
                Define el stock mínimo de cada
                insumo.
              </p>

              <div className="umbrales-lista">

                {insumos.map((insumo) => (
                  <div
                    className="umbral-fila"
                    key={insumo.id}
                  >

                    <span>
                      {insumo.nombre}
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={
                        umbralesTemporales[
                          insumo.id
                        ] ?? insumo.m
                      }
                      onChange={(e) =>
                        setUmbralesTemporales(
                          (anteriores) => ({
                            ...anteriores,
                            [insumo.id]:
                              e.target.value,
                          })
                        )
                      }
                    />

                    <small>
                      {insumo.u}
                    </small>

                  </div>
                ))}

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn-sec"
                onClick={() =>
                  setModalUmbrales(false)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-pri"
                onClick={guardarUmbrales}
              >
                <i className="fas fa-save"></i>
                Guardar
              </button>

            </div>

          </div>

        </div>
      )}

      {/* MODAL RECORDATORIO */}
      {modalEvento && (
        <div
          className="modal-overlay activo"
          onClick={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setModalEvento(false);
            }
          }}
        >

          <div className="modal-box">

            <div className="modal-head">

              <h2>
                <i className="fas fa-calendar-plus"></i>
                Nuevo recordatorio
              </h2>

              <button
                type="button"
                className="modal-cerrar"
                onClick={() =>
                  setModalEvento(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-body">

              <label>
                Fecha
              </label>

              <input
                type="date"
                className="input-texto"
                value={eventoFecha}
                onChange={(e) =>
                  setEventoFecha(
                    e.target.value
                  )
                }
              />

              <label>
                Descripción
              </label>

              <input
                type="text"
                className="input-texto"
                value={eventoDesc}
                onChange={(e) =>
                  setEventoDesc(
                    e.target.value
                  )
                }
                placeholder="Ej: Revisar stock de Karité"
              />

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn-sec"
                onClick={() =>
                  setModalEvento(false)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-pri"
                onClick={guardarEvento}
              >
                <i className="fas fa-check"></i>
                Agregar
              </button>

            </div>

          </div>

        </div>
      )}

      {/* TOAST */}
      {toastVisible && (
        <div className="panel-toast">
          <i className="fas fa-circle-check"></i>
          <span>{toastMensaje}</span>
        </div>
      )}

    </div>
  );
}

export default PanelEmpleado;