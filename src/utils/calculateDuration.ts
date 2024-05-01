export default function calculateDuration(
  dateFrom1: Date,
  dateTo1: Date,
  dateFrom2: Date,
  dateTo2: Date
): number {
  const fromDate = dateFrom1 > dateFrom2 ? dateFrom1 : dateFrom2;
  const toDate = dateTo1 < dateTo2 ? dateTo1 : dateTo2;
  return Math.max(0, toDate.getTime() - fromDate.getTime());
}
