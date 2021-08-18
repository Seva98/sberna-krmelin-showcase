import React from 'react';

const Button = React.forwardRef((props, ref) => {
  const { className, children } = props;
  return (
    <div className={`btn btn-primary ${className}`} ref={ref} {...props}>
      {children}
    </div>
  );
});

Button.displayName = 'Button';
export default Button;
