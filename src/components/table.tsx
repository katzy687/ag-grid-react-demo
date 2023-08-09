import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { getAssets } from "../services/assetsService";
import CrownJewelRenderer from "./crownJewelRenderer";
import { AssetFilterSelect } from "./assetTypeFilter";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


// Filter Params
const nameFilterParams = {
    filterOptions: ['contains'],
    debounceMs: 200
};

const dateFilterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
        var dateAsString = cellValue;
        if (dateAsString == null) return -1;
        var cellDate = new Date(dateAsString);
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
            return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
            return 1;
        }
        return 0;
    },
    inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
};

// Main Grid Options
const gridOptions = {
    defaultColDef: {
        resizable: true,
        suppressMovable: true
    }
};

// Grid Column Settings
const agGridColumnnDefs = [
    {
        headerName: "id",
        field: "id",
        width: 100
    },
    {
        headerName: "Asset Name",
        field: "assetName",
        filter: 'agTextColumnFilter',
        filterParams: nameFilterParams,
        floatingFilter: true
    },
    {
        headerName: "Criticality",
        field: "criticalityFactor",
        sortable: true,
        width: 100
    },
    {
        headerName: "Creation Date",
        field: "created",
        filter: 'agDateColumnFilter',
        filterParams: dateFilterParams,
        floatingFilter: true
    },
    {
        headerName: "Type",
        field: "assetType",
        width: 150
    },
    {
        headerName: "Is Crown Jewel",
        field: "isCrownJewel",
        editable: true,
        cellRenderer: CrownJewelRenderer,
        cellEditor: 'agSelectCellEditor',
        cellEditorPopup: false,
        cellEditorParams: {
            values: [true, false],
            cellRenderer: CrownJewelRenderer,
            cellEditorPopup: false,
        },
    },
    {
        headerName: "Env",
        field: "env"
    },
    {
        headerName: "Owner Name",
        field: "ownerName"
    },
    {
        headerName: "Tags",
        field: "tags"
    }
]


const DataTable = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        // Fetch all data from the API
        getAssets().then((response) => {
            setRowData(response);
        })

    }, []);

    const [columnDefs] = useState(agGridColumnnDefs);

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: 1200 }}>
            <AssetFilterSelect setRowHandler={setRowData} />
            <AgGridReact
                gridOptions={gridOptions}
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
};

export default DataTable;
