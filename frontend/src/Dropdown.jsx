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
        const data = await response.json();
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
    return (
      <div className="dropdown-container loading">
        <div className="loader"></div>
        <span>Loading regions...</span>
      </div>
    );
  }

  return (
    <div className="dropdown-container elegant">
      <h2 className="title">Cloud Cost Estimator</h2>
      <div className="dropdown-group">
        <label htmlFor="service-type" className="dropdown-label">Service Type</label>
        <select 
          id="service-type" 
          className="drop_down"
          value={selectedServicetype} 
          onChange={handleServicetypeChange}
        >
          <option value="" disabled>Service</option>
          {servicestype.map((service) => (
            <option key={service.id} value={service.serviceType}>
              {service.serviceType}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown-group">
        <label htmlFor="service-select" className="dropdown-label">Resource</label>
        <select 
          id="service-select" 
          className="drop_down"
          value={selectedService} 
          onChange={handleServiceChange}
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
      </div>

      <div className="dropdown-group">
        <label htmlFor="region-select" className="dropdown-label">Region</label>
        <select 
          id="region-select" 
          className="drop_down"
          value={selectedRegion} 
          onChange={handleRegionChange}
        >
          <option value="" disabled >Region</option>
          {regions.map((region) => (
            <option key={region.id} value={region.regionName}>
              {region.regionName}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown-group">
        <label className="dropdown-label">Units</label>
        <input
          name="myInput"
          className="my-input"
          placeholder="No of units"
          value={units}
          onChange={handleUnitsChange}
          type="number"
          min="1"
        />
      </div>

      <button className="calculate-btn" onClick={handleCalculate}>
        <span>Calculate</span>
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {total !== null && (
        <div className="result-card">
          <div className="result-row">
            <span className="result-label">Cost per Unit:</span>
            <span className="result-value">${cost}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Cost:</span>
            <span className="result-value">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;