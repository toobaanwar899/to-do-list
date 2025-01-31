// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import routeHelpers from "../../../helpers/RouteHelpers";
import { MdDelete , MdModeEditOutline } from "react-icons/md";

export default function ActionButton() {
  return (
    <div className="row x-gap-10 y-gap-10 items-center flex">
      <div className="col-auto">
        {/* <Link to={`${routeHelpers.admin.dashboardRoutes}${editLink}`}> */}
          <button className="flex-center bg-light-2 rounded-4 size-35">
          <MdDelete />
           
          </button>
        {/* </Link> */}
      </div>
      <div className="col-auto">
        {/* <Link to={`${routeHelpers.admin.dashboardRoutes}${prevLink}`}> */}
          <button className="flex-center bg-light-2 rounded-4 size-35">
          <MdModeEditOutline />
           
          </button>
        {/* </Link> */}
      </div>
      {/* <div className="col-auto">
        <button className="flex-center bg-light-2 rounded-4 size-35">
          <i className="bi bi-trash-fill text-16 text-light-1" />
        </button>
      </div> */}
    </div>
  );
}

// ActionButton.propTypes = {
//   editLink: PropTypes.string.isRequired,
//   prevLink: PropTypes.string.isRequired,
// };
