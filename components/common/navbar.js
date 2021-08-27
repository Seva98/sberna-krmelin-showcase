import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '../../assets/images/sberna-logo.png';
import { useState } from 'react';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-light my-3">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link href="/">
          <a className="navbar-brand">
            <Image src={logo} alt="logo" height="48" width="200" />
          </a>
        </Link>
        <div className={`${collapsed ? 'collapse' : ''} navbar-collapse`} id="navbarTogglerDemo03">
          <div className="navbar-nav ms-auto auto">
            <div className={`nav-item nav-link me-4 ${router.pathname === '/' && 'is-active'}`}>
              <Link href="/">Domů</Link>
            </div>
            <div className={`nav-item nav-link me-4 ${router.pathname === '/cenik' && 'is-active'}`}>
              <Link href="/cenik">Ceník</Link>
            </div>
            <div className={`nav-item nav-link me-4 ${router.pathname === '/kontakty' && 'is-active'}`}>
              <Link href="/kontakty">Kontakty</Link>
            </div>
            {/* <div className={`nav-item nav-link me-4 ${router.pathname === '/o-nas' && 'is-active'}`}>
              <Link href="/o-nas">O nás</Link>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
