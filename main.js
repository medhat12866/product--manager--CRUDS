let title = document.getElementById("productTitle");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let moonMood = document.querySelector(".moon");
let sunMood = document.querySelector(".sun");

sunMood.addEventListener("click", () => {
  if (moonMood.classList.contains("active")) {
    moonMood.classList.remove("active");
    sunMood.classList.add("active");
    document.body.classList.add("dark-mode")
  }else {
    moonMood.classList.add("active");
    sunMood.classList.remove("active");
    document.body.classList.remove("dark-mode")
  }
});

let mood = "create";
let tmp;
// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#27ae60";
  } else {
    total.innerHTML = "";
    total.style.background = "#e74c3c";
  }
}

// cearte product

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    count: count.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    count.value < 101 &&
    category.value != ""
  ) {
    if (mood === "create") {
      // count
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      count.style.display = "block";
      submit.innerHTML = "Create";
    }
    clearData();
  }
  // save localsotrage
  localStorage.setItem("product", JSON.stringify(dataPro));

  showData();
};

// clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  count.value = "";
  discount.value = "";
  category.value = "";
  total.innerHTML = "";
}
// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
      <td>0${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})">Update</button></td>
      <td><button onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();
// delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
// updata

function updateData(i) {
  mood = "update";
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "searc by " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value)) {
        table += `
        <tr>
          <td>0${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})">Update</button></td>
          <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += `
        <tr>
          <td>0${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})">Update</button></td>
          <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean data
