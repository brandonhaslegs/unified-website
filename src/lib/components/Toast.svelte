<script lang="ts">
	import { toasts, removeToast } from '../stores/toast';
	import { fly } from 'svelte/transition';
</script>

<div class="toast-stack">
	{#each $toasts as toast (toast.id)}
		<div
			class="toast-item"
			transition:fly={{ y: 24, duration: 200 }}
			role="alert"
		>
			<div class="toast-content">
				<p class="toast-message">{toast.message}</p>
				<button
					on:click={() => removeToast(toast.id)}
					class="toast-close"
					aria-label="Close"
				>
					×
				</button>
			</div>
		</div>
	{/each}
</div>
