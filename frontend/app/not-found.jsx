import dynamic from "next/dynamic";
import NotFound from "@/components/common/NotFound";

export const metadata = {
  title: "404 || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const index = () => {
  return (
    <>

      <NotFound />
      {/* End 404 section */}

    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: true });
