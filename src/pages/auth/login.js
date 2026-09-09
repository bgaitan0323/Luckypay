import { useState } from 'react';
import '../../styles/login.css';
import logo from '../../WhatsApp Image 2026-09-04 at 12.00.05.jpeg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recordar, setRecordar] = useState(false);

  const handleLogin = () => {
    const correo = email.trim().toLowerCase();

    // Validar campos
    if (!correo || !password) {
      alert('Por favor, ingrese el correo y la contraseña.');
      return;
    }

    // ==========================================
    // ADMINISTRADOR
    // ==========================================
    if (
      correo === 'admin@luckypay.com' &&
      password === 'Admin123'
    ) {
      // Limpiar sesiones anteriores
      localStorage.removeItem('usuario');
      localStorage.removeItem('rol');

      sessionStorage.removeItem('usuario');
      sessionStorage.removeItem('rol');

      // Guardar sesión
      if (recordar) {
        localStorage.setItem('usuario', correo);
        localStorage.setItem('rol', 'admin');
      } else {
        sessionStorage.setItem('usuario', correo);
        sessionStorage.setItem('rol', 'admin');
      }

      alert('¡Bienvenido, administrador!');

      // Ir al panel administrador
      window.location.href = '/panel';

      return;
    }

    // ==========================================
    // EMPLEADO
    // ==========================================
    if (
      correo === 'empleado@luckypay.com' &&
      password === 'Empleado123'
    ) {
      // Limpiar sesiones anteriores
      localStorage.removeItem('usuario');
      localStorage.removeItem('rol');

      sessionStorage.removeItem('usuario');
      sessionStorage.removeItem('rol');

      // Guardar sesión
      if (recordar) {
        localStorage.setItem('usuario', correo);
        localStorage.setItem('rol', 'empleado');
      } else {
        sessionStorage.setItem('usuario', correo);
        sessionStorage.setItem('rol', 'empleado');
      }

      alert('¡Bienvenido, empleado!');

      // ==========================================
      // AQUÍ ESTABA EL PROBLEMA
      // ==========================================
      window.location.href = '/empleado';

      return;
    }

    // ==========================================
    // DATOS INCORRECTOS
    // ==========================================
    alert('Correo o contraseña incorrectos.');
  };

  const manejarTecla = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LOGO */}
        <img
          src={logo}
          alt="LuckyPay"
          className="login-logo"
        />

        {/* TÍTULO */}
        <h1>LuckyPay</h1>

        <p className="subtitle">
          Sistema de Costos de Producción
        </p>

        {/* INICIAR SESIÓN */}
        <h2>Iniciar sesión</h2>

        {/* CORREO */}
        <label htmlFor="email">
          Correo electrónico
        </label>

        <input
          id="email"
          type="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={manejarTecla}
        />

        {/* CONTRASEÑA */}
        <label htmlFor="password">
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={manejarTecla}
        />

        {/* RECORDAR */}
        <div className="remember">

          <input
            type="checkbox"
            id="recordar"
            checked={recordar}
            onChange={(e) => setRecordar(e.target.checked)}
          />

          <label htmlFor="recordar">
            Recordar
          </label>

        </div>

        {/* RECUPERAR CONTRASEÑA */}
        <a
          href="#"
          className="forgot"
          onClick={(e) => e.preventDefault()}
        >
          ¿Olvidó su contraseña?
        </a>

        {/* BOTÓN */}
        <button
          type="button"
          onClick={handleLogin}
        >
          Ingresar
        </button>

        {/* CREAR CUENTA */}
        <p className="register">
          ¿No tiene una cuenta?{' '}

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Crear cuenta
          </a>
        </p>

      </div>

      {/* PIE DE PÁGINA */}
      <footer>
        © 2026 LuckyPay — Controla tu Negocio, Crece con Confianza
      </footer>

    </div>
  );
}

export default Login;