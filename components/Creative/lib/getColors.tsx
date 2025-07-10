export function getGradientDef(fill: string, id: string) {
  if (!fill.startsWith('linear-gradient') && !fill.startsWith('radial-gradient')) return null;

  // Parse the gradient string (simple CSS parser for linear/radial gradients)
  // Example: linear-gradient(90deg, rgba(27,107,235,1) 0%, rgba(25,245,157,1) 100%)
  const isLinear = fill.startsWith('linear-gradient');
  const angleOrShape = fill.match(/\(([^,]+),/);
  const stops = [...fill.matchAll(/(rgba?\([^)]+\)|#[0-9a-fA-F]+)\s*([\d.]+%?)/g)];
  const colors = stops.map((s) => ({
    color: s[1],
    offset: s[2],
  }));

  if (isLinear) {
    // Extract angle in deg, fallback to 90
    const angle = angleOrShape ? parseFloat(angleOrShape[1]) : 90;
    // SVG gradient rotation: 0deg is left-to-right, so we need to convert CSS angle
    // CSS 0deg is up, SVG 0deg is left-to-right, so rotate by -90deg
    const rad = ((angle - 90) * Math.PI) / 180;
    const x1 = 50 + Math.cos(rad) * 50;
    const y1 = 50 + Math.sin(rad) * 50;
    const x2 = 50 + Math.cos(rad + Math.PI) * 50;
    const y2 = 50 + Math.sin(rad + Math.PI) * 50;

    return (
      <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}>
        {colors.map((stop, i) => (
          <stop key={i} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
    );
  } else {
    // Radial gradient
    return (
      <radialGradient id={id} cx="50%" cy="50%" r="50%">
        {colors.map((stop, i) => (
          <stop key={i} offset={stop.offset} stopColor={stop.color} />
        ))}
      </radialGradient>
    );
  }
}

export function getFillUrl(fill: string, id: string) {
  if (fill.startsWith('linear-gradient') || fill.startsWith('radial-gradient')) {
    return `url(#${id})`;
  }
  return fill;
}