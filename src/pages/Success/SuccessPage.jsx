import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  Bell,
  ArrowRight,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";
import PageContainer from "../../layouts/PageContainer";
import Button from "../../components/ui/Button";
import "../Success/Success.css";

function SuccessPage() {
  return (
    <AppShell>
      <PageContainer>
        <div className="w-full py-3 sm:py-4">
          <div className="success-container">
            {/* LEFT / MAIN CONTENT */}
            <div className="success-main">
              {/* Icon */}
              <div className="success-check">
                <CheckCircle2
                  size={42}
                  strokeWidth={2.4}
                />
              </div>

              {/* Status */}
              <div className="success-status">
                <span />
                Application successfully submitted
              </div>

              {/* Heading */}
              <h1>
                Application Submitted
              </h1>

              <p className="success-description">
                Thank you. Your loan application has been received and is
                currently pending pre-approval review. We’ll notify you as
                soon as there is an update.
              </p>

              {/* Reference */}
              <div className="success-reference">
                <span>Application Reference</span>
                <strong>#LW-2026-00124</strong>
              </div>

              {/* Progress */}
              <div className="success-progress">
                <div className="progress-heading">
                  <div>
                    <span>Application progress</span>
                    <strong>Submitted</strong>
                  </div>

                  <span className="progress-percent">
                    1 of 3
                  </span>
                </div>

                <div className="progress-bar">
                  <div />
                </div>

                <div className="success-steps">
                  {/* Step 1 */}
                  <div className="success-step active">
                    <div className="step-icon">
                      <FileCheck2 size={17} />
                    </div>

                    <div>
                      <h3>Application Received</h3>
                      <p>
                        Your application has been submitted successfully.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="success-step">
                    <div className="step-icon">
                      <ClipboardCheck size={17} />
                    </div>

                    <div>
                      <h3>Pre-Approval Review</h3>
                      <p>
                        Our team will review your application and documents.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="success-step">
                    <div className="step-icon">
                      <Bell size={17} />
                    </div>

                    <div>
                      <h3>Decision & Notification</h3>
                      <p>
                        You’ll receive the outcome by email and SMS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="success-bottom">
                {/* Security */}
                <div className="security-box">
                  <div className="security-icon">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <strong>Your information is secure</strong>
                    <p>
                      Your application data is encrypted and handled securely.
                    </p>
                  </div>
                </div>

                {/* Action */}
                <Link to="/dashboard">
                  <Button className="dashboard-button">
                    Go to Dashboard
                    <ArrowRight size={17} />
                  </Button>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE VISUAL */}
            <div className="success-side">
              <div className="side-glow" />

              <div className="side-content">
                <div className="side-icon">
                  <CheckCircle2 size={28} />
                </div>

                <h2>
                  You're all set!
                </h2>

                <p>
                  Your application is safely in our system. You don't need to
                  do anything right now.
                </p>

                <div className="side-info">
                  <div>
                    <span>Current status</span>
                    <strong>Under Review</strong>
                  </div>

                  <div>
                    <span>Notification</span>
                    <strong>Email & SMS</strong>
                  </div>

                  <div>
                    <span>Next step</span>
                    <strong>Pre-Approval Review</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}

export default SuccessPage;
