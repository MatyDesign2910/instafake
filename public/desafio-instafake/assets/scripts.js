$("#form").submit(async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;
  const JWT = await postData(email, password);
  getAlbums(JWT);
});

const postData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const getAlbums = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/photos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    if (data) {
      toggleFormAndTable();
      let rows = "";
      $.map(data, (row) => {
        rows += `
          <div class="card d-block my-1 px-0 mx-0" style="border:1px solid dark">
            <img class="card-img-top" src="${row.download_url}" />
            <div>
                <p class="card-text p-1">Autor: ${row.author}</p>
            </div>
          </div>
          `;
      });
      $(`#fotos`).append(rows);
    }
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err}`);
  }
};

const toggleFormAndTable = () => {
  $(`#form-insta`).toggle();
  $(`#fotos-insta`).toggle();
};

const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    await getAlbums(token);
    $(`#mostrar`).toggle();
  }
};
init();

document.getElementById("mostrar").addEventListener("click", async () => {
  const jwt = localStorage.getItem('jwt-token');
  console.log(jwt);
  let fotos = 2;
  if (fotos <= 10) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/photos?page=${fotos}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const { data } = await response.json();
      if (data) {
        let rows = "";
        $.map(data, (row) => {
          rows += `
            <div class="card d-block my-1 px-0 mx-0" style="border:1px solid dark">
                <img class="card-img-top" src="${row.download_url}" />
                <div>
                    <p class="card-text p-1">Autor: ${row.author}</p>
                </div>
            </div>
            `;
        });
        $(`#fotos`).append(rows);
      }
    } catch (err) {
      localStorage.clear();
      console.error(`Error: ${err}`);
    }
    fotos++;
    if (fotos == 11) {
      $("#mostrar").innerHTML += "Ya viste todas las fotos";
    }
  }
});

const logoutJwt = () => {
  localStorage.clear();
  location.reload();
};
