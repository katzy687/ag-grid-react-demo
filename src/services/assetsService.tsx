interface Tag {
  key: string;
  value: string;
}

export interface AssetRow {
  id: string;
  created: string;
  criticalityFactor: number;
  isCrownJewel: boolean;
  crownJewelIndicator: string;
  assetType: string;
  env: string;
  assetName: string;
  ownerName: string;
  tags: string;
}

function formatTags(tags: Tag[]): string {
  const tagStrings = tags.map(tag => `${tag.key}=${tag.value}`);
  return tagStrings.join();
}

export function formatDate(date: string): string {
  // '2022-06-30T12:14:19.299Z' --> '2022-06-30 12:14:19'
  const isoDate = new Date(date).toISOString();
  const splitDate = isoDate.split("T");
  const calendarDate = splitDate[0];
  const formattedTime = splitDate[1].split(".")[0];
  return `${calendarDate} ${formattedTime}`
}


async function getAssetRows(): Promise<AssetRow[]> {
  return fetch('./assets.json').then(response => {
    return response.json();
  }).then(data => {
    const assetRows: AssetRow[] = []
    for (let currObj of data) {
      const currRow: AssetRow = {
        id: currObj._id,
        isCrownJewel: currObj.enrich.isCrownJewel,
        crownJewelIndicator: currObj.enrich.crownJewelIndicator,
        created: formatDate(currObj.created),
        criticalityFactor: currObj.criticalityFactor,
        assetType: currObj.enrich.assetType,
        env: currObj.enrich.env,
        assetName: currObj.name,
        ownerName: currObj.owner.name,
        tags: formatTags(currObj.tags)
      }
      assetRows.push(currRow);
    }
    // sort rows by criticallityFactor for default load
    assetRows.sort((a, b) => a.criticalityFactor - b.criticalityFactor);
    return assetRows;
  });
}

export { getAssetRows as getAssets };