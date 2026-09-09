import React, { useState } from 'react';
import '../styles/configuracion.css';

import logo from '../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Configuracion() {
  const [sidebar, setSidebar] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const navegar = (ruta) => {
    setSidebar(false);
    window.location.href = ruta;
  };

  const cerrarSesion = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  const guardarConfiguracion = (e) => {
    e.preventDefault();

    setGuardado(true);

    setTimeout(() => {
      setGuardado(false);
    }, 3000);
  };

  return (
    <div className="configuracion-page">

      {/* ================= NAVBAR ================= */}

      <header className="configuracion-navbar">

        {/* BOTÓN TRES RAYAS */}
        <button
          type="button"
          className="configuracion-menu-btn"
          onClick={() => setSidebar(!sidebar)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* MARCA */}
        <div className="configuracion-brand">
          <img src={logo} alt="LuckyPay" />
          <span>LuckyPay</span>
        </div>

        {/* BIENVENIDA + SALIR */}
        <div className="configuracion-welcome">

          <div className="configuracion-user-info">
            <strong>Bienvenido, Administrador</strong>
            <span>Gestión de configuración</span>
          </div>

          <button
            type="button"
            className="configuracion-logout-btn"
            onClick={cerrarSesion}
          >
            Salir
          </button>

        </div>

      </header>


      {/* ================= OVERLAY ================= */}

      {sidebar && (
        <div
          className="configuracion-overlay"
          onClick={() => setSidebar(false)}
        ></div>
      )}


      {/* ================= SIDEBAR ================= */}

      <aside
        className={`configuracion-sidebar ${
          sidebar ? 'abierto' : ''
        }`}
      >

        {/* CABECERA DEL MENÚ */}

        <div className="configuracion-sidebar-header">

          <div>
            <strong>MENÚ PRINCIPAL</strong>
            <small>Administración</small>
          </div>

          <button
            type="button"
            className="configuracion-sidebar-close"
            onClick={() => setSidebar(false)}
            aria-label="Cerrar menú"
          >
            ×
          </button>

        </div>


        {/* INICIO */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/panel')}
        >
          <span className="configuracion-menu-icon">⌂</span>
          <span>Inicio</span>
        </button>


        {/* INSUMOS */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/insumos')}
        >
          <span className="configuracion-menu-icon">◆</span>
          <span>Insumos</span>
        </button>


        {/* PRODUCTOS */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/productos')}
        >
          <span className="configuracion-menu-icon">▣</span>
          <span>Productos</span>
        </button>


        {/* COSTOS */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/costos')}
        >
          <span className="configuracion-menu-icon">$</span>
          <span>Costos</span>
        </button>


        {/* META DE VENTAS */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/meta-ventas')}
        >
          <span className="configuracion-menu-icon">◎</span>
          <span>Meta de Ventas</span>
        </button>


        {/* USUARIOS Y ROLES */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/usuarios')}
        >
          <span className="configuracion-menu-icon">♟</span>
          <span>Usuarios y Roles</span>
        </button>


        {/* ANÁLISIS */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/analisis')}
        >
          <span className="configuracion-menu-icon">▦</span>
          <span>Análisis</span>
        </button>


        {/* REPORTES */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/reportes')}
        >
          <span className="configuracion-menu-icon">▤</span>
          <span>Reportes</span>
        </button>


        {/* AUDITORÍA */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={() => navegar('/auditoria')}
        >
          <span className="configuracion-menu-icon">☷</span>
          <span>Auditoría</span>
        </button>


        {/* CONFIGURACIÓN */}

        <button
          type="button"
          className="configuracion-sidebar-item activo"
          onClick={() => setSidebar(false)}
        >
          <span className="configuracion-menu-icon">⚙</span>
          <span>Configuración</span>
        </button>


        {/* SEPARADOR */}

        <div className="configuracion-sidebar-separador"></div>


        {/* CERRAR SESIÓN */}

        <button
          type="button"
          className="configuracion-sidebar-item"
          onClick={cerrarSesion}
        >
          <span className="configuracion-menu-icon">↪</span>
          <span>Cerrar sesión</span>
        </button>

      </aside>


      {/* ================= CONTENIDO ================= */}

      <main className="configuracion-main">

        {/* CABECERA */}

        <div className="configuracion-header">

          <div>

            <span className="configuracion-etiqueta">
              ADMINISTRACIÓN
            </span>

            <h1>Configuración</h1>

            <p>
              Administra las preferencias generales del sistema.
            </p>

          </div>


          {/* RUEDA DE CONFIGURACIÓN */}

          <div className="configuracion-icono">
            ⚙
          </div>

        </div>


        {/* ================= FORMULARIO ================= */}

        <form onSubmit={guardarConfiguracion}>

          {/* INFORMACIÓN GENERAL */}

          <section className="configuracion-card">

            <div className="configuracion-card-header">

              <div>

                <h2>Información general</h2>

                <p>
                  Datos principales de LuckyPay.
                </p>

              </div>

              <span className="configuracion-card-icon">
                ◉
              </span>

            </div>


            <div className="configuracion-grid">

              {/* EMPRESA */}

              <div className="configuracion-campo">

                <label>
                  Nombre de la empresa
                </label>

                <input
                  type="text"
                  defaultValue="LuckyPay"
                />

              </div>


              {/* CORREO */}

              <div className="configuracion-campo">

                <label>
                  Correo electrónico
                </label>

                <input
                  type="email"
                  defaultValue="admin@luckypay.com"
                />

              </div>


              {/* MONEDA */}

              <div className="configuracion-campo">

                <label>
                  Moneda
                </label>

                <select defaultValue="COP">

                  <option value="COP">
                    Peso colombiano (COP)
                  </option>

                  <option value="USD">
                    Dólar estadounidense (USD)
                  </option>

                  <option value="EUR">
                    Euro (EUR)
                  </option>

                </select>

              </div>


              {/* IDIOMA */}

              <div className="configuracion-campo">

                <label>
                  Idioma
                </label>

                <select defaultValue="es">

                  <option value="es">
                    Español
                  </option>

                  <option value="en">
                    English
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* ================= PREFERENCIAS ================= */}

          <section className="configuracion-card">

            <div className="configuracion-card-header">

              <div>

                <h2>
                  Preferencias del sistema
                </h2>

                <p>
                  Configura el comportamiento general.
                </p>

              </div>

              <span className="configuracion-card-icon">
                ⚙
              </span>

            </div>


            <div className="configuracion-preferencias">

              {/* STOCK */}

              <label className="configuracion-check">

                <input
                  type="checkbox"
                  defaultChecked
                />

                <span>
                  Mostrar alertas de stock mínimo
                </span>

              </label>


              {/* AUDITORÍA */}

              <label className="configuracion-check">

                <input
                  type="checkbox"
                  defaultChecked
                />

                <span>
                  Registrar actividades en auditoría
                </span>

              </label>


              {/* NOTIFICACIONES */}

              <label className="configuracion-check">

                <input
                  type="checkbox"
                  defaultChecked
                />

                <span>
                  Mostrar notificaciones del sistema
                </span>

              </label>

            </div>

          </section>


          {/* ================= BOTONES ================= */}

          <div className="configuracion-acciones">

            <button
              type="button"
              className="configuracion-btn-secundario"
              onClick={() => window.location.reload()}
            >
              Cancelar
            </button>


            <button
              type="submit"
              className="configuracion-btn-principal"
            >
              <span>💾</span>
              Guardar cambios
            </button>

          </div>

        </form>


        {/* ================= MENSAJE ================= */}

        {guardado && (
          <div className="configuracion-toast">

            <span>✓</span>

            Configuración guardada correctamente.

          </div>
        )}


        {/* ================= FOOTER ================= */}

        <footer className="configuracion-footer">

          © 2026 <strong>LuckyPay</strong> — Controla tu Negocio,
          Crece con Confianza

        </footer>

      </main>

    </div>
  );
}

export default Configuracion;