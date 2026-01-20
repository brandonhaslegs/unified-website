<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export let tagline = 'Stop building the future on borrowed ground';
	export let ctaLabel = 'Install Radicle 1.5.0';
	export let ctaHref = '/install';
	export let showCta = true;
	export let ctaCopyText: string | null = null;
	let ctaCopied = false;
	let ctaCopyTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleCtaCopy() {
		if (!ctaCopyText) return;
		navigator.clipboard.writeText(ctaCopyText);
		ctaCopied = true;
		if (ctaCopyTimeout) {
			clearTimeout(ctaCopyTimeout);
		}
		ctaCopyTimeout = setTimeout(() => {
			ctaCopied = false;
		}, 2000);
	}
</script>

<div class="content-topbar">
	<p class="content-tagline">{tagline}</p>
	{#if showCta}
		{#if ctaCopyText}
			<button type="button" class="cta-button" on:click={handleCtaCopy}>
				<span>{ctaCopied ? 'Copied' : ctaLabel}</span>
				<Icon name="Copy" size={20} className="icon-current" />
			</button>
		{:else}
			<a href={ctaHref} class="cta-button">
				<span>{ctaLabel}</span>
			</a>
		{/if}
	{:else}
		<div class="content-topbar-right" aria-hidden="true"></div>
	{/if}
</div>
