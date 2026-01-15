<script lang="ts">
	import { onMount } from 'svelte';
	import { getNodeStatus, getRepositories } from '$lib/utils/api';
	import NodeStatusCard from '$lib/components/dashboard/NodeStatusCard.svelte';
	import RepositoriesList from '$lib/components/dashboard/RepositoriesList.svelte';
	import SeedRepositoryForm from '$lib/components/dashboard/SeedRepositoryForm.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { NodeStatus, Repository } from '$lib/utils/api';

	let nodeStatus: NodeStatus | null = null;
	let repositories: Repository[] = [];
	let loading = true;
	let seedModalOpen = false;
	let searchQuery = '';

	onMount(async () => {
		try {
			[nodeStatus, repositories] = await Promise.all([
				getNodeStatus(),
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
				{#if nodeStatus}
					<NodeStatusCard {nodeStatus} repoCount={repositories.length} />
				{/if}

			<!-- Repositories Section -->
			<div class="app-panel">
				<div class="mb-6">
					<h2 class="section-heading">Seeded Repositories</h2>
				</div>
				<div class="repo-actions">
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
						Seed
					</button>
				</div>
				<RepositoriesList {repositories} {searchQuery} />
			</div>

		</div>
	{/if}
</div>

<Modal open={seedModalOpen} title="Seed New Repository" on:close={() => (seedModalOpen = false)}>
	<SeedRepositoryForm on:success={handleSeedSuccess} />
</Modal>
