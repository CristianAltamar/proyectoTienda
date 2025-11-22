export const ProfileInfo = ({ profileData }) => {
    return (
        <div className="max-w-2xl w-full bg-gray-950 p-8 rounded-2xl text-gray-200 shadow-lg shadow-gray-400">
            <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
            <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">Información Personal</h2>
                <p><strong>Nombre:</strong> {profileData.name?.firstname} {profileData.name?.lastname}</p>
                <p><strong>Usuario:</strong> {profileData.username}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Teléfono:</strong> {profileData.phone}</p>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-2">Dirección</h2>
                <p><strong>Calle:</strong> {profileData.address?.street} {profileData.address?.number}</p>
                <p><strong>Ciudad:</strong> {profileData.address?.city}</p>
                <p><strong>Código Postal:</strong> {profileData.address?.zipcode}</p>
                <p><strong>Geolocalización:</strong> Latitud: {profileData.address?.geolocation?.lat}, Longitud: {profileData.address?.geolocation?.long}</p>
            </div>
        </div>
    )
}