import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import Chart from './Chart';

const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'Name', width: 70 },
  { field: 'currency', headerName: 'Currency', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'number',
    width: 90,
  },
  {
    field: 'address',
    headerName: 'Address',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.address || ''} USA`,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataTable() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    console.log('start call')
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(body => setData(body))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className="page-container">
      {/* <div className="metadata-container">
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" component="h5">
            Repositories
          </Typography>
          <Button href="#text-buttons">Python Back-end</Button>
          <Button href="#text-buttons">React Front-end</Button>
          <Button href="#text-buttons" disabled>Angular Front-end</Button>
        </Stack>
      </div> */}
      <Typography variant="h2" component="h2">
        🏅 Olympic Medals & Population
      </Typography>
      <Typography variant="h6" component="h6">Does a larger population mean more medals won?</Typography>

      <div className="chart-container">
        <Chart />
      </div>
      <div className="table-container">
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}