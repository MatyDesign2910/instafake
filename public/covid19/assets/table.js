const tableCountries = (data) => {
  data.sort((a, b) => {
    return a.location.toUpperCase() < b.location.toUpperCase() ? -1 : 1;
    // console.log(data)
  });

  const printTables = document.querySelector("#printDataTable");
  printTables.innerHTML = "";

  data.map(({ location, confirmed, deaths, recovered, active }) => {
    printTables.innerHTML += `<tr>
          <td>${location}</td>
          <td class="text-center">${confirmed}</td>
          <td class="text-center">${deaths}</td>
          <td class="text-center">${recovered}</td>
          <td class="text-center">${active}</td>
          <td class="text-center">
          <button onclick="detailCountry('${location}');detailChart('${confirmed}','${deaths}','${recovered}','${active}')" type="button" class="btn btn-warning">Ver detalles</button>
          </td>
        </tr>
        `;
        window.detailChart = (b,c,d,e) => {
            document.getElementById("donut").remove();

            var canvas = document.createElement("canvas");
            canvas.id = "donut"; 
            document.getElementById("modal-body").appendChild(canvas);
            // console.log(labelsArr,confirmedArr,deathsArr)

            const dataDos = {
              labels: ["Confirmados", "Muertes", "Recuperados", "Activos"],
              datasets: [
                {
                  label: "Casos activos",
                  data: [b, c, d, e],
                  borderColor: "dark",
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "rgb(255, 107, 86)",
                  ],
                },
              ],
            };
          
            const config = {
              type: "pie",
              data: dataDos,
            };
          
            new Chart(document.getElementById("donut"), config);

        };
        
  });
};

const myModal = new bootstrap.Modal("#modalCountries");

window.detailCountry = (a) => {
  document.getElementById("modal-title").innerHTML = a;
  myModal.show();
};

export { tableCountries };
