export default function Contact() {
    const iden = {
        name: "Nur Jamilah",
        ttl: "Bandung, 01 Januari 2003",
        pel: "React",
        instruk: "Siti Pitriyani"
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-blue-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Identitas Saya</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Nama:</span>
                            <span className="text-gray-900">{iden.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Tempat, Tanggal Lahir:</span>
                            <span className="text-gray-900">{iden.ttl}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Pelatihan:</span>
                            <span className="text-gray-900">{iden.pel}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Instruktur:</span>
                            <span className="text-gray-900">{iden.instruk}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
