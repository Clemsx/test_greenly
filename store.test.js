/* eslint-disable prettier/prettier */
import { Store, DiscountOffer } from './store';

////////////////////////////////// Store //////////////////////////////////

describe('Store', () => {
  it('should decrease the discount and expiresIn', () => {
    const store = new Store([
      new DiscountOffer('test', 2, 3, ['reduceDiscountBasic', 'removeOneDay']),
    ]).updateDiscounts();

    const discount = new DiscountOffer('test', 1, 2, [
      'reduceDiscountBasic',
      'removeOneDay',
    ]);

    expect(store.discountOffers[0]).toEqual(discount);
  });
});

describe('Store', () => {
  it('should be an object', () => {
    const store = new Store([
      new DiscountOffer('test', 2, 3, ['reduceDiscountBasic', 'removeOneDay']),
    ]);

    expect(typeof store).toEqual('object');
    expect(typeof store).not.toEqual('array');
  });
});

describe('Store', () => {
  it('should contains specific instance of DiscountOffer', () => {
    const store = new Store([
      new DiscountOffer('test', 2, 3, ['reduceDiscountBasic', 'removeOneDay']),
      new DiscountOffer('test222', 2, 3, [
        'reduceDiscountBasic',
        'removeOneDay',
      ]),
    ]);

    expect(store.discountOffers).toContainEqual({
      partnerName: 'test222',
      expiresIn: 2,
      discountInPercent: 3,
      discountRules: ['reduceDiscountBasic', 'removeOneDay'],
    });
  });
});

describe('Store', () => {
  it('Ilek should never expire nor decreased discount', () => {
    const discountOffers = [
      new DiscountOffer('Velib', 20, 30, [
        'reduceDiscountBasic',
        'removeOneDay',
      ]),
      new DiscountOffer('Ilek', 15, 40, []),
    ];

    const store = new Store(discountOffers);

    for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
      store.updateDiscounts();
    }

    expect(store.discountOffers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          partnerName: 'Velib',
          expiresIn: -10,
          discountInPercent: 0,
        }),
        expect.objectContaining({
          partnerName: 'Ilek',
          expiresIn: 15,
          discountInPercent: 40,
        }),
      ])
    );
  });
});

////////////////////////////////// DiscountOffer //////////////////////////////////

describe('DiscountOffer', () => {
  it('should be instance of DiscountOffer', () => {
    const discount = new DiscountOffer('test', 2, 3, [
      'reduceDiscountBasic',
      'removeOneDay',
    ]);

    expect(discount).toBeInstanceOf(DiscountOffer);
  });
});

describe('DiscountOffer', () => {
  it('should be type of object', () => {
    const discount = new DiscountOffer('test', 2, 3, [
      'reduceDiscountBasic',
      'removeOneDay',
    ]);

    expect(typeof discount).toBe('object');
    expect(typeof discount).not.toBe('array');
    expect(typeof discount).not.toBe('string');
  });
});

describe('DiscountOffer', () => {
  it('should contains String, Integer, Integer, Array', () => {
    const discount = new DiscountOffer('test', 2, 3, [
      'reduceDiscountBasic',
      'removeOneDay',
    ]);

    expect(typeof discount.partnerName).toBe('string');
    expect(typeof discount.expiresIn).toBe('number');
    expect(typeof discount.discountInPercent).toBe('number');

    expect(discount.discountRules).toEqual(
      expect.arrayContaining(['reduceDiscountBasic']),
      expect.arrayContaining(['removeOneDay'])
    );
  });
});
