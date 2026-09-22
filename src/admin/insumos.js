import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import '../styles/insumos.css';

import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

import {
  obtenerInsumos,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo as eliminarInsumoAPI,
} from '../services/api';


function Insumos() {

  /* =====================================================
     MENÚ
  ===================================================== */

  const [menuAbierto, setMenuAbierto] = useState(false);


  /* =====================================================
     INSUMOS
  ===================================================== */

  const [insumos, setInsumos] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [errorAPI, setErrorAPI] = useState('');


  /* =====================================================
     BÚSQUEDA
  ===================================================== */

  const [busqueda, setBusqueda] = useState('');


  /* =====================================================
     MODALES
  ===================================================== */

  const [mostrarModal, setMostrarModal] =
    useState(false);

  const [mostrarEliminar, setMostrarEliminar] =
    useState(false);

  const [insumoSeleccionado, setInsumoSeleccionado] =
    useState(null);


  /* =====================================================
     FORMULARIO
  ===================================================== */

  const [formulario, setFormulario] = useState({
    nombre: '',
    unidad: '',
    stock: '',
    stockMinimo: '',
    precio: '',
  });


  /* =====================================================
     CARGAR INSUMOS DESDE JSON SERVER
  ===================================================== */

  useEffect(() => {

    const cargarInsumos = async () => {

      try {

        setCargando(true);

        setErrorAPI('');

        const datos = await obtenerInsumos();

        setInsumos(datos);

      } catch (error) {

        console.error(
          'Error al cargar los insumos:',
          error
        );

        setErrorAPI(
          'No se pudo conectar con el servidor de datos.'
        );

      } finally {

        setCargando(false);

      }

    };

    cargarInsumos();

  }, []);


  /* =====================================================
     FILTRO
  ===================================================== */

  const insumosFiltrados = useMemo(() => {

    return insumos.filter((insumo) =>
      String(insumo.nombre || '')
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );

  }, [insumos, busqueda]);


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

    localStorage.removeItem('usuario');

    localStorage.removeItem('rol');

    sessionStorage.removeItem('usuario');

    sessionStorage.removeItem('rol');

    window.location.href = '/';

  };


  /* =====================================================
     NUEVO INSUMO
  ===================================================== */

  const abrirNuevo = () => {

    setInsumoSeleccionado(null);

    setFormulario({
      nombre: '',
      unidad: '',
      stock: '',
      stockMinimo: '',
      precio: '',
    });

    setMostrarModal(true);

  };


  /* =====================================================
     EDITAR INSUMO
  ===================================================== */

  const abrirEditar = (insumo) => {

    setInsumoSeleccionado(insumo);

    setFormulario({
      nombre: insumo.nombre || '',
      unidad: insumo.unidad || '',
      stock: insumo.stock ?? '',
      stockMinimo: insumo.stockMinimo ?? '',
      precio: insumo.precio ?? '',
    });

    setMostrarModal(true);

  };


  /* =====================================================
     CERRAR MODAL
  ===================================================== */

  const cerrarModal = () => {

    setMostrarModal(false);

    setInsumoSeleccionado(null);

    setFormulario({
      nombre: '',
      unidad: '',
      stock: '',
      stockMinimo: '',
      precio: '',
    });

  };


  /* =====================================================
     CAMBIOS FORMULARIO
  ===================================================== */

  const manejarCambio = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

  };


  /* =====================================================
     GUARDAR INSUMO
  ===================================================== */

  const guardarInsumo = async (e) => {

    e.preventDefault();


    /* -------------------------------------------------
       VALIDACIÓN
    ------------------------------------------------- */

    if (
      !formulario.nombre.trim() ||
      !formulario.unidad ||
      formulario.stock === '' ||
      formulario.stockMinimo === '' ||
      formulario.precio === ''
    ) {

      alert(
        'Completa todos los campos.'
      );

      return;

    }


    /* -------------------------------------------------
       DATOS
    ------------------------------------------------- */

    const datosInsumo = {

      nombre:
        formulario.nombre.trim(),

      unidad:
        formulario.unidad,

      stock:
        Number(formulario.stock),

      stockMinimo:
        Number(formulario.stockMinimo),

      precio:
        Number(formulario.precio),

    };


    try {

      /* ===============================================
         EDITAR
      =============================================== */

      if (insumoSeleccionado) {

        const actualizado =
          await actualizarInsumo(
            insumoSeleccionado.id,
            datosInsumo
          );


        setInsumos((anteriores) =>
          anteriores.map((item) =>
            String(item.id) ===
            String(insumoSeleccionado.id)
              ? actualizado
              : item
          )
        );


        alert(
          'Insumo actualizado correctamente.'
        );

      }


      /* ===============================================
         CREAR
      =============================================== */

      else {

        const nuevo =
          await crearInsumo(
            datosInsumo
          );


        setInsumos((anteriores) => [
          ...anteriores,
          nuevo,
        ]);


        alert(
          'Insumo registrado correctamente.'
        );

      }


      cerrarModal();

    } catch (error) {

      console.error(
        'Error al guardar el insumo:',
        error
      );

      alert(
        'No se pudo guardar el insumo. Verifica que JSON Server esté funcionando.'
      );

    }

  };


  /* =====================================================
     CONFIRMAR ELIMINACIÓN
  ===================================================== */

  const confirmarEliminar = (insumo) => {

    setInsumoSeleccionado(insumo);

    setMostrarEliminar(true);

  };


  /* =====================================================
     ELIMINAR INSUMO
  ===================================================== */

  const eliminarInsumo = async () => {

    if (!insumoSeleccionado) {
      return;
    }


    try {

      await eliminarInsumoAPI(
        insumoSeleccionado.id
      );


      setInsumos((anteriores) =>
        anteriores.filter(
          (item) =>
            String(item.id) !==
            String(insumoSeleccionado.id)
        )
      );


      setMostrarEliminar(false);

      setInsumoSeleccionado(null);


      alert(
        'Insumo eliminado correctamente.'
      );

    } catch (error) {

      console.error(
        'Error al eliminar el insumo:',
        error
      );

      alert(
        'No se pudo eliminar el insumo. Verifica que JSON Server esté funcionando.'
      );

    }

  };


  /* =====================================================
     CERRAR ELIMINACIÓN
  ===================================================== */

  const cerrarEliminar = () => {

    setMostrarEliminar(false);

    setInsumoSeleccionado(null);

  };


  /* =====================================================
     ESTADO STOCK
  ===================================================== */

  const estadoStock = (insumo) => {

    if (
      Number(insumo.stock) <=
      Number(insumo.stockMinimo)
    ) {

      return 'bajo';

    }

    return 'normal';

  };


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <div className="insumos-page">


      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="insumos-navbar">


        <div className="insumos-navbar-left">


          {/* BOTÓN MENÚ */}

          <button
            type="button"
            className={`insumos-menu-btn ${
              menuAbierto
                ? 'active'
                : ''
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

              <i className="fas fa-xmark"></i>

            ) : (

              <>
                <span></span>
                <span></span>
                <span></span>
              </>

            )}

          </button>


          {/* MARCA */}

          <div className="insumos-brand">

            <img
              src={logo}
              alt="LuckyPay"
            />

            <span>
              LuckyPay
            </span>

          </div>

        </div>


        {/* USUARIO */}

        <div className="insumos-welcome">

          <div className="insumos-welcome-text">

            <strong>
              Bienvenido, Administrador
            </strong>

            <span>
              Gestión de insumos
            </span>

          </div>


          <button
            type="button"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </header>


      {/* =================================================
          MENÚ PRINCIPAL
      ================================================= */}

      {menuAbierto && (

        <>

          {/* OVERLAY */}

          <div
            className="insumos-menu-overlay"
            onClick={() =>
              setMenuAbierto(false)
            }
          ></div>


          {/* SIDEBAR */}

          <aside className="insumos-sidebar">


            {/* CABECERA */}

            <div className="insumos-sidebar-header">

              <span className="insumos-sidebar-title">
                MENÚ PRINCIPAL
              </span>

            </div>


            {/* NAVEGACIÓN */}

            <nav className="insumos-sidebar-nav">


              {/* INICIO */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/panel')
                }
              >

                <i className="fas fa-house insumos-sidebar-icon"></i>

                <span>
                  Inicio
                </span>

              </button>


              {/* INSUMOS */}

              <button
                type="button"
                className="insumos-sidebar-item active"
                onClick={() =>
                  navegar('/insumos')
                }
              >

                <i className="fas fa-boxes-stacked insumos-sidebar-icon"></i>

                <span>
                  Insumos
                </span>

              </button>


              {/* PRODUCTOS */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/productos')
                }
              >

                <i className="fas fa-box-open insumos-sidebar-icon"></i>

                <span>
                  Productos
                </span>

              </button>


              {/* COSTOS */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/costos')
                }
              >

                <i className="fas fa-dollar-sign insumos-sidebar-icon"></i>

                <span>
                  Costos
                </span>

              </button>


              {/* META DE VENTAS */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/meta-ventas')
                }
              >

                <i className="fas fa-bullseye insumos-sidebar-icon"></i>

                <span>
                  Meta de ventas
                </span>

              </button>


              {/* USUARIOS */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/usuarios')
                }
              >

                <i className="fas fa-users insumos-sidebar-icon"></i>

                <span>
                  Usuarios y roles
                </span>

              </button>


              {/* ANÁLISIS */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/analisis')
                }
              >

                <i className="fas fa-chart-line insumos-sidebar-icon"></i>

                <span>
                  Análisis
                </span>

              </button>


              {/* REPORTES */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/reportes')
                }
              >

                <i className="fas fa-file-lines insumos-sidebar-icon"></i>

                <span>
                  Reportes
                </span>

              </button>


              {/* AUDITORÍA */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/auditoria')
                }
              >

                <i className="fas fa-clipboard-check insumos-sidebar-icon"></i>

                <span>
                  Auditoría
                </span>

              </button>


              {/* CONFIGURACIÓN */}

              <button
                type="button"
                className="insumos-sidebar-item"
                onClick={() =>
                  navegar('/configuracion')
                }
              >

                <i className="fas fa-gear insumos-sidebar-icon"></i>

                <span>
                  Configuración
                </span>

              </button>


            </nav>


            {/* CERRAR SESIÓN */}

            <div className="insumos-sidebar-bottom">

              <button
                type="button"
                className="insumos-sidebar-logout"
                onClick={cerrarSesion}
              >

                <i className="fas fa-right-from-bracket"></i>

                <span>
                  Cerrar sesión
                </span>

              </button>

            </div>


          </aside>

        </>

      )}


      {/* =================================================
          CONTENIDO
      ================================================= */}

      <main className="insumos-main">


        {/* ENCABEZADO */}

        <div className="insumos-heading">


          <div>

            <span className="insumos-eyebrow">
              INVENTARIO
            </span>

            <h1>
              Gestión de Insumos
            </h1>

            <p>
              Administra los materiales utilizados
              en la producción de tus productos.
            </p>

          </div>


          <button
            type="button"
            className="btn-nuevo-insumo"
            onClick={abrirNuevo}
          >
            + Nuevo insumo
          </button>


        </div>


        {/* =================================================
            MENSAJE DE ERROR API
        ================================================= */}

        {errorAPI && (

          <div
            style={{
              marginBottom: '15px',
              padding: '12px 15px',
              border: '1px solid #5b4a1d',
              borderRadius: '8px',
              background: '#151515',
              color: '#d4af37',
              fontSize: '12px',
            }}
          >

            {errorAPI}

            <br />

            <small
              style={{
                color: '#888',
              }}
            >
              Verifica que JSON Server esté ejecutándose
              con <strong>npm run server</strong>.
            </small>

          </div>

        )}


        {/* =================================================
            TARJETA
        ================================================= */}

        <section className="insumos-card">


          <div className="insumos-card-header">


            <div>

              <h2>
                Insumos registrados
              </h2>

              <span>
                {insumos.length}{' '}
                insumos en inventario
              </span>

            </div>


            {/* BUSCADOR */}

            <div className="insumos-search">

              <span>
                🔎
              </span>

              <input
                type="text"
                placeholder="Buscar insumo..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
              />

            </div>


          </div>


          {/* =================================================
              TABLA
          ================================================= */}

          <div className="insumos-table-container">


            {cargando ? (

              <div className="insumos-empty">

                <div>
                  📦
                </div>

                <h3>
                  Cargando insumos...
                </h3>

                <p>
                  Consultando los datos del servidor.
                </p>

              </div>

            ) : (

              <>

                <table className="insumos-table">


                  <thead>

                    <tr>

                      <th>
                        INSUMO
                      </th>

                      <th>
                        UNIDAD
                      </th>

                      <th>
                        STOCK
                      </th>

                      <th>
                        STOCK MÍNIMO
                      </th>

                      <th>
                        PRECIO / UNIDAD
                      </th>

                      <th>
                        ESTADO
                      </th>

                      <th>
                        ACCIONES
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {insumosFiltrados.map(
                      (insumo) => (

                        <tr
                          key={insumo.id}
                        >


                          {/* INSUMO */}

                          <td>

                            <div className="insumo-name">

                              <div className="insumo-icon">
                                📦
                              </div>

                              <strong>
                                {insumo.nombre}
                              </strong>

                            </div>

                          </td>


                          {/* UNIDAD */}

                          <td>
                            {insumo.unidad}
                          </td>


                          {/* STOCK */}

                          <td>

                            <strong>
                              {insumo.stock}
                            </strong>

                          </td>


                          {/* STOCK MÍNIMO */}

                          <td>
                            {insumo.stockMinimo}
                          </td>


                          {/* PRECIO */}

                          <td>

                            $
                            {Number(
                              insumo.precio || 0
                            ).toLocaleString(
                              'es-CO'
                            )}

                          </td>


                          {/* ESTADO */}

                          <td>

                            {estadoStock(
                              insumo
                            ) === 'bajo' ? (

                              <span className="stock-badge bajo">
                                ⚠ Stock bajo
                              </span>

                            ) : (

                              <span className="stock-badge normal">
                                ✓ Normal
                              </span>

                            )}

                          </td>


                          {/* ACCIONES */}

                          <td>

                            <div className="insumos-actions">


                              {/* EDITAR */}

                              <button
                                type="button"
                                className="action-btn edit"
                                onClick={() =>
                                  abrirEditar(
                                    insumo
                                  )
                                }
                                title="Editar"
                              >
                                ✏️
                              </button>


                              {/* ELIMINAR */}

                              <button
                                type="button"
                                className="action-btn delete"
                                onClick={() =>
                                  confirmarEliminar(
                                    insumo
                                  )
                                }
                                title="Eliminar"
                              >
                                🗑️
                              </button>


                            </div>

                          </td>


                        </tr>

                      )
                    )}

                  </tbody>


                </table>


                {/* SIN RESULTADOS */}

                {insumosFiltrados.length === 0 && (

                  <div className="insumos-empty">

                    <div>
                      📦
                    </div>

                    <h3>
                      No encontramos insumos
                    </h3>

                    <p>
                      Prueba con otro término
                      de búsqueda.
                    </p>

                  </div>

                )}


              </>

            )}


          </div>


        </section>


      </main>


      {/* =================================================
          MODAL NUEVO / EDITAR
      ================================================= */}

      {mostrarModal && (

        <div className="modal-overlay">


          <div className="insumo-modal">


            {/* HEADER */}

            <div className="modal-header">


              <div>

                <span className="insumos-eyebrow">

                  {insumoSeleccionado
                    ? 'EDITAR'
                    : 'NUEVO'}

                </span>

                <h2>

                  {insumoSeleccionado
                    ? 'Editar insumo'
                    : 'Registrar insumo'}

                </h2>

              </div>


              <button
                type="button"
                className="modal-close"
                onClick={cerrarModal}
              >
                ×
              </button>


            </div>


            {/* FORMULARIO */}

            <form
              onSubmit={guardarInsumo}
            >


              <div className="form-grid">


                {/* NOMBRE */}

                <div className="form-group full">

                  <label>
                    Nombre del insumo
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={
                      formulario.nombre
                    }
                    onChange={
                      manejarCambio
                    }
                    placeholder="Ej. Madera pino"
                  />

                </div>


                {/* UNIDAD */}

                <div className="form-group">

                  <label>
                    Unidad de medida
                  </label>

                  <select
                    name="unidad"
                    value={
                      formulario.unidad
                    }
                    onChange={
                      manejarCambio
                    }
                  >

                    <option value="">
                      Seleccionar
                    </option>

                    <option value="unidad">
                      Unidad
                    </option>

                    <option value="m">
                      Metro
                    </option>

                    <option value="metro">
                      Metro
                    </option>

                    <option value="kg">
                      Kilogramo
                    </option>

                    <option value="litro">
                      Litro
                    </option>

                    <option value="gramo">
                      Gramo
                    </option>

                  </select>

                </div>


                {/* PRECIO */}

                <div className="form-group">

                  <label>
                    Precio por unidad
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="precio"
                    value={
                      formulario.precio
                    }
                    onChange={
                      manejarCambio
                    }
                    placeholder="0"
                  />

                </div>


                {/* STOCK */}

                <div className="form-group">

                  <label>
                    Stock actual
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={
                      formulario.stock
                    }
                    onChange={
                      manejarCambio
                    }
                    placeholder="0"
                  />

                </div>


                {/* STOCK MÍNIMO */}

                <div className="form-group">

                  <label>
                    Stock mínimo
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="stockMinimo"
                    value={
                      formulario.stockMinimo
                    }
                    onChange={
                      manejarCambio
                    }
                    placeholder="0"
                  />

                </div>


              </div>


              {/* FOOTER */}

              <div className="modal-footer">


                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>


                <button
                  type="submit"
                  className="btn-guardar"
                >

                  {insumoSeleccionado
                    ? 'Guardar cambios'
                    : 'Guardar insumo'}

                </button>


              </div>


            </form>


          </div>


        </div>

      )}


      {/* =================================================
          MODAL ELIMINAR
      ================================================= */}

      {mostrarEliminar &&
        insumoSeleccionado && (

          <div className="modal-overlay">


            <div className="delete-modal">


              <div className="delete-icon">
                🗑️
              </div>


              <h2>
                ¿Eliminar insumo?
              </h2>


              <p>

                Estás a punto de eliminar{' '}

                <strong>
                  {insumoSeleccionado.nombre}
                </strong>

                .

              </p>


              <div className="delete-actions">


                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={
                    cerrarEliminar
                  }
                >
                  Cancelar
                </button>


                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={
                    eliminarInsumo
                  }
                >
                  Sí, eliminar
                </button>


              </div>


            </div>


          </div>

        )}


    </div>

  );

}


export default Insumos;