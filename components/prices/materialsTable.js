import { useState, useEffect } from 'react';
import Image from 'next/image';
import CrossIcon from '../icons/crossIcon';

const MaterialsTable = ({ categories, materials, activeMainCategory }) => {
  const [activeMaterial, setActiveMaterial] = useState(null);
  const [modalSize, setModalSize] = useState(0);

  const getChange = ({ prices }) => {
    if (prices.length <= 1) return;

    const prevPrice = Number(prices[prices.length - 2].price);
    const newPrice = Number(prices[prices.length - 1].price);
    return ((100 * (newPrice - prevPrice)) / prevPrice).toFixed(2);
  };

  useEffect(() => {
    const { height, width } = window.screen;
    const side = height > width ? width : height;
    setModalSize(side > 800 ? 800 : side);
  }, []);

  return (
    <>
      {categories &&
        categories
          .filter((c) => c.mainCategory === activeMainCategory)
          .sort((a, b) => a.order - b.order)
          .map(({ name: catName, _id: catId, mainCategory }) => (
            <div key={catId + catName} className="my-2">
              <div className="h4">{catName}</div>
              <table className="table table-striped price-list">
                <thead>
                  <tr>
                    <th className="col-4">Název</th>
                    <th className="col-4">Popis</th>
                    <th className="col-2">Cena</th>
                    {mainCategory !== '6127f29e926ea4af80eff0d3' && <th className="col-2">Rozdíl</th>}
                  </tr>
                </thead>
                <tbody>
                  {materials &&
                    materials
                      .filter(({ category }) => category === catId)
                      .sort((a, b) => a.order - b.order)
                      .map((material) => (
                        <tr key={material.name} onClick={() => setActiveMaterial(activeMaterial === material ? null : material)}>
                          <th>
                            <div style={{ height: '32px', display: 'flex', alignItems: 'center' }}>
                              {material.img && <Image src={material.img} width="32" height="32" alt={material.name} />}
                              <div className="ms-3">{material.name}</div>
                            </div>
                          </th>
                          <td>{material.description}</td>
                          <td>{`${material.prices[material.prices.length - 1].price} ${material.unit}`}</td>
                          {mainCategory !== '6127f29e926ea4af80eff0d3' && (
                            <td className={getChange(material) > 0 ? 'text-success' : 'text-danger'}>{getChange(material) ? `${getChange(material)}%` : ''}</td>
                          )}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          ))}
      {activeMaterial && activeMaterial.img && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.75)' }} onClick={() => setActiveMaterial(null)}>
          <div style={{ position: 'absolute', textAlign: 'right', paddingRight: '10px', width: '100%', color: 'white', fontSize: '24px' }}>
            <CrossIcon />
          </div>
          <div className="row" style={{ height: '100%', alignContent: 'center' }}>
            <div className="col-12 text-center">
              <Image src={activeMaterial.img} width={modalSize} height={modalSize} alt={activeMaterial.name} objectFit="contain" />
            </div>
            <div className="col-12 text-center lead" style={{ color: 'white', fontWeight: '600' }}>
              <div>{activeMaterial.name}</div>
              <div>
                {activeMaterial.prices[activeMaterial.prices.length - 1].price} {activeMaterial.unit}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialsTable;
