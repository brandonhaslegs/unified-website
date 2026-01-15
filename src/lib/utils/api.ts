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
	storageSize: string;
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
					lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
					storageSize: '1.2 GB'
				},
				{
					id: '2',
					rid: 'rad:git:9dj3k1p7wsa2m4b6c8e0f2h4j6l8n0q2',
					name: 'garden-client',
					fetchState: 'fetched',
					visibility: 'private',
					lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
					storageSize: '620 MB'
				},
				{
					id: '3',
					rid: 'rad:git:4b6c8d0f2h4j6l8n0q2s4v6x8z0c2e4',
					name: 'radicle-docs',
					fetchState: 'fetching',
					visibility: 'public',
					lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
					storageSize: '210 MB'
				},
				{
					id: '4',
					rid: 'rad:git:7f9h1j3l5n7p9r1t3v5x7z9b1d3f5h7j',
					name: 'core-protocol',
					fetchState: 'fetched',
					visibility: 'public',
					lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
					storageSize: '3.8 GB'
				},
				{
					id: '5',
					rid: 'rad:git:a1c3e5g7i9k1m3o5q7s9u1w3y5a7c9e',
					name: 'design-system',
					fetchState: 'failed',
					visibility: 'private',
					lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
					storageSize: '95 MB'
				},
				{
					id: '6',
					rid: 'rad:git:b2d4f6h8j0l2n4p6r8t0v2x4z6b8d0f',
					name: 'node-ops',
					fetchState: 'fetched',
					visibility: 'private',
					lastUpdated: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
					storageSize: '1.9 GB'
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
