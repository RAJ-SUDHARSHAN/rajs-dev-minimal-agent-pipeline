export const colors = {
  // Text colors
  text: {
    primary: "text-white",
    secondary: "text-[#999999]",
    tertiary: "text-[#888888]",
    hover: "hover:text-teal-500",
    groupHover: "group-hover:text-teal-500",
  },
  // Background colors
  background: {
    primary: "bg-black",
    secondary: "bg-[#111111]",
    tertiary: "bg-[#222222]",
    hoverLink: "hover:bg-teal-500",
  },
  // Border colors
  border: {
    primary: "border-[#333333]",
    hover: "hover:border-white",
  },
  // Divider color
  divider: {
    primary: "border-[#333333] bg-[#333333]",
    hover: "border-[#666666] bg-[#666666]",
  },
} as const;
