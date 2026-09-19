import Login from './pages/auth/login';

// =========================================
// ADMIN
// =========================================

import PanelPrincipal from './admin/PanelPrincipal';
import Productos from './admin/Productos';
import Insumos from './admin/insumos';
import Costos from './admin/costos';
import MetaDeVentas from './admin/metadeventas';
import Usuarios from './admin/usuarioyrol';
import Analisis from './admin/analisis';
import Reportes from './admin/reportes';
import Auditoria from './admin/auditoria';
import Configuracion from './admin/configuracion';

// =========================================
// EMPLEADO
// =========================================

import PanelEmpleado from './empleado/PanelEmpleado';
import InsumosEmpleado from './empleado/insumos';
import ProductosEmpleado from './empleado/productos';
import CostosEmpleado from './empleado/costos';
import ReportesEmpleado from './empleado/reportes';

function App() {
  const ruta = window.location.pathname;

  // =========================================
  // ADMIN
  // =========================================

  if (ruta === '/panel') {
    return <PanelPrincipal />;
  }

  if (ruta === '/productos') {
    return <Productos />;
  }

  if (ruta === '/insumos') {
    return <Insumos />;
  }

  if (ruta === '/costos') {
    return <Costos />;
  }

  if (ruta === '/meta-ventas') {
    return <MetaDeVentas />;
  }

  if (ruta === '/usuarios') {
    return <Usuarios />;
  }

  if (ruta === '/analisis') {
    return <Analisis />;
  }

  if (ruta === '/reportes') {
    return <Reportes />;
  }

  if (ruta === '/auditoria') {
    return <Auditoria />;
  }

  if (ruta === '/configuracion') {
    return <Configuracion />;
  }

  // =========================================
  // EMPLEADO
  // =========================================

  if (ruta === '/empleado') {
    return <PanelEmpleado />;
  }

  if (ruta === '/empleado/insumos') {
    return <InsumosEmpleado />;
  }

  if (ruta === '/empleado/productos') {
    return <ProductosEmpleado />;
  }

  if (ruta === '/empleado/costos') {
    return <CostosEmpleado />;
  }

  if (ruta === '/empleado/reportes') {
    return <ReportesEmpleado />;
  }

  // =========================================
  // LOGIN
  // =========================================

  return <Login />;
}

export default App;