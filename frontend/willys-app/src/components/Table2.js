import React, { memo } from "react";
import { Link  } from "react-router-dom";
import PropTypes from 'prop-types'

const Table2 = ({ data }) => {
 
  return (
      <table className="table">
        <thead>
          <tr>
            <th>Produkt</th>
          </tr>
        </thead>
          <tbody>
          {data?.map((info) => (
            <tr key={info.id}>
              <td>
                <Link to={`/product/${info.product}`}>
                  {info.product}
                </Link>
              </td>
            </tr>
          ))}
          {!data && <tr><td>Inga data tillgängliga</td></tr>}
        </tbody>
      </table>
  );
};

Table2.propTypes = {
  data: PropTypes.array
}

export default memo(Table2);
