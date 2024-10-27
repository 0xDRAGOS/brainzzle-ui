import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-slate-950 py-8 text-center text-sm text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p>&copy; {new Date().getFullYear()} Brainzzle. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                </div>
            </div>
        </footer>
    );
}