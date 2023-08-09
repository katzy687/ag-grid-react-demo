import { AssetRow } from "../services/assetsService"

const OVERRIDE = "OVERRIDE"


export default (props) => {
  const rowData: AssetRow = props.data;
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
      <img src={imageSource} />
      {String(props.value)}
    </span>
  );
};