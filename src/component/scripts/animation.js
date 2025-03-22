import { useEffect, useState } from 'react';
import tokens from '../tokens/utils/tokenUtils.js';
import { extractMs } from './utils.js';

export const useListCellAnimation = (customDuration = null, customTransitionDuration = null) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      let animationDuration;
      
      if (customTransitionDuration) {
        animationDuration = extractMs(customTransitionDuration);
      } else if (customDuration) {
        animationDuration = extractMs(customDuration);
      } else {
        animationDuration = extractMs(tokens.LIST_CELL_DURATION_M);
      }

      const durationWithBuffer = animationDuration + 50;

      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, durationWithBuffer);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, customDuration, customTransitionDuration]);

  const startAnimation = () => setIsAnimating(true);
  const stopAnimation = () => setIsAnimating(false);

  return [isAnimating, startAnimation, stopAnimation];
};

export const getHoverAnimationConfig = (tokens) => ({
  transition: {
    duration: extractMs(tokens.LIST_CELL_HOVER_DURATION) / 1000,
    ease: tokens.LIST_CELL_EASING_STANDARD,
    type: "tween"
  }
});

export const getTapAnimationConfig = (tokens) => ({
  transition: {
    duration: extractMs(tokens.LIST_CELL_TAP_DURATION) / 1000,
    ease: tokens.LIST_CELL_EASING_SPRING,
    type: "spring",
    stiffness: tokens.LIST_CELL_STIFFNESS,
    damping: tokens.LIST_CELL_DAMPING,
    mass: tokens.LIST_CELL_MASS
  }
});

export const getRadioAnimationConfig = (tokens) => ({
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
  transition: {
    duration: extractMs(tokens.LIST_CELL_RADIO_DURATION) / 1000,
    ease: tokens.LIST_CELL_EASING_SPRING,
    type: "spring",
    stiffness: tokens.LIST_CELL_STIFFNESS,
    damping: tokens.LIST_CELL_DAMPING,
    mass: tokens.LIST_CELL_MASS
  }
});

export const getAvatarAnimationConfig = (tokens) => ({
  initial: { scale: 1, rotate: 0 },
  hover: { scale: 1.05, rotate: 5 },
  transition: {
    duration: extractMs(tokens.LIST_CELL_AVATAR_DURATION) / 1000,
    ease: tokens.LIST_CELL_EASING_STANDARD,
    type: "tween"
  }
});

// For creating static exports, get tokens at module load time
const staticTokens = tokens;

// Export pre-configured animations with current CSS variable values
export const hoverAnimation = getHoverAnimationConfig(staticTokens);
export const tapAnimation = getTapAnimationConfig(staticTokens);
export const radioAnimation = getRadioAnimationConfig(staticTokens);
export const avatarAnimation = getAvatarAnimationConfig(staticTokens);
