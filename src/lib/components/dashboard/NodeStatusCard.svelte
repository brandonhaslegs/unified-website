<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { NodeStatus } from '$lib/utils/api';

	export let nodeStatus: NodeStatus;
</script>

<div class="app-panel">
	<h3 class="section-heading">Node Status</h3>

	<div class="space-y-6">
		<div class="flex items-center">
			<div class="flex-shrink-0">
				<div
					class="h-3 w-3 rounded-full {nodeStatus.running ? 'bg-green-500' : 'bg-red-500'}"
				></div>
			</div>
			<span class="ml-3 app-meta text-primary-light dark:text-primary-dark">
				{nodeStatus.running ? 'Running' : 'Stopped'}
			</span>
		</div>

		{#if !nodeStatus.running && nodeStatus.reason}
			<p class="app-meta text-red-600">{nodeStatus.reason}</p>
		{/if}

		<div>
			<div class="flex justify-between app-meta mb-2">
				<span>Disk Space</span>
				<span>
					{nodeStatus.diskUsed.toFixed(1)} GB / {nodeStatus.diskTotal} GB
				</span>
			</div>
			<div class="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
				<div
					class="bg-black dark:bg-white h-2 rounded-full transition-all"
					style="width: {(nodeStatus.diskUsed / nodeStatus.diskTotal) * 100}%"
				></div>
			</div>
		</div>

		<a
			href="https://app.radicle.xyz/nodes/{nodeStatus.nodeId}"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center app-meta link-highlight"
		>
			<span>View Node Details</span>
			<span class="ml-1">
				<Icon name="OpenExternal" size={14} className="icon-current" />
			</span>
		</a>
	</div>
</div>
