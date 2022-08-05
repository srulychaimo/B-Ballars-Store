// Calculate prices

export const priceCalculation = (items) => {
  const numberToDecimal = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
  };

  const itemsPrice = items?.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = Number(numberToDecimal(itemsPrice > 100 ? 0 : 39.99));

  const taxPrice = Number((0.17 * itemsPrice).toFixed(2));

  const totalPrice = Number(
    (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
  );

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
