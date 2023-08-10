import Select from 'react-select';

const selectOptions = [
    { value: 'COMPUTE', label: 'COMPUTE' },
    { value: 'IAM', label: 'IAM' },
    { value: 'NETWORK', label: 'NETWORK' },
    { value: 'STORAGE', label: 'STORAGE' }
]

interface AssetFilterProps {
    setSelectedStateHandler: Function
}


const AssetFilterSelect = (props: AssetFilterProps) => {

    const handleCustomSelectUpdate = (currSelected) => {
        // update state with new asset types
        const selectedStrings = (currSelected.map(curr => curr.value));
        props.setSelectedStateHandler(selectedStrings);
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
                onChange={handleCustomSelectUpdate}
            />
        </div>
    );
}

export { AssetFilterSelect }