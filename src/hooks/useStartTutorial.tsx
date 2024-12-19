import { useTutorial } from "@/providers/TutorialContext";
import { useEffect } from "react";

interface TutorialStep {
  target: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}

export const useStartTutorial = () => {
  const { startTutorial } = useTutorial();

  useEffect(() => {
    const tutorialSteps = [
      {
        target: "#header",
        content:
          "Welcome to our website! This is the header where you can find navigation links.",
        placement: "bottom",
      },
      {
        target: "#main-content",
        content:
          "This is the main content area where youll find the most important information.",
        placement: "top",
      },
      {
        target: "#footer",
        content:
          "The footer contains additional links and information about our website.",
        placement: "top",
      },
    ];

    startTutorial(tutorialSteps as TutorialStep[]);
  }, [startTutorial]);
};
