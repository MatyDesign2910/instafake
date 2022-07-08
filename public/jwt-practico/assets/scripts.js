$("#jw-form").submit(async (e) => {
  e.preventDefault();
  const email = document.getElementById("jw-email").value;
  const password = document.getElementById("jw-pass").value;
  const JWT = await postData(email, password);
  getPosts(JWT);
  getAlbums(JWT);

  console.log(email);
  console.log(password);
  console.log(JWT);
  console.log(posts);
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

const getPosts = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    if (data) {
      fillTable(data, "jw-table");
      toggleFormAndTable("jw-form-wrapper", "jw-table-wrapper");
    }
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err}`);
  }
};

const getAlbums = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/albums", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    if (data) {
        let rows = "";
        $.each(data, (i, row) => {
        rows += `<tr>
        <td> ${row.id} </td>
        <td> ${row.title} </td>
        </td>`
        })
        $(`#jw-albums tbody`).append(rows)
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const fillTable = (data, table) => {
  let rows = "";
  $.each(data, (i, row) => {
    rows += `<tr>
    <td> ${row.title} </td>
    <td> ${row.body} </td>
    </tr>`;
  });
  $(`#${table} tbody`).append(rows);
};

const toggleFormAndTable = (form, table) => {
  $(`#${form}`).toggle();
  $(`#${table}`).toggle();
};

const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    getPosts(token);
  }
};
init();

const logoutJwt = () => {
  localStorage.clear();
  location.reload();
};
