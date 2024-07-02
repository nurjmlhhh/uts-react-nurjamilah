import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div className="bg-blue-100 p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="/path/to/logo.png" alt="Logo" className="h-10 w-10 mr-3" />
                        <h1 className="text-2xl font-bold text-blue-700">My Streaming</h1>
                    </div>
                    <ul className="flex space-x-6">
                        <li className="text-blue-700 hover:text-blue-900 text-lg font-semibold"><Link to="/">Home</Link></li>
                        <li className="text-blue-700 hover:text-blue-900 text-lg font-semibold"><Link to="/film">Film</Link></li>
                        <li className="text-blue-700 hover:text-blue-900 text-lg font-semibold"><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
