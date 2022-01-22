export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent, discountRules) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
    this.discountRules = discountRules;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }

  /**
   * Loop through all partner and apply their specific rules
   * @returns Array of DiscountOffer
   */
  updateDiscounts() {
    this.discountOffers.forEach(partner => {
      partner?.discountRules?.forEach(rule => {
        this[rule](partner);
      });
    });

    return this;
  }

  /**
   * Reduce discountInPercent based on the basic rule
   * @param {*} partner
   */
  reduceDiscountBasic(partner) {
    if (partner.discountInPercent > 0) {
      partner.expiresIn <= 0
        ? (partner.discountInPercent -= 2)
        : (partner.discountInPercent -= 1);
    }
  }

  /**
   * Reduce discountInPercent twice
   * @param {*} partner 
   */
  reduceDiscountTwice(partner) {
    if (partner.discountInPercent > 0) {
      partner.expiresIn <= 0
        ? (partner.discountInPercent -= 4)
        : (partner.discountInPercent -= 2);
    }
  }

  /**
   * Increase discountInPercent
   * @param {*} partner
   */
  increaseDiscountBasic(partner) {
    if (partner.discountInPercent < 50) {
      partner.expiresIn <= 0
        ? (partner.discountInPercent += 2)
        : (partner.discountInPercent += 1);
    }
  }

  /**
   * increase discountInPercent by 3 if expiresIn <= 10
   * @param {*} partner
   */
  increaseBasedOnDays(partner) {
    if (partner.expiresIn <= 5) partner.discountInPercent += 2;
    else if (partner.expiresIn <= 10) partner.discountInPercent += 1;

    if (partner.expiresIn <= 0) partner.discountInPercent = 0;
  }

  maxDiscount50(partner) {
    if (partner.discountInPercent > 50) partner.discountInPercent = 50;
  }

  minDiscount0(partner) {
    if (partner.discountInPercent < 0) partner.discountInPercent = 0;
  }

  removeOneDay(partner) {
    partner.expiresIn -= 1;
  }
}
