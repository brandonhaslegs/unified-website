<script lang="ts">
	import { onMount } from 'svelte';
	import { getNodeStatus } from '$lib/utils/api';
	import HelpCards from '$lib/components/dashboard/HelpCards.svelte';

	let nodeId = '';
	let loading = true;

	onMount(async () => {
		try {
			const status = await getNodeStatus();
			nodeId = status.nodeId;
		} catch (error) {
			console.error('Failed to load node status:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Help - Radicle Garden</title>
</svelte:head>

<div class="app-content">
	<div class="help-cards">
		<a class="help-card" href="/guides">
			<h2>Guides</h2>
			<p>Comprehensive guides for users, protocol internals, and seeders.</p>
			<span>Read guides →</span>
		</a>
		<a class="help-card" href="/faq">
			<h2>FAQ</h2>
			<p>Find answers to our commonly received questions.</p>
			<span>Browse FAQ →</span>
		</a>
		<a class="help-card" href="https://radicle.zulipchat.com/" target="_blank" rel="noreferrer">
			<h2>Support</h2>
			<p>Get answers from our community or share your thoughts on Zulip.</p>
			<span>Open Zulip →</span>
		</a>
	</div>
	{#if loading}
		<div class="app-meta">Loading...</div>
	{:else}
		<HelpCards nodeId={nodeId} />
	{/if}
</div>
