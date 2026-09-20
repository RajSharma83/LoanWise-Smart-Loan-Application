import { create } from "zustand";

import {
  getNextVisibleStepId,
  getPreviousVisibleStepId,
} from "../utils/visibleSteps";

const SUBMITTED_APPLICATIONS_KEY = "loanwise_submitted_applications";

function loadSubmittedApplications() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(
      SUBMITTED_APPLICATIONS_KEY
    );

    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistSubmittedApplications(applications) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      SUBMITTED_APPLICATIONS_KEY,
      JSON.stringify(applications)
    );
  } catch {
    // Ignore localStorage errors so the application submission
    // is never blocked.
  }
}

const TOTAL_STEPS = 9;

const useWizardStore = create((set) => ({
  currentStep: 1,
  totalSteps: TOTAL_STEPS,

  formData: {},
  submittedApplications: loadSubmittedApplications(),

  addSubmittedApplication: (application) =>
    set((state) => {
      const applications = [
        application,
        ...state.submittedApplications,
      ];

      persistSubmittedApplications(applications);

      return {
        submittedApplications: applications,
      };
    }),


  panVerified: false,
  panResult: null,

  setPanVerified: (value) =>
    set({
      panVerified: value,
    }),

  setPanResult: (result) =>
    set({
      panResult: result,
    }),

  aadhaarVerified: false,
  aadhaarResult: null,

  setAadhaarVerified: (value) =>
    set({
      aadhaarVerified: value,
    }),

  setAadhaarResult: (result) =>
    set({
      aadhaarResult: result,
    }),

  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),

  resetForm: () =>
    set({
      currentStep: 1,
      formData: {},

      panVerified: false,
      aadhaarVerified: false,

      panResult: null,
      aadhaarResult: null,

    }),


  nextStep: () =>
    set((state) => ({
      currentStep: getNextVisibleStepId(
        state.currentStep,
        state.formData
      ),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: getPreviousVisibleStepId(
        state.currentStep,
        state.formData
      ),
    })),

  goToStep: (step) =>
    set((state) => ({
      currentStep:
        step >= 1 && step <= state.totalSteps
          ? step
          : state.currentStep,
    })),


  draftChecked: false,

  setDraftChecked: (value) =>
    set({
      draftChecked: value,
    }),

  hydrateFromDraft: (draft) =>
    set({
      currentStep: draft.currentStep,
      formData: draft.formData ?? {},

      panVerified: Boolean(draft.panVerified),
      aadhaarVerified: Boolean(draft.aadhaarVerified),

      draftChecked: true,
    }),


  lastSavedAt: null,
  manualSaveRequested: false,

  requestManualSave: () =>
    set({
      manualSaveRequested: true,
    }),

  markSaved: () =>
    set({
      lastSavedAt: Date.now(),
      manualSaveRequested: false,
    }),
}));

export default useWizardStore;