const removeAllNewLineBreak = (string: string) => {
  return string
    ? string
        .replace(/\n/g, "")
        .replace(/(<br>|<\/br>|<br \/>|<br\/>|\r)/g, "\n")
    : "";
};

const removeHtmlTag = (string: string) => {
  return string ? string.replace(/<[^>]+>/g, "") : "";
};

const removeExtraWhiteSpace = (string: string) => {
  return string ? string.replace(/ +/g, " ") : "";
};

const isHTML = (str: string) => {
  const htmlRegex = /<[a-z][\s\S]*>/i;
  return htmlRegex.test(str);
};

const stringHashToHsl = (value: string) => {
  if (value === "") {
    return "";
  }
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
    // eslint-disable-next-line no-bitwise
    hash = hash & hash;
  }
  const hue = hash % 360;
  const saturation = 60 + (hash % 5);
  const lightness = 80 + (hash % 5);
  return `hsl(${hue},${saturation}%,${lightness}%)`;
};

const computedText = (text: string | undefined) => {
  if (text === undefined || text === "") {
    return "";
  }
  const words = text.split(" ");
  return words.length > 1
    ? [words[0], words[words.length - 1]].join(" ")
    : words[0];
};

const formatNameTxt = (name: string) => {
  if (name) {
    const locationEnd = name.lastIndexOf(" ");
    if (locationEnd === -1) {
      return name.slice(0, 2).toUpperCase();
    }
    const formattedName =
      name.slice(0, 1) + name.slice(locationEnd + 1, locationEnd + 2);
    return formattedName.toUpperCase();
  }
  return "";
};

const STRING_CONVERTER = {
  removeAllNewLineBreak,
  removeHtmlTag,
  removeExtraWhiteSpace,
  isHTML,
  stringHashToHsl,
  formatNameTxt,
  computedText,
};
export { STRING_CONVERTER };
