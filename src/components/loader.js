// loader.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    position: relative;
    width: max-content;
    max-width: 150px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    
    .gatsby-image-wrapper,
    img {
      display: block;
      width: 100%;
      height: auto;
      margin: 0 auto;
      user-select: none;
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      
      path {
        fill: none;
        stroke: var(--green);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      // Animate the hexagon stroke drawing
      .add({
        targets: '#hex-outline',
        delay: 300,
        duration: 1500,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
      })
      // Fade in the logo image
      .add({
        targets: '.logo-wrapper .gatsby-image-wrapper',
        duration: 700,
        easing: 'easeInOutQuart',
        opacity: [0, 1],
      }, '-=1000') // Start 1000ms before previous animation ends
      // Scale out everything
      .add({
        targets: '.logo-wrapper',
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      // Hide loader
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <StaticImage
          className="img"
          src="../images/as-logo.png"
          quality={100}
          alt="logo"
          backgroundColor="transparent"
          placeholder="none"
          style={{ opacity: 0 }}
        />
        
        {/* Animated hexagon overlay */}
        <svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <path
            id="hex-outline"
            d="M 60, 8
               L 15, 32
               L 15, 80
               L 60, 104
               L 105, 80
               L 105, 32 z"
          />
        </svg>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;