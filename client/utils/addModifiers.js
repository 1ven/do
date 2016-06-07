export default function (className, modifiers) {
  if (modifiers.length) {
    return modifiers.reduce((acc, modifier) => (
      `${acc} ${className}_${modifier}`
    ), className);
  }

  return className;
}
