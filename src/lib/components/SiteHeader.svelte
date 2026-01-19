<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export let ctaLabel = 'Get one for $10/month';
	export let ctaHref = '/auth/signup';
	export let showAuxLinks = true;
	export let auxLinkLabel: string | null = null;
	export let auxLinkHref: string | null = null;
	export let ctaIcon: string | null = null;
	export let ctaCopyText: string | null = null;
	export let showCta = true;
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
		}, 3000);
	}

</script>

<header class="site-header">
	<div class="site-header-row">
		<a class="site-header-brand" href="/">
			<img src="/icons/Logo.svg" alt="radicle" class="site-logo-full" />
		</a>
		<p class="site-header-tagline">Stop building the future on borrowed ground</p>
		<div class="site-header-actions">
			{#if showCta}
				{#if ctaCopyText}
					<button type="button" on:click={handleCtaCopy} class="cta-button" aria-label={ctaLabel}>
						{#if ctaIcon}
							<Icon name={ctaCopied ? 'Checkmark' : ctaIcon} size={14} className="icon-terminal" />
						{/if}
						<span>{ctaLabel}</span>
					</button>
				{:else}
					<a href={ctaHref} class="cta-button" target="_blank" rel="noreferrer">
						{#if ctaIcon}
							<Icon name={ctaIcon} size={14} className="icon-terminal" />
						{/if}
						<span>{ctaLabel}</span>
					</a>
				{/if}
			{/if}
		</div>
	</div>
	{#if showAuxLinks}
		<div class="site-header-row">
			<div class="site-header-actions">
				<a href="/install" class="link-highlight">
					<span>Install Radicle</span>
				</a>
				<a href="/dashboard" class="link-highlight" target="_blank" rel="noreferrer">
					<span>Log in</span>
				</a>
			</div>
		</div>
	{:else if auxLinkLabel && auxLinkHref}
		<div class="site-header-row">
			<div class="site-header-actions">
				<a href={auxLinkHref} class="link-highlight">
					<span>{auxLinkLabel}</span>
				</a>
			</div>
		</div>
	{/if}
</header>
