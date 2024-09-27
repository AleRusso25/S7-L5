const url = "https://striveschool-api.herokuapp.com/api/product/";

// il carId dall'URL
const addressBarContent = new URLSearchParams(location.search);
const carId = addressBarContent.get("carId");
console.log("_ID RECUPERATO", carId);

// dettagli di una singola auto
const getSingleCar = function () {
  fetch(url + carId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY1OWRkOTc5YzQ1ZjAwMTU2OWI0ODAiLCJpYXQiOjE3MjczNzMwMTQsImV4cCI6MTcyODU4MjYxNH0.n7bwB3EHGxsao-6Qc1vFS9LD7hb0D68uOV3453H_zGE",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recuperare singola auto");
      }
    })
    .then((singleCar) => {
      console.log("SINGLECAR", singleCar);
      createDetailsCard(singleCar);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

// Crea una card
const createDetailsCard = function (carDetails) {
  const row = document.getElementById("dettagliRow");
  const newCol = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-md-6");
  newCol.innerHTML = `
        <div class="card text-center">
            <img src="${carDetails.imageUrl}" class="card-img-top " alt="...">
            <div class="card-body">
                <h5 class="card-title">${carDetails.name}</h5>
                <p class="card-text">${carDetails.description}</p>
                <p class="card-text">${carDetails.brand}</p>
                <p class="card-text">${carDetails.price} €</p>
                
                <a href="./index.html" class="btn btn-secondary">TORNA ALLA HOME</a>
                <button onclick="deleteEvent()" class="btn btn-danger">ELIMINA AUTO</button>
                <a href="./backoffice.html?carId=${carDetails._id}" class="btn btn-warning">MODIFICA AUTO</a>
            </div>
        </div>
    `;
  row.appendChild(newCol);
};

const deleteEvent = function () {
  fetch(url + carId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY1OWRkOTc5YzQ1ZjAwMTU2OWI0ODAiLCJpYXQiOjE3MjczNzMwMTQsImV4cCI6MTcyODU4MjYxNH0.n7bwB3EHGxsao-6Qc1vFS9LD7hb0D68uOV3453H_zGE",
    },
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Hai eliminato quest'auto");
        location.assign("./index.html");
      } else {
        throw new Error("Errore nella cancellazione dell'auto");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getSingleCar();
