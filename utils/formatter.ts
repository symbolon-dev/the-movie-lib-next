import { format, getYear } from 'date-fns';

export const formatDate = (date: string | undefined, formatStr: string = 'MMM d, yyyy'): string => {
    if (!date) return 'Unknown';
    return format(new Date(date), formatStr);
};

export const formatYear = (date: string | undefined): string | number => {
    if (!date) return 'Unknown';
    return getYear(new Date(date));
};

export const formatRuntime = (minutes: number | undefined): string => {
    if (!minutes) return '0min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
};

export const formatCurrency = (amount: number | undefined): string => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
};
