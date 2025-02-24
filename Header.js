function Header() {
    return (
        <header className="header py-4" data-name="header">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center" data-name="header-logo">
                    <i className="fas fa-brain text-indigo-600 text-2xl mr-2"></i>
                    <h1 className="text-xl font-bold text-gray-900">AI Learning Path</h1>
                </div>
                <nav className="flex items-center space-x-4" data-name="header-nav">
                    <a href="#" className="text-gray-600 hover:text-gray-900" data-name="header-nav-home">Home</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900" data-name="header-nav-about">About</a>
                    <button className="btn-primary" data-name="header-nav-login">
                        <i className="fas fa-user mr-2"></i>
                        Login
                    </button>
                </nav>
            </div>
        </header>
    );
}
