  import { useState, useEffect } from 'react';

  function CommissionTable() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/commission-data");
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    }, []);

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Marketing</th>
            <th>Bulan</th>
            <th>Omset</th>
            <th>Komisi%</th>
            <th>Komisi Nominal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((commission,index) => (
            <tr key={index}>
              <td>{commission.MarketingName}</td>
              <td>{commission.Month}</td>
              <td>{commission.revenue}</td>
              <td>{commission.commissionRate}%</td>
              <td>{commission.commission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  export default CommissionTable;
