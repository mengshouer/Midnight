export default function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="tabs">
      <a
        className={`tab tab-bordered ${
          activeTab === "Update" ? "tab-active" : ""
        }`}
        onClick={() => setActiveTab("Update")}
      >
        Update
      </a>
      <a
        className={`tab tab-bordered ${
          activeTab === "Manage" ? "tab-active" : ""
        }`}
        onClick={() => setActiveTab("Manage")}
      >
        Manage(Todo...)
      </a>
    </div>
  );
}
