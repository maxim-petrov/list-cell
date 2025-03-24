import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css';
import './styles/listcell.css';
import './styles/animation.scss';
import './styles/listCellAnimation.css';
import tokens from './tokens/utils/tokenUtils';
import { useTokens } from './context/TokenContext';
import {
  useListCellAnimation,
  hoverAnimation,
  tapAnimation,
  radioAnimation,
  avatarAnimation,
} from './scripts/animation.js';

const Component = ({
  title = 'Заголовок',
  subtitle = 'Подзаголовок',
  name = "list-item",
  selected = false,
  imageSrc = "https://img.dmclk.ru/s200x200q80/vitrina/96/33/9633066a859524b9187b26a37d8833bd6616f24d.jpg",
  onSelect,
  size = 'small'
}) => {
  const { tokenValues: customTokens } = useTokens();
  const [isSelected, setIsSelected] = useState(selected);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, startAnimation, stopAnimation] = useListCellAnimation(
    customTokens?.LIST_CELL_DURATION_M || null,
    customTokens?.LIST_CELL_TAP_DURATION || tokens.LIST_CELL_TAP_DURATION
  );
  const cellRef = useRef(null);
  
  // Synchronize external selection state with internal state
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);
  
  const getAnimationTokens = () => {
    if (customTokens) {
      return {
        hoverDuration: customTokens.LIST_CELL_HOVER_DURATION || tokens.LIST_CELL_HOVER_DURATION,
        tapDuration: customTokens.LIST_CELL_TAP_DURATION || tokens.LIST_CELL_TAP_DURATION,
        radioDuration: customTokens.LIST_CELL_RADIO_DURATION || tokens.LIST_CELL_RADIO_DURATION,
        avatarDuration: customTokens.LIST_CELL_AVATAR_DURATION || tokens.LIST_CELL_AVATAR_DURATION,
        standardEasing: customTokens.LIST_CELL_EASING_STANDARD || tokens.LIST_CELL_EASING_STANDARD,
        springEasing: customTokens.LIST_CELL_EASING_SPRING || tokens.LIST_CELL_EASING_SPRING,
        stiffness: customTokens.LIST_CELL_STIFFNESS || tokens.LIST_CELL_STIFFNESS,
        damping: customTokens.LIST_CELL_DAMPING || tokens.LIST_CELL_DAMPING,
        mass: customTokens.LIST_CELL_MASS || tokens.LIST_CELL_MASS
      };
    } else {
      return {
        hoverDuration: tokens.LIST_CELL_HOVER_DURATION,
        tapDuration: tokens.LIST_CELL_TAP_DURATION,
        radioDuration: tokens.LIST_CELL_RADIO_DURATION,
        avatarDuration: tokens.LIST_CELL_AVATAR_DURATION,
        standardEasing: tokens.LIST_CELL_EASING_STANDARD,
        springEasing: tokens.LIST_CELL_EASING_SPRING,
        stiffness: tokens.LIST_CELL_STIFFNESS,
        damping: tokens.LIST_CELL_DAMPING,
        mass: tokens.LIST_CELL_MASS
      };
    }
  };

  const getCustomTapAnimation = () => {
    const animTokens = getAnimationTokens();
    
    return {
      scale: isPressed ? 0.98 : 1,
      transition: {
        duration: parseFloat(animTokens.tapDuration) / 1000 || 0.15,
        ease: animTokens.springEasing,
        type: "spring",
        stiffness: animTokens.stiffness,
        damping: animTokens.damping,
        mass: animTokens.mass
      }
    };
  };

  const getCustomRadioAnimation = () => {
    const animTokens = getAnimationTokens();
    
    return {
      initial: { scale: 0 },
      animate: { scale: isSelected ? 1 : 0 },
      transition: {
        duration: parseFloat(animTokens.radioDuration) / 1000 || 0.2,
        ease: animTokens.springEasing,
        type: "spring",
        stiffness: animTokens.stiffness,
        damping: animTokens.damping,
        mass: animTokens.mass
      }
    };
  };

  const getCustomAvatarAnimation = () => {
    const animTokens = getAnimationTokens();
    
    return {
      scale: isHovered ? 1.05 : 1,
      rotate: isHovered ? 5 : 0,
      transition: {
        duration: parseFloat(animTokens.avatarDuration) / 1000 || 0.25,
        ease: animTokens.standardEasing,
        type: "tween"
      }
    };
  };
  
  const handleToggle = (e) => {
    // Prevent any default behaviors
    if (e) e.preventDefault();
    
    const newState = !isSelected;
    setIsSelected(newState);
    startAnimation();
    
    if (onSelect) onSelect(name, newState);
  };

  // Separate handler for checkbox
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    handleToggle();
  };
  
  // mouseDown handler
  const handleMouseDown = () => {
    setIsPressed(true);
  };
  
  // mouseUp handler
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  // Hover state handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isPressed) {
      handleMouseUp();
    }
  };
  
  // Add global event listeners for cases when mouseUp happens outside the cell
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isPressed) {
        handleMouseUp();
      }
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isPressed]);
  
  return (
    <motion.div 
      ref={cellRef}
      className={`list-cell-root-0ea-2-2-1 list-cell-withControls-744-2-2-1 ${isSelected ? 'list-cell-selected-0f3-2-2-1' : ''} list-cell`} 
      style={{ 
        padding: '14px 16px', 
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: isPressed ? '#DEDFE3' : (isHovered ? '#F6F7F9' : 'var(--color_bg_control_primary_default, #fff)')
      }}
      tabIndex="0" 
      aria-checked={isSelected}
      data-e2e-id={`listCell_item_${name}`}
      onClick={handleToggle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="checkbox"
      animate={getCustomTapAnimation()}
    >
      <div className="list-cell-wrapper-1a8-2-2-1" style={{ position: 'relative' }}>
        <div className="list-cell-leftSide-8c8-2-2-1" style={{ position: 'relative' }}>
          <div 
            className={`checkbox-root-09c-9-1-0 ${isSelected ? 'checkbox-checked-b61-9-1-0' : ''}`} 
            data-e2e-id={`${name}__label`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            style={{ position: 'relative' }}
          >
            <input 
              className="checkbox-input-688-9-1-0" 
              type="checkbox" 
              id={`checkbox-${name}`}
              name={name} 
              tabIndex="-1" 
              value={name}
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative' }}
            />
            <div className="checkbox-iconContainer-80d-9-1-0" style={{ position: 'relative' }}>
              <div 
                className={`icon-root-864-6-0-3 checkbox-icon-044-9-1-0 list-cell-radio ${isSelected ? 'checkbox-icon-visible' : ''}`}
                style={{ position: 'relative' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" style={{ position: 'relative' }}>
                  <path fill="currentColor" fillRule="evenodd" d="M14.015 4.092a.863.863 0 0 1-.018 1.202l-6.58 6.513a1.232 1.232 0 0 1-1.755-.014L1.994 8.049a.863.863 0 0 1 0-1.203.822.822 0 0 1 1.179 0l3.378 3.448 6.285-6.22a.822.822 0 0 1 1.179.018Z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="list-cell-title-64d-2-2-1" style={{ position: 'relative' }}>
          <div className="list-cell-highlightMatchRoot-160-2-2-1">{title}</div>
          {subtitle && <div className="list-cell-subtitle-bb8-2-2-1">{subtitle}</div>}
        </div>
      </div>
      
      {imageSrc && (
        <div className="list-cell-rightSide-e72-2-2-1" style={{ position: 'relative' }}>
          <motion.div 
            className="avtr-root-912-1-1-4 avtr-small-b73-1-1-4 avtr-circle-5ee-1-1-4 list-cell-avatar"
            animate={getCustomAvatarAnimation()}
          >
            <div className="avtr-inner-125-1-1-4 avtr-primary-9ed-1-1-4">
              <div className="picture-picture-f61-4-0-1" style={{ width: '40px', height: '40px' }}>
                <picture className="picture-pictureContent-486-4-0-1">
                  <source srcSet={imageSrc.replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
                  <img 
                    src={imageSrc} 
                    alt="" 
                    className="picture-image-object-fit--cover-820-4-0-1" 
                    width="40" 
                    height="40" 
                    loading="eager" 
                    style={{ objectPosition: '50% 50%' }}
                  />
                </picture>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Component;
