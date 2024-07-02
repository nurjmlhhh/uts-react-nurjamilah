import { Info, Pencil, Plus, Search, Trash, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const allFilm = [
  {
    id: 1,
    title: "My Heart",
    image: "https://thumbor.prod.vidiocdn.com/oouuevLce4lLjRL-JkUNQEhfdGs=/filters:quality(70)/vidio-media-production/uploads/image/source/9662/e41bda.jpg",
    year: 2013,
    genre: "romance",
    durasi: "2 jam",
    sinopsis: "Film remaja",
  },
  {
    id: 2,
    title: "Harry Potter",
    image : "https://ceritafilm.com/wp-content/uploads/2022/08/Harry-Potter-7-2-scaled.jpg",
    year: 2010,
    genre: "magic",
    durasi: "2 jam",
    sinopsis: "Film remaja",
  },
  {
    id: 3,
    title: "Narnia",
    image : "https://upload.wikimedia.org/wikipedia/id/c/c8/Principe_Caspain_poster.jpg",
    year: 2013,
    genre: "magic",
    durasi: "2 jam",
    sinopsis: "Film remaja",
  },
  {
    id: 4,
    title: "Frozen",
    image : "https://assets-a1.kompasiana.com/items/album/2023/12/12/download-6578914912d50f27d9317112.jpeg?t=o&v=770",
    year: 2013,
    genre: "cartoon",
    durasi: "2 jam",
    sinopsis: "Film anak-anak",
  },
];

const savedFilm = localStorage.getItem("myfilm");

export default function Film() {
  const [film, setFilm] = useState(savedFilm ? JSON.parse(savedFilm) : allFilm);
  const [addFilm, setAddFilm] = useState({
    title: "",
    image: "",
    year: "",
    genre: "",
    durasi: "",
    sinopsis: "",
  });
  const [updateFilm, setUpdateFilm] = useState(null);
  const [likedFilms, setLikedFilms] = useState({});
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("id");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); // State untuk mengontrol tampilan form tambah film

  useEffect(() => {
    localStorage.setItem("myfilm", JSON.stringify(film));
  }, [film]);

  function handleAdd() {
    const newId = film.length > 0 ? Math.max(...film.map((a) => a.id)) + 1 : 1;
    setFilm([...film, { ...addFilm, id: newId }]);
    setAddFilm({
      title: "",
      image: "",
      year: "",
      genre: "",
      durasi: "",
      sinopsis: "",
    });
    setShowAddForm(false); // Setelah menambahkan film, sembunyikan form tambah film
  }

  function handleDelete(id) {
    if (window.confirm("Apakah Anda yakin ingin menghapus ini?")) {
      setFilm(film.filter((a) => a.id !== id));
    }
  }

  function handleUpdate() {
    setFilm(film.map((a) => (a.id === updateFilm.id ? updateFilm : a)));
    setUpdateFilm(null);
  }

  function handleInfo(a) {
    alert(`Judul: ${a.title}\nGenre: ${a.genre}\nDurasi: ${a.durasi}\nSinopsis: ${a.sinopsis}`);
  }

  function toggleLike(id) {
    setLikedFilms((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const filterData = film
    .sort((a, b) => {
      const sortOrder = orderBy === "asc" ? 1 : -1;
      return sortOrder * (a[sortBy] < b[sortBy] ? -1 : 1);
    })
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => setShowAddForm(true)} className="p-2 rounded-full bg-blue-500 text-white"><Plus /></button>
          <div className="flex items-center space-x-2">
            <Search />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari judul film..." className="border p-2 rounded-lg" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label>
            <h3 className="text-lg font-semibold">Urutkan</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded-lg">
              <option value="id">Normal</option>
              <option value="title">Judul</option>
              <option value="year">Tahun</option>
            </select>
          </label>
          <label>
            <h3 className="text-lg font-semibold">Urutkan</h3>
            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)} className="border p-2 rounded-lg">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterData.map((a) => (
          <div key={a.id} className="relative border rounded-lg overflow-hidden shadow-lg">
            <img src={a.image} alt={a.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{a.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{a.year}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => handleInfo(a)} className="p-2 rounded-full bg-gray-200 text-gray-800"><Info /></button>
                <button onClick={() => toggleLike(a.id)} className="p-2 rounded-full bg-gray-200 text-gray-800"><Heart color={likedFilms[a.id] ? 'red' : 'white'} /></button>
                <button onClick={() => setUpdateFilm(a)} className="p-2 rounded-full bg-gray-200 text-gray-800"><Pencil /></button>
                <button onClick={() => handleDelete(a.id)} className="p-2 rounded-full bg-gray-200 text-gray-800"><Trash /></button>
              </div>
            </div>

            {updateFilm && updateFilm.id === a.id && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto" style={{ margin: "20px auto", maxHeight: "calc(100% - 40px)" }}>
                  <h2 className="text-lg font-semibold mb-4">Update Film</h2>
                  <label className="block">
                    <span className="text-gray-700">Judul Film</span>
                    <input type="text" value={updateFilm.title} onChange={(e) => setUpdateFilm({ ...updateFilm, title: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
                  </label>
                  <label className="block mt-4">
                    <span className="text-gray-700">Image URL</span>
                    <input type="text" value={updateFilm.image} onChange={(e) => setUpdateFilm({ ...updateFilm, image: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
                  </label>
                  <label className="block mt-4">
                    <span className="text-gray-700">Tahun Rilis</span>
                    <input type="text" value={updateFilm.year} onChange={(e) => setUpdateFilm({ ...updateFilm, year: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
                  </label>
                  <label className="block mt-4">
                    <span className="text-gray-700">Genre</span>
                    <input type="text" value={updateFilm.genre} onChange={(e) => setUpdateFilm({ ...updateFilm, genre: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
                  </label>
                  <label className="block mt-4">
                    <span className="text-gray-700">Durasi Film</span>
                    <input type="text" value={updateFilm.durasi} onChange={(e) => setUpdateFilm({ ...updateFilm, durasi: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
                  </label>
                  <label className="block mt-4">
                    <span className="text-gray-700">Sinopsis Film</span>
                    <input type="text" value={updateFilm.sinopsis} onChange={(e) => setUpdateFilm({ ...updateFilm, sinopsis: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
                  </label>
                  <div className="flex justify-end mt-4">
                    <button type="button" onClick={() => setUpdateFilm(null)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2">Cancel</button>
                    <button type="button" onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form tambah film */}
      {showAddForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto" style={{ margin: "20px auto", maxHeight: "calc(100% - 40px)" }}>
            <h2 className="text-lg font-semibold mb-4">Tambah Film</h2>
            <label className="block">
              <span className="text-gray-700">Judul Film</span>
              <input type="text" value={addFilm.title} onChange={(e) => setAddFilm({ ...addFilm, title: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
            </label>
            <label className="block mt-4">
              <span className="text-gray-700">Image URL</span>
              <input type="text" value={addFilm.image} onChange={(e) => setAddFilm({ ...addFilm, image: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
            </label>
            <label className="block mt-4">
              <span className="text-gray-700">Tahun Rilis</span>
              <input type="text" value={addFilm.year} onChange={(e) => setAddFilm({ ...addFilm, year: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
            </label>
            <label className="block mt-4">
              <span className="text-gray-700">Genre</span>
              <input type="text" value={addFilm.genre} onChange={(e) => setAddFilm({ ...addFilm, genre: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
            </label>
            <label className="block mt-4">
              <span className="text-gray-700">Durasi Film</span>
              <input type="text" value={addFilm.durasi} onChange={(e) => setAddFilm({ ...addFilm, durasi: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
            </label>
            <label className="block mt-4">
              <span className="text-gray-700">Sinopsis Film</span>
              <input type="text" value={addFilm.sinopsis} onChange={(e) => setAddFilm({ ...addFilm, sinopsis: e.target.value })} className="border p-2 mt-1 w-full rounded-lg" />
            </label>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2">Cancel</button>
              <button type="button" onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
