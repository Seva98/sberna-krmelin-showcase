import Link from 'next/link';
const BottomMenu = () => {
  return (
    <ul>
      <li>
        <Link href="/">Domů</Link>
      </li>
      <li>
        <Link href="/cenik">Ceník</Link>
      </li>
      <li>
        <Link href="/kontakt">Kontakty</Link>
      </li>
      <li>
        <Link href="/o-nas">O nás</Link>
      </li>
    </ul>
  );
};

export default BottomMenu;
