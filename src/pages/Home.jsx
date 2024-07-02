export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
            <div className="max-w-2xl bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-4 text-blue-700">Selamat Datang di Koleksi Film!</h1>
                <p className="text-gray-700 text-lg">
                    Temukan, atur, dan nikmati film favorit Anda. Gunakan bilah pencarian untuk menemukan judul tertentu, urutkan koleksi berdasarkan berbagai kriteria, dan tambahkan film baru ke daftar Anda. Klik ikon hati untuk menandai favorit Anda dan tetap melacak film-film yang Anda sukai. Selamat menjelajahi beragam pilihan film dari berbagai genre dan tahun!
                </p>
                <button className="mt-6 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
                    Mulai Menjelajah
                </button>
            </div>
        </div>
    );
}
