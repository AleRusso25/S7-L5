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
const addressBarContent = new URLSearchParams(location.search);
const carId = addressBarContent.get("carId");

const objectForm = document.getElementById("object-form");
objectForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").src || document.getElementById("imageUrl").value;
  const brand = document.getElementById("brand").value;
  const newCar = new Car(name, description, brand, imageUrl, price);

  let methodToUse;
  if (carId) {
    methodToUse = "PUT";
  } else {
    methodToUse = "POST";
  }

  let addressToUse;
  if (carId) {
    addressToUse = url + carId;
  } else {
    addressToUse = url;
  }
  if (carId) {
    methodToUse = "PUT";
  } else {
    methodToUse = "POST";
  }

  fetch(addressToUse, {
    method: methodToUse,
    body: JSON.stringify(newCar),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY1OWRkOTc5YzQ1ZjAwMTU2OWI0ODAiLCJpYXQiOjE3MjczNzMwMTQsImV4cCI6MTcyODU4MjYxNH0.n7bwB3EHGxsao-6Qc1vFS9LD7hb0D68uOV3453H_zGE",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(carId ? "Macchina modificata" : "Macchina aggiunto");
        objectForm.reset();
      } else {
        throw new Error("Errore della risposta");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});

if (carId) {
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
        throw new Error("Errore neltrovare l auto da modificare");
      }
    })
    .then((singleCar) => {
      // pre-compilo i campi del form con i valori  da modificare
      const nameInput = document.getElementById("name");
      const descriptionInput = document.getElementById("description");
      const priceInput = document.getElementById("price");
      const imageUrlInput = document.getElementById("imageUrl");
      const brandInput = document.getElementById("brand");

      nameInput.value = singleCar.name;
      descriptionInput.value = singleCar.description;
      priceInput.value = singleCar.price;
      imageUrlInput.value = singleCar.imageUrl;
      brandInput.value = singleCar.brand;

      document.getElementsByClassName("btn-primary")[0].innerText = "MODIFICA";
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
}
