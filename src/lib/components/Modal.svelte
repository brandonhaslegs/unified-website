<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let title = '';
	export let showClose = false;

	const dispatch = createEventDispatcher();

	function close() {
		open = false;
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 overflow-y-auto"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
		on:keydown={handleKeydown}
	>
		<div class="relative flex items-center justify-center min-h-screen px-4 py-6 text-center">
			<!-- Background overlay -->
			<div class="absolute inset-0 bg-black/40 dark:bg-black/70" on:click={close} on:keydown={handleKeydown}></div>

			<!-- Modal panel -->
			<div
				class="relative z-10 inline-block align-bottom bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-sm text-left overflow-hidden sm:my-6 sm:align-middle sm:max-w-lg sm:w-full"
			>
				<div class="bg-white dark:bg-black px-4 py-5 sm:p-6">
					<h3 id="modal-title" class="app-modal-title mb-4">{title}</h3>

					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
