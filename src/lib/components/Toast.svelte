<script lang="ts">
	import { toasts, removeToast } from '../stores/toast';

	const typeStyles = {
		success: 'bg-green-50 border-green-200 text-green-800',
		error: 'bg-red-50 border-red-200 text-red-800',
		info: 'bg-blue-50 border-blue-200 text-blue-800',
		warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
	};
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
	{#each $toasts as toast (toast.id)}
		<div
			class="min-w-[300px] p-4 rounded-lg border shadow-lg {typeStyles[toast.type]} transition-all duration-300"
			role="alert"
		>
			<div class="flex items-center justify-between">
				<p class="text-sm font-medium">{toast.message}</p>
				<button
					on:click={() => removeToast(toast.id)}
					class="ml-4 text-gray-400 hover:text-gray-600"
					aria-label="Close"
				>
					×
				</button>
			</div>
		</div>
	{/each}
</div>

