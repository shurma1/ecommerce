import {RefObject, useEffect} from 'react';
import classes from './useRipple.module.scss';


const RIPPLE_DEFAULT_COLOR = 'rgba(255, 255, 255, 0.17)';
const RIPPLE_DEFAULT_DURATION = 700;

interface RippleOptions {
    disabled: boolean;
    color?: string;
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
    const timeStamp = Date.now();

    const {
        height,
        width,
        top,
        left
    } = element.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const rippleSize = Math.max(height, width);

    const positionTop = clientX
        ? y - rippleSize / 2
        : rippleSize / 2 - height / 2;

    const positionLeft = clientY
        ? x - rippleSize / 2
        : width / 2 - rippleSize / 2;

    const duration = options?.duration || RIPPLE_DEFAULT_DURATION;

    const span = document.createElement('span');

    span.style.cssText = `
        --ripple-duration: ${duration}ms;
    `;

    span.style.top = `${positionTop}px`;
    span.style.left = `${positionLeft}px`;
    span.style.width = `${rippleSize}px`;
    span.style.height = `${rippleSize}px`;
    span.style.backgroundColor = options?.color || RIPPLE_DEFAULT_COLOR;
    span.style.opacity = '0';

    span.classList.add(classes.ripple);

    element.appendChild(span);
    window.getComputedStyle(span).opacity; // костыль для плавного появления ripple
    span.style.opacity = '1';

    const handleMouseUp = () => {
        document.removeEventListener('mouseup',handleMouseUp);

        const time = Date.now() - timeStamp;
        const partDuration =  time < duration/3
            ? duration/3 - time
            : 0;

        setTimeout(() => {
            span.style.opacity = '0';

            setTimeout(() => {
                element.removeChild(span);
            }, RIPPLE_DEFAULT_DURATION / 2);

        }, partDuration);
    };
    document.addEventListener('mouseup',handleMouseUp);
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