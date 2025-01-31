import Link from "next/link";
export default function PageTitle({ title, link, buttonTitle }) {
  return (
    <div className="flex justify-between items-center py-4">
      <h4 className="text-2xl font-semibold text-gray-900">{title}</h4>
      <div className="flex items-center gap-4">
        <Link href={link} passHref>
          <button
            type="button"
            aria-label="Save Tasks"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            {buttonTitle}
          </button>
        </Link>
      </div>
    </div>
  );
}
