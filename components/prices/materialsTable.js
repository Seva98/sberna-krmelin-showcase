import { useState } from 'react';
import Image from 'next/image';
import img from '../../assets/images/review-1.png';

const MaterialsTable = ({ categories, materials, activeMainCategory }) => {
  const [activeMaterial, setActiveMaterial] = useState('');

  const getChange = ({ prices }) => {
    if (prices.length <= 1) return;

    const prevPrice = Number(prices[prices.length - 2].price);
    const newPrice = Number(prices[prices.length - 1].price);
    return ((100 * (newPrice - prevPrice)) / prevPrice).toFixed(2);
  };

  return (
    <>
      {categories &&
        categories
          .filter((c) => c.mainCategory === activeMainCategory)
          .sort((a, b) => a.order - b.order)
          .map(({ name: catName, _id: catId }) => (
            <div key={catId + catName} className="my-2">
              <div className="h4">{catName}</div>
              <table className="table table-striped price-list">
                <thead>
                  <tr>
                    <th className="col-4">Název</th>
                    <th className="col-4">Popis</th>
                    <th className="col-2">Cena</th>
                    <th className="col-2">Rozdíl</th>
                  </tr>
                </thead>
                <tbody>
                  {materials &&
                    materials
                      .filter(({ category }) => category === catId)
                      .sort((a, b) => a.order - b.order)
                      .map((material) => (
                        <tr key={material.name} onClick={() => setActiveMaterial(activeMaterial === material.name ? '' : material.name)}>
                          <th>
                            <div style={{ height: `${activeMaterial === material.name ? '196px' : '32px'}`, display: 'flex', alignItems: 'center' }}>
                              {material.img && (
                                <Image src={material.img} width={activeMaterial === material.name ? '196' : '32'} height={activeMaterial === material.name ? '196' : '32'} alt={material.name} />
                              )}
                              <div className="ms-3">{material.name}</div>
                            </div>
                          </th>
                          <td>{material.description}</td>
                          <td>{`${material.prices[material.prices.length - 1].price} ${material.unit}`}</td>
                          <td className={getChange(material) > 0 ? 'text-success' : 'text-danger'}>{getChange(material) ? `${getChange(material)}%` : ''}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          ))}
    </>
  );
};

export default MaterialsTable;
