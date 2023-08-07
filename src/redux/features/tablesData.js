const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  thead: {
    users: [
      { label: 'ID', key: 'id' },
      { label: 'Full Name', key: 'full_name' },
      { label: 'Email', key: 'email' },
      { label: 'Mobile Number', key: 'mobile_number' },
      { label: 'Gender', key: 'gender' },
      { label: 'Birth date', key: 'date_of_birth' },
      { label: 'Role', key: 'role' }
    ],
    drivers: [
      { label: 'ID', key: 'id' },
      { label: 'Full Name', key: 'full_name' },
      { label: 'Email', key: 'email' },
      { label: 'Mobile Number', key: 'mobile_number' },
      { label: 'Gender', key: 'gender' },
      { label: 'Birth date', key: 'date_of_birth' },
      { label: 'Role', key: 'role' }
    ],
    rides: [
      { label: 'Start location', key: 'start_point_name' },
      { label: 'End location', key: 'end_point_name' },
      { label: 'Est. Distance', key: 'estimated_distance' },
      { label: 'Est. Duration', key: 'estimated_duration' },
      { label: 'Est. Price', key: 'estimated_price' },
      { label: 'Request time', key: 'requested_at' },
      { label: 'Start time', key: 'start_time' },
      { label: 'Trip status', key: 'trip_status' }
    ],
    cars: [
      { label: 'ID', key: 'id' },
      { label: 'Plate Number', key: 'plate_number' },
      { label: 'Color', key: 'color' },
      { label: 'Charge', key: 'charge' },
      { label: 'Odometer', key: 'odometer' },
      { label: 'Curren Location', key: 'current_location' },
      { label: 'Driver', key: 'driver', viewModal: true },
      { label: 'Ride', key: 'ride', viewModal: true }
    ],
    general: [
      { label: 'name', key: 'name' },
      { label: 'code', key: 'code' },
      { label: 'population', key: 'population' },
      { label: 'size', key: 'size' },
      { label: 'density', key: 'density' }
    ],
    contacts: [
      { label: 'ID', key: 'id' },
      {label: 'Date Sent', key: 'created_at'},
      { label: 'Full Name', key: 'name' },
      { label: 'Email or Phone', key: 'email_or_phone' },
      { label: 'Message', key: 'message' },
      { label: 'Status', key: 'status' }
    ]
  },
  tbody: {
    general: [
      { name: 'New York City', code: 'NYC', population: 8537673, size: 468.9, density: 18228 },
      { name: 'Tokyo', code: 'TKY', population: 37393129, size: 2190, density: 17049 },
      { name: 'London', code: 'LON', population: 8908081, size: 1572, density: 5669 },
      { name: 'Paris', code: 'PRS', population: 2140526, size: 105.4, density: 20306 },
      { name: 'Beijing', code: 'BJG', population: 21707000, size: 16410.54, density: 1321 },
      { name: 'Sydney', code: 'SYD', population: 5312163, size: 1237.14, density: 4294 },
      { name: 'Cairo', code: 'CAI', population: 20095902, size: 3085, density: 6517 },
      { name: 'Rio de Janeiro', code: 'RJR', population: 6718903, size: 1263.12, density: 5315 },
      { name: 'Moscow', code: 'MOS', population: 12615279, size: 2511, density: 5028 },
      { name: 'Dubai', code: 'DBI', population: 3137000, size: 4114, density: 763 },
      { name: 'Mumbai', code: 'MUM', population: 18414288, size: 603.4, density: 30509 },
      { name: 'Toronto', code: 'TOR', population: 2731571, size: 630.2, density: 4331 },
      { name: 'São Paulo', code: 'SAO', population: 12176866, size: 1521, density: 8005 },
      { name: 'Berlin', code: 'BER', population: 3769495, size: 891.7, density: 4228 },
      { name: 'Delhi', code: 'DEL', population: 317797, size: 42.7, density: 7448 },
      { name: 'Istanbul', code: 'IST', population: 15462435, size: 5343, density: 2894 },
      { name: 'Mexico City', code: 'MEX', population: 8874724, size: 1485, density: 5985 },
      { name: 'Seoul', code: 'SEL', population: 9776000, size: 605.2, density: 16153 },
      { name: 'Lagos', code: 'LGS', population: 21000000, size: 1171.28, density: 17917 },
      { name: 'Bangkok', code: 'BKK', population: 8280925, size: 1569, density: 5279 }
    ]
  }
}

const tables = createSlice({
  name: 'tables',
  initialState,
  reducers: {}
})

export default tables.reducer
