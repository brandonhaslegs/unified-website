// Mock auth API - replace with real implementation
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface SignUpData {
	email: string;
	password: string;
}

export interface SignInData {
	email: string;
	password: string;
}

export async function signUp(data: SignUpData) {
	// TODO: Replace with real API call
	// This is a mock implementation
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				user: {
					id: '1',
					email: data.email,
					emailVerified: false
				},
				message: 'Verification email sent'
			});
		}, 1000);
	});
}

export async function signIn(data: SignInData) {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				user: {
					id: '1',
					email: data.email,
					emailVerified: true
				},
				token: 'mock-jwt-token'
			});
		}, 1000);
	});
}

export async function verifyEmail(token: string) {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				user: {
					id: '1',
					email: 'user@example.com',
					emailVerified: true
				}
			});
		}, 1000);
	});
}

export async function requestPasswordReset(email: string) {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ success: true, message: 'Password reset email sent' });
		}, 1000);
	});
}

export async function resetPassword(token: string, password: string) {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ success: true, message: 'Password reset successful' });
		}, 1000);
	});
}

export function signOut() {
	// This will be handled by the store subscription
	if (typeof window !== 'undefined') {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	}
}

