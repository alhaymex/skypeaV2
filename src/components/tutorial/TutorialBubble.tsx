import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface TutorialBubbleProps {
  target: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const TutorialBubble: React.FC<TutorialBubbleProps> = ({
  target,
  content,
  placement = "bottom",
  onNext,
  onPrev,
  onSkip,
  isFirst,
  isLast,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback(() => {
    const targetElement = document.querySelector(target);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const bubbleWidth = 320;
      const bubbleHeight = 150;
      const margin = 10;

      let top = 0;
      let left = 0;

      switch (placement) {
        case "top":
          top = rect.top - bubbleHeight - margin;
          left = rect.left + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + margin;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - bubbleWidth - margin;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + margin;
          break;
      }

      if (left < margin) left = margin;
      if (left + bubbleWidth > window.innerWidth - margin)
        left = window.innerWidth - bubbleWidth - margin;
      if (top < margin) top = margin;
      if (top + bubbleHeight > window.innerHeight - margin)
        top = window.innerHeight - bubbleHeight - margin;

      setPosition({ top, left });
      setIsVisible(true);
    }
  }, [target, placement]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const targetElement = document.querySelector(target);
      if (targetElement) {
        observer.disconnect();
        updatePosition();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [updatePosition, target]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <p className="mb-4">{content}</p>
      <div className="flex justify-between">
        {!isFirst && (
          <Button onClick={onPrev} variant="outline" size="sm">
            Previous
          </Button>
        )}
        {!isLast ? (
          <Button onClick={onNext} variant="default" size="sm">
            Next
          </Button>
        ) : (
          <Button onClick={onSkip} variant="default" size="sm">
            Finish
          </Button>
        )}
      </div>
      <Button
        onClick={onSkip}
        variant="ghost"
        size="sm"
        className="mt-2 w-full"
      >
        Skip Tutorial
      </Button>
    </div>
  );
};
