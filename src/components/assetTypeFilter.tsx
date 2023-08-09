import Select from 'react-select';
import { getAssets } from "../services/assetsService";


const selectOptions = [
    { value: 'COMPUTE', label: 'COMPUTE' },
    { value: 'IAM', label: 'IAM' },
    { value: 'NETWORK', label: 'NETWORK' },
    { value: 'STORAGE', label: 'STORAGE' }
]

const AssetFilterSelect = (props) => {

    const handleChange = (currSelected) => {
        // setSelectedOption(selectedOptions);

        // Pull all data again and filter
        getAssets().then((response) => {
            let filteredRows;
            if (!currSelected.length) {
                filteredRows = response;
            } else {
                filteredRows = response.filter((row) => {
                    for (let currOption of currSelected) {
                        if (currOption.value == row.assetType) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            props.setRowHandler(filteredRows);
        });
    };

    return (
        <div style={{ width: 400, paddingBottom: 20 }}>
            <Select
                isMulti
                name="colors"
                options={selectOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Filter by assetTypes"
                onChange={handleChange}
            />
        </div>
    );
}

export { AssetFilterSelect }