import Container from './container';

export default function Footer() {
  return (
    <footer>
      <Container>
        <div>Všechna práva vyhrazena © {new Date().getFullYear()} LH Store s.r.o.</div>
        <div>
          <span>Made by </span>
          <a href="https://sevcik.dev" style={{ margin: '0 auto' }}>
            sevcik.dev
          </a>
        </div>
      </Container>
    </footer>
  );
}
