import React, { memo } from "react";

const Table = ({ data }) => {
  function getFormattedDate(date) {
    const myDate = new Date("2023-11-01T18:08:15.000Z");
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, "0"); // Lägger till nollor om månaden är en siffra
    const day = String(myDate.getDate()).padStart(2, "0"); // Lägger till nollor om dagen är en siffra

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  // Exempel: Hämta måndagens datum för dagens datum i formatet ÅÅÅÅMMDD
  /* const today = new Date();
     const formattedMondayDate = getFormattedMondayDate(today);
*/

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Protein/krona</th>
          <th>Produkt</th>
          <th>href</th>
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
              <td>
                <a href={item.href}>Länk till varan</a>
              </td>
              <td>{getFormattedDate(item.createdAt)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>Data saknas</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default memo(Table);
