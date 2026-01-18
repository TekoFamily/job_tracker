import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, User, FileText, LogOut, LayoutDashboard } from 'lucide-react';
import { logout } from '../../services/auth';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass-panel navbar">
            <div className="container navbar-content">
                <Link to="/dashboard" className="logo">
                    <Briefcase className="logo-icon" size={28} />
                    <span>JobTracker</span>
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        <span>Painel</span>
                    </Link>
                    <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
                        <User size={20} />
                        <span>Perfil</span>
                    </Link>
                    <Link to="/resume" className={`nav-item ${isActive('/resume') ? 'active' : ''}`}>
                        <FileText size={20} />
                        <span>Currículo</span>
                    </Link>
                    <Link to="/jobs" className={`nav-item ${isActive('/jobs') ? 'active' : ''}`}>
                        <Briefcase size={20} />
                        <span>Vagas</span>
                    </Link>
                    <button onClick={handleLogout} className="nav-item logout-btn">
                        <LogOut size={20} />
                        <span>Sair</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
