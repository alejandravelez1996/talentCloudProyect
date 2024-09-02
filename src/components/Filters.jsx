import { useEffect, useState } from 'react';
import axios from 'axios';

const Filters = ({ onCompanyChange }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const url = 'https://66d473ff5b34bcb9ab3ea3ac.mockapi.io/api/talentoCloud/datos';
    axios.get(url)
      .then(res => {
        const uniqueCompanies = [...new Set(res.data.map(user => user.empresa))];
        setCompanies(uniqueCompanies);
      })
      .catch(err => console.log('Error fetching data:', err));
  }, []);

  return (
    <div className="filters">
      <label htmlFor="company">Filter by Company: </label>
      <select className = "filtersAll" id="company" onChange={(e) => onCompanyChange(e.target.value)}>
        <option className='Aline' value="All">All</option>
        {companies.map(company => (
          <option key={company} value={company}>{company}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;



