import {
  AlertCircle,
  FileCheck2,
  FileText,
  FolderOpen,
  ShieldCheck,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";
import AppHeader from "../../layouts/AppHeader";
import PageContainer from "../../layouts/PageContainer";
import useWizardStore from "../../store/wizardStore";
import { loanLabel } from "../_shared/portalHelpers";
import "../../styles/portal.css";

function Documents() {
  const apps = useWizardStore((state) => state.submittedApplications || []);
  const latest = apps[0];
  const documents = latest?.documents || [];

  const requiredDocs = documents.filter((doc) => doc.required);
  const uploadedRequired = requiredDocs.filter((doc) => doc.uploaded);
  const uploadedTotal = documents.filter((doc) => doc.uploaded);
  const requiredProgress = requiredDocs.length
    ? Math.round((uploadedRequired.length / requiredDocs.length) * 100)
    : 0;

  return (
    <AppShell>
      <PageContainer>
        <div className="portal-page">
          <AppHeader
            title="Documents"
            subtitle="Keep track of the documents linked to your latest loan application."
            showSaveDraft={false}
          />
          <div className="portal-grid portal-grid-2">
            <section className="portal-card">
              <div className="portal-card-head">
                <div>
                  <div className="portal-card-title">Document centre</div>
                  <div className="portal-card-subtitle">
                    {latest
                      ? `${loanLabel(latest.loanType)} · Latest application`
                      : "Latest application documents"}
                  </div>
                </div>
                <div className="portal-icon violet">
                  <FolderOpen size={19} />
                </div>
              </div>
              <div className="portal-card-body">
                {!latest || documents.length === 0 ? (
                  <div className="portal-empty" style={{ paddingBottom: 10 }}>
                    <div className="portal-empty-icon">
                      <FileText size={27} />
                    </div>
                    <div className="portal-empty-title">
                      Documents are not available yet
                    </div>
                    <div className="portal-empty-copy">
                      Submit an application first. Your document checklist will
                      then appear here.
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{ fontSize: 12, fontWeight: 800, color: "#45536c" }}
                        >
                          Required documents uploaded
                        </span>
                        <span
                          style={{ fontSize: 12, fontWeight: 800, color: "#5260f7" }}
                        >
                          {uploadedRequired.length}/{requiredDocs.length}
                        </span>
                      </div>
                      <div className="mini-progress">
                        <span style={{ width: `${requiredProgress}%` }} />
                      </div>
                    </div>

                    {documents.map((doc) => (
                      <div className="doc-row" key={doc.key}>
                        <div className="doc-row-left">
                          <div
                            className={`doc-row-icon ${doc.uploaded ? "ok" : "pending"}`}
                          >
                            {doc.uploaded ? (
                              <FileCheck2 size={17} />
                            ) : (
                              <FileText size={17} />
                            )}
                          </div>
                          <div>
                            <div className="portal-row-title">
                              {doc.title}
                              {!doc.required && (
                                <span className="doc-badge-optional">
                                  Optional
                                </span>
                              )}
                            </div>
                            <div className="portal-row-meta">
                              {doc.uploaded
                                ? "Submitted with application"
                                : doc.required
                                  ? "Required — not provided"
                                  : "Not provided"}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`portal-status ${doc.uploaded ? "success" : "review"}`}
                        >
                          {doc.uploaded ? (
                            <>
                              <FileCheck2 size={12} /> Uploaded
                            </>
                          ) : (
                            <>
                              <AlertCircle size={12} /> Pending
                            </>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
            <section className="portal-card">
              <div className="portal-card-head">
                <div>
                  <div className="portal-card-title">Secure documents</div>
                  <div className="portal-card-subtitle">
                    Why this area is protected
                  </div>
                </div>
                <div className="portal-icon green">
                  <ShieldCheck size={19} />
                </div>
              </div>
              <div className="portal-card-body">
                <div className="portal-note">
                  <ShieldCheck
                    size={19}
                    color="#239866"
                    style={{ flex: "none", marginTop: 1 }}
                  />
                  <p>
                    Documents are used for application verification and
                    processing. Avoid sharing OTPs, passwords or other account
                    credentials with anyone.
                  </p>
                </div>
                <div className="portal-meta-grid" style={{ marginTop: 14 }}>
                  <div className="portal-meta">
                    <div className="portal-meta-label">Latest application</div>
                    <div className="portal-meta-value">
                      {latest ? "Available" : "Not submitted"}
                    </div>
                  </div>
                  <div className="portal-meta">
                    <div className="portal-meta-label">Documents tracked</div>
                    <div className="portal-meta-value">
                      {documents.length}
                    </div>
                  </div>
                  <div className="portal-meta">
                    <div className="portal-meta-label">Uploaded</div>
                    <div className="portal-meta-value">
                      {uploadedTotal.length}
                    </div>
                  </div>
                  <div className="portal-meta">
                    <div className="portal-meta-label">Pending</div>
                    <div className="portal-meta-value">
                      {documents.length - uploadedTotal.length}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}

export default Documents;
