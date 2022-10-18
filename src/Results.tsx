import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as _ from 'lodash';

const columns: GridColDef[] = [
  { field: 'position', headerName: 'Position', width: 70, type: 'number' },
  { field: 'driverFirstName', headerName: 'First name', width: 130, sortable: false },
  { field: 'driverFamilyName', headerName: 'Last name', width: 130, sortable: false },
  { field: 'points', headerName: 'Points', width: 70, type: 'number' },
  { field: 'nationality', headerName: 'Nationality', width: 130, sortable: false },
  { field: 'dateOfBirth', headerName: 'Date of Birth', width: 130, sortable: false },
  { field: 'permanentNumber', headerName: 'Permanent Number', width: 70, type: 'number' },
  { field: 'time', headerName: 'Time (ms)', width: 130, type: 'number' },
  { field: 'fastestLap', headerName: 'Fastest Lap', width: 130 },
  { field: 'averageSpeed', headerName: 'Average Speed (kph)', width: 130 },
];

const defaultValue = 'N/A';

export default function Results() {
  const [year, setYear] = useState('2021');
  const [round, setRound] = useState('1');
  const [results, setResults] = useState([]);

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleRoundChange = (event: SelectChangeEvent) => {
    setRound(event.target.value);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/f1/${year}/${round}/results`)
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .then((res: any) => {
        console.log(res)
        if (res == null) {
          setResults([]);
        } else {
          const race = res.Races[0];
          if (race) {
            const newResults = res.Races[0].Results.map((result: any)=> {
              console.log(result);
              return {
                id: _.get(result, 'position', defaultValue),
                position: _.get(result, 'position', defaultValue),
                points: _.get(result, 'points', defaultValue),
                driverFirstName: _.get(result, 'Driver.givenName', defaultValue),
                driverFamilyName: _.get(result, 'Driver.familyName', defaultValue),
                nationality: _.get(result, 'Driver.nationality', defaultValue),
                dateOfBirth: _.get(result, 'Driver.dateOfBirth', defaultValue),
                permanentNumber: _.get(result, 'Driver.permanentNumber', defaultValue),
                time: _.get(result, 'Time.millis', defaultValue),
                fastestLap: _.get(result, 'FastestLap.Time.time', defaultValue),
                averageSpeed: _.get(result, 'FastestLap.AverageSpeed.speed', defaultValue)
              }
            });
            setResults(newResults);
          } else {
            setResults([]);
          }
        }
      })
  }, [year, round]);

  return (
    <div style={{ height: 500, width: '80%' }}>
        <p>Results:</p>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            value={year}
            label="Year"
            onChange={handleYearChange}
          >
            {[...Array(21)].map((x, i) => 
              <MenuItem value={(2000+i+1).toString()}>{2000+i+1}</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label">Round</InputLabel>
          <Select
            value={round}
            label="Round"
            onChange={handleRoundChange}
          >
            {[...Array(22)].map((x, i) => 
              <MenuItem value={i+1}>{i+1}</MenuItem>
            )}
          </Select>
        </FormControl>

      <DataGrid
        rows={results}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}