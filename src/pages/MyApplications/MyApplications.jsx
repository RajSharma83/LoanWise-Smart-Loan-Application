import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  Landmark,
  Plus,
  UserRound,
  WalletCards,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";
import AppHeader from "../../layouts/AppHeader";
import PageContainer from "../../layouts/PageContainer";
import useWizardStore from "../../store/wizardStore";
import {
  employmentLabel,
  formatAddress,
  formatDate,
  formatMoney,
  fullName,
  loanLabel,
} from "../_shared/portalHelpers";
import "../../styles/portal.css";

function ApplicationCard({ app, index, isOpen, onToggle }) {
  const id = app.id || `LW-${1000 + index}`;
  const name = fullName(app);

  return (
    <div className={`app-card ${isOpen ? "is-open" : ""}`}>
      <div className="app-card-main" onClick={onToggle}>
        <div className="app-card-icon">
          <WalletCards size={19} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="app-card-title-row">
            <strong style={{ color: "#182744", fontSize: 14, fontWeight: 800 }}>
              {loanLabel(app.loanType)}
            </strong>
            <span className="portal-status review">
              <Clock3 size={12} /> {app.status || "Under Review"}
            </span>
          </div>
          <div className="app-card-meta-row">
            <span>
              Ref: <b>{id}</b>
            </span>
            <span>
              Amount: <b>{formatMoney(app.loanAmount)}</b>
            </span>
            <span>
              Tenure:{" "}
              <b>{app.loanTenure ? `${app.loanTenure} mo.` : "—"}</b>
            </span>
            <span>
              Submitted: <b>{formatDate(app.submittedAt)}</b>
            </span>
          </div>
        </div>
        <ChevronRight size={18} className="app-card-chevron" />
      </div>

      {isOpen && (
        <div className="app-card-detail">
          <div className="field-grid">
            <div className="field-card">
              <div className="field-card-icon">
                <UserRound size={16} />
              </div>
              <div>
                <div className="field-card-label">Applicant</div>
                <div className="field-card-value">
                  {name || "Not available"}
                </div>
              </div>
            </div>
            <div className="field-card">
              <div className="field-card-icon">
                <Briefcase size={16} />
              </div>
              <div>
                <div className="field-card-label">Employment</div>
                <div className="field-card-value">
                  {employmentLabel(app.employmentType) || "Not available"}
                </div>
              </div>
            </div>
            <div className="field-card">
              <div className="field-card-icon">
                <Landmark size={16} />
              </div>
              <div>
                <div className="field-card-label">Purpose</div>
                <div className="field-card-value">
                  {app.loanPurpose || "Not specified"}
                </div>
              </div>
            </div>
            <div className="field-card">
              <div className="field-card-icon">
                <CalendarDays size={16} />
              </div>
              <div>
                <div className="field-card-label">Address on file</div>
                <div className="field-card-value" style={{ lineHeight: 1.5 }}>
                  {formatAddress(app.address) || "Not available"}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <Link to="/documents" className="portal-soft-btn">
              View documents <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function MyApplications() {
  const apps = useWizardStore((state) => state.submittedApplications || []);
  const [openId, setOpenId] = useState(null);

  const totalAmount = apps.reduce(
    (sum, app) => sum + (Number(String(app.loanAmount || "").replace(/\D/g, "")) || 0),
    0
  );

  return (
    <AppShell>
      <PageContainer>
        <div className="portal-page">
          <AppHeader
            title="My Applications"
            subtitle="Track every loan application you have submitted through LoanWise."
            showSaveDraft={false}
          />

          {apps.length > 0 && (
            <div className="portal-grid portal-grid-3">
              <div className="portal-card portal-stat">
                <div className="portal-stat-top">
                  <div className="portal-icon">
                    <FileText size={19} />
                  </div>
                </div>
                <div className="portal-stat-value">{apps.length}</div>
                <div className="portal-stat-label">Total applications</div>
              </div>
              <div className="portal-card portal-stat">
                <div className="portal-stat-top">
                  <div className="portal-icon amber">
                    <Clock3 size={19} />
                  </div>
                </div>
                <div className="portal-stat-value">
                  {apps.filter((a) => (a.status || "Under Review") === "Under Review").length}
                </div>
                <div className="portal-stat-label">Under review</div>
              </div>
              <div className="portal-card portal-stat">
                <div className="portal-stat-top">
                  <div className="portal-icon green">
                    <WalletCards size={19} />
                  </div>
                </div>
                <div className="portal-stat-value">{formatMoney(totalAmount)}</div>
                <div className="portal-stat-label">Total amount requested</div>
              </div>
            </div>
          )}

          <section className="portal-card">
            <div className="portal-card-head">
              <div>
                <div className="portal-card-title">Application overview</div>
                <div className="portal-card-subtitle">
                  Your submissions, status and key details
                </div>
              </div>
              <Link to="/" className="portal-primary-btn">
                <Plus size={15} /> New application
              </Link>
            </div>
            <div className="portal-card-body">
              {apps.length === 0 ? (
                <div className="portal-empty">
                  <div className="portal-empty-icon">
                    <FileText size={27} />
                  </div>
                  <div className="portal-empty-title">
                    Nothing submitted yet
                  </div>
                  <div className="portal-empty-copy">
                    When you complete and submit a loan application, it will be
                    listed here with its reference and current status.
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <Link to="/" className="portal-primary-btn">
                      Start an application <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  {apps.map((app, i) => {
                    const id = app.id || `LW-${1000 + i}`;
                    return (
                      <ApplicationCard
                        key={id}
                        app={app}
                        index={i}
                        isOpen={openId === id}
                        onToggle={() =>
                          setOpenId((current) => (current === id ? null : id))
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </PageContainer>
    </AppShell>
  );
}

export default MyApplications;
