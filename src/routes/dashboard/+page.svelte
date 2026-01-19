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
	let stickyActive = false;
	let stickySentinel: HTMLDivElement | null = null;
	let stickyObserver: IntersectionObserver | null = null;
	let sortBy:
		| 'updatedDesc'
		| 'updatedAsc'
		| 'sizeDesc'
		| 'sizeAsc'
		| 'fetchState' = 'updatedDesc';

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

	$: if (stickySentinel && !stickyObserver && typeof window !== 'undefined') {
		stickyObserver = new IntersectionObserver(
			([entry]) => {
				stickyActive = !entry.isIntersecting;
			},
			{ rootMargin: '-1px 0px 0px 0px', threshold: 1 }
		);
		stickyObserver.observe(stickySentinel);
	}

	onMount(() => {
		return () => {
			if (stickyObserver) {
				stickyObserver.disconnect();
				stickyObserver = null;
			}
		};
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
				<div class="repo-panel-header repo-panel-header-compact">
					<h2 class="section-heading">Seeded Repositories</h2>
					<button
						on:click={() => (seedModalOpen = true)}
						class="cta-button"
					>
						Seed new repo
					</button>
				</div>
				<div bind:this={stickySentinel} class="repo-actions-sentinel"></div>
				<div
					class="repo-actions repo-actions-sticky"
					class:repo-actions-sticky-active={stickyActive}
				>
					{#if repositories.length > 0}
						<div class="repo-actions-row">
							<div class="repo-search-wrap">
								<input
									type="text"
									placeholder="Search repositories..."
									bind:value={searchQuery}
									class="app-input repo-search repo-input-compact"
								/>
								{#if searchQuery}
									<button
										type="button"
										class="repo-search-clear"
										aria-label="Clear search"
										on:click={() => (searchQuery = '')}
									>
										×
									</button>
								{/if}
							</div>
						</div>
						<div class="repo-actions-row repo-actions-row-inline">
							<label class="repo-sort-label" for="repo-sort">Sort by</label>
							<select id="repo-sort" bind:value={sortBy} class="app-input repo-sort repo-input-compact">
								<option value="updatedDesc">Most recently updated</option>
								<option value="updatedAsc">Least recently updated</option>
								<option value="sizeDesc">Largest repositories</option>
								<option value="sizeAsc">Smallest repositories</option>
								<option value="fetchState">Fetch state</option>
							</select>
						</div>
					{/if}
				</div>
				<RepositoriesList {repositories} {searchQuery} {sortBy} />
			</div>

		</div>
	{/if}
</div>

<Modal open={seedModalOpen} title="Seed New Repository" on:close={() => (seedModalOpen = false)}>
	<SeedRepositoryForm on:success={handleSeedSuccess} />
</Modal>
