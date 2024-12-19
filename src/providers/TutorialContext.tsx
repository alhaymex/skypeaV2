"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface TutorialStep {
  target: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}

interface TutorialContextType {
  isActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  startTutorial: (steps: TutorialStep[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  endTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TutorialStep[]>([]);

  const startTutorial = useCallback((newSteps: TutorialStep[]) => {
    setSteps(newSteps);
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsActive(false);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const endTutorial = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStep,
        steps,
        startTutorial,
        nextStep,
        prevStep,
        endTutorial,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider");
  }
  return context;
};
