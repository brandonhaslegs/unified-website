<script lang="ts">
	import { toasts } from '../stores/toast';
	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';
</script>

<div class="toast-stack">
	{#each $toasts as toast (toast.id)}
		<div
			class="toast-item"
			in:fly={{ y: 40, duration: 220, opacity: 1, easing: linear }}
			out:fly={{ y: 40, duration: 200, opacity: 1, easing: linear }}
			role="alert"
		>
			<div class="toast-content">
				<p class="toast-message">{toast.message}</p>
			</div>
		</div>
	{/each}
</div>
