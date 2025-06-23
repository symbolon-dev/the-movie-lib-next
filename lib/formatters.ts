import dayjs from 'dayjs';

export const formatDate = (date: string | undefined, format: string = 'MMM D, YYYY'): string => {
    if (!date) return 'Unknown';
    return dayjs(date).format(format);
};

export const formatYear = (date: string | undefined): string | number => {
    if (!date) return 'Unknown';
    return dayjs(date).year();
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
