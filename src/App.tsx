import './App.css'
import { DataTable } from './components/table';
import { useState, useEffect } from "react";
import { getAssetRows } from './services/assetsService';
import { envConfig } from './config';


function App() {

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Fetch all data from the API
    getAssetRows(envConfig.dataUrl).then((response) => {
      setRowData(response);
    })

  }, []);

  return (
    <>
      <h2><a href="https://www.ag-grid.com/react-data-grid/">AG-Grid-React Demo</a></h2>
      <DataTable assetRows={rowData} />
    </>
  )
}

export default App
