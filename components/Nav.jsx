import { NavLink } from '.';

function Nav() {
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/products" className="nav-item nav-link">Products</NavLink>
            </div>
        </nav>
    );
}

export { Nav };