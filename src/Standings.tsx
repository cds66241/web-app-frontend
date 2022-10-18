import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const columns: GridColDef[] = [
  { field: 'position', headerName: 'Position', width: 70, type: 'number' },
  { field: 'driverFirstName', headerName: 'First name', width: 130, sortable: false },
  { field: 'driverFamilyName', headerName: 'Last name', width: 130, sortable: false },
  { field: 'points', headerName: 'Points', width: 70, type: 'number' },
  { field: 'wins', headerName: 'Wins', width: 70, type: 'number' },
  { field: 'nationality', headerName: 'Nationality', width: 130, sortable: false },
  { field: 'dateOfBirth', headerName: 'Date of Birth', width: 130, sortable: false },
  { field: 'permanentNumber', headerName: 'Permanent Number', width: 150, type: 'number' },
];

export default function Standings() {
  const [year, setYear] = useState('2021');
  const [standings, setStandings] = useState([]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };


  useEffect(() => {
    fetch(`http://localhost:8080/api/f1/${year}/standings`)
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        const newStandings = res.StandingsLists[0].DriverStandings.map((standing: any)=> {
          return {
            id: standing.position,
            position: standing.position,
            points: standing.points,
            wins: standing.wins,
            driverFirstName: standing.Driver.givenName,
            driverFamilyName: standing.Driver.familyName,
            nationality: standing.Driver.nationality,
            dateOfBirth: standing.Driver.dateOfBirth,
            permanentNumber: standing.Driver.permanentNumber
          }
        })
        setStandings(newStandings);
      })
  }, [year]);

  return (
    <div style={{ height: 500, width: '80%' }}>
        <p>Standings:</p>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            value={year}
            label="Year"
            onChange={handleSelectChange}
          >
            {[...Array(21)].map((x, i) => 
              <MenuItem value={(2000+i+1).toString()}>{2000+i+1}</MenuItem>
            )}
          </Select>
        </FormControl>


      <DataGrid
        rows={standings}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}