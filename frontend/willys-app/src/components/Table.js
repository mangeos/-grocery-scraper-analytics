import React, { memo } from "react";

const Table = ({ data, getFormattedDate }) => {
  // Exempel: Hämta måndagens datum för dagens datum i formatet ÅÅÅÅMMDD
  /* const today = new Date();
     const formattedMondayDate = getFormattedMondayDate(today);
*/

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Protein/krona</th>
            <th>Produkt</th>
            <th>Kcal</th>
            <th>Price</th>
            <th>Href</th>
            <th>Skapad datum</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item, i) => (
              <tr
                style={
                  i % 2 === 0
                    ? { background: "antiquewhite" }
                    : { background: "white" }
                }
                key={i}
              >
                <td>{item.proteinPerKrona}</td>
                <td>{item.product}</td>
                <td>{item.kcal}</td>
                <td>{item.jmfPrice}</td>
                <td>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    Länk till varan
                  </a>
                </td>
                <td>{getFormattedDate(item.createdAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <i
                  className="fa fa-spinner w3-spin"
                  style={{ fontSize: "64px" }}
                >
                  .
                </i>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default memo(Table);
