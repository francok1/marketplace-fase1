import '../test.css';

export default function TestPage() {
  return (
    <div>
      <h1>Prueba de CSS</h1>
      <div className="test-box">
        Si ves este texto en una caja azul, los estilos CSS están funcionando.
      </div>
      <p>Si no ves la caja azul, el problema es que CSS no se está inyectando en el HTML.</p>
    </div>
  );
}
