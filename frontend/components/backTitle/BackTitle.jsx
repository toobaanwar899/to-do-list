import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackTitle = ({ title }) => {
  return (
    <div className="flex justify-between items-center">
      <Link href={"/tasklist"}>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-4 text-md md:text-xl font-medium text-gray-700 hover:text-gray-900"
        >
          <IoMdArrowRoundBack className="text-xl" />
          <span>{title}</span>
        </button>
      </Link>
    </div>
  );
};

export default BackTitle;
