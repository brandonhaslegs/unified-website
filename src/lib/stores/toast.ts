import { writable } from 'svelte/store';

export interface Toast {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
	duration?: number;
}

export const toasts = writable<Toast[]>([]);

export function showToast(message: string, type: Toast['type'] = 'info', duration = 3000) {
	const id = Math.random().toString(36).substring(7);
	const toast: Toast = { id, message, type, duration };

	toasts.update((current) => [...current, toast]);

	if (duration > 0) {
		setTimeout(() => {
			toasts.update((current) => current.filter((t) => t.id !== id));
		}, duration);
	}

	return id;
}

export function removeToast(id: string) {
	toasts.update((current) => current.filter((t) => t.id !== id));
}

