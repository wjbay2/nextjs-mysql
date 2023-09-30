import { NavLink } from '.';

function Nav() {
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3 shadow">
            <div className="navbar-nav container justify-content-start">
                <NavLink href="/" exact className="nav-item nav-link me-4">Home</NavLink>
                <NavLink href="/products" className="nav-item nav-link">Products</NavLink>
            </div>
        </nav>
    );
}

export { Nav };