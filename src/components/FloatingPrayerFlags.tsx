export const FloatingPrayerFlags = () => {
  const flagColors = [
    'bg-blue-500',    // Blue
    'bg-white',       // White  
    'bg-red-500',     // Red
    'bg-green-500',   // Green
    'bg-yellow-500'   // Yellow
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {/* Prayer Flag Elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-6 h-4 ${flagColors[i % flagColors.length]} opacity-30 prayer-flag-float`}
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.8}s`,
            transform: `rotate(${5 + (i % 3) * 5}deg)`
          }}
        />
      ))}
      
      {/* Additional floating elements for depth */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`depth-${i}`}
          className="absolute w-2 h-2 bg-gold/20 rounded-full prayer-flag-float"
          style={{
            left: `${20 + (i * 20)}%`,
            top: `${30 + (i % 4) * 15}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: '8s'
          }}
        />
      ))}
    </div>
  );
};