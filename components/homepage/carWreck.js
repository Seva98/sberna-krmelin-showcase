import Image from 'next/image';

const CarWreck = () => {
  return (
    <div className="card rounded border-0 shadow mb-4 mx-auto" style={{ maxWidth: 'fit-content' }}>
      <div className="row align-items-center p-4">
        <div className="col-md-auto text-center">
          <Image src="/assets/images/carwreck.png" width="100%" height="100%" alt="ikona autorecyklace" />
        </div>
        <div className="col-md-auto">
          <ul className="car-wreck-list">
            <li>
              <b>Zprostředkujeme</b> Vám ekologickou <b>likvidaci autovraků</b>
            </li>
            <li>
              <b>NEPOJÍZDNÉ - HAVAROVANÉ - BEZ STK - DODÁVKY</b>
            </li>
            <li>
              <b>Bonus 1500 - 20 000 Kč</b> za Váš autovrak
            </li>
            <li>
              Doklad o likvidaci a <b>odtah samozřejmostí</b>
            </li>
            <li>
              <b>Volejete</b> denně 7-19 tel. <b>605 577 677</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarWreck;
