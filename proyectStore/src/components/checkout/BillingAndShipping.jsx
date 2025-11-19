
// Componente de Facturación y Envío
export function BillingAndShipping() {
    return (
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 gap-6">
            {/* Facturación */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Facturación</h2>
                <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 flex gap-2">
                    <select className="border p-2 rounded-lg w-20">
                        <option>CC</option>
                        <option>TI</option>
                    </select>
                    <input
                    type="text"
                    placeholder="1052638982"
                    className="border p-2 rounded-lg w-full"
                    />
                </div>

                <input type="text" placeholder="Nombre" className="border p-2 rounded-lg" />
                <input type="text" placeholder="Apellido" className="border p-2 rounded-lg" />

                <input
                    type="text"
                    placeholder="Teléfono"
                    className="border p-2 rounded-lg col-span-2"
                />

                <input
                    type="email"
                    placeholder="Correo"
                    className="border p-2 rounded-lg col-span-2"
                />
                </div>
            </div>

            {/* Envío */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Envío</h2>
                <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Departamento" className="border p-2 rounded-lg" />
                <input type="text" placeholder="Ciudad" className="border p-2 rounded-lg" />

                <input
                    type="text"
                    placeholder="Dirección"
                    className="border p-2 rounded-lg col-span-2"
                />

                <textarea
                    placeholder="Notas adicionales..."
                    className="border p-2 rounded-lg col-span-2 h-28"
                />
                </div>
            </div>
        </div>
    );
}


