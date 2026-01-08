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

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div>
			<label for="rid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
				Repository ID (RID)
			</label>
			<input
				id="rid"
				type="text"
				bind:value={rid}
				placeholder="rad:git:..."
				class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 {error
					? 'border-red-500 dark:border-red-500'
					: ''}"
			/>
			{#if error}
				<p class="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
			{/if}
			<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
				Enter the full RID of the repository you want to seed (e.g., rad:git:hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z)
			</p>
		</div>
		<button
			type="submit"
			disabled={loading}
			class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{loading ? 'Seeding...' : 'Seed Repository'}
		</button>
	</form>

