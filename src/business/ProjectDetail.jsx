import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Project Detail
      </h1>

      <p>Project ID: {id}</p>

      <button
        className="
        mt-6
        bg-orange-500
        text-white
        px-5
        py-3
        rounded-lg
        "
      >
        Add Target Group
      </button>
    </div>
  );
}