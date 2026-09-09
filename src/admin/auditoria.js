import React, { useMemo, useState } from 'react';
import '../styles/auditoria.css';
import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Auditoria() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [modulo, setModulo] = useState('Todos');
  const [tipo, setTipo] = useState('Todas');

  const registrosIniciales = [
    {
      id: 1,
      usuario: 'Administrador',
      correo: 'admin@luckypay.com',
      accion: 'Inicio de sesión',
      modulo: 'Seguridad',
      fecha: '04/09/2026',
      hora: '08:42 AM',
      estado: 'Exitoso',
      icono: '↪'
    },
    {
      id: 2,
      usuario: 'Administrador',
      correo: 'admin@luckypay.com',
      accion: 'Actualizó un producto',
      modulo: 'Productos',
      fecha: '04/09/2026',
      hora: '09:15 AM',
      estado: 'Exitoso',
      icono: '✎'
    },
    {
      id: 3,
      usuario: 'Empleado Principal',
      correo: 'empleado@luckypay.com',
      accion: 'Registró un nuevo insumo',
      modulo: 'Insumos',
      fecha: '04/09/2026',
      hora: '09:38 AM',
      estado: 'Exitoso',
      icono: '+'
    },
    {
      id: 4,
      usuario: 'Administrador',
      correo: 'admin@luckypay.com',
      accion: 'Consultó costos de producción',
      modulo: 'Costos',
      fecha: '04/09/2026',
      hora: '10:04 AM',
      estado: 'Exitoso',
      icono: '$'
    },
    {
      id: 5,
      usuario: 'Carlos Rodríguez',
      correo: 'carlos@luckypay.com',
      accion: 'Actualizó meta de ventas',
      modulo: 'Meta de Ventas',
      fecha: '04/09/2026',
      hora: '10:26 AM',
      estado: 'Exitoso',
      icono: '⚖'
    },
    {
      id: 6,
      usuario: 'Administrador',
      correo: 'admin@luckypay.com',
      accion: 'Consultó análisis financiero',
      modulo: 'Análisis',
      fecha: '04/09/2026',
      hora: '11:02 AM',
      estado: 'Exitoso',
      icono: '◔'
    },
    {
      id: 7,
      usuario: 'Laura Martínez',
      correo: 'laura@luckypay.com',
      accion: 'Intento de acceso',
      modulo: 'Seguridad',
      fecha: '04/09/2026',
      hora: '11:31 AM',
      estado: 'Fallido',
      icono: '!'
    },
    {
      id: 8,
      usuario: 'Administrador',
      correo: 'admin@luckypay.com',
      accion: 'Generó reporte',
      modulo: 'Reportes',
      fecha: '04/09/2026',
      hora: '12:05 PM',
      estado: 'Exitoso',
      icono: '▤'
    }
  ];

  const [registros] = useState(registrosIniciales);

  const navegar = (ruta) => {
    setMenuAbierto(false);
    window.location.href = ruta;
  };

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  const registrosFiltrados = useMemo(() => {
    return registros.filter((registro) => {
      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        registro.usuario.toLowerCase().includes(texto) ||
        registro.correo.toLowerCase().includes(texto) ||
        registro.accion.toLowerCase().includes(texto) ||
        registro.modulo.toLowerCase().includes(texto);

      const coincideModulo =
        modulo === 'Todos' || registro.modulo === modulo;

      const coincideTipo =
        tipo === 'Todas' || registro.estado === tipo;

      return coincideBusqueda && coincideModulo && coincideTipo;
    });
  }, [registros, busqueda, modulo, tipo]);

  const exitosos = registros.filter(
    (registro) => registro.estado === 'Exitoso'
  ).length;

  const fallidos = registros.filter(
    (registro) => registro.estado === 'Fallido'
  ).length;

  const usuarios = new Set(
    registros.map((registro) => registro.correo)
  ).size;

  return (
    <div className="auditoria-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="auditoria-navbar">

        <button
          type="button"
          className={`auditoria-menu ${
            menuAbierto ? 'activo' : ''
          }`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="auditoria-brand">
          <img src={logo} alt="LuckyPay" />
          <span>LuckyPay</span>
        </div>

        <div className="auditoria-welcome">

          <div className="auditoria-user-info">
            <strong>Bienvenido, Administrador</strong>
            <span>Gestión de auditoría</span>
          </div>

          <button
            type="button"
            className="auditoria-logout-btn"
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
          className="auditoria-menu-overlay"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`auditoria-sidebar ${
          menuAbierto ? 'abierto' : ''
        }`}
      >

        <div className="auditoria-sidebar-header">

          <div>
            <strong>LuckyPay</strong>
            <small>Menú principal</small>
          </div>

          <button
            type="button"
            className="auditoria-sidebar-close"
            onClick={() => setMenuAbierto(false)}
            aria-label="Cerrar menú"
          >
            ×
          </button>

        </div>

        {/* INICIO */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/panel')}
        >
          <span className="auditoria-sidebar-icon">⌂</span>
          <span>Inicio</span>
        </button>

        {/* INSUMOS */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/insumos')}
        >
          <span className="auditoria-sidebar-icon">▤</span>
          <span>Insumos</span>
        </button>

        {/* PRODUCTOS */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/productos')}
        >
          <span className="auditoria-sidebar-icon">◆</span>
          <span>Productos</span>
        </button>

        {/* COSTOS */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/costos')}
        >
          <span className="auditoria-sidebar-icon">$</span>
          <span>Costos</span>
        </button>

        {/* META DE VENTAS */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/meta-ventas')}
        >
          <span className="auditoria-sidebar-icon">⚖</span>
          <span>Meta de Ventas</span>
        </button>

        {/* USUARIOS Y ROLES */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/usuarios')}
        >
          <span className="auditoria-sidebar-icon">♟</span>
          <span>Usuarios y Roles</span>
        </button>

        {/* ANÁLISIS */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/analisis')}
        >
          <span className="auditoria-sidebar-icon">◔</span>
          <span>Análisis</span>
        </button>

        {/* REPORTES */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/reportes')}
        >
          <span className="auditoria-sidebar-icon">▤</span>
          <span>Reportes</span>
        </button>

        {/* AUDITORÍA */}

        <button
          type="button"
          className="auditoria-sidebar-item activo"
          onClick={() => setMenuAbierto(false)}
        >
          <span className="auditoria-sidebar-icon">☷</span>
          <span>Auditoría</span>
        </button>

        {/* CONFIGURACIÓN */}

        <button
          type="button"
          className="auditoria-sidebar-item"
          onClick={() => navegar('/configuracion')}
        >
          <span className="auditoria-sidebar-icon">⚙</span>
          <span>Configuración</span>
        </button>

        <div className="auditoria-sidebar-separator"></div>

        {/* CERRAR SESIÓN */}

        <button
          type="button"
          className="auditoria-logout"
          onClick={cerrarSesion}
        >
          <span>↪</span>
          <span>Cerrar sesión</span>
        </button>

      </aside>

      {/* =========================
          CONTENIDO
      ========================= */}

      <main className="auditoria-main">

        {/* ENCABEZADO */}

        <section className="auditoria-heading">

          <div>

            <span className="auditoria-eyebrow">
              SEGURIDAD Y CONTROL
            </span>

            <h1>☷ Auditoría</h1>

            <p>
              Consulta el historial de actividades realizadas
              dentro del sistema LuckyPay.
            </p>

          </div>

          <div className="auditoria-fecha">

            <span>REGISTRO DEL SISTEMA</span>

            <strong>Actividad reciente</strong>

          </div>

        </section>

        {/* =========================
            ESTADÍSTICAS
        ========================= */}

        <section className="auditoria-stats">

          <div className="auditoria-stat-card">

            <div className="auditoria-stat-icon">
              ☷
            </div>

            <div>
              <span>Total de registros</span>
              <strong>{registros.length}</strong>
            </div>

          </div>

          <div className="auditoria-stat-card">

            <div className="auditoria-stat-icon">
              ✓
            </div>

            <div>
              <span>Acciones exitosas</span>
              <strong>{exitosos}</strong>
            </div>

          </div>

          <div className="auditoria-stat-card">

            <div className="auditoria-stat-icon">
              !
            </div>

            <div>
              <span>Acciones fallidas</span>
              <strong>{fallidos}</strong>
            </div>

          </div>

          <div className="auditoria-stat-card">

            <div className="auditoria-stat-icon">
              ♟
            </div>

            <div>
              <span>Usuarios activos</span>
              <strong>{usuarios}</strong>
            </div>

          </div>

        </section>

        {/* =========================
            TABLA
        ========================= */}

        <section className="auditoria-card">

          <div className="auditoria-card-header">

            <div>

              <span className="auditoria-card-label">
                HISTORIAL
              </span>

              <h2>Registro de actividades</h2>

              <p>
                Todas las acciones realizadas en el sistema.
              </p>

            </div>

          </div>

          {/* =========================
              FILTROS
          ========================= */}

          <div className="auditoria-filtros">

            <div className="auditoria-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Buscar usuario, acción o módulo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

            </div>

            <select
              value={modulo}
              onChange={(e) => setModulo(e.target.value)}
            >
              <option value="Todos">
                Todos los módulos
              </option>

              <option value="Seguridad">
                Seguridad
              </option>

              <option value="Productos">
                Productos
              </option>

              <option value="Insumos">
                Insumos
              </option>

              <option value="Costos">
                Costos
              </option>

              <option value="Meta de Ventas">
                Meta de Ventas
              </option>

              <option value="Análisis">
                Análisis
              </option>

              <option value="Reportes">
                Reportes
              </option>

            </select>

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="Todas">
                Todos los estados
              </option>

              <option value="Exitoso">
                Exitosos
              </option>

              <option value="Fallido">
                Fallidos
              </option>

            </select>

          </div>

          {/* =========================
              TABLA
          ========================= */}

          <div className="auditoria-table-container">

            <table className="auditoria-table">

              <thead>

                <tr>
                  <th>USUARIO</th>
                  <th>ACCIÓN</th>
                  <th>MÓDULO</th>
                  <th>FECHA</th>
                  <th>HORA</th>
                  <th>ESTADO</th>
                </tr>

              </thead>

              <tbody>

                {registrosFiltrados.map((registro) => (

                  <tr key={registro.id}>

                    {/* USUARIO */}

                    <td>

                      <div className="auditoria-usuario">

                        <div className="auditoria-avatar">
                          {registro.usuario.charAt(0)}
                        </div>

                        <div>

                          <strong>
                            {registro.usuario}
                          </strong>

                          <small>
                            {registro.correo}
                          </small>

                        </div>

                      </div>

                    </td>

                    {/* ACCIÓN */}

                    <td>

                      <div className="auditoria-accion">

                        <span>
                          {registro.icono}
                        </span>

                        {registro.accion}

                      </div>

                    </td>

                    {/* MÓDULO */}

                    <td>

                      <span className="auditoria-modulo">
                        {registro.modulo}
                      </span>

                    </td>

                    {/* FECHA */}

                    <td>
                      {registro.fecha}
                    </td>

                    {/* HORA */}

                    <td>
                      {registro.hora}
                    </td>

                    {/* ESTADO */}

                    <td>

                      <span
                        className={`auditoria-estado ${
                          registro.estado === 'Exitoso'
                            ? 'exitoso'
                            : 'fallido'
                        }`}
                      >

                        <span className="auditoria-estado-dot"></span>

                        {registro.estado}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {/* SIN RESULTADOS */}

            {registrosFiltrados.length === 0 && (

              <div className="auditoria-vacio">

                <div>⌕</div>

                <h3>
                  No se encontraron registros
                </h3>

                <p>
                  Intenta cambiar los filtros o realizar
                  otra búsqueda.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* =========================
            FOOTER
        ========================= */}

        <footer className="auditoria-footer">

          © 2026 <strong>LuckyPay</strong> —
          Controla tu Negocio, Crece con Confianza

        </footer>

      </main>

    </div>
  );
}

export default Auditoria;