// API utilities for fetching node data, subscriptions, etc.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface NodeStatus {
	running: boolean;
	reason?: string;
	diskUsed: number; // GB
	diskTotal: number; // GB
	nodeId: string;
}

export interface Subscription {
	id: string;
	planName: string;
	price: number;
	currency: string;
	nextPaymentDate: string;
	nextPaymentAmount: number;
	status: 'active' | 'canceled' | 'past_due';
}

export interface Repository {
	id: string;
	rid: string;
	name?: string;
	fetchState: 'fetched' | 'fetching' | 'failed';
	visibility: 'public' | 'private';
	lastUpdated: string;
}

export async function getNodeStatus(): Promise<NodeStatus> {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				running: true,
				diskUsed: 12.5,
				diskTotal: 100,
				nodeId: 'hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z'
			});
		}, 500);
	});
}

export async function getSubscription(): Promise<Subscription> {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: 'sub_123',
				planName: 'Always On Node',
				price: 10,
				currency: 'USD',
				nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
				nextPaymentAmount: 10,
				status: 'active'
			});
		}, 500);
	});
}

export async function getRepositories(): Promise<Repository[]> {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: '1',
					rid: 'rad:git:hnrkmyfz3hqj7wzr8t5k9s2m4p6x8y0z',
					name: 'my-project',
					fetchState: 'fetched',
					visibility: 'public',
					lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
				}
			]);
		}, 500);
	});
}

export async function seedRepository(rid: string): Promise<{ success: boolean; message?: string }> {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ success: true });
		}, 1000);
	});
}

export async function unseedRepository(rid: string): Promise<{ success: boolean }> {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ success: true });
		}, 1000);
	});
}

export async function getReceipts() {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 'inv_1',
					date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
					amount: 10,
					currency: 'USD',
					status: 'paid',
					invoiceUrl: '#'
				}
			]);
		}, 500);
	});
}

