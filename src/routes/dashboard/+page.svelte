<script lang="ts">
	import { onMount } from 'svelte';
	import { getNodeStatus, getSubscription, getRepositories } from '$lib/utils/api';
	import NodeStatusCard from '$lib/components/dashboard/NodeStatusCard.svelte';
	import SubscriptionCard from '$lib/components/dashboard/SubscriptionCard.svelte';
	import RepositoriesList from '$lib/components/dashboard/RepositoriesList.svelte';
	import SeedRepositoryForm from '$lib/components/dashboard/SeedRepositoryForm.svelte';
	import HelpCards from '$lib/components/dashboard/HelpCards.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { NodeStatus, Subscription, Repository } from '$lib/utils/api';

	let nodeStatus: NodeStatus | null = null;
	let subscription: Subscription | null = null;
	let repositories: Repository[] = [];
	let loading = true;
	let seedModalOpen = false;
	let searchQuery = '';

	onMount(async () => {
		try {
			[nodeStatus, subscription, repositories] = await Promise.all([
				getNodeStatus(),
				getSubscription(),
				getRepositories()
			]);
		} catch (error) {
			console.error('Failed to load dashboard data:', error);
		} finally {
			loading = false;
		}
	});

	function handleSeedSuccess() {
		seedModalOpen = false;
		// Refresh repositories after successful seed
		getRepositories().then((repos) => {
			repositories = repos;
		});
	}
</script>

<svelte:head>
	<title>Dashboard - Radicle Garden</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	{#if loading}
		<div class="animate-pulse space-y-6">
			<div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
			<div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
			<div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
		</div>
	{:else}
		<div class="space-y-6">
			<!-- Status Cards -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{#if nodeStatus}
					<NodeStatusCard {nodeStatus} />
				{/if}
				{#if subscription}
					<SubscriptionCard {subscription} />
				{/if}
			</div>

			<!-- Repositories Section -->
			<div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Seeded Repositories</h2>
					<div class="flex items-center gap-3">
						{#if repositories.length > 0}
							<input
								type="text"
								placeholder="Search repositories..."
								bind:value={searchQuery}
								class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
							/>
						{/if}
						<button
							on:click={() => (seedModalOpen = true)}
							class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						>
							Seed New Repository
						</button>
					</div>
				</div>
				<RepositoriesList {repositories} {searchQuery} />
			</div>

			<!-- Help Section -->
			<HelpCards nodeId={nodeStatus?.nodeId || ''} />
		</div>
	{/if}
</div>

<Modal open={seedModalOpen} title="Seed New Repository" on:close={() => (seedModalOpen = false)}>
	<SeedRepositoryForm on:success={handleSeedSuccess} />
</Modal>

