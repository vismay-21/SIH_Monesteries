import React, { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
};

export default function ScrollReveal({ children, className = '', rootMargin = '0px 0px -10% 0px', threshold = 0.15 }: Props) {
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [rootMargin, threshold]);

  const base = 'transform transition-all duration-700 ease-out';
  const hidden = 'opacity-0 translate-y-6';
  const shown = 'opacity-100 translate-y-0';

  // If children is a single valid React element, try to clone it and attach the ref + animation classes
  if (React.isValidElement(children)) {
    const child = React.Children.only(children) as React.ReactElement;
    const existingClass = (child.props && child.props.className) ? child.props.className : '';

    // If the child is a DOM element (like 'div', 'section', etc.) we can safely clone it and attach the ref.
    // For custom components (function/class), attaching a ref via cloneElement won't receive a DOM node,
    // so wrap them in a div that receives the ref and animation classes instead.
    if (typeof child.type === 'string') {
      return React.cloneElement(child, {
        ref,
        className: `${existingClass} ${base} ${visible ? shown : hidden} ${className}`.trim(),
      });
    }

    // Wrap non-DOM child in a div so IntersectionObserver can observe a real element.
    return (
      <div ref={ref} className={`${base} ${visible ? shown : hidden} ${className}`}>
        {child}
      </div>
    );
  }

  // Fallback: wrap non-element children
  return (
    <div ref={ref} className={`${base} ${visible ? shown : hidden} ${className}`}> 
      {children}
    </div>
  );
}
