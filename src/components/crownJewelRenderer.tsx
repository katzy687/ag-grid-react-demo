import { AssetRow } from "../services/assetsService"

const OVERRIDE = "OVERRIDE"


export default (props) => {
  const rowData: AssetRow = props.data;
  
  // images were renamed to logical file names and hosted in public folder
  let image: string;
  if (!rowData.isCrownJewel) {
    if (rowData.crownJewelIndicator == OVERRIDE) {
      image = "grey";
    }
    else {
      image = "false";
    }
  }
  else {
    if (rowData.crownJewelIndicator == OVERRIDE) {
      image = "red";
    }
    else {
      image = "green";
    }
  }
  const imageSource = `./icons/${image}.png`;
  return (
    <span>
      <img src={imageSource} alt={image} />
    </span>
  );
};