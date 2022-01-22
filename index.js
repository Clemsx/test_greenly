import { Store, DiscountOffer } from "./store";

import fs from "fs";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30, ["reduceDiscountBasic", "removeOneDay"]),
  new DiscountOffer("Naturalia", 10, 5, [
    "increaseDiscountBasic",
    "maxDiscount50",
    "removeOneDay"
  ]),
  new DiscountOffer("Vinted", 5, 40, [
    "increaseDiscountBasic",
    "increaseBasedOnDays",
    "maxDiscount50",
    "removeOneDay"
  ]),
  new DiscountOffer("Ilek", 15, 40, []),
  new DiscountOffer("BackMarket", 15, 40, [
    "reduceDiscountTwice",
    "minDiscount0",
    "removeOneDay"
  ])
];
const store = new Store(discountOffers);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.stringify(store.updateDiscounts()));
}

/* eslint-disable no-console */
fs.writeFile("output.json", log.toString(), err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
