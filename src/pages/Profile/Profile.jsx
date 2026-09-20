import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileCheck2,
  Fingerprint,
  Folder,
  Home,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  Wallet,
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
  initialsOf,
} from "../_shared/portalHelpers";
import "../../styles/portal.css";

const TABS = [
  { id: "personal", label: "Personal Information", icon: UserRound },
  { id: "contact", label: "Contact Details", icon: Phone },
  { id: "employment", label: "Employment", icon: Briefcase },
  { id: "documents", label: "Documents", icon: Folder },
];

function FieldCard({ icon: Icon, label, value }) {
  return (
    <div className="field-card">
      <div className="field-card-icon">
        <Icon size={16} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="field-card-label">{label}</div>
        <div className="field-card-value">{value || "Not available yet"}</div>
      </div>
    </div>
  );
}

function ProfileDonut({ percent }) {
  const size = 108;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percent));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e9edf4"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#profileDonutGradient)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
        <defs>
          <linearGradient
            id="profileDonutGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#6478ff" />
            <stop offset="100%" stopColor="#5b38ea" />
          </linearGradient>
        </defs>
      </svg>
      <div className="donut-value">{clamped}%</div>
    </div>
  );
}

function Profile() {
  const apps = useWizardStore((state) => state.submittedApplications || []);
  const latest = apps[0];
  const [activeTab, setActiveTab] = useState("personal");

  const name = fullName(latest) || "LoanWise Customer";
  const address = latest?.address;

  const groups = useMemo(
    () => ({
      personal: Boolean(
        latest?.dob || latest?.gender || latest?.fatherName || latest?.motherName
      ),
      contact: Boolean(latest?.email || latest?.mobile),
      employment: Boolean(latest?.employmentType || latest?.monthlyIncome),
      address: Boolean(address?.line1 || address?.city),
    }),
    [latest, address]
  );

  const completedGroups = Object.values(groups).filter(Boolean).length;
  const strength = latest ? Math.round((completedGroups / 4) * 100) : 0;
  const strengthTag =
    strength >= 75 ? "Good" : strength >= 40 ? "Getting there" : "Just started";

  const activeCount = apps.filter(
    (app) => (app.status || "Under Review") === "Under Review"
  ).length;

  const employmentEntityLabel =
    latest?.employmentType === "businessOwner"
      ? "Business Name"
      : latest?.employmentType === "student"
        ? "College Name"
        : "Company Name";

  const employmentEntityValue =
    latest?.companyName || latest?.businessName || latest?.collegeName;

  const uploadedDocs = latest?.documents?.filter((doc) => doc.uploaded) || [];
  const totalDocs = latest?.documents?.length || 0;

  return (
    <AppShell>
      <PageContainer>
        <div className="portal-page">
          <AppHeader
            title="Profile"
            subtitle="Your personal information, securely saved with LoanWise."
            showSaveDraft={false}
          />

          <section className="profile-hero">
            <div className="profile-hero-top">
              <div className="profile-hero-id">
                <div className="profile-avatar">
                  {initialsOf(name)}
                  <span className="profile-avatar-edit">
                    <Pencil size={12} />
                  </span>
                </div>
                <div>
                  <div className="profile-name">{name}</div>
                  <div className="profile-role">LoanWise Customer</div>
                  <div className="profile-verified">
                    <BadgeCheck size={13} />
                    {latest ? "Profile Verified" : "Not submitted yet"}
                  </div>
                </div>
              </div>

              <div className="profile-hero-stats">
                <div className="profile-hero-stat">
                  <div className="profile-hero-stat-icon">
                    <Folder size={17} />
                  </div>
                  <div>
                    <div className="profile-hero-stat-label">
                      Total Applications
                    </div>
                    <div className="profile-hero-stat-value">
                      {apps.length}
                    </div>
                  </div>
                </div>
                <div className="profile-hero-stat">
                  <div className="profile-hero-stat-icon">
                    <FileCheck2 size={17} />
                  </div>
                  <div>
                    <div className="profile-hero-stat-label">
                      Active Application
                    </div>
                    <div className="profile-hero-stat-value">
                      {activeCount}
                    </div>
                  </div>
                </div>
                <div className="profile-hero-stat">
                  <div className="profile-hero-stat-icon">
                    <CalendarDays size={17} />
                  </div>
                  <div>
                    <div className="profile-hero-stat-label">
                      Last Updated
                    </div>
                    <div className="profile-hero-stat-value">
                      {latest ? formatDate(latest.submittedAt) : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="portal-grid portal-grid-2">
            <div className="portal-grid" style={{ alignContent: "start" }}>
              <div className="portal-tabs">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`portal-tab ${
                        activeTab === tab.id ? "is-active" : ""
                      }`}
                    >
                      <Icon size={15} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <section className="portal-card">
                <div className="portal-card-head">
                  <div>
                    <div className="portal-card-title">
                      {TABS.find((t) => t.id === activeTab)?.label}
                    </div>
                    <div className="portal-card-subtitle">
                      {activeTab === "personal" &&
                        "Your basic identity details"}
                      {activeTab === "contact" &&
                        "How LoanWise can reach you"}
                      {activeTab === "employment" &&
                        "Your work and income details"}
                      {activeTab === "documents" &&
                        "Documents linked to your latest application"}
                    </div>
                  </div>
                </div>
                <div className="portal-card-body">
                  {activeTab === "personal" && (
                    <div className="field-grid">
                      <FieldCard icon={UserRound} label="Full Name" value={name} />
                      <FieldCard
                        icon={CalendarDays}
                        label="Date of Birth"
                        value={latest?.dob}
                      />
                      <FieldCard
                        icon={Users}
                        label="Gender"
                        value={latest?.gender}
                      />
                      <FieldCard
                        icon={UserRound}
                        label="Father's Name"
                        value={latest?.fatherName}
                      />
                      <FieldCard
                        icon={UserRound}
                        label="Mother's Name"
                        value={latest?.motherName}
                      />
                      <FieldCard
                        icon={Users}
                        label="Marital Status"
                        value={latest?.maritalStatus}
                      />
                      <FieldCard
                        icon={CreditCard}
                        label="PAN Number"
                        value={latest?.panMasked}
                      />
                      <FieldCard
                        icon={Fingerprint}
                        label="Aadhaar Number"
                        value={latest?.aadhaarMasked}
                      />
                    </div>
                  )}

                  {activeTab === "contact" && (
                    <div className="field-grid">
                      <FieldCard
                        icon={Mail}
                        label="Email Address"
                        value={latest?.email}
                      />
                      <FieldCard
                        icon={Phone}
                        label="Mobile Number"
                        value={latest?.mobile}
                      />
                      <FieldCard
                        icon={Phone}
                        label="Alternate Mobile"
                        value={latest?.alternateMobile}
                      />
                    </div>
                  )}

                  {activeTab === "employment" && (
                    <div className="field-grid">
                      <FieldCard
                        icon={Briefcase}
                        label="Employment Type"
                        value={employmentLabel(latest?.employmentType)}
                      />
                      <FieldCard
                        icon={Building2}
                        label={employmentEntityLabel}
                        value={employmentEntityValue}
                      />
                      <FieldCard
                        icon={Wallet}
                        label="Monthly Income"
                        value={
                          latest?.monthlyIncome
                            ? formatMoney(latest.monthlyIncome)
                            : null
                        }
                      />
                      <FieldCard
                        icon={Wallet}
                        label="Annual Income"
                        value={
                          latest?.annualIncome
                            ? formatMoney(latest.annualIncome)
                            : null
                        }
                      />
                    </div>
                  )}

                  {activeTab === "documents" && (
                    <>
                      {!latest || totalDocs === 0 ? (
                        <div className="portal-empty" style={{ padding: "18px 0" }}>
                          <div className="portal-empty-title">
                            No documents linked yet
                          </div>
                          <div className="portal-empty-copy">
                            Submit an application to see your document
                            checklist here.
                          </div>
                        </div>
                      ) : (
                        <>
                          <div style={{ marginBottom: 14 }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 8,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 12,
                                  fontWeight: 800,
                                  color: "#45536c",
                                }}
                              >
                                {uploadedDocs.length} of {totalDocs} uploaded
                              </span>
                            </div>
                            <div className="mini-progress">
                              <span
                                style={{
                                  width: `${Math.round(
                                    (uploadedDocs.length /
                                      Math.max(totalDocs, 1)) *
                                      100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                          {latest.documents.map((doc) => (
                            <div className="portal-list-row" key={doc.key}>
                              <div className="portal-row-left">
                                <div className="portal-row-icon">
                                  <FileCheck2 size={16} />
                                </div>
                                <div>
                                  <div className="portal-row-title">
                                    {doc.title}
                                  </div>
                                  <div className="portal-row-meta">
                                    {doc.required ? "Required" : "Optional"}
                                  </div>
                                </div>
                              </div>
                              <span
                                className={`portal-status ${
                                  doc.uploaded ? "success" : "review"
                                }`}
                              >
                                {doc.uploaded ? "Uploaded" : "Pending"}
                              </span>
                            </div>
                          ))}
                          <div style={{ marginTop: 14 }}>
                            <Link to="/documents" className="portal-soft-btn">
                              View full document centre
                              <ChevronRight size={15} />
                            </Link>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div
                    className="portal-note"
                    style={{ marginTop: 18, justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex", gap: 12 }}>
                      <ShieldCheck
                        size={19}
                        color="#239866"
                        style={{ flex: "none" }}
                      />
                      <p>
                        <strong style={{ color: "#31415e" }}>
                          Your information is secure.
                        </strong>
                        <br />
                        We use bank-level security to protect your data.
                      </p>
                    </div>
                    <Link
                      to="/"
                      className="portal-edit-btn"
                      style={{ alignSelf: "center" }}
                    >
                      <Pencil size={13} /> Edit Profile
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            <div className="portal-grid" style={{ alignContent: "start" }}>
              <section className="portal-card">
                <div className="portal-card-head">
                  <div>
                    <div className="portal-card-title">
                      Address Information
                    </div>
                    <div className="portal-card-subtitle">
                      Your current residential address
                    </div>
                  </div>
                  <Link to="/" className="portal-edit-btn">
                    <Pencil size={13} /> Edit
                  </Link>
                </div>
                <div className="portal-card-body">
                  <div className="portal-address-row">
                    <div className="portal-address-icon">
                      <Home size={17} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="field-card-label">Current Address</div>
                      <div
                        className="field-card-value"
                        style={{ lineHeight: 1.6 }}
                      >
                        {formatAddress(address) || "Address not available yet"}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="portal-card">
                <div className="portal-card-head">
                  <div>
                    <div className="portal-card-title">Profile Strength</div>
                    <div className="portal-card-subtitle">
                      How complete your saved details are
                    </div>
                  </div>
                  <div className="portal-icon violet">
                    <Sparkles size={18} />
                  </div>
                </div>
                <div className="portal-card-body">
                  <div className="donut-row">
                    <ProfileDonut percent={strength} />
                    <div>
                      <div className="donut-status">
                        <CheckCircle2 size={15} />
                        {strengthTag}
                      </div>
                      <p className="donut-copy">
                        {latest
                          ? "Your profile is well completed."
                          : "Submit an application to build your profile."}
                      </p>
                    </div>
                  </div>
                  <div className="donut-checklist">
                    {[
                      ["Personal details", groups.personal],
                      ["Contact information", groups.contact],
                      ["Employment details", groups.employment],
                      ["Address information", groups.address],
                    ].map(([label, done]) => (
                      <div
                        key={label}
                        className={`donut-check-item ${
                          done ? "" : "is-pending"
                        }`}
                      >
                        <span className="check-dot">
                          <CheckCircle2 size={12} />
                        </span>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="portal-card">
                <div className="portal-card-body">
                  <div className="portal-note">
                    <ShieldCheck
                      size={19}
                      color="#5a65ed"
                      style={{ flex: "none" }}
                    />
                    <p>
                      <strong style={{ color: "#31415e" }}>
                        Your Data, Our Priority.
                      </strong>
                      <br />
                      We follow strict security measures to keep your
                      personal information safe and confidential.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}

export default Profile;
