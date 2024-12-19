"use client";

import React from "react";
import { useTutorial } from "@/providers/TutorialContext";
import { TutorialBubble } from "./TutorialBubble";

export const Tutorial: React.FC = () => {
  const { isActive, currentStep, steps, nextStep, prevStep, endTutorial } =
    useTutorial();

  if (!isActive) return null;

  const currentTutorialStep = steps[currentStep];

  return (
    <TutorialBubble
      target={currentTutorialStep.target}
      content={currentTutorialStep.content}
      placement={currentTutorialStep.placement}
      onNext={nextStep}
      onPrev={prevStep}
      onSkip={endTutorial}
      isFirst={currentStep === 0}
      isLast={currentStep === steps.length - 1}
    />
  );
};
