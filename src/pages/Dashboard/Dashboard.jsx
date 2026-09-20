import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Landmark,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";
import AppHeader from "../../layouts/AppHeader";
import PageContainer from "../../layouts/PageContainer";
import useWizardStore from "../../store/wizardStore";
import steps from "../../constants/steps";
import "./Dashboard.css";

function formatCurrency(value) {
  const numeric = Number(String(value ?? "").replace(/\D/g, ""));

  if (!Number.isFinite(numeric) || numeric <= 0) {
    return "—";
  }

  return `₹${numeric.toLocaleString("en-IN")}`;
}

function loanLabel(loanType) {
  const labels = {
    personal: "Personal Loan",
    home: "Home Loan",
    business: "Business Loan",
  };

  return labels[loanType] ?? "Not selected";
}

function Dashboard() {
  const currentStep = useWizardStore((state) => state.currentStep);
  const formData = useWizardStore((state) => state.formData);
  const submittedApplications = useWizardStore(
    (state) => state.submittedApplications
  );

  const hasApplication = Object.keys(formData ?? {}).length > 0;
  const hasSubmittedApplications = submittedApplications.length > 0;
  const currentStepConfig = steps.find((step) => step.id === currentStep);
  const progress = Math.min(
    100,
    Math.round((Math.max(currentStep, 1) / 9) * 100)
  );

  const firstName = String(formData?.firstName ?? "").trim();
  const displayName = firstName || "there";

  return (
    <AppShell>
      <PageContainer>
        <AppHeader
          title="Dashboard"
          subtitle="Track your loan application, review your progress, and continue whenever you're ready."
          showSaveDraft={false}
        />

        <div className="dashboard-page">
          <section className="dashboard-hero">
            <div className="dashboard-hero-copy">
              <div className="dashboard-eyebrow">
                <Sparkles size={15} />
                Smart Loan Overview
              </div>

              <h2>
                Welcome back, <span>{displayName}</span>
              </h2>

              <p>
                {hasApplication
                  ? "Your application is safely kept at its current stage. Pick up where you left off without starting again."
                  : "Start your loan journey with a guided application designed to keep every step clear and simple."}
              </p>

              <Link to="/" className="dashboard-primary-action">
                {hasApplication ? "Continue Application" : "Start Application"}
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="dashboard-hero-visual" aria-hidden="true">
              <div className="dashboard-orbit dashboard-orbit-one" />
              <div className="dashboard-orbit dashboard-orbit-two" />

              <div className="dashboard-hero-icon">
                <Landmark size={34} />
              </div>

              <div className="dashboard-floating-chip dashboard-chip-top">
                <ShieldCheck size={16} />
                Secure
              </div>

              <div className="dashboard-floating-chip dashboard-chip-bottom">
                <CheckCircle2 size={16} />
                Guided process
              </div>
            </div>
          </section>

          <section className="dashboard-stats-grid" aria-label="Application summary">
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon dashboard-stat-purple">
                <ClipboardCheck size={20} />
              </div>
              <div>
                <p className="dashboard-stat-label">Application progress</p>
                <div className="dashboard-stat-value-row">
                  <strong>{hasApplication ? `${progress}%` : "0%"}</strong>
                  <span>{hasApplication ? "In progress" : "Not started"}</span>
                </div>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon dashboard-stat-blue">
                <Clock3 size={20} />
              </div>
              <div>
                <p className="dashboard-stat-label">Current stage</p>
                <div className="dashboard-stat-value-row">
                  <strong>{hasApplication ? `Step ${currentStep}` : "—"}</strong>
                  <span>{hasApplication ? currentStepConfig?.title : "Ready to begin"}</span>
                </div>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon dashboard-stat-cyan">
                <WalletCards size={20} />
              </div>
              <div>
                <p className="dashboard-stat-label">Loan type</p>
                <div className="dashboard-stat-value-row">
                  <strong className="dashboard-stat-text-value">
                    {loanLabel(formData?.loanType)}
                  </strong>
                  <span>{formatCurrency(formData?.loanAmount)}</span>
                </div>
              </div>
            </div>
          </section>

          {hasSubmittedApplications && (
            <section className="dashboard-submitted-section">
              <div className="dashboard-panel dashboard-submitted-panel">
                <div className="dashboard-panel-heading">
                  <div>
                    <p className="dashboard-section-kicker">My Applications</p>
                    <h3>Submitted applications</h3>
                  </div>

                  <span className="dashboard-progress-badge">
                    {submittedApplications.length} submitted
                  </span>
                </div>

                <div className="dashboard-application-list">
                  {submittedApplications.map((application) => (
                    <div
                      key={application.id}
                      className="dashboard-application-card"
                    >
                      <div className="dashboard-application-icon">
                        <FileText size={19} />
                      </div>

                      <div className="dashboard-application-main">
                        <div className="dashboard-application-title-row">
                          <strong>{loanLabel(application.loanType)}</strong>
                          <span className="dashboard-status-pill dashboard-status-submitted">
                            <span />
                            {application.status}
                          </span>
                        </div>

                        <div className="dashboard-application-meta">
                          <span>
                            Ref: <b>{application.id}</b>
                          </span>
                          <span>
                            Amount: <b>{formatCurrency(application.loanAmount)}</b>
                          </span>
                          <span>
                            Tenure: <b>
                              {application.loanTenure
                                ? `${application.loanTenure} months`
                                : "—"}
                            </b>
                          </span>
                          <span>
                            Submitted: <b>
                              {new Date(application.submittedAt).toLocaleDateString(
                                "en-IN",
                                { day: "2-digit", month: "short", year: "numeric" }
                              )}
                            </b>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="dashboard-content-grid">
            <div className="dashboard-panel dashboard-progress-panel">
              <div className="dashboard-panel-heading">
                <div>
                  <p className="dashboard-section-kicker">Application Journey</p>
                  <h3>Your progress</h3>
                </div>
                <span className="dashboard-progress-badge">
                  {hasApplication ? `${progress}% complete` : "Ready to start"}
                </span>
              </div>

              <div className="dashboard-progress-track" aria-hidden="true">
                <span style={{ width: `${hasApplication ? progress : 0}%` }} />
              </div>

              <div className="dashboard-step-list">
                {steps
                  .filter((step) => step.id !== 6)
                  .slice(0, 4)
                  .map((step) => {
                    const completed = hasApplication && currentStep > step.id;
                    const active = hasApplication && currentStep === step.id;

                    return (
                      <div
                        key={step.id}
                        className={`dashboard-step ${
                          completed ? "is-complete" : ""
                        } ${active ? "is-active" : ""}`}
                      >
                        <div className="dashboard-step-indicator">
                          {completed ? <CheckCircle2 size={18} /> : step.id}
                        </div>
                        <div className="dashboard-step-copy">
                          <strong>{step.title}</strong>
                          <span>
                            {completed
                              ? "Completed"
                              : active
                              ? "Current step"
                              : `Step ${step.id}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <Link to="/" className="dashboard-text-link">
                Open application
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="dashboard-panel dashboard-activity-panel">
              <div className="dashboard-panel-heading">
                <div>
                  <p className="dashboard-section-kicker">Quick View</p>
                  <h3>Application details</h3>
                </div>
                <div className="dashboard-mini-icon">
                  <FileText size={18} />
                </div>
              </div>

              <div className="dashboard-detail-list">
                <div className="dashboard-detail-row">
                  <span>Application status</span>
                  <strong className="dashboard-status-pill">
                    <span />
                    {hasApplication ? "In progress" : "Not started"}
                  </strong>
                </div>

                <div className="dashboard-detail-row">
                  <span>Selected loan</span>
                  <strong>{loanLabel(formData?.loanType)}</strong>
                </div>

                <div className="dashboard-detail-row">
                  <span>Requested amount</span>
                  <strong>{formatCurrency(formData?.loanAmount)}</strong>
                </div>

                <div className="dashboard-detail-row">
                  <span>Tenure</span>
                  <strong>
                    {formData?.loanTenure
                      ? `${formData.loanTenure} months`
                      : "—"}
                  </strong>
                </div>
              </div>

              <div className="dashboard-security-note">
                <ShieldCheck size={18} />
                <div>
                  <strong>Your information stays protected</strong>
                  <span>
                    Continue through the guided steps to complete your secure application.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageContainer>
    </AppShell>
  );
}

export default Dashboard;
