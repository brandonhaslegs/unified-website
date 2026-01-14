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

<div class="app-content">
	{#if loading}
		<div class="space-y-6 app-meta">Loading...</div>
	{:else}
		<div class="space-y-16">
			<!-- Status Cards -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				{#if nodeStatus}
					<NodeStatusCard {nodeStatus} />
				{/if}
				{#if subscription}
					<SubscriptionCard {subscription} />
				{/if}
			</div>

			<!-- Repositories Section -->
			<div class="app-panel">
				<div class="flex items-center justify-between mb-6">
					<h2 class="section-heading">Seeded Repositories</h2>
					<div class="flex items-center gap-3">
						{#if repositories.length > 0}
							<input
								type="text"
								placeholder="Search repositories..."
								bind:value={searchQuery}
								class="app-input"
							/>
						{/if}
						<button
							on:click={() => (seedModalOpen = true)}
							class="cta-button"
						>
							Seed new repo
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
