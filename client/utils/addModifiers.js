export default function (className, modifiers) {
    if (modifiers.length) {
        return modifiers.reduce((acc, modifier) => {
            return `${acc} ${className}_${modifier}`;
        }, className);
    }

    return className;
};
