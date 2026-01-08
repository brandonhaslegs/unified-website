<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	export let title = '';
	export let showClose = true;

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
		<div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
			<!-- Background overlay -->
			<div
				class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
				on:click={close}
				on:keydown={handleKeydown}
			></div>

			<!-- Modal panel -->
			<div
				class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
			>
				<div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					{#if showClose}
						<div class="flex items-center justify-between mb-4">
							<h3 id="modal-title" class="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
							<button
								on:click={close}
								class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
								aria-label="Close"
							>
								×
							</button>
						</div>
					{:else}
						<h3 id="modal-title" class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
					{/if}

					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}

