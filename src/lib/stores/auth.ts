import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface User {
	id: string;
	email: string;
	emailVerified: boolean;
}

export const user = writable<User | null>(null);

export const isAuthenticated = writable(false);

// Initialize from localStorage
if (browser) {
	const stored = localStorage.getItem('user');
	if (stored) {
		try {
			const userData = JSON.parse(stored);
			user.set(userData);
			isAuthenticated.set(true);
		} catch {
			// Invalid stored data
			localStorage.removeItem('user');
		}
	}
}

// Subscribe to user changes and update localStorage
user.subscribe((value) => {
	if (browser) {
		if (value) {
			localStorage.setItem('user', JSON.stringify(value));
			isAuthenticated.set(true);
		} else {
			localStorage.removeItem('user');
			isAuthenticated.set(false);
		}
	}
});

