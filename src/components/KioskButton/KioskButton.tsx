import type { ReactNode } from 'react';
import './KioskButton.css';

interface KioskButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export function KioskButton({
  children,
  onClick,
}: KioskButtonProps) {
  return (
    <button
      className="kiosk-button"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}