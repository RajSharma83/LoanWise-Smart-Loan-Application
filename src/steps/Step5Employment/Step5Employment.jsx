import EmploymentTypeSelector from "./EmploymentTypeSelector";
import EmploymentConditionalSection from "./EmploymentConditionalSection";
import useAnnualIncome from "./constants/useAnnualIncome";

function Step5Employment() {
  useAnnualIncome();

  return (
    <div className="space-y-10 standard-step-content step-five">
      <EmploymentTypeSelector />

      <EmploymentConditionalSection />
    </div>
  );
}

export default Step5Employment;