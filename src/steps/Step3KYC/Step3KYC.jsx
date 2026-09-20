import { ShieldCheck } from "lucide-react";
import PanInput from "../../features/verification/components/PanInput";
import AadhaarInput from "../../features/verification/components/AadhaarInput";
import VoterIdField from "./fields/VoterIdField";
import PassportField from "./fields/PassportField";

function Step3KYC() {
  return (
    <div className="standard-step-content step-three">
      <div style={{ marginBottom: "24px" }}>
        <h2 className="text-2xl font-bold text-slate-900 step-title-with-icon">
          <span className="step-title-icon">
            <ShieldCheck size={21} strokeWidth={2.2} />
          </span>
          <span>KYC Verification</span>
        </h2>

        <p className="mt-3 text-slate-500">
          Verify your PAN and Aadhaar before continuing.
        </p>
      </div>

      <div style={{ marginBottom: "18px" }}>
        <PanInput />
      </div>

      <div style={{ marginBottom: "18px" }}>
        <AadhaarInput />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <VoterIdField />

        <PassportField />
      </div>
    </div>
  );
}

export default Step3KYC;