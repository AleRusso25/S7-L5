//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY1OWRkOTc5YzQ1ZjAwMTU2OWI0ODAiLCJpYXQiOjE3MjczNzMwMTQsImV4cCI6MTcyODU4MjYxNH0.n7bwB3EHGxsao-6Qc1vFS9LD7hb0D68uOV3453H_zGE
class Car {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const url = "https://striveschool-api.herokuapp.com/api/product/";

const getCar = function () {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY1OWRkOTc5YzQ1ZjAwMTU2OWI0ODAiLCJpYXQiOjE3MjczNzMwMTQsImV4cCI6MTcyODU4MjYxNH0.n7bwB3EHGxsao-6Qc1vFS9LD7hb0D68uOV3453H_zGE",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore di response");
      }
    })
    .then((data) => {
      createCartFromCar(data);
    })

    .catch((err) => {
      console.log("ERRORE", err);
    });
};

const createCartFromCar = function (arrayCar) {
  arrayCar.forEach((car) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
    newCol.innerHTML = `<div class="card h-100">
  <img src="${car.imageUrl}" class="card-img-top " alt="..." style="height: 200px; object-fit: cover;">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${car.name}</h5>
    <p class="card-text">${car.brand}</p>
    <p class="card-text flex-grow-1">${car.description}</p>
    <p class="card-text">${car.price} € </p>
    <a href="./dettagli.html?carId=${car._id}" class="btn btn-secondary rounded-pill">Dettagli</a>
  </div>
</div>`;
    const rowShop = document.getElementById("rowShop");
    rowShop.appendChild(newCol);
  });
};

getCar();
