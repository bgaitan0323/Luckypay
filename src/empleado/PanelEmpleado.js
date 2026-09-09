import React, { useEffect, useMemo, useState } from 'react';
import '../styles/empleado/PanelEmpleado.css';

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

const mesesNombre = [
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

const mesesMinuscula = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
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

function obtenerFechaHoy() {
  const ahora = new Date();

  return {
    dia: diasNombre[ahora.getDay()],
    numero: ahora.getDate(),
    mes: mesesMinuscula[ahora.getMonth()],
    año: ahora.getFullYear(),
    hora: ahora.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

function obtenerFechaISO() {
  const ahora = new Date();

  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');

  return `${año}-${mes}-${dia}`;
}

function PanelEmpleado() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const [productos] = useState(productosIniciales);
  const [insumos, setInsumos] = useState(insumosIniciales);

  const [alertasResueltas, setAlertasResueltas] = useState(new Set());

  const [fechaHoy, setFechaHoy] = useState(obtenerFechaHoy());

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

  const [eventosDiaSeleccionado, setEventosDiaSeleccionado] =
    useState(null);

  useEffect(() => {
    const existeFontAwesome = document.querySelector(
      'link[data-luckypay-fontawesome]'
    );

    if (!existeFontAwesome) {
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
    const actualizarFecha = () => {
      setFechaHoy(obtenerFechaHoy());
    };

    actualizarFecha();

    const intervalo = setInterval(
      actualizarFecha,
      30000
    );

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

  const cantidadAlertas = useMemo(() => {
    return insumos.filter(
      (insumo) =>
        !alertasResueltas.has(insumo.id) &&
        insumo.s < insumo.m
    ).length;
  }, [insumos, alertasResueltas]);

  const insumosSaludables = useMemo(() => {
    return insumos.filter(
      (insumo) => insumo.s >= insumo.m
    ).length;
  }, [insumos]);

  const abrirModalAlertas = () => {
    setModalAlertas(true);
  };

  const cerrarModalAlertas = () => {
    setModalAlertas(false);
  };

  const resolverAlerta = (id) => {
    setAlertasResueltas((anterior) => {
      const nuevo = new Set(anterior);
      nuevo.add(id);
      return nuevo;
    });

    mostrarToast('Alerta marcada como resuelta.');
  };

  const alertasActivas = useMemo(() => {
    return insumos
      .filter((insumo) => insumo.s < insumo.m)
      .sort(
        (a, b) =>
          a.s / a.m - b.s / b.m
      );
  }, [insumos]);

  const alertasOrdenadas = useMemo(() => {
    const pendientes = alertasActivas.filter(
      (insumo) =>
        !alertasResueltas.has(insumo.id)
    );

    const resueltas = alertasActivas.filter(
      (insumo) =>
        alertasResueltas.has(insumo.id)
    );

    return [...pendientes, ...resueltas];
  }, [alertasActivas, alertasResueltas]);

  const abrirModalUmbrales = () => {
    const valores = {};

    insumos.forEach((insumo) => {
      valores[insumo.id] = insumo.m;
    });

    setUmbralesTemporales(valores);
    setModalAlertas(false);
    setModalUmbrales(true);
  };

  const cerrarModalUmbrales = () => {
    setModalUmbrales(false);
  };

  const cancelarUmbrales = () => {
    setModalUmbrales(false);
  };

  const cambiarUmbral = (id, valor) => {
    setUmbralesTemporales((anterior) => ({
      ...anterior,
      [id]: valor,
    }));
  };

  const guardarUmbrales = () => {
    setInsumos((anterior) =>
      anterior.map((insumo) => {
        const valor = parseFloat(
          umbralesTemporales[insumo.id]
        );

        if (
          !Number.isNaN(valor) &&
          valor >= 0
        ) {
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

  const rankingInsumos = useMemo(() => {
    const conteo = {};

    productos.forEach((producto) => {
      producto.insumos.forEach((idInsumo) => {
        conteo[idInsumo] =
          (conteo[idInsumo] || 0) + 1;
      });
    });

    return Object.entries(conteo)
      .map(([idInsumo, cantidad]) => ({
        insumo: insumos.find(
          (item) =>
            item.id ===
            parseInt(idInsumo, 10)
        ),
        cantidad,
      }))
      .filter((item) => item.insumo)
      .sort(
        (a, b) =>
          b.cantidad - a.cantidad
      )
      .slice(0, 8);
  }, [productos, insumos]);

  const maxRanking = Math.max(
    ...rankingInsumos.map(
      (item) => item.cantidad
    ),
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

    const dias = [];

    for (
      let i = 0;
      i < primerDia;
      i++
    ) {
      dias.push({
        vacio: true,
        numero: null,
      });
    }

    for (
      let dia = 1;
      dia <= cantidadDias;
      dia++
    ) {
      dias.push({
        vacio: false,
        numero: dia,
      });
    }

    return dias;
  }, [calYear, calMonth]);

  const cambiarMesAnterior = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(
        (anterior) => anterior - 1
      );
    } else {
      setCalMonth(
        (anterior) => anterior - 1
      );
    }

    setEventosDiaSeleccionado(null);
  };

  const cambiarMesSiguiente = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(
        (anterior) => anterior + 1
      );
    } else {
      setCalMonth(
        (anterior) => anterior + 1
      );
    }

    setEventosDiaSeleccionado(null);
  };

  const tieneEvento = (dia) => {
    const fecha = `${calYear}-${String(
      calMonth + 1
    ).padStart(2, '0')}-${String(dia).padStart(
      2,
      '0'
    )}`;

    return eventos.some(
      (evento) =>
        evento.fecha === fecha
    );
  };

  const seleccionarDia = (dia) => {
    const fecha = `${calYear}-${String(
      calMonth + 1
    ).padStart(2, '0')}-${String(dia).padStart(
      2,
      '0'
    )}`;

    const encontrados = eventos.filter(
      (evento) =>
        evento.fecha === fecha
    );

    if (!encontrados.length) {
      return;
    }

    setEventosDiaSeleccionado(dia);
  };

  const eventosParaMostrar =
    eventosDiaSeleccionado
      ? eventosMes.filter(
          (evento) =>
            parseInt(
              evento.fecha.split('-')[2],
              10
            ) === eventosDiaSeleccionado
        )
      : eventosMes;

  const abrirModalEvento = () => {
    setEventoFecha(
      obtenerFechaISO()
    );

    setEventoDesc('');
    setModalEvento(true);
  };

  const cerrarModalEvento = () => {
    setModalEvento(false);
  };

  const cancelarEvento = () => {
    setModalEvento(false);
  };

  const guardarEvento = () => {
    const fecha = eventoFecha;
    const descripcion =
      eventoDesc.trim();

    if (
      !fecha ||
      !descripcion
    ) {
      mostrarToast(
        'Completa la fecha y la descripción.'
      );
      return;
    }

    setEventos((anterior) => [
      ...anterior,
      {
        fecha,
        desc: descripcion,
      },
    ]);

    const [año, mes] = fecha
      .split('-')
      .map(Number);

    setCalYear(año);
    setCalMonth(mes - 1);
    setEventosDiaSeleccionado(null);

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
      <header className="navbar">

        <button
          type="button"
          id="menuBtn"
          className="menu-btn"
          onClick={() =>
            setMenuAbierto(
              (anterior) => !anterior
            )
          }
          aria-label="Abrir menú"
        >
          <i className="fa-solid fa-bars"></i>
          MENÚ
        </button>

        <div className="admin-user">
          <span>
            Bienvenido Empleado
          </span>

          <i className="fa-regular fa-circle-user"></i>
        </div>

      </header>

      {/* SIDEBAR */}
      <aside
        className={`sidebar ${
          menuAbierto ? 'active' : ''
        }`}
      >
        <ul>

          <li>
            <button
              type="button"
              className="sidebar-link activo"
              onClick={() =>
                setMenuAbierto(false)
              }
            >
              <i className="fas fa-home"></i>
              <span>Inicio</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="sidebar-link"
              onClick={() =>
                navegar(
                  '/empleado/insumos'
                )
              }
            >
              <i className="fas fa-box"></i>
              <span>Insumos</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="sidebar-link"
              onClick={() =>
                navegar(
                  '/empleado/productos'
                )
              }
            >
              <i className="fas fa-cube"></i>
              <span>Productos</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="sidebar-link"
              onClick={() =>
                navegar(
                  '/empleado/costos'
                )
              }
            >
              <i className="fas fa-dollar-sign"></i>
              <span>Costos</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="sidebar-link"
              onClick={() =>
                navegar(
                  '/empleado/reportes'
                )
              }
            >
              <i className="fas fa-file-alt"></i>
              <span>Reportes</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="sidebar-link"
              onClick={cerrarSesion}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Cerrar sesión</span>
            </button>
          </li>

        </ul>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main>

        {/* BIENVENIDA */}
        <div className="bienvenida">

          <div className="bienvenida-texto">

            <h1>
              ¡Bienvenido! 👋
            </h1>

            <p>
              Aquí tienes el resumen operativo de
              insumos y productos.
            </p>

            <div className="badge-live">
              <span className="dot"></span>
              Panel activo
            </div>

          </div>

          <div className="bienvenida-fecha">

            <strong>
              {fechaHoy.dia}
            </strong>

            <br />

            {fechaHoy.numero} de{' '}
            {fechaHoy.mes} de{' '}
            {fechaHoy.año}

            <br />

            {fechaHoy.hora}

          </div>

        </div>

        {/* KPI */}
        <div className="tarjetas-kpi">

          {/* INSUMOS */}
          <div className="tarjeta-kpi kpi-azul">

            <div className="kpi-cabeza">

              <div>

                <div className="kpi-label">
                  Insumos registrados
                </div>

                <div className="kpi-valor">
                  {insumos.length}
                </div>

              </div>

              <div className="kpi-icono">
                <i className="fas fa-flask"></i>
              </div>

            </div>

            <div className="kpi-sub neutro">
              <i className="fas fa-box"></i>
              En el catálogo de insumos
            </div>

          </div>

          {/* PRODUCTOS */}
          <div className="tarjeta-kpi kpi-verde">

            <div className="kpi-cabeza">

              <div>

                <div className="kpi-label">
                  Productos registrados
                </div>

                <div className="kpi-valor">
                  {productos.length}
                </div>

              </div>

              <div className="kpi-icono">
                <i className="fas fa-cube"></i>
              </div>

            </div>

            <div className="kpi-sub positivo">
              <i className="fas fa-circle-check"></i>
              En el catálogo de productos
            </div>

          </div>

          {/* STOCK OK */}
          <div className="tarjeta-kpi kpi-morado">

            <div className="kpi-cabeza">

              <div>

                <div className="kpi-label">
                  Insumos con stock OK
                </div>

                <div className="kpi-valor">
                  {insumosSaludables}/
                  {insumos.length}
                </div>

              </div>

              <div className="kpi-icono">
                <i className="fas fa-warehouse"></i>
              </div>

            </div>

            <div className="kpi-sub neutro">
              <i className="fas fa-circle-info"></i>
              Por encima del umbral mínimo
            </div>

          </div>

          {/* ALERTAS */}
          <div
            className="tarjeta-kpi kpi-rojo"
            id="kpiAlertaBtn"
            title="Ver alertas de stock"
            onClick={abrirModalAlertas}
            role="button"
            tabIndex={0}
            onKeyDown={(evento) => {
              if (
                evento.key === 'Enter' ||
                evento.key === ' '
              ) {
                abrirModalAlertas();
              }
            }}
          >

            <div className="kpi-cabeza">

              <div>

                <div className="kpi-label">
                  Alertas de stock
                </div>

                <div className="kpi-valor">
                  {cantidadAlertas}
                </div>

              </div>

              <div className="kpi-icono">

                <i
                  className={`fas fa-bell${
                    cantidadAlertas
                      ? ''
                      : '-slash'
                  }`}
                ></i>

              </div>

            </div>

            <div className="kpi-sub negativo">
              <i className="fas fa-triangle-exclamation"></i>
              Insumos bajo el umbral
            </div>

          </div>

        </div>

        {/* ACCESOS RÁPIDOS */}
        <div className="seccion-titulo">

          <i
            className="fas fa-bolt"
            style={{
              color: '#d97706',
            }}
          ></i>

          Accesos rápidos

        </div>

        <div className="accesos-grid">

          <button
            type="button"
            className="acceso"
            onClick={() =>
              navegar(
                '/empleado/insumos'
              )
            }
          >
            <div className="acceso-icono ac-verde">
              <i className="fas fa-plus"></i>
            </div>

            <span>
              Nuevo insumo
            </span>
          </button>

          <button
            type="button"
            className="acceso"
            onClick={() =>
              navegar(
                '/empleado/productos'
              )
            }
          >
            <div className="acceso-icono ac-azul">
              <i className="fas fa-cube"></i>
            </div>

            <span>
              Nuevo producto
            </span>
          </button>

          <button
            type="button"
            className="acceso"
            onClick={() =>
              navegar(
                '/empleado/costos'
              )
            }
          >
            <div className="acceso-icono ac-amarillo">
              <i className="fas fa-dollar-sign"></i>
            </div>

            <span>
              Ver costos
            </span>
          </button>

          <button
            type="button"
            className="acceso"
            onClick={() =>
              navegar(
                '/empleado/reportes'
              )
            }
          >
            <div className="acceso-icono ac-morado">
              <i className="fas fa-file-alt"></i>
            </div>

            <span>
              Ver reportes
            </span>
          </button>

        </div>

        {/* CALENDARIO */}
        <div
          className="panel"
          style={{
            marginBottom: '16px',
          }}
        >

          <div
            className="panel-cabeza"
            style={{
              background:
                'linear-gradient(90deg,#0c5048,#1b6d4a)',
              borderRadius:
                '17px 17px 0 0',
            }}
          >

            <div>

              <div
                className="panel-titulo"
                style={{
                  color: 'white',
                }}
              >
                <i className="fas fa-calendar-days"></i>
                Calendario de stock
              </div>

              <div
                className="panel-sub"
                style={{
                  color:
                    'rgba(255,255,255,.65)',
                }}
              >
                Recordatorios de reposición
                de insumos
              </div>

            </div>

            <button
              type="button"
              className="btn-sec"
              onClick={abrirModalEvento}
              style={{
                fontSize: '12px',
                padding: '7px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background:
                  'rgba(255,255,255,.18)',
                color: 'white',
                border:
                  '1px solid rgba(255,255,255,.25)',
              }}
            >
              <i className="fas fa-plus"></i>
              Agregar recordatorio
            </button>

          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                '320px 1fr',
              gap: 0,
            }}
          >

            {/* CALENDARIO IZQUIERDA */}
            <div
              className="panel-body"
              style={{
                borderRight:
                  '1px solid #eef1ec',
              }}
            >

              <div className="cal-nav">

                <button
                  type="button"
                  className="cal-btn"
                  onClick={
                    cambiarMesAnterior
                  }
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <span className="cal-mes">
                  {mesesNombre[calMonth]}{' '}
                  {calYear}
                </span>

                <button
                  type="button"
                  className="cal-btn"
                  onClick={
                    cambiarMesSiguiente
                  }
                >
                  <i className="fas fa-chevron-right"></i>
                </button>

              </div>

              <div className="cal-grid">

                {diasSemana.map((dia) => (
                  <div
                    className="cal-dia-label"
                    key={dia}
                  >
                    {dia}
                  </div>
                ))}

                {diasDelMes.map(
                  (dia, indice) => {

                    if (dia.vacio) {
                      return (
                        <div
                          className="cal-dia vacio"
                          key={`vacio-${indice}`}
                        ></div>
                      );
                    }

                    const esHoy =
                      esMesActual &&
                      dia.numero ===
                        hoy.getDate();

                    const evento =
                      tieneEvento(
                        dia.numero
                      );

                    return (
                      <div
                        key={dia.numero}
                        className={`cal-dia${
                          esHoy
                            ? ' hoy'
                            : ''
                        }${
                          evento
                            ? ' tiene-evento'
                            : ''
                        }`}
                        onClick={() =>
                          seleccionarDia(
                            dia.numero
                          )
                        }
                      >
                        {dia.numero}
                      </div>
                    );
                  }
                )}

              </div>

            </div>

            {/* RECORDATORIOS DERECHA */}
            <div
              className="panel-body"
              style={{
                minHeight: '220px',
              }}
            >

              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#8a9690',
                  textTransform:
                    'uppercase',
                  letterSpacing: '.5px',
                  marginBottom: '12px',
                }}
              >
                {eventosDiaSeleccionado
                  ? `Recordatorios del día ${eventosDiaSeleccionado}`
                  : 'Recordatorios del mes'}
              </div>

              <div
                className="cal-eventos"
                style={{
                  maxHeight: '220px',
                  overflowY: 'auto',
                }}
              >

                {eventosParaMostrar.length ===
                0 ? (

                  <div
                    style={{
                      fontSize: '12px',
                      color: '#8a9690',
                      textAlign: 'center',
                      padding: '10px',
                    }}
                  >
                    Sin recordatorios este mes
                  </div>

                ) : (

                  eventosParaMostrar.map(
                    (evento, indice) => {

                      const dia =
                        parseInt(
                          evento.fecha.split(
                            '-'
                          )[2],
                          10
                        );

                      return (
                        <div
                          className="cal-evento"
                          key={`${evento.fecha}-${indice}`}
                        >

                          <span className="ev-icono">
                            <i className="fas fa-box"></i>
                          </span>

                          <span className="ev-texto">
                            {evento.desc}
                          </span>

                          <span className="ev-fecha">
                            Día {dia}
                          </span>

                        </div>
                      );
                    }
                  )

                )}

              </div>

            </div>

          </div>

        </div>

        {/* FILA INFERIOR */}
        <div className="grid-2">

          {/* INSUMOS MÁS USADOS */}
          <div className="panel">

            <div className="panel-cabeza">

              <div>

                <div className="panel-titulo">

                  <i className="fas fa-ranking-star"></i>

                  Insumos más usados

                </div>

                <div className="panel-sub">
                  Según cantidad de productos
                  que los usan
                </div>

              </div>

            </div>

            <div className="panel-body">

              <div className="ranking-lista">

                {rankingInsumos.map(
                  (item, indice) => {

                    const porcentaje =
                      (
                        (item.cantidad /
                          maxRanking) *
                        100
                      ).toFixed(1);

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

                        <span
                          className="ranking-nombre"
                          title={
                            item.insumo.nombre
                          }
                        >
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

                        <span className="ranking-val">
                          {item.cantidad}{' '}
                          producto
                          {item.cantidad === 1
                            ? ''
                            : 's'}
                        </span>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>

          {/* STOCK MÁS CRÍTICO */}
          <div className="panel">

            <div className="panel-cabeza">

              <div>

                <div className="panel-titulo">

                  <i className="fas fa-box-open"></i>

                  Stock más crítico

                </div>

                <div className="panel-sub">
                  Insumos a punto de agotarse
                </div>

              </div>

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

                      const colorFill =
                        critico
                          ? porcentaje < 50
                            ? '#b91c1c'
                            : '#d97706'
                          : '#1b6d4a';

                      return (
                        <tr
                          key={insumo.id}
                        >

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
                                className="mini-stock-fill"
                                style={{
                                  width: `${porcentaje.toFixed(
                                    0
                                  )}%`,
                                  background:
                                    colorFill,
                                }}
                              ></div>

                            </div>

                            <strong>
                              {insumo.s}{' '}
                              {insumo.u}
                            </strong>{' '}

                            {critico ? (

                              <span className="badge-na">
                                bajo
                              </span>

                            ) : (

                              <span className="badge-eq">
                                ok
                              </span>

                            )}

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <footer
          style={{
            textAlign: 'center',
            padding: '22px 16px',
            marginTop: '36px',
            borderTop:
              '1px solid #c9a227',
            color: '#8a6d1a',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          &copy; 2026{' '}

          <strong
            style={{
              color: '#c9a227',
            }}
          >
            LuckyPay
          </strong>{' '}

          &mdash; Controla tu Negocio,
          Crece con Confianza
        </footer>

      </main>

      {/* MODAL ALERTAS DE STOCK */}
      {modalAlertas && (
        <div
          className="modal-overlay activo"
          onClick={(evento) => {
            if (
              evento.target ===
              evento.currentTarget
            ) {
              cerrarModalAlertas();
            }
          }}
        >

          <div
            className="modal-box"
            style={{
              maxWidth: '520px',
            }}
          >

            <div className="modal-head">

              <h2>

                <i
                  className="fas fa-bell"
                  style={{
                    color: '#b91c1c',
                  }}
                ></i>

                Alertas de stock

                <span
                  className={`badge-alerta-cnt ${
                    cantidadAlertas === 0
                      ? 'cero'
                      : ''
                  }`}
                >
                  {cantidadAlertas}
                </span>

              </h2>

              <button
                type="button"
                className="modal-cerrar"
                onClick={
                  cerrarModalAlertas
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div
              className="modal-body"
              style={{
                padding: 0,
              }}
            >

              <div
                style={{
                  padding: '14px 20px',
                  background: '#fff8f8',
                  borderBottom:
                    '1px solid #fce7e7',
                  fontSize: '12px',
                  color: '#8a9690',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'space-between',
                  gap: '12px',
                }}
              >

                <span>

                  <i
                    className="fas fa-circle-info"
                    style={{
                      color: '#d97706',
                      marginRight: '4px',
                    }}
                  ></i>

                  Insumos bajo el
                  umbral mínimo

                </span>

                <button
                  type="button"
                  className="btn-sec"
                  onClick={
                    abrirModalUmbrales
                  }
                  style={{
                    fontSize: '12px',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '5px',
                  }}
                >

                  <i className="fas fa-sliders"></i>

                  Umbrales

                </button>

              </div>

              <div>

                {!alertasActivas.length ? (

                  <div className="sin-alertas">

                    <i
                      className="fas fa-circle-check"
                      style={{
                        fontSize: '28px',
                        color: '#1b6d2a',
                      }}
                    ></i>

                    Sin alertas activas

                  </div>

                ) : (

                  <div
                    className="alertas-lista"
                    style={{
                      padding:
                        '0 20px',
                    }}
                  >

                    {alertasOrdenadas.map(
                      (insumo) => {

                        const resuelta =
                          alertasResueltas.has(
                            insumo.id
                          );

                        const porcentaje =
                          Math.min(
                            (insumo.s /
                              insumo.m) *
                              100,
                            100
                          );

                        const critica =
                          porcentaje < 50;

                        return (
                          <div
                            className={`alerta-item ${
                              critica
                                ? 'al-critica'
                                : 'al-advertencia'
                            } ${
                              resuelta
                                ? 'resuelta'
                                : ''
                            }`}
                            key={insumo.id}
                          >

                            <div className="al-ic">

                              <i
                                className={`fas fa-${
                                  critica
                                    ? 'triangle-exclamation'
                                    : 'circle-exclamation'
                                }`}
                              ></i>

                            </div>

                            <div className="al-info">

                              <div className="al-nombre">
                                {insumo.nombre}
                              </div>

                              <div className="al-det">
                                {resuelta
                                  ? 'Resuelta · '
                                  : ''}
                                Mín:{' '}
                                {insumo.m}{' '}
                                {insumo.u}
                              </div>

                            </div>

                            <div className="al-stock">

                              <div className="al-actual">
                                {insumo.s}{' '}
                                {insumo.u}
                              </div>

                              <div className="stock-bar">

                                <div
                                  className={`stock-fill ${
                                    critica
                                      ? 'sf-critica'
                                      : 'sf-advertencia'
                                  }`}
                                  style={{
                                    width: `${porcentaje.toFixed(
                                      0
                                    )}%`,
                                  }}
                                ></div>

                              </div>

                              <div className="al-min">
                                de {insumo.m}
                              </div>

                            </div>

                            {!resuelta ? (

                              <button
                                type="button"
                                className="btn-res"
                                onClick={() =>
                                  resolverAlerta(
                                    insumo.id
                                  )
                                }
                                title="Marcar resuelta"
                              >
                                <i className="fas fa-check"></i>
                              </button>

                            ) : (

                              <div
                                style={{
                                  width: '30px',
                                }}
                              ></div>

                            )}

                          </div>
                        );
                      }
                    )}

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>
      )}

      {/* MODAL UMBRALES */}
      {modalUmbrales && (
        <div
          className="modal-overlay activo"
          onClick={(evento) => {
            if (
              evento.target ===
              evento.currentTarget
            ) {
              cerrarModalUmbrales();
            }
          }}
        >

          <div className="modal-box">

            <div className="modal-head">

              <h2>

                <i className="fas fa-sliders"></i>

                Umbrales mínimos de stock

              </h2>

              <button
                type="button"
                className="modal-cerrar"
                onClick={
                  cerrarModalUmbrales
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-body">

              <p
                style={{
                  fontSize: '13px',
                  color: '#8a9690',
                  marginBottom:
                    '16px',
                }}
              >
                Define el stock mínimo de
                cada insumo. Cuando el stock
                real baje, aparecerá una
                alerta.
              </p>

              <div>

                {insumos.map((insumo) => (
                  <div
                    className="umbral-fila"
                    key={insumo.id}
                  >

                    <span className="umbral-nombre">
                      {insumo.nombre}
                    </span>

                    <input
                      type="number"
                      className="input-umbral"
                      value={
                        umbralesTemporales[
                          insumo.id
                        ] ?? insumo.m
                      }
                      min="0"
                      onChange={(evento) =>
                        cambiarUmbral(
                          insumo.id,
                          evento.target.value
                        )
                      }
                    />

                    <span className="umbral-und">
                      {insumo.u}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn-sec"
                onClick={
                  cancelarUmbrales
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-pri"
                onClick={
                  guardarUmbrales
                }
              >

                <i className="fas fa-save"></i>

                Guardar

              </button>

            </div>

          </div>

        </div>
      )}

      {/* MODAL NUEVO RECORDATORIO */}
      {modalEvento && (
        <div
          className="modal-overlay activo"
          onClick={(evento) => {
            if (
              evento.target ===
              evento.currentTarget
            ) {
              cerrarModalEvento();
            }
          }}
        >

          <div className="modal-evento-box">

            <div className="modal-head">

              <h2>

                <i className="fas fa-calendar-plus"></i>

                Agregar recordatorio de stock

              </h2>

              <button
                type="button"
                className="modal-cerrar"
                onClick={
                  cerrarModalEvento
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-body">

              <div
                style={{
                  marginBottom: '12px',
                }}
              >

                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#5b6a62',
                    display: 'block',
                    marginBottom:
                      '6px',
                  }}
                >
                  Fecha
                </label>

                <input
                  type="date"
                  className="input-texto"
                  value={eventoFecha}
                  onChange={(evento) =>
                    setEventoFecha(
                      evento.target.value
                    )
                  }
                />

              </div>

              <div>

                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#5b6a62',
                    display: 'block',
                    marginBottom:
                      '6px',
                  }}
                >
                  Descripción
                </label>

                <input
                  type="text"
                  className="input-texto"
                  value={eventoDesc}
                  onChange={(evento) =>
                    setEventoDesc(
                      evento.target.value
                    )
                  }
                  placeholder="Ej: Revisar stock de Karité"
                />

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn-sec"
                onClick={
                  cancelarEvento
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-pri"
                onClick={
                  guardarEvento
                }
              >

                <i className="fas fa-check"></i>

                Agregar

              </button>

            </div>

          </div>

        </div>
      )}

      {/* TOAST */}
      <div
        className={`toast ${
          toastVisible
            ? 'visible'
            : ''
        }`}
      >

        <i className="fas fa-circle-check"></i>

        <span>
          {toastMensaje}
        </span>

      </div>

    </div>
  );
}

export default PanelEmpleado;