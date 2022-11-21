import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

export default function Dropdown() {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <Bars3BottomLeftIcon className="h-5 w-5" />
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Homepage</a>
        </li>
        <li>
          <a>Admin</a>
        </li>
        <li>
          <a>About</a>
        </li>
      </ul>
    </div>
  );
}
