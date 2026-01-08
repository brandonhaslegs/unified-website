<script lang="ts">
	import type { NodeStatus } from '$lib/utils/api';

	export let nodeStatus: NodeStatus;
</script>

<div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
	<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Node Status</h3>

	<div class="space-y-4">
		<div class="flex items-center">
			<div class="flex-shrink-0">
				<div
					class="h-3 w-3 rounded-full {nodeStatus.running ? 'bg-green-500' : 'bg-red-500'}"
				></div>
			</div>
			<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
				{nodeStatus.running ? 'Running' : 'Stopped'}
			</span>
		</div>

		{#if !nodeStatus.running && nodeStatus.reason}
			<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
				<p class="text-sm text-red-800 dark:text-red-300">{nodeStatus.reason}</p>
			</div>
		{/if}

		<div>
			<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
				<span>Disk Space</span>
				<span>
					{nodeStatus.diskUsed.toFixed(1)} GB / {nodeStatus.diskTotal} GB
				</span>
			</div>
			<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
				<div
					class="bg-green-600 h-2 rounded-full transition-all"
					style="width: {(nodeStatus.diskUsed / nodeStatus.diskTotal) * 100}%"
				></div>
			</div>
		</div>

		<a
			href="https://app.radicle.xyz/nodes/{nodeStatus.nodeId}"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
		>
			View Node Details
			<svg class="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
			</svg>
		</a>
	</div>
</div>

