// import { useState, useEffect } from 'react';
// import './Dropdown.css'; 

// const Dropdown = () => {
//   const [regions, setRegions] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedRegion, setSelectedRegion] = useState('');

//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState('');

//   const [servicestype, setServicestype] = useState([]);
//   const [selectedServicetype, setSelectedServicetype] = useState('');
//   const [selectedServicetypeId, setSelectedServicetypeId] = useState(null);
//   const [selectedRegionId, setselectedRegionId] = useState(null);

//   const [cost, setCost] = useState(null);

//   const [units, setUnits] = useState("");

//   useEffect(() => {
//   const fetchCost = async () => {
//     if (selectedRegionId && selectedServicetypeId) {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/costs?regionId=${selectedRegionId}&serviceId=${selectedServicetypeId}`
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCost(data); 
//       } catch (e) {
//         console.error("Failed to fetch cost:", e);
//         setCost(null);
//       }
//     }
//   };

//   fetchCost();
// }, [selectedRegionId, selectedServicetypeId]);

//   useEffect(() => {
//     const fetchRegions = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/regions');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setRegions(data);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchRegions();
//   }, []);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/services');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setServices(data);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   useEffect(() => {
   
//     const hardcodedServices = [
//       { id: 1, serviceType: "compute" },
//       { id: 2, serviceType: "storage" },
//       { id: 3, serviceType: "database" },
//     ];

//     setServicestype(hardcodedServices);
//     setIsLoading(false);
//   }, []);

//   // const handleRegionChange = (event) => {
//   //   setSelectedRegion(event.target.value);
//   // };
//     const handleRegionChange = (event) => {
//       const selectedValue = event.target.value;
//     setSelectedRegion(selectedValue);
//     const selectedServiceObj = regions.find(
//     (service) => service.regionName === selectedValue);

//     if (selectedServiceObj) {
//     setselectedRegionId(selectedServiceObj.id); 
//   } else {
//     setselectedRegionId(null); 
//   }

//   };
//   const handleServiceChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedService(selectedValue);

//     const selectedServiceObj = services.find(
//     (service) => service.resourceType === selectedValue);

//     if (selectedServiceObj) {
//     setSelectedServicetypeId(selectedServiceObj.id); 
//   } else {
//     setSelectedServicetypeId(null); 
//   }
//   };
//  const handleServicetypeChange = (event) => {
//     setSelectedServicetype(event.target.value);
    
//   };

//   if (isLoading) {
//     return <div>Loading regions...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="dropdown-container">
//       <label htmlFor="service-type">Choose a Service:</label>
//       <select 
//         id="service-type" 
//         className="drop_down"
//         value={selectedServicetype} 
//         onChange={handleServicetypeChange}
//         style={{
//     color: selectedRegion ? '#000' : '#888' 
//   }}
//       >
//         <option value="" disabled>Service</option>
//         {servicestype.map((service) => (
//           <option key={service.id} value={service.serviceType}>
//             {service.serviceType}
//           </option>
//         ))}
//       </select>

//       <label htmlFor="service-select">Choose a resource:</label>
//       <select 
//         id="service-select" 
//         className="drop_down"
//         value={selectedService} 
//         onChange={handleServiceChange}
//         style={{
//     color: selectedRegion ? '#000' : '#888' 
//   }}
  
//       >

//         <option value="" disabled>Resource</option>
// {services
//   .filter(service => service.serviceType === selectedServicetype)
//   .map(filteredService => (
//     <option key={filteredService.id} value={filteredService.resourceType}>
//       {filteredService.resourceType}
//     </option>
// ))}
//       </select>

//       <label htmlFor="region-select">Choose a Region:</label>
//       <select 
//         id="region-select" 
//         className="drop_down"
//         value={selectedRegion} 
//         onChange={handleRegionChange}
//         style={{
//     color: selectedRegion ? '#000' : '#888' 
//   }}
        
//       >
        
//         <option value="" disabled >Region</option>
//         {regions.map((region) => (
//           <option key={region.id} value={region.regionName}>
//             {region.regionName}
//           </option>
//         ))}
//       </select>
//      {/* {cost && (
//   // <div>
//   //   <p>Cost per Unit: {cost}</p>
//   //   <p>Region: {selectedRegionId}</p>
//   //   <p>Service: {selectedServicetypeId}</p>
//   // </div>
// )} */}

//       <label>
//         Enter number of units: 
//         </label>
//         <input name="myInput" className="my-input" placeholder="No of units" value={units}
//   onChange={(e) => setUnits(Number(e.target.value))}
//  />
      
//     </div>
//   );
// };

// export default Dropdown;
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
  const [selectedServicetypeId, setSelectedServicetypeId] = useState(null);
  const [selectedRegionId, setselectedRegionId] = useState(null);

  const [cost, setCost] = useState(null);
  const [units, setUnits] = useState("");
  const [total, setTotal] = useState(null);

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
    const selectedValue = event.target.value;
    setSelectedRegion(selectedValue);
    const selectedServiceObj = regions.find(
      (service) => service.regionName === selectedValue
    );
    if (selectedServiceObj) {
      setselectedRegionId(selectedServiceObj.id); 
    } else {
      setselectedRegionId(null); 
    }
  };

  const handleServiceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedService(selectedValue);
    const selectedServiceObj = services.find(
      (service) => service.resourceType === selectedValue
    );
    if (selectedServiceObj) {
      setSelectedServicetypeId(selectedServiceObj.id); 
    } else {
      setSelectedServicetypeId(null); 
    }
  };

  const handleServicetypeChange = (event) => {
    setSelectedServicetype(event.target.value);
  };

  const handleUnitsChange = (e) => {
    setUnits(e.target.value.replace(/[^0-9.]/g, ''));
  };

  const handleCalculate = async () => {
    if (selectedRegionId && selectedServicetypeId && units) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/costs?regionId=${selectedRegionId}&serviceId=${selectedServicetypeId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // data is an array!
        console.log('API cost response:', data);

        // Find the matching cost object
        const costObj = data.find(
          item =>
            item.region.id === selectedRegionId &&
            item.service.id === selectedServicetypeId
        );

        if (!costObj || typeof costObj.costPerUnit === 'undefined') {
          setError("No cost found for selected region and service.");
          setCost(null);
          setTotal(null);
          return;
        }

        const unitCost = Number(costObj.costPerUnit);
        const unitsNumber = Number(units);

        if (isNaN(unitCost) || isNaN(unitsNumber) || unitsNumber <= 0) {
          setError("Invalid cost or units value.");
          setCost(null);
          setTotal(null);
          return;
        }

        setError(null);
        setCost(unitCost);
        setTotal(unitCost * unitsNumber);
      } catch (e) {
        setError(e.message);
        setCost(null);
        setTotal(null);
      }
    } else {
      setError("Please select region, service, and enter units.");
      setCost(null);
      setTotal(null);
    }
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
        <option value="" disabled>Resource</option>
        {services
          .filter(service => service.serviceType === selectedServicetype)
          .map(filteredService => (
            <option key={filteredService.id} value={filteredService.resourceType}>
              {filteredService.resourceType}
            </option>
          ))}
      </select>

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

      <label>
        Enter number of units: 
      </label>
      <input
        name="myInput"
        className="my-input"
        placeholder="No of units"
        value={units}
        onChange={handleUnitsChange}
        type="number"
        min="1"
      />

      <button className="calculate-btn" onClick={handleCalculate} style={{marginTop: '16px'}}>
        Calculate
      </button>

      {total !== null && (
        <div style={{marginTop: '16px'}}>
          {/* <p>Region ID: {selectedRegionId}</p>
          <p>Service ID: {selectedServicetypeId}</p> */}
          <p>Cost per Unit: {cost}</p>
          <p>Total Cost: {total}</p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;