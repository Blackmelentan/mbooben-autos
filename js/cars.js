// MBOOBEN AUTO'S — Inventory Data
const CARS = [
  {
    id: "charger-black",
    make: "Dodge",
    model: "Charger SXT",
    year: 2018,
    price: 1850000,
    currency: "GMD",
    color: "Black with Yellow Stripes",
    plate: "KM 7302 F",
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    featured: true,
    images: [
      "images/charger-2.jpg",
      "images/charger-3.jpg",
      "images/charger-1.jpg",
      "images/charger-4.jpg",
      "images/charger-5.jpg"
    ],
    description: "Striking black Dodge Charger SXT with bold yellow racing stripes. Powerful presence, automatic transmission, and ready for the road. One of our standout performance sedans."
  },
  {
    id: "bmw-white",
    make: "BMW",
    model: "3 Series",
    year: 2017,
    price: 1650000,
    currency: "GMD",
    color: "Alpine White",
    plate: "",
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    featured: true,
    images: [
      "images/bmw-1.jpg",
      "images/bmw-2.jpg"
    ],
    description: "Elegant white BMW 3 Series in excellent condition. Sporty yet refined — perfect for those who want premium driving dynamics and status."
  },
  {
    id: "explorer-white",
    make: "Ford",
    model: "Explorer",
    year: 2018,
    price: 1950000,
    currency: "GMD",
    color: "White / Cream",
    plate: "KM 7205 F",
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    featured: true,
    images: [
      "images/explorer-white.jpg"
    ],
    description: "Spacious Ford Explorer SUV — ideal for family and business. Comfortable, capable, and well maintained. Plate KM 7205 F."
  },
  {
    id: "explorer-blue",
    make: "Ford",
    model: "Explorer",
    year: 2019,
    price: 2100000,
    currency: "GMD",
    color: "Blue",
    plate: "",
    transmission: "Automatic",
    fuel: "Petrol",
    status: "available",
    featured: false,
    images: [
      "images/explorer-blue.jpg"
    ],
    description: "Blue Ford Explorer with a strong presence. Reliable American SUV, automatic, and ready for Gambian roads."
  }
];

function formatPrice(n) {
  return "D " + n.toLocaleString("en-US");
}

function getCarById(id) {
  return CARS.find(c => c.id === id);
}
