import { RotatingLines } from "react-loader-spinner";

const variantes = {
  primario: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  secundario:
    "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300",
  perigo: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};

export default function Button({
  children,
  variante = "primario",
  isLoading = false,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold
        transition-colors disabled:cursor-not-allowed disabled:opacity-60
        ${variantes[variante]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="22"
          visible={true}
        />
      ) : (
        children
      )}
    </button>
  );
}
