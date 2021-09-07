export default function Footer() {
  return (
    <footer className="theme-bg-primary" style={{ marginBottom: '-24px' }}>
      <div className="container text-center p-5">
        <div>Všechna práva vyhrazena © {new Date().getFullYear()} LH Store s.r.o.</div>
        <div>
          <span>Made by </span>
          <a href="https://sevcik.dev" style={{ margin: '0 auto' }}>
            sevcik.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
