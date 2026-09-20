import { Link } from "react-router-dom";
import {
  ChevronDown,
  Clock3,
  Folder,
  FolderOpen,
  Headphones,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";
import AppHeader from "../../layouts/AppHeader";
import PageContainer from "../../layouts/PageContainer";
import "../../styles/portal.css";

const faqs = [
  [
    "How do I track my loan application?",
    "Open My Applications to see your submitted applications and their current status.",
  ],
  [
    "Where can I check my documents?",
    "Open Documents to review the document checklist linked to your latest submitted application.",
  ],
  [
    "Can I continue an incomplete application?",
    "Yes. Use the existing Resume flow to continue a saved draft.",
  ],
  [
    "What information should I keep private?",
    "Never share passwords, OTPs, card PINs or other sensitive account credentials with anyone.",
  ],
];

const quickLinks = [
  {
    to: "/applications",
    icon: Folder,
    title: "My Applications",
    copy: "Check status & details",
  },
  {
    to: "/documents",
    icon: FolderOpen,
    title: "Documents",
    copy: "Review your checklist",
  },
  {
    to: "/profile",
    icon: UserRound,
    title: "Profile",
    copy: "View saved information",
  },
];

function Support() {
  return (
    <AppShell>
      <PageContainer>
        <div className="portal-page">
          <AppHeader
            title="Support"
            subtitle="Get quick help while completing and tracking your loan journey."
            showSaveDraft={false}
          />
          <div className="portal-grid portal-grid-3">
            <a
              href="mailto:hellojavaos@gmail.com"
              className="support-action-card"
            >
              <div className="portal-icon">
                <MessageCircle size={20} />
              </div>
              <div className="support-action-title">Email support</div>
              <div className="support-action-copy">
                Send your query to our support team.
              </div>
              <div className="support-action-value" style={{ color: "#5260f7" }}>
                hellojavaos@gmail.com
              </div>
            </a>
            <a href="tel:+918000000000" className="support-action-card">
              <div className="portal-icon green">
                <PhoneCall size={20} />
              </div>
              <div className="support-action-title">Phone support</div>
              <div className="support-action-copy">
                Talk to support when you need direct help.
              </div>
              <div className="support-action-value" style={{ color: "#239866" }}>
                +91 80000 00000
              </div>
            </a>
            <div className="support-action-card" style={{ cursor: "default" }}>
              <div className="portal-icon amber">
                <Clock3 size={20} />
              </div>
              <div className="support-action-title">Support hours</div>
              <div className="support-action-copy">
                For non-urgent questions, email is available anytime.
              </div>
              <div className="support-action-value" style={{ color: "#b87512" }}>
                Mon – Sat · 9:00 AM – 6:00 PM
              </div>
            </div>
          </div>

          <section className="portal-card">
            <div className="portal-card-head">
              <div>
                <div className="portal-card-title">Quick links</div>
                <div className="portal-card-subtitle">
                  Jump straight to what you need
                </div>
              </div>
            </div>
            <div className="portal-card-body">
              <div className="support-quick-links">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      to={link.to}
                      key={link.to}
                      className="support-quick-link"
                    >
                      <div className="support-quick-link-icon">
                        <Icon size={17} />
                      </div>
                      <div>
                        <div className="support-quick-link-title">
                          {link.title}
                        </div>
                        <div className="support-quick-link-copy">
                          {link.copy}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="portal-card">
            <div className="portal-card-head">
              <div>
                <div className="portal-card-title">
                  Frequently asked questions
                </div>
                <div className="portal-card-subtitle">
                  Quick answers to common questions
                </div>
              </div>
              <div className="portal-icon violet">
                <Headphones size={19} />
              </div>
            </div>
            <div className="portal-card-body portal-faq">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <ChevronDown size={17} color="#9aa5b7" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
          <div className="portal-note">
            <ShieldCheck
              size={20}
              color="#5a65ed"
              style={{ flex: "none", marginTop: 1 }}
            />
            <p>
              Your security matters. LoanWise support will never ask you to
              share your password, OTP, PIN or full payment-card details.
            </p>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}

export default Support;
