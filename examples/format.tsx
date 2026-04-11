import { formatBytes, formatCurrency, formatDate, timeAgo, Time } from '@bloomneo/uikit';

export default function FormatExample() {
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

  return (
    <ul className="space-y-1 text-sm">
      <li>{formatCurrency(1234.56, { currency: 'INR', locale: 'en-IN' })} (en-IN, INR)</li>
      <li>{formatCurrency(1234.56, { currency: 'USD' })} (en-US, USD)</li>
      <li>{formatDate(now, { preset: 'long' })}</li>
      <li>{timeAgo(tenMinutesAgo)}</li>
      <li>{formatBytes(1_572_864)}</li>
      <li>
        Auto-updating: <Time date={tenMinutesAgo} />
      </li>
    </ul>
  );
}
