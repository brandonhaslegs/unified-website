import { formatDistanceToNow, format } from 'date-fns';

export function formatRelativeTime(date: string | Date): string {
	try {
		return formatDistanceToNow(new Date(date), { addSuffix: true });
	} catch {
		return '';
	}
}

export function formatDate(date: string | Date): string {
	try {
		return format(new Date(date), 'MMM d, yyyy');
	} catch {
		return '';
	}
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency
	}).format(amount);
}

