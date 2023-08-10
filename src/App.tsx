import './App.css'
import DataTable from './components/table';
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
      <h1>API Grid</h1>
      <DataTable assetRows={rowData} />
    </>
  )
}

export default App
