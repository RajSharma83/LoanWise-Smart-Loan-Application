import { Clock, ShieldAlert } from "lucide-react";

function ComplianceDisclosures() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="neu-surface rounded-2xl bg-white p-6">
        <div className="mb-3 flex items-center gap-2">
          <Clock size={20} className="text-indigo-600" />
          <h3 className="font-semibold text-slate-900">
            Cooling-Off Period
          </h3>
        </div>

        <p className="text-sm text-slate-600">
          Once your loan is disbursed, you have the right to exit this
          loan within a{" "}
          <strong>3-day cooling-off period</strong> without incurring
          any penalty, by repaying the disbursed principal along with
          proportionate (pro-rata) interest for the days the loan was
          held.
        </p>
      </div>

      <div className="neu-surface rounded-2xl bg-white p-6">
        <div className="mb-3 flex items-center gap-2">
          <ShieldAlert size={20} className="text-indigo-600" />
          <h3 className="font-semibold text-slate-900">
            Grievance Redressal
          </h3>
        </div>

        <p className="text-sm text-slate-600">
          For any complaint, first contact LoanWise's Nodal Grievance
          Officer at{" "}
          <span className="font-medium text-slate-800">
            grievance@loanwise.example
          </span>{" "}
          or{" "}
          <span className="font-medium text-slate-800">
            1800-XXX-XXXX
          </span>
          . If unresolved within 30 days, you may escalate to the{" "}
          <strong>RBI Banking Ombudsman</strong> via the{" "}
          <a
            href="https://cms.rbi.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 underline hover:text-indigo-700"
          >
            RBI Complaint Management System
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default ComplianceDisclosures;
