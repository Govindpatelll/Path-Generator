function Footer() {
    return (
        <footer className="footer py-8" data-name="footer">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div data-name="footer-about">
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400">
                            AI-powered personalized learning paths to help you achieve your goals efficiently.
                        </p>
                    </div>
                    <div data-name="footer-links">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div data-name="footer-contact">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-2">
                            <p className="text-gray-400">
                                <i className="fas fa-envelope mr-2"></i>
                                support@ailearningpath.com
                            </p>
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <i className="fab fa-twitter text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <i className="fab fa-linkedin text-xl"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <i className="fab fa-github text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; 2024 AI Learning Path. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
