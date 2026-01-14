<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { seedRepository } from '$lib/utils/api';
	import { showToast } from '$lib/stores/toast';

	const dispatch = createEventDispatcher();

	let rid = '';
	let loading = false;
	let error = '';

	function validateRid(rid: string): boolean {
		// Basic RID format validation (rad:git:...)
		return /^rad:git:[a-zA-Z0-9]+$/.test(rid.trim());
	}

	async function handleSubmit() {
		error = '';

		if (!rid.trim()) {
			error = 'RID is required';
			return;
		}

		if (!validateRid(rid.trim())) {
			error = 'Invalid RID format. Expected format: rad:git:...';
			return;
		}

		loading = true;
		try {
			await seedRepository(rid.trim());
			showToast('Repository seeded successfully!', 'success');
			rid = '';
			dispatch('success');
		} catch (err: any) {
			error = err.message || 'Failed to seed repository';
			showToast(error, 'error');
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<div class="space-y-2">
		<label for="rid" class="app-meta">Repository ID (RID)</label>
		<input
			id="rid"
			type="text"
			bind:value={rid}
			placeholder="rad:git:..."
			class="app-input font-mono {error ? 'border-red-500' : ''}"
		/>
		{#if error}
			<p class="app-meta text-red-600">{error}</p>
		{/if}
		<p class="app-meta">
			Enter the full RID of the repository you want to seed (e.g., rad:git:hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z)
		</p>
	</div>
	<button type="submit" disabled={loading} class="cta-button">
		{loading ? 'Seeding...' : 'Seed Repository'}
	</button>
</form>
