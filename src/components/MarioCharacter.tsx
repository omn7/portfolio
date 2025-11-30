import { motion } from "framer-motion";

export const MarioCharacter = () => {
  return (
    <svg
      viewBox="0 0 24 32"
      className="w-full h-full"
      style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))" }}
    >
      {/* Side Profile - Mario Running */}
      
      {/* Cap - Red */}
      <rect x="6" y="2" width="12" height="3" fill="#dc143c" />
      <rect x="4" y="4" width="14" height="2" fill="#dc143c" />
      <rect x="2" y="5" width="4" height="2" fill="#dc143c" />
      
      {/* Face/Head - Peach/Tan */}
      <rect x="8" y="6" width="8" height="6" fill="#d4a574" />
      <rect x="6" y="8" width="2" height="4" fill="#d4a574" />
      
      {/* Nose */}
      <rect x="6" y="9" width="2" height="2" fill="#c89664" />
      
      {/* Mustache - Brown */}
      <rect x="4" y="10" width="6" height="2" fill="#8b4513" />
      
      {/* Eye - Black */}
      <rect x="10" y="8" width="2" height="2" fill="#000" />
      
      {/* Body - Red Shirt */}
      <rect x="6" y="12" width="10" height="8" fill="#dc143c" />
      
      {/* Overalls - Blue */}
      <rect x="7" y="14" width="8" height="2" fill="#0047ab" />
      <rect x="9" y="16" width="2" height="2" fill="#ffd700" />
      
      {/* Front Arm (Running Forward) */}
      <rect x="14" y="14" width="4" height="2" fill="#d4a574" />
      <rect x="16" y="16" width="3" height="2" fill="#d4a574" />
      
      {/* Back Arm */}
      <rect x="4" y="16" width="3" height="2" fill="#d4a574" />
      
      {/* Legs - Blue Overalls */}
      <rect x="8" y="20" width="4" height="6" fill="#0047ab" />
      <rect x="12" y="20" width="4" height="4" fill="#0047ab" />
      
      {/* Front Shoe - Brown (Running) */}
      <rect x="12" y="24" width="6" height="3" fill="#654321" />
      <rect x="16" y="26" width="2" height="2" fill="#654321" />
      
      {/* Back Shoe */}
      <rect x="6" y="26" width="4" height="3" fill="#654321" />
    </svg>
  );
};

export default MarioCharacter;
