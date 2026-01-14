<script lang="ts">
	export let nodeId: string;

	let seedingExpanded = false;
	let configExpanded = false;

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		// Show toast would be better but keeping it simple
		alert('Copied to clipboard!');
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
	<!-- Seeding Private Repositories -->
	<div class="app-panel">
		<button
			on:click={() => (seedingExpanded = !seedingExpanded)}
			class="w-full flex justify-between items-center text-left"
		>
			<h3 class="section-heading">Seeding Private Repositories</h3>
			<svg
				class="w-5 h-5 app-meta transform transition-transform {seedingExpanded
					? 'rotate-180'
					: ''}"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if seedingExpanded}
			<div class="mt-6 space-y-6 app-meta">
				<p>To seed a private repository, you need to add your Always On Node to the repository's allowlist.</p>

				<div>
					<p class="app-meta mb-2">1. Get your node ID:</p>
					<div class="border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono flex items-center justify-between">
						<span>{nodeId || 'Your node ID will appear here'}</span>
						<button
							on:click={() => copyToClipboard(nodeId)}
							class="ml-2 app-meta"
							title="Copy"
						>
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div>
					<p class="app-meta mb-2">2. Add to repository allowlist:</p>
					<div class="border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono">
						<div class="flex items-center justify-between">
							<code>rad remote add --allow hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z</code>
							<button
								on:click={() => copyToClipboard(`rad remote add --allow ${nodeId}`)}
								class="ml-2 app-meta"
								title="Copy"
							>
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div>
					<p class="app-meta mb-2">3. Push changes:</p>
					<div class="border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono">
						<div class="flex items-center justify-between">
							<code>rad push</code>
							<button
								on:click={() => copyToClipboard('rad push')}
								class="ml-2 app-meta"
								title="Copy"
							>
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Configure Local Node -->
	<div class="app-panel">
		<button
			on:click={() => (configExpanded = !configExpanded)}
			class="w-full flex justify-between items-center text-left"
		>
			<h3 class="section-heading">Configure Local Node</h3>
			<svg
				class="w-5 h-5 app-meta transform transition-transform {configExpanded ? 'rotate-180' : ''}"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if configExpanded}
			<div class="mt-6 space-y-6 app-meta">
				<p>Add your Always On Node as a preferred seed for faster access to your repositories.</p>

				<div>
					<p class="app-meta mb-2">Add preferred seed:</p>
					<div class="border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono">
						<div class="flex items-center justify-between">
							<code>rad remote add --seed hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z</code>
							<button
								on:click={() => copyToClipboard(`rad remote add --seed ${nodeId}`)}
								class="ml-2 app-meta"
								title="Copy"
							>
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
