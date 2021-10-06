export default function priceConvert(price) {
  if (String(price).length === 4) {
    return (
      String(price).slice(0, 1) +
      " " +
      String(price).slice(1, String(price).length)
    );
  }

  if (String(price).length === 5) {
    return (
      String(price).slice(0, 2) +
      " " +
      String(price).slice(2, String(price).length)
    );
  }

  if (String(price).length === 6) {
    return (
      String(price).slice(0, 3) +
      " " +
      String(price).slice(3, String(price).length)
    );
  }

  return String(price);
}
