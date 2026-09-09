import React, { useMemo, useState } from 'react';
import '../styles/insumos.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Insumos() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [insumos, setInsumos] = useState([
    {
      id: 1,
      nombre: 'Madera pino',
      unidad: 'm',
      stock: 120,
      stockMinimo: 20,
      precio: 18000,
    },
    {
      id: 2,
      nombre: 'Tornillos acero',
      unidad: 'unidad',
      stock: 850,
      stockMinimo: 100,
      precio: 350,
    },
    {
      id: 3,
      nombre: 'Pintura base',
      unidad: 'litro',
      stock: 35,
      stockMinimo: 10,
      precio: 28000,
    },
    {
      id: 4,
      nombre: 'Tela tapizado',
      unidad: 'metro',
      stock: 42,
      stockMinimo: 10,
      precio: 22000,
    },
    {
      id: 5,
      nombre: 'Espuma relleno',
      unidad: 'kg',
      stock: 8,
      stockMinimo: 10,
      precio: 15000,
    },
    {
      id: 6,
      nombre: 'Barniz acabado',
      unidad: 'litro',
      stock: 18,
      stockMinimo: 5,
      precio: 32000,
    },
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: '',
    unidad: '',
    stock: '',
    stockMinimo: '',
    precio: '',
  });

  const insumosFiltrados = useMemo(() => {
    return insumos.filter((insumo) =>
      insumo.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [insumos, busqueda]);

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  const mostrarProximamente = (mensaje) => {
    setMenuAbierto(false);
    alert(mensaje);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');

    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');

    window.location.href = '/';
  };

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

  const abrirEditar = (insumo) => {
    setInsumoSeleccionado(insumo);

    setFormulario({
      nombre: insumo.nombre,
      unidad: insumo.unidad,
      stock: insumo.stock,
      stockMinimo: insumo.stockMinimo,
      precio: insumo.precio,
    });

    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setInsumoSeleccionado(null);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const guardarInsumo = (e) => {
    e.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.unidad ||
      formulario.stock === '' ||
      formulario.stockMinimo === '' ||
      formulario.precio === ''
    ) {
      alert('Completa todos los campos.');
      return;
    }

    const nuevoInsumo = {
      id: insumoSeleccionado ? insumoSeleccionado.id : Date.now(),
      nombre: formulario.nombre.trim(),
      unidad: formulario.unidad,
      stock: Number(formulario.stock),
      stockMinimo: Number(formulario.stockMinimo),
      precio: Number(formulario.precio),
    };

    if (insumoSeleccionado) {
      setInsumos((anteriores) =>
        anteriores.map((item) =>
          item.id === insumoSeleccionado.id ? nuevoInsumo : item
        )
      );
    } else {
      setInsumos((anteriores) => [...anteriores, nuevoInsumo]);
    }

    cerrarModal();
  };

  const confirmarEliminar = (insumo) => {
    setInsumoSeleccionado(insumo);
    setMostrarEliminar(true);
  };

  const eliminarInsumo = () => {
    setInsumos((anteriores) =>
      anteriores.filter((item) => item.id !== insumoSeleccionado.id)
    );

    setMostrarEliminar(false);
    setInsumoSeleccionado(null);
  };

  const cerrarEliminar = () => {
    setMostrarEliminar(false);
    setInsumoSeleccionado(null);
  };

  const estadoStock = (insumo) => {
    if (insumo.stock <= insumo.stockMinimo) {
      return 'bajo';
    }

    return 'normal';
  };

  return (
    <div className="insumos-page">
      {/* NAVBAR */}
      <header className="insumos-navbar">
        <div className="insumos-navbar-left">
          <button
            className={`insumos-menu-btn ${menuAbierto ? 'active' : ''}`}
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="insumos-brand">
            <img src={logo} alt="LuckyPay" />
            <span>LuckyPay</span>
          </div>
        </div>

        <div className="insumos-welcome">
          <div className="insumos-welcome-text">
            <strong>Bienvenido, Administrador</strong>
            <span>Gestión de insumos</span>
          </div>

          <button onClick={cerrarSesion}>Salir</button>
        </div>
      </header>

      {/* MENÚ DESPLEGABLE */}
      {menuAbierto && (
        <>
          <div
            className="insumos-menu-overlay"
            onClick={() => setMenuAbierto(false)}
          ></div>

          <aside className="insumos-sidebar">
            <div className="insumos-sidebar-header">
              <div>
                <span className="insumos-sidebar-title">
                  MENÚ PRINCIPAL
                </span>
                <p>Administración</p>
              </div>

              <button
                className="insumos-sidebar-close"
                onClick={() => setMenuAbierto(false)}
              >
                ×
              </button>
            </div>

            <nav className="insumos-sidebar-nav">
              <button
                className="insumos-sidebar-item"
                onClick={() => navegar('/panel')}
              >
                <span className="insumos-sidebar-icon">⌂</span>
                <span>Inicio</span>
              </button>

              <button
                className="insumos-sidebar-item active"
                onClick={() => navegar('/insumos')}
              >
                <span className="insumos-sidebar-icon">◆</span>
                <span>Insumos</span>
              </button>

              <button
                className="insumos-sidebar-item"
                onClick={() => navegar('/productos')}
              >
                <span className="insumos-sidebar-icon">▣</span>
                <span>Productos</span>
              </button>

              <div className="insumos-sidebar-separator"></div>

              <button
            className="insumos-sidebar-item"
             onClick={() => navegar('/costos')}
             >
             <span className="insumos-sidebar-icon">$</span>
            <span>Costos</span>
            </button>

             <button 
             className="insumos-sidebar-item" 
             onClick={() => navegar('/meta-ventas')}
             >
             <span className="insumos-sidebar-icon">◎</span> 
              <span>Meta de Ventas</span> 
             </button>

              <button
             className="insumos-sidebar-item"
             onClick={() => navegar('/usuarios')}
             >
             <span className="insumos-sidebar-icon">♙</span>
             <span>Usuarios y Roles</span>
            </button>

              <button
               className="insumos-sidebar-item"
             onClick={() => navegar('/analisis')}
             >
              <span className="insumos-sidebar-icon">▦</span>
             <span>Análisis</span>
             </button>
             <button
             className="insumos-sidebar-item"
              onClick={() => navegar('/reportes')}
              >
             <span className="insumos-sidebar-icon">▤</span>
               <span>Reportes</span>
             </button>

              <button
             className="insumos-sidebar-item"
             onClick={() => navegar('/auditoria')}
             >
              <span className="insumos-sidebar-icon">☷</span>
             <span>Auditoría</span>
             </button>
              <button
  className="insumos-sidebar-item"
  onClick={() => navegar('/configuracion')}
>
  <span className="insumos-sidebar-icon">⚙</span>
  <span>Configuración</span>
</button>
            </nav>

            <div className="insumos-sidebar-bottom">
              <button
                className="insumos-sidebar-logout"
                onClick={cerrarSesion}
              >
                <span>↪</span>
                Cerrar sesión
              </button>
            </div>
          </aside>
        </>
      )}

      {/* CONTENIDO */}
      <main className="insumos-main">
        <div className="insumos-heading">
          <div>
            <span className="insumos-eyebrow">INVENTARIO</span>

            <h1>Gestión de Insumos</h1>

            <p>
              Administra los materiales utilizados en la producción de tus
              productos.
            </p>
          </div>

          <button className="btn-nuevo-insumo" onClick={abrirNuevo}>
            + Nuevo insumo
          </button>
        </div>

        <section className="insumos-card">
          <div className="insumos-card-header">
            <div>
              <h2>Insumos registrados</h2>
              <span>{insumos.length} insumos en inventario</span>
            </div>

            <div className="insumos-search">
              <span>🔎</span>

              <input
                type="text"
                placeholder="Buscar insumo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div className="insumos-table-container">
            <table className="insumos-table">
              <thead>
                <tr>
                  <th>INSUMO</th>
                  <th>UNIDAD</th>
                  <th>STOCK</th>
                  <th>STOCK MÍNIMO</th>
                  <th>PRECIO / UNIDAD</th>
                  <th>ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>

              <tbody>
                {insumosFiltrados.map((insumo) => (
                  <tr key={insumo.id}>
                    <td>
                      <div className="insumo-name">
                        <div className="insumo-icon">📦</div>
                        <strong>{insumo.nombre}</strong>
                      </div>
                    </td>

                    <td>{insumo.unidad}</td>

                    <td>
                      <strong>{insumo.stock}</strong>
                    </td>

                    <td>{insumo.stockMinimo}</td>

                    <td>
                      ${insumo.precio.toLocaleString('es-CO')}
                    </td>

                    <td>
                      {estadoStock(insumo) === 'bajo' ? (
                        <span className="stock-badge bajo">
                          ⚠ Stock bajo
                        </span>
                      ) : (
                        <span className="stock-badge normal">
                          ✓ Normal
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="insumos-actions">
                        <button
                          className="action-btn edit"
                          onClick={() => abrirEditar(insumo)}
                          title="Editar"
                        >
                          ✏️
                        </button>

                        <button
                          className="action-btn delete"
                          onClick={() => confirmarEliminar(insumo)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {insumosFiltrados.length === 0 && (
              <div className="insumos-empty">
                <div>📦</div>
                <h3>No encontramos insumos</h3>
                <p>Prueba con otro término de búsqueda.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* MODAL NUEVO / EDITAR */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="insumo-modal">
            <div className="modal-header">
              <div>
                <span className="insumos-eyebrow">
                  {insumoSeleccionado ? 'EDITAR' : 'NUEVO'}
                </span>

                <h2>
                  {insumoSeleccionado
                    ? 'Editar insumo'
                    : 'Registrar insumo'}
                </h2>
              </div>

              <button className="modal-close" onClick={cerrarModal}>
                ×
              </button>
            </div>

            <form onSubmit={guardarInsumo}>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Nombre del insumo</label>

                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    placeholder="Ej. Madera pino"
                  />
                </div>

                <div className="form-group">
                  <label>Unidad de medida</label>

                  <select
                    name="unidad"
                    value={formulario.unidad}
                    onChange={manejarCambio}
                  >
                    <option value="">Seleccionar</option>
                    <option value="unidad">Unidad</option>
                    <option value="m">Metro</option>
                    <option value="metro">Metro</option>
                    <option value="kg">Kilogramo</option>
                    <option value="litro">Litro</option>
                    <option value="gramo">Gramo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Precio por unidad</label>

                  <input
                    type="number"
                    min="0"
                    name="precio"
                    value={formulario.precio}
                    onChange={manejarCambio}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stock actual</label>

                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={formulario.stock}
                    onChange={manejarCambio}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stock mínimo</label>

                  <input
                    type="number"
                    min="0"
                    name="stockMinimo"
                    value={formulario.stockMinimo}
                    onChange={manejarCambio}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>

                <button type="submit" className="btn-guardar">
                  {insumoSeleccionado
                    ? 'Guardar cambios'
                    : 'Guardar insumo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {mostrarEliminar && insumoSeleccionado && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-icon">🗑️</div>

            <h2>¿Eliminar insumo?</h2>

            <p>
              Estás a punto de eliminar{' '}
              <strong>{insumoSeleccionado.nombre}</strong>.
            </p>

            <div className="delete-actions">
              <button
                className="btn-cancelar"
                onClick={cerrarEliminar}
              >
                Cancelar
              </button>

              <button
                className="btn-eliminar"
                onClick={eliminarInsumo}
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