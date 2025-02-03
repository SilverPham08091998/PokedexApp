const formatterVI = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "VND",
});

const convertCurrency = (billOfMount: number) => {
  return (
    formatterVI
      .format(billOfMount)
      .replace(/[a-zA-Z₫]/g, "")
      .replace(/,/g, ".")
      .trim() + " VND"
  );
};
const CURRENCY_CONVERT = {
  convertCurrency,
};

export { CURRENCY_CONVERT };
