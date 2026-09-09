import React, { useMemo, useState } from 'react';
import '../styles/usuarioyrol.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Usuarioyrol() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Administrador',
      email: 'admin@luckypay.com',
      rol: 'Administrador',
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'Empleado Principal',
      email: 'empleado@luckypay.com',
      rol: 'Empleado',
      estado: 'Activo'
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      email: 'carlos@luckypay.com',
      rol: 'Empleado',
      estado: 'Activo'
    },
    {
      id: 4,
      nombre: 'Laura Martínez',
      email: 'laura@luckypay.com',
      rol: 'Empleado',
      estado: 'Inactivo'
    }
  ]);

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    rol: 'Empleado',
    estado: 'Activo'
  });

  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    if (!texto) {
      return usuarios;
    }

    return usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.email.toLowerCase().includes(texto) ||
        usuario.rol.toLowerCase().includes(texto)
    );
  }, [usuarios, busqueda]);

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  const abrirMenu = () => {
    setMenuAbierto(true);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');

    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');

    window.location.href = '/';
  };

  const abrirCrear = () => {
    setModoEdicion(false);
    setUsuarioEditando(null);

    setFormulario({
      nombre: '',
      email: '',
      rol: 'Empleado',
      estado: 'Activo'
    });

    setModalAbierto(true);
  };

  const abrirEditar = (usuario) => {
    setModoEdicion(true);
    setUsuarioEditando(usuario);

    setFormulario({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado
    });

    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditando(null);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }));
  };

  const guardarUsuario = (e) => {
    e.preventDefault();

    if (!formulario.nombre.trim() || !formulario.email.trim()) {
      alert('Completa todos los campos obligatorios.');
      return;
    }

    if (modoEdicion && usuarioEditando) {
      setUsuarios((anteriores) =>
        anteriores.map((usuario) =>
          usuario.id === usuarioEditando.id
            ? {
                ...usuario,
                ...formulario
              }
            : usuario
        )
      );

      alert('Usuario actualizado correctamente.');
    } else {
      const nuevoUsuario = {
        id: Date.now(),
        nombre: formulario.nombre,
        email: formulario.email,
        rol: formulario.rol,
        estado: formulario.estado
      };

      setUsuarios((anteriores) => [
        ...anteriores,
        nuevoUsuario
      ]);

      alert('Usuario creado correctamente.');
    }

    cerrarModal();
  };

  const eliminarUsuario = (id) => {
    const usuario = usuarios.find(
      (elemento) => elemento.id === id
    );

    if (!usuario) {
      return;
    }

    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar a ${usuario.nombre}?`
    );

    if (!confirmar) {
      return;
    }

    setUsuarios((anteriores) =>
      anteriores.filter((elemento) => elemento.id !== id)
    );
  };

  const cambiarEstado = (id) => {
    setUsuarios((anteriores) =>
      anteriores.map((usuario) =>
        usuario.id === id
          ? {
              ...usuario,
              estado:
                usuario.estado === 'Activo'
                  ? 'Inactivo'
                  : 'Activo'
            }
          : usuario
      )
    );
  };

  return (
    <div className="usuarios-page">

      {/* NAVBAR */}
      <nav className="usuarios-navbar">

        <button
          type="button"
          className={`usuarios-menu ${
            menuAbierto ? 'activo' : ''
          }`}
          onClick={abrirMenu}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="usuarios-brand">
          <img src={logo} alt="LuckyPay" />
          <span>LuckyPay</span>
        </div>

        {/* BLOQUE DE USUARIO */}
        <div className="usuarios-welcome">

          <div className="usuarios-user-info">
            <strong>Bienvenido, Administrador</strong>
            <span>Gestión de usuarios y roles</span>
          </div>

          <button
            type="button"
            className="usuarios-logout-btn"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </nav>

      {/* MENU LATERAL */}
      {menuAbierto && (
        <>
          <div
            className="usuarios-menu-overlay"
            onClick={cerrarMenu}
          ></div>

          <aside className="usuarios-sidebar abierto">

            <div className="usuarios-sidebar-header">

              <div>
                <strong>LuckyPay</strong>
                <small>Menú principal</small>
              </div>

              <button
                type="button"
                className="usuarios-sidebar-close"
                onClick={cerrarMenu}
              >
                ×
              </button>

            </div>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/panel')}
            >
              <span>⌂</span>
              Inicio
            </button>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/insumos')}
            >
              <span>▦</span>
              Insumos
            </button>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/productos')}
            >
              <span>□</span>
              Productos
            </button>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/costos')}
            >
              <span>$</span>
              Costos
            </button>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/meta-ventas')}
            >
              <span>◎</span>
              Meta de Ventas
            </button>

            <div className="usuarios-sidebar-separator"></div>

            <button
              type="button"
              className="usuarios-sidebar-item active"
              onClick={() => navegar('/usuarios')}
            >
              <span>♙</span>
              Usuarios y Roles
            </button>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/analisis')}
            >
              <span className="usuarios-sidebar-icon">▦</span>
              <span>Análisis</span>
            </button>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/reportes')}
            >
              <span className="usuarios-sidebar-icon">▤</span>
              <span>Reportes</span>
            </button>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/auditoria')}
            >
              <span className="usuarios-sidebar-icon">☷</span>
              <span>Auditoría</span>
            </button>

            <button
              type="button"
              className="usuarios-sidebar-item"
              onClick={() => navegar('/configuracion')}
            >
              <span className="usuarios-sidebar-icon">⚙</span>
              <span>Configuración</span>
            </button>

            <div className="usuarios-sidebar-separator"></div>

            <button
              type="button"
              className="usuarios-sidebar-item logout"
              onClick={cerrarSesion}
            >
              <span>↪</span>
              Cerrar sesión
            </button>

          </aside>
        </>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="usuarios-main">

        <div className="usuarios-heading">

          <div>
            <span className="usuarios-eyebrow">
              ADMINISTRACIÓN
            </span>

            <h1>Usuarios y Roles</h1>

            <p>
              Gestiona los usuarios y controla sus permisos
              dentro de LuckyPay.
            </p>
          </div>

          <button
            type="button"
            className="usuarios-add-btn"
            onClick={abrirCrear}
          >
            + Nuevo usuario
          </button>

        </div>

        {/* ESTADÍSTICAS */}
        <section className="usuarios-stats">

          <div className="usuarios-stat-card">
            <span className="usuarios-stat-icon">♙</span>

            <div>
              <strong>{usuarios.length}</strong>
              <span>Total usuarios</span>
            </div>
          </div>

          <div className="usuarios-stat-card">
            <span className="usuarios-stat-icon">✓</span>

            <div>
              <strong>
                {
                  usuarios.filter(
                    (usuario) => usuario.estado === 'Activo'
                  ).length
                }
              </strong>
              <span>Usuarios activos</span>
            </div>
          </div>

          <div className="usuarios-stat-card">
            <span className="usuarios-stat-icon">★</span>

            <div>
              <strong>
                {
                  usuarios.filter(
                    (usuario) =>
                      usuario.rol === 'Administrador'
                  ).length
                }
              </strong>
              <span>Administradores</span>
            </div>
          </div>

          <div className="usuarios-stat-card">
            <span className="usuarios-stat-icon">●</span>

            <div>
              <strong>
                {
                  usuarios.filter(
                    (usuario) => usuario.rol === 'Empleado'
                  ).length
                }
              </strong>
              <span>Empleados</span>
            </div>
          </div>

        </section>

        {/* TABLA */}
        <section className="usuarios-card">

          <div className="usuarios-card-header">

            <div>
              <h2>Lista de usuarios</h2>
              <p>
                Usuarios registrados en el sistema
              </p>
            </div>

            <div className="usuarios-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
              />
            </div>

          </div>

          <div className="usuarios-table-container">

            <table className="usuarios-table">

              <thead>
                <tr>
                  <th>USUARIO</th>
                  <th>CORREO</th>
                  <th>ROL</th>
                  <th>ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>

              <tbody>

                {usuariosFiltrados.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="usuarios-empty"
                    >
                      No se encontraron usuarios.
                    </td>
                  </tr>

                ) : (

                  usuariosFiltrados.map((usuario) => (

                    <tr key={usuario.id}>

                      <td>
                        <div className="usuario-info">

                          <div className="usuario-avatar">
                            {usuario.nombre
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>
                            {usuario.nombre}
                          </strong>

                        </div>
                      </td>

                      <td>
                        {usuario.email}
                      </td>

                      <td>
                        <span
                          className={`usuario-rol ${
                            usuario.rol === 'Administrador'
                              ? 'admin'
                              : 'empleado'
                          }`}
                        >
                          {usuario.rol}
                        </span>
                      </td>

                      <td>

                        <button
                          type="button"
                          className={`usuario-estado ${
                            usuario.estado === 'Activo'
                              ? 'activo'
                              : 'inactivo'
                          }`}
                          onClick={() =>
                            cambiarEstado(usuario.id)
                          }
                        >
                          <span></span>
                          {usuario.estado}
                        </button>

                      </td>

                      <td>

                        <div className="usuario-actions">

                          <button
                            type="button"
                            className="usuario-edit"
                            onClick={() =>
                              abrirEditar(usuario)
                            }
                            title="Editar usuario"
                          >
                            ✎
                          </button>

                          <button
                            type="button"
                            className="usuario-delete"
                            onClick={() =>
                              eliminarUsuario(usuario.id)
                            }
                            title="Eliminar usuario"
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      {/* MODAL */}
      {modalAbierto && (

        <div className="usuarios-modal-overlay">

          <div className="usuarios-modal">

            <div className="usuarios-modal-header">

              <div>

                <span className="usuarios-eyebrow">
                  {modoEdicion
                    ? 'EDITAR'
                    : 'NUEVO REGISTRO'}
                </span>

                <h2>
                  {modoEdicion
                    ? 'Editar usuario'
                    : 'Crear usuario'}
                </h2>

              </div>

              <button
                type="button"
                className="usuarios-modal-close"
                onClick={cerrarModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={guardarUsuario}>

              <div className="usuarios-form-group">

                <label>
                  Nombre completo
                </label>

                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Ej: Juan Pérez"
                  required
                />

              </div>

              <div className="usuarios-form-group">

                <label>
                  Correo electrónico
                </label>

                <input
                  type="email"
                  name="email"
                  value={formulario.email}
                  onChange={manejarCambio}
                  placeholder="usuario@luckypay.com"
                  required
                />

              </div>

              <div className="usuarios-form-row">

                <div className="usuarios-form-group">

                  <label>
                    Rol
                  </label>

                  <select
                    name="rol"
                    value={formulario.rol}
                    onChange={manejarCambio}
                  >
                    <option value="Empleado">
                      Empleado
                    </option>

                    <option value="Administrador">
                      Administrador
                    </option>
                  </select>

                </div>

                <div className="usuarios-form-group">

                  <label>
                    Estado
                  </label>

                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                  >
                    <option value="Activo">
                      Activo
                    </option>

                    <option value="Inactivo">
                      Inactivo
                    </option>
                  </select>

                </div>

              </div>

              <div className="usuarios-modal-actions">

                <button
                  type="button"
                  className="usuarios-cancel-btn"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="usuarios-save-btn"
                >
                  {modoEdicion
                    ? 'Guardar cambios'
                    : 'Crear usuario'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      <footer className="usuarios-footer">
        © 2026 LuckyPay — Controla tu Negocio, Crece con Confianza
      </footer>

    </div>
  );
}

export default Usuarioyrol;