import { useRef, useState, useEffect, useCallback } from "react";
import { AssetRow } from "../services/assetsService";
import CrownJewelRenderer from "./crownJewelRenderer";
import { AssetFilterSelect } from "./assetTypeFilter";


import { AgGridReact } from 'ag-grid-react';
import { GridApi } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


// Custom Date Filter Params
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
        headerName: "Asset Name",
        field: "assetName",
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        filterParams: {
            filterOptions: ['contains'],
            debounceMs: 200
        },
    },
    {
        headerName: "Creation Date",
        field: "created",
        filter: 'agDateColumnFilter',
        filterParams: dateFilterParams,
        floatingFilter: true
    },
    {
        headerName: "Is Crown Jewel",
        field: "isCrownJewel",
        editable: true,
        width: 150,
        cellRenderer: CrownJewelRenderer,
        cellEditor: 'agSelectCellEditor',
        cellEditorPopup: false,
        cellEditorParams: {
            values: [true, false],
            cellRenderer: CrownJewelRenderer,
            cellEditorPopup: false,
        },
        cellStyle: { userSelect: 'none' }
    },
    {
        headerName: "Asset Type",
        field: "assetType",
        width: 150,
    },
    {
        headerName: "Criticality",
        field: "criticalityFactor",
        sortable: true,
        width: 100
    },
    {
        headerName: "Env",
        field: "env",
        width: 100
    },
    {
        headerName: "Owner Name",
        field: "ownerName",
        width: 150
    },
    {
        headerName: "id",
        field: "id",
        width: 300
    },
    {
        headerName: "Tags",
        field: "tags",
        width: 800,
        cellStyle: { textAlign: 'left' }
    }
]


interface DataTableProps {
    assetRows: AssetRow[]
}

const DataTable = (props: DataTableProps) => {

    const [columnDefs] = useState(agGridColumnnDefs);
    const gridRef = useRef();

    const [gridApi, setGridApi]: [GridApi, Function] = useState(null);


    const [externalSelected, setExternalSelected] = useState([])

    // Asset Type External Filter Callbacks
    const isExternalFilterPresent = useCallback(() => {
        // if no options are selected, turn the filtering off and show everything
        return externalSelected.length > 0;
    }, [externalSelected]);

    const doesExternalFilterPass = useCallback(
        // if current node asset type matches one of the selected options, it passes
        (node) => {
            if (node.data) {
                for (let currSelect of externalSelected) {
                    if (node.data.assetType == currSelect) {
                        return true;
                    }
                }
                return false;
            }
        },
        [externalSelected]
    );

    // Update grid api filters when state changes - if condition to wait for mounted grid
    useEffect(() => {
        if (gridApi) {
            gridApi.onFilterChanged();
        }
    }, [externalSelected]);


    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: 1200 }}>
            <AssetFilterSelect setSelectedStateHandler={setExternalSelected} />
            <AgGridReact
                gridOptions={gridOptions}
                rowData={props.assetRows}
                //@ts-ignore
                columnDefs={columnDefs} 
                animateRows={true}
                ref={gridRef}
                onGridReady={(params) => setGridApi(params.api)}
                isExternalFilterPresent={isExternalFilterPresent}
                doesExternalFilterPass={doesExternalFilterPass}
            >
            </AgGridReact>
        </div>
    );
};

export default DataTable;
