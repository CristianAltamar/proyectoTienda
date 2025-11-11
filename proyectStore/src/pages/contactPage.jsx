export const ContatPage = () => {
    return (
        <>
            <form action="contact" className="max-w-4xl grid grid-cols-2 gap-4 mx-auto p-8 bg-gray-100 rounded-2xl shadow-lg shadow-gray-400">
                <label className="flex flex-col" htmlFor="name">
                    Nombre:
                    <input className="border-b border-b-gray-900 rounded-2xl py-1 px-2 placeholder:text-gray-500" type="text" placeholder="Cristian Altamar" id="name" name="name" required />
                </label>

                <label className="flex flex-col" htmlFor="email">
                    Correo electrónico:
                    <input className="border-b border-b-gray-900 rounded-2xl py-1 px-2 placeholder:text-gray-500" type="email" placeholder="cristian@example.com" id="email" name="email" required />
                </label>

                <label className="col-span-2 flex flex-col" htmlFor="message">
                    Mensaje:
                    <textarea className="border border-gray-900 rounded-2xl h-48 py-1 px-2 placeholder:text-gray-500" id="message" placeholder="Tú mensage..." name="message" required></textarea>
                </label>

                <button className="bg-blue-500 text-white rounded-2xl py-2 px-4 col-span-2 cursor-pointer hover:bg-blue-600" type="submit">Enviar</button>
            </form>
        </>
    )
}