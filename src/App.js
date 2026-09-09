import Login from './pages/auth/login';

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

import PanelEmpleado from './empleado/PanelEmpleado';

function App() {
  const ruta = window.location.pathname;

  const rutas = {
    // LOGIN
    '/': <Login />,

    // ==========================
    // ADMINISTRADOR
    // ==========================
    '/panel': <PanelPrincipal />,
    '/productos': <Productos />,
    '/insumos': <Insumos />,
    '/costos': <Costos />,
    '/meta-ventas': <MetaDeVentas />,
    '/usuarios': <Usuarios />,
    '/analisis': <Analisis />,
    '/reportes': <Reportes />,
    '/auditoria': <Auditoria />,
    '/configuracion': <Configuracion />,

    // ==========================
    // EMPLEADO
    // ==========================
    '/empleado': <PanelEmpleado />,
  };

  return rutas[ruta] || <Login />;
}

export default App;