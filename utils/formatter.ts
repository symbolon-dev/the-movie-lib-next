import { format, getYear } from 'date-fns';

export function formatDate(date: string | undefined, formatStr: string = 'MMM d, yyyy'): string {
    if (date == null)
        return 'Unknown';
    return format(new Date(date), formatStr);
}

export function formatYear(date: string | undefined): string | number {
    if (date == null)
        return 'Unknown';
    return getYear(new Date(date));
}

export function formatRuntime(minutes: number | undefined): string {
    if (minutes == null)
        return '0min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
}

export function formatCurrency(amount: number | undefined): string {
    if (amount == null)
        return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
}
