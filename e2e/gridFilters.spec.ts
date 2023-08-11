import { test, expect } from '@playwright/test';
import { testConfig } from './testConfig';

test('test name filter', async ({ page }) => {
  // fill in text, will have one result
  await page.goto(testConfig.siteUrl);
  await page.getByLabel('Asset Name Filter Input').click();
  await page.getByLabel('Asset Name Filter Input').fill('iamGroup');

  // assert visible
  await expect(page.getByRole('gridcell', { name: 'iamgroup-HR-app PROD' }).first()).toBeVisible();

  // assert not visible
  await expect(page.getByRole('gridcell', { name: 'ampolicy-sharon-PROD' }).first()).not.toBeAttached();
});

test('test date filter', async ({ page }) => {
  // filter for February 2022, should have one result
  await page.goto(testConfig.siteUrl);
  await page.getByRole('gridcell', { name: 'Open Filter Menu', exact: true }).getByLabel('Open Filter Menu').click();
  await page.locator('#ag-42-input').fill('2022-02-01');
  await page.getByLabel('Column Menu').locator('span').first().click();
  await page.getByText('Greater than').click();
  await page.getByLabel('Filtering operator').first().click();
  await page.getByLabel('Column Menu').locator('span').first().click();
  await page.getByLabel('Column Menu').locator('span').nth(1).click();
  await page.getByText('Less than').click();
  await page.locator('#ag-50-input').fill('2022-03-01');

  // assert visible
  await expect(page.getByRole('gridcell', { name: 'iamrole-ella-PROD' }).first()).toBeVisible();

  // assert not visible
  await expect(page.getByRole('gridcell', { name: 'tf-lambda_Pricing DEV' }).first()).not.toBeAttached();

});

test('test assetType filter', async ({ page }) => {
  // select Compute
  await page.goto(testConfig.siteUrl);

  // click on filter and select COMPUTE
  await page.locator('.select__input-container').click();
  await page.locator('#react-select-3-input').press('Enter');

  // click on filter and select IAM
  await page.locator('.select__input-container').click();
  await page.locator('#react-select-3-input').press('Enter');

  // assert visible COMPUTE and IAM
  await expect(page.getByRole('gridcell', { name: 'tf-lambda_Pricing DEV' }).first()).toBeVisible();

  // this has hidden element - workaround that error of multiple results
  await expect(page.getByRole('gridcell', { name: 'iamrole-ella-PROD' }).first()).toBeVisible();
  
  // assert not visible NETWORK type
  // await expect(page.getByText('default')).not.toBeVisible();
  await expect(page.getByRole('gridcell', { name: 'default' }).first()).not.toBeVisible();

  // clear filters
  await page.getByLabel('Remove COMPUTE').click();
  await page.getByLabel('Remove IAM').click();

  await expect(page.getByRole('gridcell', { name: 'default' }).first()).toBeVisible();

});

test('test is Crown Jewel', async ({ page }) => {
  // fill in text, will have one result
  await page.goto(testConfig.siteUrl);

  // see that current jewel is False icon
  const imageLocator = await page.getByRole('row', { name: 'iamrole-ella-PROD 2022-02-24 20:15:48 IAM PROD John ff444dd74b30d8f42d96a4993b91053b Account=TravelX Demo,Vesrion=1,Team=Devops,Environment=null,Owner=Dana Briks,Owner Email=Dana@travelx.com' }).getByRole('img').first();
  const currImg = await imageLocator.getAttribute("src");
  await expect(currImg?.toLowerCase()).toContain("false");

  // set to True
  await imageLocator.click();
  await imageLocator.press("Enter")
  await page.getByRole('option', { name: 'true' }).click();
  
  // see that jewel is set to Green Icon
  const newImg = await imageLocator.getAttribute("src");
  await expect(newImg?.toLowerCase()).toContain("green");

});