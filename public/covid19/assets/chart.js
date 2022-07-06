const chartCountries = (countries) => {
  // console.log(countries)
  const countriesData = countries
    .sort((a, b) => b.confirmed - a.confirmed)
    .slice(0, 10);
  // console.log(countriesData)

  const labelsArr = [];
  const confirmedArr = [];
  const activeArr = [];
  const deathsArr = [];
  const recoveredArr = [];
  countriesData.forEach(
    ({ location, active, confirmed, deaths, recovered }) => {
      labelsArr.push(location);
      activeArr.push(active);
      confirmedArr.push(confirmed);
      deathsArr.push(deaths);
      recoveredArr.push(recovered);
    }
  );
  // console.log(labelsArr,confirmedArr,deathsArr)

  const data = {
    labels: labelsArr,
    datasets: [
      {
        label: "Casos activos",
        data: activeArr,
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Confirmados",
        data: confirmedArr,
        borderColor: "blue",
        backgroundColor: "rgba(255, 162, 132, 0.2)",
      },
      {
        label: "Muertos",
        data: deathsArr,
        borderColor: "red",
        backgroundColor: "rgba(54, 66, 235, 0.2)",
      },
      {
        label: "Recuperados",
        data: recoveredArr,
        borderColor: "red",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  };

  new Chart(document.getElementById("myChart"), config);

};

export { chartCountries };
