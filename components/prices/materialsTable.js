import { useState } from 'react';

const MaterialsTable = ({ categories, materials, activeMainCategory }) => {
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
                        <tr key={material.name}>
                          <th>{material.name}</th>
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
