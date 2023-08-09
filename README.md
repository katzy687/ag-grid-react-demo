# ag-grid-react Demo
Demo data table grid built on top of [ag-grid-react](https://www.ag-grid.com/react-data-grid/).
Data grid pulls static data from json data and applies custom integrated filters.

Additional independent filter integrated with [react-select](https://react-select.com/home). 
This was done mainly because the integrated ag-grid set filters are "enterprise only" feature and not free.
The logic implemented there is just to fetch all the data again, filter the data set by currently selected options, then reset the top level state.

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
