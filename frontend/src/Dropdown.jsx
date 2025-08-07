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

  const [units, setUnits] = useState("");
  const [cost, setCost] = useState(null);
  const [total, setTotal] = useState(null);

  // New state for multiple selections
  const [selections, setSelections] = useState([]);
  const [estimate, setEstimate] = useState(null);

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

  // Add selection to the list
  const handleAddSelection = () => {
    if (selectedRegionId && selectedServicetypeId && units) {
      setSelections([
        ...selections,
        {
          regionId: selectedRegionId,
          regionName: selectedRegion,
          serviceId: selectedServicetypeId,
          serviceType: selectedServicetype,
          resourceType: selectedService,
          units: Number(units)
        }
      ]);
      // Reset fields for next selection
      setSelectedRegion('');
      setselectedRegionId(null);
      setSelectedServicetype('');
      setSelectedServicetypeId(null);
      setSelectedService('');
      setUnits('');
      setError(null);
    } else {
      setError("Please select region, service, and enter units.");
    }
  };

  // Remove a selection
  const handleRemoveSelection = (idx) => {
    setSelections(selections.filter((_, i) => i !== idx));
  };

  // Calculate total estimate for all selections
  const handleCalculateEstimate = async () => {
    if (selections.length === 0) {
      setError("Add at least one selection.");
      setEstimate(null);
      return;
    }
    let totalEstimate = 0;
    let details = [];
    try {
      const response = await fetch('http://localhost:8080/api/costs');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const costData = await response.json();
      selections.forEach(sel => {
        const costObj = costData.find(
          item =>
            item.region.id === sel.regionId &&
            item.service.id === sel.serviceId
        );
        if (costObj && typeof costObj.costPerUnit !== 'undefined') {
          const cost = Number(costObj.costPerUnit) * sel.units;
          totalEstimate += cost;
          details.push({
            ...sel,
            costPerUnit: costObj.costPerUnit,
            total: cost
          });
        } else {
          details.push({
            ...sel,
            costPerUnit: null,
            total: null
          });
        }
      });
      setEstimate({ total: totalEstimate, details });
      setError(null);
    } catch (e) {
      setError(e.message);
      setEstimate(null);
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
    <div className="dropdown-container elegant" style={{display: 'flex', gap: '32px'}}>
      <div style={{flex: 1}}>
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

        <button className="calculate-btn" type="button" onClick={handleAddSelection} style={{marginBottom: '12px'}}>
          <span>Add</span>
        </button>

        <button className="calculate-btn" type="button" onClick={handleCalculateEstimate}>
          <span>Calculate Estimate</span>
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>

      <div style={{flex: 1, minWidth: '260px'}}>
        <h3 style={{color:'#1976d2', marginBottom:'18px'}}>Selections</h3>
        {selections.length === 0 && <div style={{color:'#90caf9'}}>No selections added.</div>}
        <ul style={{listStyle:'none', padding:0}}>
          {selections.map((sel, idx) => (
            <li key={idx} style={{
              background:'#23283b',
              border:'1px solid #90caf9',
              borderRadius:'8px',
              marginBottom:'12px',
              padding:'12px 14px',
              position:'relative'
            }}>
              <button
                style={{
                  position:'absolute',
                  top:'8px',
                  right:'10px',
                  background:'none',
                  border:'none',
                  color:'#d32f2f',
                  fontWeight:'bold',
                  fontSize:'1.1rem',
                  cursor:'pointer'
                }}
                onClick={() => handleRemoveSelection(idx)}
                title="Remove"
              >×</button>
              <div><strong>Region:</strong> {sel.regionName}</div>
              <div><strong>Service:</strong> {sel.serviceType}</div>
              <div><strong>Resource:</strong> {sel.resourceType}</div>
              <div><strong>Units:</strong> {sel.units}</div>
            </li>
          ))}
        </ul>

        {estimate && (
          <div className="result-card">
            <div style={{marginBottom:'12px', fontWeight:'bold', color:'#1976d2'}}>Estimate Details</div>
            {estimate.details.map((det, i) => (
              <div key={i} className="result-row" style={{marginBottom:'8px'}}>
                <span>
                  {det.regionName} / {det.serviceType} / {det.resourceType} ({det.units} units)
                </span>
                <span>
                  {det.costPerUnit !== null
                    ? `$${det.costPerUnit} x ${det.units} = $${det.total.toFixed(2)}`
                    : <span style={{color:'#d32f2f'}}>No cost</span>
                  }
                </span>
              </div>
            ))}
            <div className="result-row" style={{borderTop:'1px solid #90caf9', paddingTop:'8px', marginTop:'10px'}}>
              <span className="result-label">Total Estimate:</span>
              <span className="result-value">${estimate.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;