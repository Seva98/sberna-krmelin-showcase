import Footer from './footer';
import Meta from './meta';
import Navbar from './navbar';

export default function Layout({ children, className }) {
  return (
    <>
      <Meta />
      <Navbar />
      <div className={className} style={{ minHeight: '100vh' }}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
