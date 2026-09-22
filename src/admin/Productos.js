import React, {
  useMemo,
  useState
} from 'react';

import '../styles/Productos.css';

import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';


/* =====================================================
   PRODUCTOS INICIALES
===================================================== */

const PRODUCTOS_INICIALES = [

  {
    id: 1,

    nombre: 'Silla ergonómica mod. A',

    descripcion:
      'Silla de oficina con soporte lumbar ajustable.',

    unidad: 'Unidad',

    manoObra: 85000,

    insumos: [

      {
        id: 1,
        nombre: 'Madera pino',
        cantidad: 2,
        tipo: 'insumo'
      },

      {
        id: 2,
        nombre: 'Tela tapizado',
        cantidad: 1,
        tipo: 'insumo'
      },

      {
        id: 3,
        nombre: 'Espuma relleno',
        cantidad: 1,
        tipo: 'insumo'
      }

    ]
  },


  {
    id: 2,

    nombre: 'Mesa de trabajo',

    descripcion:
      'Mesa industrial para taller o bodega.',

    unidad: 'Unidad',

    manoObra: 100000,

    insumos: [

      {
        id: 4,
        nombre: 'Madera pino',
        cantidad: 4,
        tipo: 'insumo'
      },

      {
        id: 5,
        nombre: 'Tornillos acero',
        cantidad: 1,
        tipo: 'insumo'
      },

      {
        id: 6,
        nombre: 'Barniz acabado',
        cantidad: 1,
        tipo: 'insumo'
      }

    ]
  }

];


/* =====================================================
   INSUMOS DISPONIBLES
===================================================== */

const INSUMOS_DISPONIBLES = [

  /* INSUMOS NORMALES */

  {
    id: 1,
    nombre: 'Madera pino',
    tipo: 'insumo'
  },

  {
    id: 2,
    nombre: 'Tornillos acero',
    tipo: 'insumo'
  },

  {
    id: 3,
    nombre: 'Pintura base',
    tipo: 'insumo'
  },

  {
    id: 4,
    nombre: 'Tela tapizado',
    tipo: 'insumo'
  },

  {
    id: 5,
    nombre: 'Espuma relleno',
    tipo: 'insumo'
  },

  {
    id: 6,
    nombre: 'Barniz acabado',
    tipo: 'insumo'
  },


  /* INSUMOS TRANSFORMADOS */

  {
    id: 7,
    nombre: 'Tablas de madera',
    tipo: 'transformado'
  },

  {
    id: 8,
    nombre: 'Tapizado terminado',
    tipo: 'transformado'
  }

];


/* =====================================================
   FORMATEAR PESOS
===================================================== */

function formatearCOP(valor) {

  return new Intl.NumberFormat(
    'es-CO',
    {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }
  ).format(Number(valor) || 0);

}


/* =====================================================
   CREAR FILA DE INSUMO
===================================================== */

function crearInsumoVacio() {

  return {

    id:
      Date.now() +
      Math.random(),

    nombre: '',

    cantidad: 1,

    tipo: ''

  };

}


/* =====================================================
   COMPONENTE
===================================================== */

function Productos() {


  /* =====================================================
     ESTADOS
  ===================================================== */

  const [
    productos,
    setProductos
  ] = useState(PRODUCTOS_INICIALES);


  const [
    menuAbierto,
    setMenuAbierto
  ] = useState(false);


  const [
    busqueda,
    setBusqueda
  ] = useState('');


  const [
    modalAbierto,
    setModalAbierto
  ] = useState(false);


  const [
    modalEliminar,
    setModalEliminar
  ] = useState(false);


  const [
    productoEditar,
    setProductoEditar
  ] = useState(null);


  const [
    productoEliminar,
    setProductoEliminar
  ] = useState(null);


  const [
    mensaje,
    setMensaje
  ] = useState('');


  /*
    Guarda temporalmente lo que el usuario
    está escribiendo en cada buscador de insumo.
  */

  const [
    busquedasInsumos,
    setBusquedasInsumos
  ] = useState({});


  const [
    formulario,
    setFormulario
  ] = useState({

    nombre: '',

    descripcion: '',

    unidad: 'Unidad',

    manoObra: '',

    insumos: []

  });


  /* =====================================================
     FILTRO DE PRODUCTOS
  ===================================================== */

  const productosFiltrados = useMemo(() => {

    const texto =
      busqueda
        .trim()
        .toLowerCase();


    if (!texto) {

      return productos;

    }


    return productos.filter(
      (producto) => {

        return (

          producto.nombre
            .toLowerCase()
            .includes(texto)

          ||

          producto.descripcion
            .toLowerCase()
            .includes(texto)

        );

      }
    );

  }, [
    productos,
    busqueda
  ]);


  /* =====================================================
     MENSAJE
  ===================================================== */

  const mostrarMensaje = (texto) => {

    setMensaje(texto);


    window.setTimeout(() => {

      setMensaje('');

    }, 2500);

  };


  /* =====================================================
     NAVEGACIÓN
  ===================================================== */

  const navegar = (ruta) => {

    setMenuAbierto(false);

    window.location.href = ruta;

  };


  /* =====================================================
     CERRAR SESIÓN
  ===================================================== */

  const cerrarSesion = () => {

    localStorage.clear();

    sessionStorage.clear();

    window.location.href = '/';

  };


  /* =====================================================
     ABRIR CREAR
  ===================================================== */

  const abrirCrear = () => {

    setProductoEditar(null);


    setFormulario({

      nombre: '',

      descripcion: '',

      unidad: 'Unidad',

      manoObra: '',

      insumos: []

    });


    setBusquedasInsumos({});


    setModalAbierto(true);

  };


  /* =====================================================
     ABRIR EDITAR
  ===================================================== */

  const abrirEditar = (producto) => {

    setProductoEditar(producto);


    setFormulario({

      nombre:
        producto.nombre,

      descripcion:
        producto.descripcion,

      unidad:
        producto.unidad,

      manoObra:
        producto.manoObra,

      insumos:
        producto.insumos.map(
          (insumo) => ({

            ...insumo,

            tipo:
              insumo.tipo || 'insumo'

          })
        )

    });


    /*
      Importante:
      al editar NO ponemos los nombres
      dentro del buscador.

      Así se muestran como seleccionados
      y no aparecen resultados automáticamente.
    */

    setBusquedasInsumos({});


    setModalAbierto(true);

  };


  /* =====================================================
     CERRAR MODAL
  ===================================================== */

  const cerrarModal = () => {

    setModalAbierto(false);

    setProductoEditar(null);

    setBusquedasInsumos({});

  };


  /* =====================================================
     CAMBIAR FORMULARIO
  ===================================================== */

  const cambiarCampo = (
    campo,
    valor
  ) => {

    setFormulario(
      (actual) => ({

        ...actual,

        [campo]: valor

      })
    );

  };


  /* =====================================================
     AGREGAR INSUMO
  ===================================================== */

  const agregarInsumo = () => {

    setFormulario(
      (actual) => ({

        ...actual,

        insumos: [

          ...actual.insumos,

          crearInsumoVacio()

        ]

      })
    );

  };


  /* =====================================================
     ACTUALIZAR INSUMO
  ===================================================== */

  const actualizarInsumo = (
    id,
    campo,
    valor
  ) => {

    setFormulario(
      (actual) => ({

        ...actual,

        insumos:
          actual.insumos.map(
            (insumo) => {

              if (
                insumo.id !== id
              ) {

                return insumo;

              }


              return {

                ...insumo,

                [campo]:
                  campo === 'cantidad'

                    ? Number(valor)

                    : valor

              };

            }
          )

      })
    );

  };


  /* =====================================================
     BUSCAR INSUMO
  ===================================================== */

  const buscarInsumo = (
    idFila,
    texto
  ) => {

    setBusquedasInsumos(
      (actual) => ({

        ...actual,

        [idFila]: texto

      })
    );


    /*
      Si el usuario borra completamente
      la búsqueda, limpiamos la selección.
    */

    if (
      texto.trim() === ''
    ) {

      actualizarInsumo(
        idFila,
        'nombre',
        ''
      );


      actualizarInsumo(
        idFila,
        'tipo',
        ''
      );

    }

  };


  /* =====================================================
     RESULTADOS DE BÚSQUEDA
  ===================================================== */

  const obtenerResultadosInsumos = (
    idFila
  ) => {

    const texto =
      (
        busquedasInsumos[idFila] || ''
      )
        .trim()
        .toLowerCase();


    if (!texto) {

      return [];

    }


    /*
      Solo evitamos duplicar el mismo
      insumo dentro del MISMO producto.

      Un mismo insumo sí puede utilizarse
      en otros productos.
    */

    const seleccionados =
      formulario.insumos

        .filter(
          (insumo) =>
            insumo.id !== idFila
        )

        .map(
          (insumo) =>
            insumo.nombre
        );


    return INSUMOS_DISPONIBLES.filter(
      (insumo) => {

        const coincide =
          insumo.nombre
            .toLowerCase()
            .includes(texto);


        const yaSeleccionado =
          seleccionados.includes(
            insumo.nombre
          );


        return (
          coincide &&
          !yaSeleccionado
        );

      }
    );

  };


  /* =====================================================
     SELECCIONAR INSUMO
  ===================================================== */

  const seleccionarInsumo = (
    idFila,
    insumoSeleccionado
  ) => {


    /*
      Primero guardamos el insumo.
    */

    actualizarInsumo(
      idFila,
      'nombre',
      insumoSeleccionado.nombre
    );


    actualizarInsumo(
      idFila,
      'tipo',
      insumoSeleccionado.tipo
    );


    /*
      MUY IMPORTANTE:

      Eliminamos la búsqueda temporal.

      Esto hace que desaparezca
      inmediatamente la lista de resultados.
    */

    setBusquedasInsumos(
      (actual) => {

        const copia = {
          ...actual
        };


        delete copia[idFila];


        return copia;

      }
    );

  };


  /* =====================================================
     ELIMINAR INSUMO
  ===================================================== */

  const eliminarInsumo = (
    id
  ) => {

    setFormulario(
      (actual) => ({

        ...actual,

        insumos:
          actual.insumos.filter(
            (insumo) =>
              insumo.id !== id
          )

      })
    );


    setBusquedasInsumos(
      (actual) => {

        const copia = {
          ...actual
        };


        delete copia[id];


        return copia;

      }
    );

  };


  /* =====================================================
     GUARDAR PRODUCTO
  ===================================================== */

  const guardarProducto = (
    evento
  ) => {

    evento.preventDefault();


    const nombre =
      formulario.nombre.trim();


    if (!nombre) {

      mostrarMensaje(
        'Debes ingresar el nombre del producto.'
      );

      return;

    }


    const manoObra =
      Number(
        formulario.manoObra
      ) || 0;


    /*
      Quitamos filas vacías.
    */

    const insumosLimpios =
      formulario.insumos

        .filter(
          (insumo) =>
            insumo.nombre &&
            insumo.nombre.trim() !== ''
        )

        .map(
          (insumo) => ({

            ...insumo,

            nombre:
              insumo.nombre.trim(),

            cantidad:
              Number(
                insumo.cantidad
              ) || 1,

            tipo:
              insumo.tipo || 'insumo'

          })
        );


    /* =================================================
       EDITAR PRODUCTO
    ================================================= */

    if (productoEditar) {

      setProductos(
        (actuales) =>

          actuales.map(
            (producto) => {

              if (
                producto.id !==
                productoEditar.id
              ) {

                return producto;

              }


              return {

                ...producto,

                nombre,

                descripcion:
                  formulario.descripcion.trim(),

                unidad:
                  formulario.unidad,

                manoObra,

                insumos:
                  insumosLimpios

              };

            }
          )

      );


      cerrarModal();


      mostrarMensaje(
        'Producto actualizado correctamente.'
      );


      return;

    }


    /* =================================================
       CREAR NUEVO PRODUCTO
    ================================================= */

    const nuevoProducto = {

      id:
        Date.now(),

      nombre,

      descripcion:
        formulario.descripcion.trim(),

      unidad:
        formulario.unidad,

      manoObra,

      insumos:
        insumosLimpios

    };


    setProductos(
      (actuales) => [

        ...actuales,

        nuevoProducto

      ]
    );


    cerrarModal();


    mostrarMensaje(
      'Producto creado correctamente.'
    );

  };


  /* =====================================================
     ABRIR ELIMINAR
  ===================================================== */

  const abrirEliminar = (
    producto
  ) => {

    setProductoEliminar(
      producto
    );

    setModalEliminar(true);

  };


  /* =====================================================
     CERRAR ELIMINAR
  ===================================================== */

  const cerrarEliminar = () => {

    setModalEliminar(false);

    setProductoEliminar(null);

  };


  /* =====================================================
     CONFIRMAR ELIMINAR
  ===================================================== */

  const confirmarEliminar = () => {

    if (
      !productoEliminar
    ) {

      return;

    }


    setProductos(
      (actuales) =>

        actuales.filter(
          (producto) =>
            producto.id !==
            productoEliminar.id
        )

    );


    cerrarEliminar();


    mostrarMensaje(
      'Producto eliminado correctamente.'
    );

  };


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <div className="productos-page">


      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="productos-navbar">


        <div className="productos-navbar-left">


          {/* MENU */}

          <button

            type="button"

            className={`productos-menu ${
              menuAbierto
                ? 'abierto'
                : ''
            }`}

            onClick={() => {

              setMenuAbierto(
                (estado) =>
                  !estado
              );

            }}

            aria-label={
              menuAbierto
                ? 'Cerrar menú'
                : 'Abrir menú'
            }

          >

            {menuAbierto ? (

              <span className="productos-menu-x">
                ×
              </span>

            ) : (

              <>

                <span></span>

                <span></span>

                <span></span>

              </>

            )}

          </button>


          {/* MARCA */}

          <div className="productos-brand">

            <img
              src={logo}
              alt="LuckyPay"
            />


            <div>

              <span>
                LuckyPay
              </span>

              <small>
                Gestión de productos
              </small>

            </div>

          </div>


        </div>


        {/* ADMINISTRADOR */}

        <div className="productos-admin">


          <div>

            <strong>
              Administrador
            </strong>

            <small>
              Gestión de productos
            </small>

          </div>


          <button

            type="button"

            className="productos-salir"

            onClick={cerrarSesion}

          >

            Salir

          </button>


        </div>


      </header>


      {/* =================================================
          SIDEBAR
      ================================================= */}

      {menuAbierto && (

        <>

          <div

            className="productos-overlay"

            onClick={() =>
              setMenuAbierto(false)
            }

          />


          <aside className="productos-sidebar">


            <div className="productos-sidebar-header">

              <strong>
                MENÚ PRINCIPAL
              </strong>

            </div>


            <nav className="productos-sidebar-menu">


              {/* INICIO */}

              <button
                type="button"
                onClick={() =>
                  navegar('/panel')
                }
              >

                <span className="productos-menu-icon">
                  ⌂
                </span>

                Inicio

              </button>


              {/* INSUMOS */}

              <button
                type="button"
                onClick={() =>
                  navegar('/insumos')
                }
              >

                <span className="productos-menu-icon">
                  ▤
                </span>

                Insumos

              </button>


              {/* PRODUCTOS */}

              <button
                type="button"
                className="activo"
                onClick={() =>
                  navegar('/productos')
                }
              >

                <span className="productos-menu-icon">
                  ◆
                </span>

                Productos

              </button>


              {/* COSTOS */}

              <button
                type="button"
                onClick={() =>
                  navegar('/costos')
                }
              >

                <span className="productos-menu-icon">
                  $
                </span>

                Costos

              </button>


              {/* META */}

              <button
                type="button"
                onClick={() =>
                  navegar('/meta-ventas')
                }
              >

                <span className="productos-menu-icon">
                  ◎
                </span>

                Meta de Ventas

              </button>


              {/* USUARIOS */}

              <button
                type="button"
                onClick={() =>
                  navegar('/usuarios')
                }
              >

                <span className="productos-menu-icon">
                  ♙
                </span>

                Usuarios y Roles

              </button>


              {/* ANÁLISIS */}

              <button
                type="button"
                onClick={() =>
                  navegar('/analisis')
                }
              >

                <span className="productos-menu-icon">
                  ◔
                </span>

                Análisis

              </button>


              {/* REPORTES */}

              <button
                type="button"
                onClick={() =>
                  navegar('/reportes')
                }
              >

                <span className="productos-menu-icon">
                  ▤
                </span>

                Reportes

              </button>


              {/* AUDITORÍA */}

              <button
                type="button"
                onClick={() =>
                  navegar('/auditoria')
                }
              >

                <span className="productos-menu-icon">
                  ☷
                </span>

                Auditoría

              </button>


              {/* CONFIGURACIÓN */}

              <button
                type="button"
                onClick={() =>
                  navegar('/configuracion')
                }
              >

                <span className="productos-menu-icon">
                  ⚙
                </span>

                Configuración

              </button>


            </nav>


            {/* CERRAR SESIÓN */}

            <div className="productos-sidebar-bottom">

              <button
                type="button"
                onClick={cerrarSesion}
              >

                <span className="productos-menu-icon">
                  ↪
                </span>

                Cerrar sesión

              </button>

            </div>


          </aside>

        </>

      )}


      {/* =================================================
          CONTENIDO PRINCIPAL
      ================================================= */}

      <main className="productos-main">


        <section className="productos-header">


          <span className="productos-label">
            INVENTARIO
          </span>


          <h1>
            ◆ Gestión de Productos
          </h1>


          <p>
            Registra los productos que fabricas,
            sus insumos y costos de producción.
          </p>


        </section>


        {/* =================================================
            TARJETA
        ================================================= */}

        <section className="productos-card">


          <div className="productos-section-header">


            <div>

              <h2>
                ▤ Productos registrados
              </h2>

              <p>
                Consulta, edita o elimina los productos
                del sistema.
              </p>

            </div>


            <button

              type="button"

              className="btn-producto-primary"

              onClick={abrirCrear}

            >

              + Nuevo producto

            </button>


          </div>


          {/* MENSAJE */}

          {mensaje && (

            <div className="productos-mensaje">

              {mensaje}

            </div>

          )}


          {/* BUSCADOR */}

          <div className="productos-search">

            <input

              type="text"

              value={busqueda}

              onChange={(evento) =>
                setBusqueda(
                  evento.target.value
                )
              }

              placeholder="Buscar producto por nombre..."

              aria-label="Buscar producto"

            />

          </div>


          {/* TABLA */}

          <div className="productos-table-wrapper">


            <table className="productos-table">


              <thead>

                <tr>

                  <th>
                    Producto
                  </th>

                  <th>
                    Unidad
                  </th>

                  <th>
                    Insumos
                  </th>

                  <th>
                    Mano de obra
                  </th>

                  <th>
                    Costo total
                  </th>

                  <th>
                    Acciones
                  </th>

                </tr>

              </thead>


              <tbody>


                {productosFiltrados.length > 0 ? (

                  productosFiltrados.map(
                    (producto) => (

                      <tr
                        key={producto.id}
                      >


                        <td>

                          <div className="producto-info">


                            <div className="producto-avatar">
                              ◆
                            </div>


                            <div>

                              <strong>
                                {producto.nombre}
                              </strong>


                              <small>
                                {producto.descripcion ||
                                  'Sin descripción'}
                              </small>

                            </div>


                          </div>

                        </td>


                        <td>

                          <span className="badge-unidad">

                            {producto.unidad}

                          </span>

                        </td>


                        <td>

                          {producto.insumos.length > 0 ? (

                            <span className="badge-insumos">

                              {producto.insumos.length}

                              {' '}

                              {producto.insumos.length === 1
                                ? 'insumo'
                                : 'insumos'}

                            </span>

                          ) : (

                            <span className="badge-sin-insumos">

                              Sin insumos

                            </span>

                          )}

                        </td>


                        <td>

                          <span className="precio-mano">

                            {formatearCOP(
                              producto.manoObra
                            )}

                          </span>

                        </td>


                        <td>

                          <span className="precio-total">

                            {formatearCOP(
                              producto.manoObra
                            )}

                          </span>

                        </td>


                        <td>

                          <div className="acciones-producto">


                            <button

                              type="button"

                              className="btn-editar"

                              onClick={() =>
                                abrirEditar(
                                  producto
                                )
                              }

                              title="Editar producto"

                            >

                              ✎

                            </button>


                            <button

                              type="button"

                              className="btn-eliminar"

                              onClick={() =>
                                abrirEliminar(
                                  producto
                                )
                              }

                              title="Eliminar producto"

                            >

                              ×

                            </button>


                          </div>

                        </td>


                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td colSpan="6">

                      <div className="productos-vacio">

                        No se encontraron productos.

                      </div>

                    </td>

                  </tr>

                )}


              </tbody>


            </table>


          </div>


          {/* FOOTER */}

          <div className="productos-footer">


            <span>

              {productosFiltrados.length}

              {' '}

              {productosFiltrados.length === 1
                ? 'producto registrado'
                : 'productos registrados'}

            </span>


            <span>
              LuckyPay
            </span>


          </div>


        </section>


      </main>


      {/* =================================================
          MODAL CREAR / EDITAR
      ================================================= */}

      {modalAbierto && (

        <div

          className="producto-modal-overlay"

          onMouseDown={(evento) => {

            if (
              evento.target ===
              evento.currentTarget
            ) {

              cerrarModal();

            }

          }}

        >


          <div

            className="producto-modal"

            role="dialog"

            aria-modal="true"

          >


            {/* HEADER */}

            <div className="producto-modal-header">


              <div>

                <span>

                  {productoEditar
                    ? 'EDITAR'
                    : 'NUEVO'}

                </span>


                <h2>

                  {productoEditar
                    ? 'Editar producto'
                    : 'Nuevo producto'}

                </h2>

              </div>


              <button

                type="button"

                onClick={cerrarModal}

                aria-label="Cerrar"

              >

                ×

              </button>


            </div>


            {/* FORMULARIO */}

            <form
              className="producto-form"
              onSubmit={guardarProducto}
            >


              <div className="producto-modal-body">


                {/* NOMBRE */}

                <div className="campo">


                  <label htmlFor="nombre-producto">

                    Nombre del producto

                    <span>
                      *
                    </span>

                  </label>


                  <input

                    id="nombre-producto"

                    type="text"

                    value={
                      formulario.nombre
                    }

                    onChange={(evento) =>
                      cambiarCampo(
                        'nombre',
                        evento.target.value
                      )
                    }

                    placeholder="Ej. Silla ergonómica"

                    autoFocus

                  />


                </div>


                <br />


                {/* DESCRIPCIÓN */}

                <div className="campo">


                  <label htmlFor="descripcion-producto">

                    Descripción

                  </label>


                  <textarea

                    id="descripcion-producto"

                    value={
                      formulario.descripcion
                    }

                    onChange={(evento) =>
                      cambiarCampo(
                        'descripcion',
                        evento.target.value
                      )
                    }

                    placeholder="Describe brevemente el producto..."

                  />


                </div>


                <br />


                {/* UNIDAD / MANO DE OBRA */}

                <div className="campo-grid">


                  <div className="campo">


                    <label htmlFor="unidad-producto">

                      Unidad

                    </label>


                    <select

                      id="unidad-producto"

                      value={
                        formulario.unidad
                      }

                      onChange={(evento) =>
                        cambiarCampo(
                          'unidad',
                          evento.target.value
                        )
                      }

                    >

                      <option value="Unidad">
                        Unidad
                      </option>

                      <option value="Docena">
                        Docena
                      </option>

                      <option value="Caja">
                        Caja
                      </option>

                      <option value="Lote">
                        Lote
                      </option>

                    </select>


                  </div>


                  <div className="campo">


                    <label htmlFor="mano-obra">

                      Mano de obra

                    </label>


                    <input

                      id="mano-obra"

                      type="number"

                      min="0"

                      step="1000"

                      value={
                        formulario.manoObra
                      }

                      onChange={(evento) =>
                        cambiarCampo(
                          'manoObra',
                          evento.target.value
                        )
                      }

                      placeholder="0"

                    />


                  </div>


                </div>


                <br />


                {/* =================================================
                    INSUMOS
                ================================================= */}

                <div className="producto-insumos">


                  <div className="producto-insumos-header">


                    <strong>
                      Insumos utilizados
                    </strong>


                    <button

                      type="button"

                      className="producto-agregar-insumo"

                      onClick={agregarInsumo}

                    >

                      + Agregar insumo

                    </button>


                  </div>


                  {/* SIN INSUMOS */}

                  {formulario.insumos.length === 0 ? (

                    <div className="producto-delete-alert">

                      Este producto todavía no tiene
                      insumos registrados.

                    </div>

                  ) : (


                    /* LISTA */

                    formulario.insumos.map(
                      (insumo) => {


                        const textoBusqueda =
                          busquedasInsumos[
                            insumo.id
                          ] || '';


                        const resultados =
                          obtenerResultadosInsumos(
                            insumo.id
                          );


                        const estaBuscando =
                          Object.prototype.hasOwnProperty.call(
                            busquedasInsumos,
                            insumo.id
                          );


                        return (

                          <div

                            className="producto-insumo-row"

                            key={
                              insumo.id
                            }

                          >


                            {/* BUSCADOR */}

                            <div className="producto-insumo-search">


                              <input

                                type="text"

                                value={

                                  estaBuscando

                                    ? textoBusqueda

                                    : insumo.nombre

                                }

                                onChange={(evento) =>
                                  buscarInsumo(
                                    insumo.id,
                                    evento.target.value
                                  )
                                }

                                placeholder="🔎 Buscar insumo..."

                                autoComplete="off"

                              />


                              {/* RESULTADOS */}

                              {estaBuscando &&
                                resultados.length > 0 && (

                                  <div className="producto-insumo-resultados">


                                    {resultados.map(
                                      (resultado) => (

                                        <button

                                          type="button"

                                          key={
                                            resultado.id
                                          }

                                          className="producto-insumo-resultado"

                                          onClick={() =>
                                            seleccionarInsumo(
                                              insumo.id,
                                              resultado
                                            )
                                          }

                                        >


                                          <span>

                                            {resultado.nombre}

                                          </span>


                                          <small>

                                            {resultado.tipo ===
                                            'transformado'

                                              ? 'Insumo transformado'

                                              : 'Insumo disponible'}

                                          </small>


                                        </button>

                                      )
                                    )}


                                  </div>

                                )}


                              {/* SIN RESULTADOS */}

                              {estaBuscando &&
                                textoBusqueda.trim() !== '' &&
                                resultados.length === 0 && (

                                  <div className="producto-insumo-sin-resultados">

                                    No se encontraron insumos.

                                  </div>

                                )}


                              {/* TIPO SELECCIONADO */}

                              {!estaBuscando &&
                                insumo.nombre && (

                                  <div className="producto-insumo-tipo">

                                    {insumo.tipo ===
                                    'transformado'

                                      ? 'Insumo transformado'

                                      : 'Insumo disponible'}

                                  </div>

                                )}


                            </div>


                            {/* CANTIDAD */}

                            <input

                              type="number"

                              min="1"

                              value={
                                insumo.cantidad
                              }

                              onChange={(evento) =>
                                actualizarInsumo(
                                  insumo.id,
                                  'cantidad',
                                  evento.target.value
                                )
                              }

                              aria-label="Cantidad"

                            />


                            {/* ELIMINAR */}

                            <button

                              type="button"

                              className="producto-insumo-remove"

                              onClick={() =>
                                eliminarInsumo(
                                  insumo.id
                                )
                              }

                              aria-label="Eliminar insumo"

                            >

                              ×

                            </button>


                          </div>

                        );

                      }

                    )

                  )}


                </div>


              </div>


              {/* FOOTER MODAL */}

              <div className="producto-modal-footer">


                <button

                  type="button"

                  className="producto-btn-cancelar"

                  onClick={cerrarModal}

                >

                  Cancelar

                </button>


                <button

                  type="submit"

                  className="producto-btn-guardar"

                >

                  {productoEditar

                    ? 'Guardar cambios'

                    : 'Crear producto'}

                </button>


              </div>


            </form>


          </div>


        </div>

      )}


      {/* =================================================
          MODAL ELIMINAR
      ================================================= */}

      {modalEliminar &&
        productoEliminar && (

          <div

            className="producto-modal-overlay"

            onMouseDown={(evento) => {

              if (
                evento.target ===
                evento.currentTarget
              ) {

                cerrarEliminar();

              }

            }}

          >


            <div

              className="producto-modal"

              role="dialog"

              aria-modal="true"

            >


              <div className="producto-modal-header peligro">


                <div>

                  <span>
                    CONFIRMAR
                  </span>


                  <h2>
                    Eliminar producto
                  </h2>


                  <p>
                    Esta acción eliminará el registro.
                  </p>

                </div>


                <button

                  type="button"

                  onClick={cerrarEliminar}

                  aria-label="Cerrar"

                >

                  ×

                </button>


              </div>


              <div className="producto-modal-body">


                <div className="producto-delete-confirm">

                  ¿Estás seguro de que deseas eliminar?

                  <br />

                  <strong>
                    {productoEliminar.nombre}
                  </strong>

                </div>


                <br />


                <div className="producto-delete-alert">

                  Esta acción no se puede deshacer.

                </div>


              </div>


              <div className="producto-modal-footer">


                <button

                  type="button"

                  className="producto-btn-cancelar"

                  onClick={cerrarEliminar}

                >

                  Cancelar

                </button>


                <button

                  type="button"

                  className="producto-btn-eliminar-confirmar"

                  onClick={confirmarEliminar}

                >

                  Eliminar producto

                </button>


              </div>


            </div>


          </div>

        )}


    </div>

  );

}


export default Productos;