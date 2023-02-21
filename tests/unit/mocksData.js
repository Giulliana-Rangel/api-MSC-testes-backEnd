
const products = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
];

const sales = [
  {
    "saleId": 1,
    "date": "2023-02-20T14:25:47.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-20T14:25:47.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-20T14:25:47.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const sale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 2,
      "quantity": 60
    },
    {
      "productId": 2,
      "quantity": 80
    }
  ]
}

module.exports = {
  products,
  sales,
  sale,
}