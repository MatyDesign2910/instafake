import { getCountries } from "./countries.js";
import { chartCountries } from "./chart.js";
import { tableCountries } from "./table.js";

const url = "http://localhost:3000";
(async () => {
  const { data } = await getCountries(url);
  chartCountries(data);
  tableCountries(data);
  //console.log(data)
})();