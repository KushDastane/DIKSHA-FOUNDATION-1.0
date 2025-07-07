import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';


const NotFoundPage = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <Ghost className="w-20 h-20 text-gray-500 mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
