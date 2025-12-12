export function isValidDate(d){
  return d instanceof Date && !Number.isNaN(d.getTime());
}

export function parseDate(value){
  if (!value) return null;
  const d = new Date(value);
  return isValidDate(d) ? d : null;
}

export function formatDateTime(value){
  const d = typeof value === 'string' ? parseDate(value) : value;
  if (!d) return '';
  return d.toLocaleString(undefined, { year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit' });
}

export function formatDate(value){
  const d = typeof value === 'string' ? parseDate(value) : value;
  if (!d) return '';
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'2-digit' });
}

export function formatDateRange(from, to){
  const df = parseDate(from);
  const dt = parseDate(to);
  if (df && dt) return `${formatDateTime(df)} → ${formatDateTime(dt)}`;
  if (df) return `${formatDateTime(df)}`;
  if (dt) return `${formatDateTime(dt)}`;
  return '';
}
