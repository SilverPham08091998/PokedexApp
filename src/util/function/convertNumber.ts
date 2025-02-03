const convertStringToNumber = (
  textNumber: string | number | undefined
): number => {
  if (textNumber === undefined) {
    return 0;
  }
  if (typeof textNumber === "string") {
    const parsedNumber = parseInt(textNumber, 10);

    if (isNaN(parsedNumber)) {
      return 0;
    }

    return parsedNumber;
  }
  if (isNaN(textNumber)) {
    return 0;
  }
  return textNumber;
};

const formatNumberToMoney = (value?: number) => {
  if (!value) {
    return 0;
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(value)
    .replace("₫", "")
    .replace(/\./g, ",")
    .replace(/\s/g, "")
    .trim();
};

const duration = (index: number) => {
  if (index > 10) {
    return 1000;
  }
  return index * 100;
};

const NUMBER_CONVERTER = {
  convertStringToNumber,
  formatNumberToMoney,
  duration,
};

export default NUMBER_CONVERTER;
