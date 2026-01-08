<script lang="ts">
	import { onMount } from 'svelte';
	import { formatRelativeTime } from '$lib/utils/format';
	import { unseedRepository } from '$lib/utils/api';
	import { showToast } from '$lib/stores/toast';
	import Modal from '../Modal.svelte';
	import type { Repository } from '$lib/utils/api';
	import { getNodeStatus } from '$lib/utils/api';

	export let repositories: Repository[];
	export let searchQuery = '';

	let nodeId = '';

	$: filteredRepos = repositories.filter((repo) => {
		if (!searchQuery) return true;
		const query = searchQuery.toLowerCase();
		return (
			repo.rid.toLowerCase().includes(query) ||
			repo.name?.toLowerCase().includes(query) ||
			false
		);
	});

	let unseedingRid: string | null = null;
	let unseedModalOpen = false;

	onMount(async () => {
		try {
			const status = await getNodeStatus();
			nodeId = status.nodeId;
		} catch {
			// Ignore error
		}
	});

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		showToast('Copied to clipboard!', 'success');
	}

	function handleUnseed(rid: string) {
		unseedingRid = rid;
		unseedModalOpen = true;
	}

	async function confirmUnseed() {
		if (!unseedingRid) return;

		try {
			await unseedRepository(unseedingRid);
			repositories = repositories.filter((r) => r.rid !== unseedingRid);
			showToast('Repository unseeded successfully', 'success');
			unseedModalOpen = false;
			unseedingRid = null;
		} catch (error: any) {
			showToast(error.message || 'Failed to unseed repository', 'error');
		}
	}

	function getStatusBadgeColor(state: string) {
		switch (state) {
			case 'fetched':
				return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
			case 'fetching':
				return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
			case 'failed':
				return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
			default:
				return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
		}
	}
</script>

<div class="space-y-4">
	{#if filteredRepos.length === 0 && repositories.length > 0}
		<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No repositories found</p>
	{:else if repositories.length === 0}
		<div class="text-center py-8">
			<p class="text-sm text-gray-500 dark:text-gray-400">No repositories seeded yet.</p>
			<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Add your first repository below.</p>
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
				<thead class="bg-gray-50 dark:bg-gray-700">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
							Repository
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
							RID
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
							Status
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
							Visibility
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
							Last Updated
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
					{#each filteredRepos as repo (repo.id)}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="text-sm font-medium text-gray-900 dark:text-gray-100">{repo.name || 'N/A'}</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center space-x-2">
									<code class="text-sm font-mono text-gray-600 dark:text-gray-300">{repo.rid}</code>
									<button
										on:click={() => copyToClipboard(repo.rid)}
										class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
										title="Copy RID"
									>
										<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
											/>
										</svg>
									</button>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getStatusBadgeColor(repo.fetchState)}"
								>
									{repo.fetchState.charAt(0).toUpperCase() + repo.fetchState.slice(1)}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
								{repo.visibility.charAt(0).toUpperCase() + repo.visibility.slice(1)}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
								{formatRelativeTime(repo.lastUpdated)}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
								{#if repo.visibility === 'public' && repo.fetchState === 'fetched'}
									<a
										href="https://app.radicle.xyz/{nodeId}/{repo.rid}"
										target="_blank"
										rel="noopener noreferrer"
										class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
										title="View in Explorer"
									>
										<svg class="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</a>
								{/if}
								<button
									on:click={() => handleUnseed(repo.rid)}
									class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
									title="Unseed"
								>
									Unseed
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<Modal open={unseedModalOpen} title="Unseed Repository" on:close={() => (unseedModalOpen = false)}>
	<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
		Are you sure you want to unseed this repository? This will remove it from your Always On Node.
	</p>
	<div class="flex space-x-3">
		<button
			on:click={() => (unseedModalOpen = false)}
			class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
		>
			Cancel
		</button>
		<button
			on:click={confirmUnseed}
			class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
		>
			Unseed
		</button>
	</div>
</Modal>

