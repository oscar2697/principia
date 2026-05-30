export const EmptyBorder = {
    topLeft: "",
    bottomLeft: "",
    vertical: "",
    topRight: "",
    bottomRight: "",
    horizontal: " ",
    bottomT: "",
    topT: "",
    cross: "",
    leftT: "",
    rightT: "",
};

export const SplitBorderChars = {
    border: ["left" as const, "right" as const],
    customBorderChars: {
        ...EmptyBorder,
        vertical: "┃",
    },
};