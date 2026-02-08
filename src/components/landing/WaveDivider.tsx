interface WaveDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}

const WaveDivider = ({ fromColor = '#ecfdf5', toColor = '#fffbeb', flip = false }: WaveDividerProps) => {
  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''}`} style={{ marginTop: '-1px' }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px]"
      >
        <defs>
          <linearGradient id={`wave-gradient-${flip ? 'flip' : 'normal'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.69,104.92,115.31,99.65,166.15,81.11A330.57,330.57,0,0,0,321.39,56.44Z"
          fill={`url(#wave-gradient-${flip ? 'flip' : 'normal'})`}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
