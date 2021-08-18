import Footer from './footer';
import Meta from './meta';
import Navbar from './navbar';

export default function Layout({ children, className }) {
  return (
    <>
      <Meta />
      <Navbar />
      <div className={className}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
