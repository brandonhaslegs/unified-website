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
	description?: string;
	fetchState: 'fetched' | 'fetching';
	visibility: 'public' | 'private';
	lastUpdated: string;
	storageSize: string;
	issuesCount: number;
	patchesCount: number;
	seedersCount: number;
}

export async function getNodeStatus(): Promise<NodeStatus> {
	// TODO: Replace with real API call
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				running: true,
				diskUsed: 12.5,
				diskTotal: 20,
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
			const baseRepos: Repository[] = [
				{
					id: '1',
					rid: 'rad:git:hnrkmyfz3hqj7wzr8t5k9s2m4p6x8y0z',
					name: 'my-project',
					description: 'Reusable UI primitives for modern product teams.',
					fetchState: 'fetched',
					visibility: 'public',
					lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
					storageSize: '1.2 GB',
					issuesCount: 12,
					patchesCount: 4,
					seedersCount: 5
				},
				{
					id: '2',
					rid: 'rad:git:9dj3k1p7wsa2m4b6c8e0f2h4j6l8n0q2',
					name: 'lighthouse-kite',
					description: 'CI orchestration and release tooling for edge nodes.',
					fetchState: 'fetched',
					visibility: 'private',
					lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
					storageSize: '620 MB',
					issuesCount: 3,
					patchesCount: 1,
					seedersCount: 2
				},
				{
					id: '3',
					rid: 'rad:git:4b6c8d0f2h4j6l8n0q2s4v6x8z0c2e4',
					name: 'aurora-labs',
					description: 'Protocol specs, governance notes, and RFC drafts.',
					fetchState: 'fetching',
					visibility: 'public',
					lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
					storageSize: '210 MB',
					issuesCount: 7,
					patchesCount: 2,
					seedersCount: 4
				},
				{
					id: '4',
					rid: 'rad:git:7f9h1j3l5n7p9r1t3v5x7z9b1d3f5h7j',
					name: 'core-protocol',
					description: 'Core networking and sync stack for distributed repos.',
					fetchState: 'fetched',
					visibility: 'public',
					lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
					storageSize: '3.8 GB',
					issuesCount: 24,
					patchesCount: 9,
					seedersCount: 8
				},
				{
					id: '5',
					rid: 'rad:git:a1c3e5g7i9k1m3o5q7s9u1w3y5a7c9e',
					name: 'design-system',
					description: 'Interface kit, tokens, and shared layout patterns.',
					fetchState: 'fetching',
					visibility: 'private',
					lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
					storageSize: '95 MB',
					issuesCount: 5,
					patchesCount: 2,
					seedersCount: 1
				},
				{
					id: '6',
					rid: 'rad:git:b2d4f6h8j0l2n4p6r8t0v2x4z6b8d0f',
					name: 'node-ops',
					description: 'Operational playbooks and automated node checks.',
					fetchState: 'fetched',
					visibility: 'private',
					lastUpdated: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
					storageSize: '1.9 GB',
					issuesCount: 9,
					patchesCount: 3,
					seedersCount: 6
				}
			];

			const extraRepos: Repository[] = [];
			const namePool = [
				'emberlake',
				'neon-fox',
				'paper-signal',
				'copperfield',
				'lighthouse-kite',
				'cloud-atlas',
				'rosewood',
				'bluebird',
				'midnight-archive',
				'starlight-notes',
				'driftwood',
				'quiet-harbor',
				'cindertrail',
				'pixel-canyon',
				'argon-lab',
				'pinecone',
				'sandstone',
				'riverstone',
				'golden-hour',
				'signal-kitchen',
				'maple-run',
				'oakline',
				'ironleaf',
				'glacier-bay',
				'opal-works',
				'mariner',
				'novel-press',
				'foundry',
				'glint',
				'aurora-labs',
				'harborline',
				'frostline',
				'shadow-loom',
				'atlas-vault',
				'embergrid',
				'quartz-reef',
				'blue-ember',
				'vector-field',
				'orbit-works',
				'topaz-studio',
				'mosslight',
				'cedar-stack',
				'juniper-labs',
				'echo-cove',
				'northstar',
				'rainshadow',
				'lowtide',
				'highwater',
				'wildflower',
				'signal-bridge',
				'copperline',
				'starforge',
				'cloudforge',
				'nightjar',
				'foxglove',
				'rootwork',
				'skyline',
				'redshift',
				'luminance',
				'anchorpoint',
				'fieldnote',
				'waypoint',
				'crestline',
				'snowbound',
				'halcyon',
				'ironclad',
				'clearwater',
				'harborlight',
				'sunstone',
				'baseline',
				'overcast',
				'quicksilver',
				'northwind',
				'rivermark',
				'fireside',
				'openrange',
				'slowburn',
				'cutwater',
				'longform',
				'sweepline',
				'riverbend',
				'coastline',
				'brightleaf',
				'stonebridge',
				'hollowtree',
				'wildridge',
				'emberlane',
				'kindling',
				'bluehaven',
				'openfield',
				'nightwatch',
				'crossbeam',
				'signalflare',
				'mirrorlake',
				'skyloom',
				'softglow',
				'grainline',
				'emberline',
				'northport',
				'daybreak'
			];
			const sizePool = [
				'20 MB',
				'22 MB',
				'24 MB',
				'26 MB',
				'28 MB',
				'30 MB',
				'32 MB',
				'34 MB',
				'36 MB',
				'38 MB',
				'40 MB',
				'42 MB',
				'44 MB',
				'46 MB',
				'48 MB',
				'50 MB',
				'52 MB',
				'54 MB',
				'56 MB',
				'58 MB',
				'60 MB',
				'62 MB',
				'64 MB',
				'66 MB',
				'68 MB',
				'70 MB',
				'72 MB',
				'74 MB',
				'76 MB',
				'78 MB',
				'80 MB',
				'82 MB',
				'84 MB',
				'86 MB',
				'88 MB',
				'90 MB',
				'92 MB',
				'94 MB',
				'96 MB',
				'98 MB',
				'100 MB',
				'102 MB',
				'104 MB',
				'106 MB',
				'108 MB',
				'110 MB',
				'112 MB',
				'114 MB',
				'116 MB',
				'118 MB',
				'120 MB',
				'122 MB',
				'124 MB',
				'126 MB',
				'128 MB',
				'130 MB',
				'132 MB',
				'134 MB',
				'136 MB',
				'138 MB',
				'140 MB',
				'142 MB',
				'144 MB',
				'146 MB',
				'148 MB',
				'150 MB',
				'152 MB',
				'154 MB',
				'156 MB',
				'158 MB',
				'160 MB',
				'162 MB',
				'164 MB',
				'166 MB',
				'168 MB',
				'170 MB',
				'172 MB',
				'174 MB',
				'176 MB',
				'178 MB',
				'180 MB',
				'182 MB',
				'184 MB',
				'186 MB',
				'188 MB',
				'190 MB',
				'192 MB',
				'194 MB',
				'196 MB',
				'198 MB',
				'200 MB',
				'202 MB',
				'204 MB',
				'206 MB'
			];

			for (let i = 1; i <= 94; i += 1) {
				const isPublic = i % 2 === 0;
				const fetchState = i <= 3 ? 'fetching' : 'fetched';
				const hoursAgo = (i + 3) * 6;
				const storageSize = sizePool[(i - 1) % sizePool.length];
				extraRepos.push({
					id: String(baseRepos.length + i),
					rid: `rad:git:demo${i.toString().padStart(2, '0')}a1b2c3d4e5f6g7h8`,
					name: namePool[(i - 1) % namePool.length],
					description: `Project ${i} workspace for experiments and tooling.`,
					fetchState,
					visibility: isPublic ? 'public' : 'private',
					lastUpdated: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
					storageSize,
					issuesCount: (i * 3) % 28,
					patchesCount: (i * 2) % 14,
					seedersCount: (i % 9) + 1
				});
			}

			resolve([...baseRepos, ...extraRepos]);
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
