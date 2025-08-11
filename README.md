# Cloud Cost Estimator

## Description

Cloud Cost Estimator is a user-friendly web application that helps you estimate cloud resource costs across different regions and services. Select your desired region, service type, resource, and units, add multiple selections, and calculate the total estimated cost instantly.

## Features

- Select cloud region, service type, resource, and units
- Add multiple selections and view them in a summary list
- Remove selections before calculation
- Calculate total estimate for all selections
- Responsive and modern dark-themed UI
- Loading indicator for calculations
- Error handling and validation

## Tech Stack

- **Frontend:** React, CSS
- **Backend:** Spring-boot (API endpoints for regions, services, costs)
- **Styling:** Custom CSS (dark theme, color theory applied)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cloudcost-estimator.git
   cd cloudcost-estimator/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend**
   ```bash
   npm start
   ```

4. **Start the backend**
   - Ensure your backend server is running at `http://localhost:8080`
   - Endpoints required:
     - `/api/regions`
     - `/api/services`
     - `/api/costs`

## Usage

1. Select your cloud region, service type, resource, and units.
2. Click **Add** to add the selection to your list.
3. Repeat for multiple selections.
4. Click **Calculate Estimate** to view the total cost.
5. Remove selections as needed.
6. Use the **Reset** button to clear all selections and start over.

## Author

[Abhinav Krishna V](https://github.com/abhinavsedai)