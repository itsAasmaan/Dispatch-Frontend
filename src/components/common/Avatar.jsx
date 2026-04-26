import { getInitials } from "../../utils/helpers";

const sizeMap = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-xl",
  xl: "w-20 h-20 text-2xl",
};

const Avatar = ({ src, name, size = "md", className = "" }) => {
  const sizeClass = sizeMap[size] ?? sizeMap.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? "avatar"}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-dark-700 ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeClass} rounded-full
        bg-primary-600/20 text-primary-400
        flex items-center justify-center
        font-semibold ring-2 ring-dark-700
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
