import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  FileText,
  LayoutGrid,
  Folder,
  User,
  HelpCircle,
  Headphones,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Loan Application",
    icon: FileText,
    to: "/",
    matchPaths: ["/", "/resume", "/success"],
  },
  {
    label: "Dashboard",
    icon: LayoutGrid,
    to: "/dashboard",
    matchPaths: ["/dashboard"],
  },
  {
    label: "My Applications",
    icon: Folder,
    to: "/applications",
    matchPaths: ["/applications"],
  },
  {
    label: "Documents",
    icon: FileText,
    to: "/documents",
    matchPaths: ["/documents"],
  },
  {
    label: "Profile",
    icon: User,
    to: "/profile",
    matchPaths: ["/profile"],
  },
  {
    label: "Support",
    icon: HelpCircle,
    to: "/support",
    matchPaths: ["/support"],
  },
];

function Sidebar({ onNavigate }) {
  const location = useLocation();

  return (
    <aside className="sidebar-surface">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <Building2 size={23} strokeWidth={2.2} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[20px] font-bold leading-none text-slate-900">
            LoanWise
          </p>

          <p className="mt-2 truncate text-sm text-slate-500">
            Smart Loan Platform
          </p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.matchPaths?.includes(location.pathname) ?? false;

          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={onNavigate}
              className={`sidebar-nav-item ${
                isActive ? "sidebar-nav-active" : ""
              }`}
            >
              <span className="sidebar-nav-icon">
                <Icon size={19} />
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-support-card">
        <div className="sidebar-support-icon">
          <Headphones size={21} />
        </div>

        <p className="mt-4 text-[17px] font-semibold text-slate-900">
          Need Help?
        </p>

        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          Our support team is here to help you.
        </p>

        <Link to="/support" className="sidebar-support-button">
          <Headphones size={17} />
          Contact Support
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;