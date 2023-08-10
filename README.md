# ag-grid-react demo
Demo data table grid built with [ag-grid-react](https://www.ag-grid.com/react-data-grid/).
Additional external filter integrated with [react-select](https://react-select.com/home) drop down component. 

Demo project can be viewed deployed [here](https://natti-agdemo.netlify.app/).

### Column Customization Details
- Name - integrated "contains" text filter
- Created - Date Picker range filter
- Asset Type - integrated external filter with react-select drop down.
- Is Crown Jewel - custom icon displayed based on boolean logic. Can update boolean value of cells.

### External Filter Integration Details
The external react-select drop down was integrated because the ag-grid integrated set filters are "enterprise only" feature and not free.
The logic implemented is for the react-select component to update state that is shared by the parent component of the table and select. The parent component then uses the ag-grid api to update a custom external filter on the ag-grid.


### Dev Details
Project was scaffolded using Vite + React + Typescript template.

To run locally

```
git clone
npm install
npm run dev
```

Unit testing with [vitest](https://vitest.dev/)
```
npm run test
```
