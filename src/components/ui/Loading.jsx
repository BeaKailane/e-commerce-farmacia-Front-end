import { RotatingLines } from "react-loader-spinner";

export default function Loading({ texto = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <RotatingLines
        strokeColor="#dc2626"
        strokeWidth="4"
        animationDuration="0.75"
        width="42"
        visible={true}
      />
      <p className="text-gray-500">{texto}</p>
    </div>
  );
}
