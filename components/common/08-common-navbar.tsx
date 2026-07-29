'use client';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">🏢 Marketplace</div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Iniciar Sesión</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Registrarse</button>
        </div>
      </div>
    </nav>
  );
}
 
