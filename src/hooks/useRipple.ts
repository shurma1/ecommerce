import {RefObject, useEffect} from 'react';

const ROOT_ANIMATION_NAME = 'use-ripple-';
const ANIMATION_OPACITY = ROOT_ANIMATION_NAME+ 'opacity-animation';
const ANIMATION_SCALE = ROOT_ANIMATION_NAME+ 'scale-animation';

const SCALE_FACTOR = 10;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');

    style.innerHTML = `
    @keyframes ${ANIMATION_OPACITY} {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @keyframes ${ANIMATION_SCALE} {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(${SCALE_FACTOR});
      }
    }
    `;

    document.querySelector('head')?.appendChild(style);
}

const RIPPLE_DEFAULT_OPTIONS = {
    SIZE: 50,
    DURATION: 500,
    COLOR: 'rgba(255, 255, 255, 0.17)',
};

interface RippleOptions {
    disabled: boolean;
    color?: string;
    size?: number;
    duration?: number;
}

interface Event {
    clientX?: number;
    clientY?: number;
    target: EventTarget | null;
}

const defaultEvent: Required<Event> = {
    clientX: 0,
    clientY: 0,
    target: null,
};

const createRipple = (
    element: HTMLElement,
    options?: RippleOptions
) => (
    event?: Event
) => {

    const clientX = event?.clientX || defaultEvent.clientX;
    const clientY = event?.clientY || defaultEvent.clientY;

    const {
        height,
        width,
        top,
        left
    } = element.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const rippleSize = options?.size || RIPPLE_DEFAULT_OPTIONS.SIZE;

    const positionTop = clientX
        ? y - rippleSize / 2
        : rippleSize / 2 - height / 2;

    const positionLeft = clientY
        ? x - rippleSize / 2
        : width / 2 - rippleSize / 2;

    const span = document.createElement('span');

    span.style.top = `${positionTop}px`;
    span.style.left = `${positionLeft}px`;
    span.style.position = 'absolute';
    span.style.borderRadius = '50%';
    span.style.backgroundColor = options?.color || RIPPLE_DEFAULT_OPTIONS.COLOR;
    span.style.pointerEvents = 'none';
    span.style.width = `${rippleSize}px`;
    span.style.height = `${rippleSize}px`;
    span.style.transition = `${options?.duration || RIPPLE_DEFAULT_OPTIONS.DURATION}ms ease-in`;
    span.style.transform = `scale(${SCALE_FACTOR})`;
    span.style.animation = `${ANIMATION_SCALE} ${options?.duration || RIPPLE_DEFAULT_OPTIONS.DURATION}ms ease-in`;
    element.appendChild(span);


    element.addEventListener('mouseup',() => {
        span.style.animation += `, ${ANIMATION_OPACITY} ${options?.duration || RIPPLE_DEFAULT_OPTIONS.DURATION}ms ease-in`;
        span.addEventListener('animationend', (e) => {
            if(e.animationName !== ANIMATION_OPACITY) {
                return;
            }
            if(element.contains(span)){
                element.removeChild(span);
            }

        });
    });


};


export const useRipple = (
    ref: RefObject<HTMLElement>,
    options?: RippleOptions,
) => {
    console.log(options);
    useEffect(() => {
        if (options?.disabled || !ref?.current) {
            return;
        }

        const element = ref.current;
        const elementPosition = getComputedStyle(element).getPropertyValue(
            'position',
        );

        element.style.position =
            elementPosition === 'static' || !elementPosition
                ? 'relative'
                : elementPosition;

        element.style.overflow = 'hidden';

        const ripple = createRipple(element, options);

        element.addEventListener('mousedown', ripple);

        return () => {
            element.removeEventListener('mousedown', ripple);
        };


    }, []);
};