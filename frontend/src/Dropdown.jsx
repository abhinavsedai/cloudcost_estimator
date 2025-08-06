import { useState, useEffect } from 'react';
import './Dropdown.css'; 

const Dropdown = () => {
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('');

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');

    const [servicestype, setServicestype] = useState([]);
  const [selectedServicetype, setSelectedServicetype] = useState('');

  const [units, setUnits] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/regions');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRegions(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/services');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  // useEffect(() => {
  //   const fetchServicestype = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/services');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setServicestype(data);
  //     } catch (e) {
  //       setError(e.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchServicestype();
  // }, []);
  useEffect(() => {
   
    const hardcodedServices = [
      { id: 1, serviceType: "compute" },
      { id: 2, serviceType: "storage" },
      { id: 3, serviceType: "database" },
    ];

    setServicestype(hardcodedServices);
    setIsLoading(false);
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
    const handleServicetypeChange = (event) => {
    setSelectedServicetype(event.target.value);
  };
  if (isLoading) {
    return <div>Loading regions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dropdown-container">
      <label htmlFor="service-type">Choose a Service:</label>
      <select 
        id="service-type" 
        className="drop_down"
        value={selectedServicetype} 
        onChange={handleServicetypeChange}
        style={{
    color: selectedRegion ? '#000' : '#888' 
  }}
      >
        <option value="" disabled>Service</option>
        {servicestype.map((service) => (
          <option key={service.id} value={service.serviceType}>
            {service.serviceType}
          </option>
        ))}
      </select>

      {/* {selectedServicetype && <p style={{ marginTop: '10px' }}>You selected: <strong>{selectedServicetype}</strong></p>} */}

      <label htmlFor="service-select">Choose a resource:</label>
      <select 
        id="service-select" 
        className="drop_down"
        value={selectedService} 
        onChange={handleServiceChange}
        style={{
    color: selectedRegion ? '#000' : '#888' 
  }}
      >
        {/* <option value="" disabled>Resource</option>
        {services.map((service) => (
          <option key={service.id} value={service.resourceType}>
            {service.resourceType}
          </option>
        ))} */}
        <option value="" disabled>Resource</option>
{services
  .filter(service => service.serviceType === selectedServicetype)
  .map(filteredService => (
    <option key={filteredService.id} value={filteredService.resourceType}>
      {filteredService.resourceType}
    </option>
))}
      </select>

      {/* {selectedService && <p style={{ marginTop: '10px' }}>You selected: <strong>{selectedService}</strong></p>} */}

      <label htmlFor="region-select">Choose a Region:</label>
      <select 
        id="region-select" 
        className="drop_down"
        value={selectedRegion} 
        onChange={handleRegionChange}
        style={{
    color: selectedRegion ? '#000' : '#888' 
  }}
        
      >
        <option value="" disabled >Region</option>
        {regions.map((region) => (
          <option key={region.id} value={region.regionName}>
            {region.regionName}
          </option>
        ))}
      </select>

      {/* {selectedRegion && <p style={{ marginTop: '10px' }}>You selected: <strong>{selectedRegion}</strong></p>} */}
      <label>
        Enter number of units: 
        </label>
        <input name="myInput" className="my-input" placeholder="No of units" value={units}
  onChange={(e) => setUnits(Number(e.target.value))}
 />
      
    </div>
  );
};

export default Dropdown;