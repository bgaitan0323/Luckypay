import React, { useMemo, useState } from 'react';
import '../styles/Productos.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Productos() {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: 'Silla ergonómica mod. A',
      descripcion: 'Silla de oficina con soporte lumbar ajustable.',
      unidad: 'unidad',
      manoObra: 25000,
      insumos: [
        { nombre: 'Madera pino', cantidad: 2, unidad: 'm' },
        { nombre: 'Tela tapizado', cantidad: 1.5, unidad: 'metro' },
        { nombre: 'Tornillos acero', cantidad: 12, unidad: 'unidad' }
      ]
    },
    {
      id: 2,
      nombre: 'Mesa de trabajo',
      descripcion: 'Mesa industrial para taller o bodega.',
      unidad: 'unidad',
      manoObra: 40000,
      insumos: [
        { nombre: 'Madera pino', cantidad: 5, unidad: 'm' },
        { nombre: 'Tornillos acero', cantidad: 20, unidad: 'unidad' },
        { nombre: 'Barniz acabado', cantidad: 0.5, unidad: 'litro' }
      ]
    }
  ]);

  const insumosDisponibles = [
    { nombre: 'Madera pino', unidad: 'm' },
    { nombre: 'Tornillos acero', unidad: 'unidad' },
    { nombre: 'Pintura base', unidad: 'litro' },
    { nombre: 'Tela tapizado', unidad: 'metro' },
    { nombre: 'Espuma relleno', unidad: 'kg' },
    { nombre: 'Barniz acabado', unidad: 'litro' }
  ];

  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modalProducto, setModalProducto] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [productoEditando, setProductoEditando] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [unidad, setUnidad] = useState('');
  const [manoObra, setManoObra] = useState('');
  const [insumos, setInsumos] = useState([]);

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) =>
      producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  }, [productos, busqueda]);

  const formatearCOP = (valor) => {
    return '$ ' + Number(valor || 0).toLocaleString('es-CO');
  };

  const abrirNuevoProducto = () => {
    setProductoEditando(null);
    setNombre('');
    setDescripcion('');
    setUnidad('');
    setManoObra('');
    setInsumos([]);
    setModalProducto(true);
  };

  const abrirEditarProducto = (producto) => {
    setProductoEditando(producto);

    setNombre(producto.nombre);
    setDescripcion(producto.descripcion || '');
    setUnidad(producto.unidad);
    setManoObra(producto.manoObra);

    setInsumos(
      producto.insumos.map((insumo) => ({
        ...insumo
      }))
    );

    setModalProducto(true);
  };

  const cerrarModalProducto = () => {
    setModalProducto(false);
    setProductoEditando(null);
  };

  const agregarInsumo = () => {
    setInsumos([
      ...insumos,
      {
        nombre: '',
        cantidad: '',
        unidad: ''
      }
    ]);
  };

  const actualizarInsumo = (indice, campo, valor) => {
    const copia = [...insumos];

    copia[indice] = {
      ...copia[indice],
      [campo]: valor
    };

    if (campo === 'nombre') {
      const encontrado = insumosDisponibles.find(
        (insumo) => insumo.nombre === valor
      );

      copia[indice].unidad = encontrado
        ? encontrado.unidad
        : '';
    }

    setInsumos(copia);
  };

  const eliminarFilaInsumo = (indice) => {
    setInsumos(
      insumos.filter((_, index) => index !== indice)
    );
  };

  const guardarProducto = () => {
    if (!nombre.trim()) {
      alert('El nombre del producto es obligatorio.');
      return;
    }

    if (!unidad) {
      alert('Selecciona una unidad de medida.');
      return;
    }

    if (
      manoObra === '' ||
      Number(manoObra) < 0 ||
      Number.isNaN(Number(manoObra))
    ) {
      alert('Ingresa un costo de mano de obra válido.');
      return;
    }

    const insumosValidos = insumos.every(
      (insumo) =>
        insumo.nombre &&
        Number(insumo.cantidad) > 0
    );

    if (!insumosValidos && insumos.length > 0) {
      alert(
        'Completa correctamente todos los insumos agregados.'
      );
      return;
    }

    const datosProducto = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      unidad,
      manoObra: Number(manoObra),
      insumos: insumos.map((insumo) => ({
        ...insumo,
        cantidad: Number(insumo.cantidad)
      }))
    };

    if (productoEditando) {
      setProductos(
        productos.map((producto) =>
          producto.id === productoEditando.id
            ? {
                ...producto,
                ...datosProducto
              }
            : producto
        )
      );

      alert('Producto actualizado correctamente.');
    } else {
      const nuevoProducto = {
        id: Date.now(),
        ...datosProducto
      };

      setProductos([
        ...productos,
        nuevoProducto
      ]);

      alert('Producto creado correctamente.');
    }

    cerrarModalProducto();
  };

  const solicitarEliminar = (producto) => {
    setProductoAEliminar(producto);
    setModalEliminar(true);
  };

  const cancelarEliminar = () => {
    setProductoAEliminar(null);
    setModalEliminar(false);
  };

  const confirmarEliminar = () => {
    if (!productoAEliminar) return;

    setProductos(
      productos.filter(
        (producto) =>
          producto.id !== productoAEliminar.id
      )
    );

    setProductoAEliminar(null);
    setModalEliminar(false);

    alert('Producto eliminado correctamente.');
  };

  const iconoUnidad = (valor) => {
    const iconos = {
      unidad: '▣',
      kg: '⚖',
      g: '⚖',
      litro: '◉',
      ml: '◉',
      metro: '↔',
      caja: '□',
      docena: '▦'
    };

    return iconos[valor] || '◆';
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

  return (
    <div className="productos-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="productos-navbar">

        <button
          type="button"
          className={`productos-menu ${
            menuAbierto ? 'abierto' : ''
          }`}
          onClick={() => setMenuAbierto(!menuAbierto)}
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

        <div className="productos-brand">

          <img
            src={logo}
            alt="LuckyPay"
          />

          <div>
            <span>LuckyPay</span>
            <small>
              Gestión de productos
            </small>
          </div>

        </div>

        <div className="productos-admin">

          <div>
            <strong>
              Bienvenido Administrador
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

      {/* OVERLAY */}

      {menuAbierto && (
        <div
          className="productos-overlay"
          onClick={() =>
            setMenuAbierto(false)
          }
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`productos-sidebar ${
          menuAbierto ? 'abierto' : ''
        }`}
      >

        <div className="productos-sidebar-header">

          <div>
            <strong>
              MENÚ PRINCIPAL
            </strong>

            <small>
              Administración
            </small>
          </div>

          <button
            type="button"
            className="productos-sidebar-close"
            onClick={() =>
              setMenuAbierto(false)
            }
            aria-label="Cerrar menú"
          >
            ×
          </button>

        </div>

        <div className="productos-sidebar-menu">

          <button
            type="button"
            onClick={() =>
              navegar('/panel')
            }
          >
            <span className="productos-menu-icon">
              ⌂
            </span>

            <span>
              Inicio
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navegar('/insumos')
            }
          >
            <span className="productos-menu-icon">
              ▤
            </span>

            <span>
              Insumos
            </span>
          </button>

          <button
            type="button"
            className="activo"
            onClick={() =>
              setMenuAbierto(false)
            }
          >
            <span className="productos-menu-icon">
              ◆
            </span>

            <span>
              Productos
            </span>
          </button>

          <div className="productos-sidebar-separador"></div>

          <button
            type="button"
            onClick={() =>
              navegar('/costos')
            }
          >
            <span className="productos-menu-icon">
              $
            </span>

            <span>
              Costos
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navegar('/meta-ventas')
            }
          >
            <span className="productos-menu-icon">
              ⚖
            </span>

            <span>
              Meta de Ventas
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navegar('/usuarios')
            }
          >
            <span className="productos-menu-icon">
              ♟
            </span>

            <span>
              Usuarios y Roles
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navegar('/analisis')
            }
          >
            <span className="productos-menu-icon">
              ◔
            </span>

            <span>
              Análisis
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navegar('/reportes')
            }
          >
            <span className="productos-menu-icon">
              ▤
            </span>

            <span>
              Reportes
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navegar('/auditoria')
            }
          >
            <span className="productos-menu-icon">
              ☷
            </span>

            <span>
              Auditoría
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              navegar('/configuracion')
            }
          >
            <span className="productos-menu-icon">
              ⚙
            </span>

            <span>
              Configuración
            </span>
          </button>

        </div>

        <div className="productos-sidebar-bottom">

          <button
            type="button"
            onClick={cerrarSesion}
          >
            <span className="productos-menu-icon">
              ↪
            </span>

            <span>
              Cerrar sesión
            </span>
          </button>

        </div>

      </aside>

      {/* =========================
          CONTENIDO
      ========================= */}

      <main className="productos-main">

        <div className="productos-header">

          <span className="productos-label">
            INVENTARIO
          </span>

          <h1>
            ◆ Gestión de Productos
          </h1>

          <p>
            Registra los productos que fabricas,
            sus insumos y el costo de mano de obra.
          </p>

        </div>

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
              className="btn-producto-primary"
              onClick={abrirNuevoProducto}
            >
              + Nuevo producto
            </button>

          </div>

          <div className="productos-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Buscar producto por nombre..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
            />

          </div>

          {productosFiltrados.length > 0 ? (

            <div className="productos-table-wrapper">

              <table className="productos-table">

                <thead>

                  <tr>
                    <th>Producto</th>
                    <th>Unidad</th>
                    <th>Insumos</th>
                    <th>
                      Mano de obra / u.
                    </th>
                    <th>
                      Costo total estimado
                    </th>
                    <th>
                      Acciones
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {productosFiltrados.map(
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

                              {producto.descripcion && (
                                <small>
                                  {producto.descripcion}
                                </small>
                              )}

                            </div>

                          </div>

                        </td>

                        <td>

                          <span className="badge-unidad">

                            {iconoUnidad(
                              producto.unidad
                            )}

                            {producto.unidad}

                          </span>

                        </td>

                        <td>

                          {producto.insumos.length > 0 ? (

                            <span className="badge-insumos">

                              {producto.insumos.length}{' '}

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

                        <td className="precio-mano">

                          {formatearCOP(
                            producto.manoObra
                          )}

                        </td>

                        <td className="precio-total">

                          {formatearCOP(
                            producto.manoObra
                          )}

                        </td>

                        <td>

                          <div className="acciones-producto">

                            <button
                              className="btn-editar"
                              title="Editar producto"
                              onClick={() =>
                                abrirEditarProducto(
                                  producto
                                )
                              }
                            >
                              ✎
                            </button>

                            <button
                              className="btn-eliminar"
                              title="Eliminar producto"
                              onClick={() =>
                                solicitarEliminar(
                                  producto
                                )
                              }
                            >
                              🗑
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="productos-vacio">

              <div>
                □
              </div>

              <h3>
                No hay productos registrados.
              </h3>

              <p>
                {busqueda
                  ? 'No encontramos productos con esa búsqueda.'
                  : 'Haz clic en Nuevo producto para comenzar.'}
              </p>

              {busqueda && (
                <button
                  onClick={() =>
                    setBusqueda('')
                  }
                >
                  Limpiar búsqueda
                </button>
              )}

            </div>

          )}

        </section>

        <footer className="productos-footer">

          © 2026 <strong>LuckyPay</strong> —
          Controla tu Negocio, Crece con Confianza

        </footer>

      </main>

      {/* =========================
          MODAL NUEVO / EDITAR
      ========================= */}

      {modalProducto && (

        <div
          className="producto-modal-overlay"
          onClick={cerrarModalProducto}
        >

          <div
            className="producto-modal grande"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="producto-modal-header">

              <div>

                <span>
                  {productoEditando
                    ? 'EDITAR'
                    : 'NUEVO PRODUCTO'}
                </span>

                <h2>
                  {productoEditando
                    ? '✎ Editar producto'
                    : '+ Nuevo producto'}
                </h2>

              </div>

              <button
                onClick={cerrarModalProducto}
              >
                ×
              </button>

            </div>

            <div className="producto-modal-body">

              <div className="form-bloque">

                <h3>
                  ◆ Información general
                </h3>

                <div className="campo">

                  <label>
                    Nombre del producto
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Ej: Silla ergonómica modelo A"
                    value={nombre}
                    onChange={(e) =>
                      setNombre(e.target.value)
                    }
                  />

                </div>

                <div className="campo">

                  <label>
                    Descripción
                  </label>

                  <textarea
                    rows="3"
                    placeholder="Describe brevemente el producto..."
                    value={descripcion}
                    onChange={(e) =>
                      setDescripcion(e.target.value)
                    }
                  />

                </div>

                <div className="campo campo-mitad">

                  <label>
                    Unidad de medida
                    <span>*</span>
                  </label>

                  <select
                    value={unidad}
                    onChange={(e) =>
                      setUnidad(e.target.value)
                    }
                  >

                    <option value="">
                      — Seleccionar —
                    </option>

                    <option value="unidad">
                      Unidad
                    </option>

                    <option value="kg">
                      Kilogramo (kg)
                    </option>

                    <option value="g">
                      Gramo (g)
                    </option>

                    <option value="litro">
                      Litro (L)
                    </option>

                    <option value="ml">
                      Mililitro (mL)
                    </option>

                    <option value="metro">
                      Metro (m)
                    </option>

                    <option value="caja">
                      Caja
                    </option>

                    <option value="docena">
                      Docena
                    </option>

                  </select>

                </div>

              </div>

              <div className="form-bloque">

                <h3>
                  ⚒ Mano de obra directa
                </h3>

                <div className="campo campo-mitad">

                  <label>
                    Costo de mano de obra por unidad
                    <span>*</span>
                  </label>

                  <div className="input-precio">

                    <span>
                      $
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={manoObra}
                      onChange={(e) =>
                        setManoObra(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>

              <div className="form-bloque">

                <div className="insumos-header">

                  <h3>
                    ▤ Insumos del producto
                  </h3>

                  <button
                    onClick={agregarInsumo}
                  >
                    + Agregar insumo
                  </button>

                </div>

                {insumos.length > 0 && (

                  <div className="insumos-cabecera">

                    <span>
                      Insumo
                    </span>

                    <span>
                      Cantidad
                    </span>

                    <span>
                      Unidad
                    </span>

                    <span></span>

                  </div>

                )}

                <div className="lista-insumos">

                  {insumos.map(
                    (insumo, index) => (

                      <div
                        className="fila-insumo"
                        key={index}
                      >

                        <select
                          value={insumo.nombre}
                          onChange={(e) =>
                            actualizarInsumo(
                              index,
                              'nombre',
                              e.target.value
                            )
                          }
                        >

                          <option value="">
                            — Seleccionar insumo —
                          </option>

                          {insumosDisponibles.map(
                            (opcion) => (

                              <option
                                key={opcion.nombre}
                                value={opcion.nombre}
                              >
                                {opcion.nombre}
                              </option>

                            )
                          )}

                        </select>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0"
                          value={
                            insumo.cantidad
                          }
                          onChange={(e) =>
                            actualizarInsumo(
                              index,
                              'cantidad',
                              e.target.value
                            )
                          }
                        />

                        <input
                          type="text"
                          value={
                            insumo.unidad
                          }
                          readOnly
                          placeholder="Unidad"
                        />

                        <button
                          className="btn-quitar-insumo"
                          onClick={() =>
                            eliminarFilaInsumo(
                              index
                            )
                          }
                          title="Quitar insumo"
                        >
                          ×
                        </button>

                      </div>

                    )
                  )}

                </div>

                {insumos.length === 0 && (

                  <div className="insumos-vacio">

                    <span>
                      ◈
                    </span>

                    Aún no has agregado insumos.
                    Haz clic en

                    <strong>
                      Agregar insumo
                    </strong>

                  </div>

                )}

              </div>

            </div>

            <div className="producto-modal-footer">

              <button
                className="btn-cancelar"
                onClick={
                  cerrarModalProducto
                }
              >
                Cancelar
              </button>

              <button
                className="btn-guardar"
                onClick={guardarProducto}
              >
                ✓{' '}

                {productoEditando
                  ? 'Guardar cambios'
                  : 'Guardar producto'}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* =========================
          MODAL ELIMINAR
      ========================= */}

      {modalEliminar &&
        productoAEliminar && (

          <div
            className="producto-modal-overlay"
            onClick={cancelarEliminar}
          >

            <div
              className="producto-modal eliminar-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="producto-modal-header peligro">

                <div>

                  <span>
                    CONFIRMACIÓN
                  </span>

                  <h2>
                    ⚠ Eliminar producto
                  </h2>

                </div>

                <button
                  onClick={cancelarEliminar}
                >
                  ×
                </button>

              </div>

              <div className="eliminar-body">

                <div className="alerta-eliminar">

                  <div className="alerta-icono">
                    !
                  </div>

                  <div>

                    <p>
                      Estás a punto de eliminar{' '}

                      <strong>
                        "{productoAEliminar.nombre}"
                      </strong>.

                    </p>

                    <span>
                      Esta acción no se puede deshacer.
                      Se perderán todos los insumos y
                      costos asociados al producto.
                    </span>

                  </div>

                </div>

              </div>

              <div className="producto-modal-footer">

                <button
                  className="btn-cancelar"
                  onClick={cancelarEliminar}
                >
                  Cancelar
                </button>

                <button
                  className="btn-confirmar-eliminar"
                  onClick={confirmarEliminar}
                >
                  🗑 Sí, eliminar
                </button>

              </div>

            </div>

          </div>

        )}

    </div>
  );
}

export default Productos;