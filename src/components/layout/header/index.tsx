import Dropdown from "./Dropdown";
import Status from "./Status";

export default function Header() {
  return (
    <header className="navbar bg-base-300 min-w-fit w-full rounded-2xl mt-1">
      <div className="navbar-start">
        <Dropdown />
        <a className="btn btn-ghost normal-case text-xl">Midnight</a>
      </div>
      <div className="navbar-end">
        <Status />
      </div>
    </header>
  );
}
