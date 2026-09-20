import { useEffect, useRef } from "react";

import FormProvider from "../form/FormProvider";

import ProgressBar from "./ProgressBar";
import StepIndicator from "./StepIndicator";
import StepRenderer from "./StepRenderer";
import NavigationButtons from "./NavigationButtons";
import AutoSaveManager from "./AutoSaveManager";

import AppShell from "../../layouts/AppShell";
import AppHeader from "../../layouts/AppHeader";
import PageContainer from "../../layouts/PageContainer";

import useWizardStore from "../../store/wizardStore";

function WizardLayout() {
  const currentStep = useWizardStore((state) => state.currentStep);
  const scrollContainerRef = useRef(null);

  // The form content is the only scrollable region (see
  // `.wizard-form-scroll` in global.css). Reset its scrollTop -
  // not window.scrollTo() - every time the active step changes,
  // so Back/Continue/step-nav always land at the top of the new step.
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 });
  }, [currentStep]);

  return (
    <AppShell>
      <PageContainer>
        {/* ==================================================
            FIXED HEADER
            ================================================== */}
        <div className="wizard-header">
          <AppHeader />
        </div>

        <FormProvider>
          <AutoSaveManager />

          {/* ================================================
              CARD 1 — APPLICATION PROGRESS
              FIXED
              ================================================ */}
          <section className="wizard-progress-card">
            <ProgressBar />

            <div className="wizard-step-indicator">
              <StepIndicator />
            </div>
          </section>

          {/* ================================================
              CARD 2 — LOAN APPLICATION FORM
              FIXED
              ================================================ */}
          <section className="wizard-form-card">
            {/* ==============================================
                ONLY SCROLLABLE AREA
                ============================================== */}
            <div className="wizard-form-scroll" ref={scrollContainerRef}>
              <StepRenderer />
            </div>

            {/* ==============================================
                FIXED NAVIGATION
                ============================================== */}
            <div className="wizard-navigation">
              <NavigationButtons />
            </div>
          </section>
        </FormProvider>
      </PageContainer>
    </AppShell>
  );
}

export default WizardLayout;