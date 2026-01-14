<script lang="ts">
	import { onMount } from 'svelte';
	import { formatRelativeTime } from '$lib/utils/format';
	import { unseedRepository } from '$lib/utils/api';
	import { showToast } from '$lib/stores/toast';
	import Modal from '../Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
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
				return 'text-green-600';
			case 'fetching':
				return 'text-yellow-600';
			case 'failed':
				return 'text-red-600';
			default:
				return 'app-meta';
		}
	}
</script>

<div class="space-y-4">
	{#if filteredRepos.length === 0 && repositories.length > 0}
		<p class="app-meta text-center py-4">No repositories found</p>
	{:else if repositories.length === 0}
		<div class="text-center py-8">
			<p class="app-meta">No repositories seeded yet.</p>
			<p class="app-meta mt-1">Add your first repository below.</p>
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="app-table">
				<thead>
					<tr>
						<th class="pr-6">
							Repository
						</th>
						<th class="pr-6">
							RID
						</th>
						<th class="pr-6">
							Status
						</th>
						<th class="pr-6">
							Visibility
						</th>
						<th class="pr-6">
							Last Updated
						</th>
						<th>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredRepos as repo (repo.id)}
						<tr>
							<td class="pr-6">
								<div>{repo.name || 'N/A'}</div>
							</td>
							<td class="pr-6">
								<div class="flex items-center space-x-2">
									<code class="font-mono app-meta">{repo.rid}</code>
									<button
										on:click={() => copyToClipboard(repo.rid)}
										class="app-meta"
										title="Copy RID"
									>
										<Icon name="Copy" size={14} className="icon-current" />
									</button>
								</div>
							</td>
							<td class="pr-6">
								<span
									class="inline-flex app-meta {getStatusBadgeColor(repo.fetchState)}"
								>
									{repo.fetchState.charAt(0).toUpperCase() + repo.fetchState.slice(1)}
								</span>
							</td>
							<td class="pr-6 app-meta">
								{repo.visibility.charAt(0).toUpperCase() + repo.visibility.slice(1)}
							</td>
							<td class="pr-6 app-meta">
								{formatRelativeTime(repo.lastUpdated)}
							</td>
							<td class="app-meta space-x-2">
								{#if repo.visibility === 'public' && repo.fetchState === 'fetched'}
									<a
										href="https://app.radicle.xyz/{nodeId}/{repo.rid}"
										target="_blank"
										rel="noopener noreferrer"
										class="link-highlight"
										title="View in Explorer"
									>
										<Icon name="OpenExternal" size={16} className="icon-current" />
									</a>
								{/if}
								<button
									on:click={() => handleUnseed(repo.rid)}
									class="text-red-600"
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
