<script lang="ts">
	import { page } from '$app/stores';

	const primaryNav = [
		{ label: 'Protocol', href: '/protocol' },
		{ label: 'CLI', href: '/cli' },
		{ label: 'Desktop', href: '/desktop' },
		{ label: 'Garden', href: '/garden' }
	];
</script>

<nav class="site-rail" aria-label="Primary site navigation">
	<div role="group" aria-label="Primary links">
		{#each primaryNav as item}
			<a
				href={item.href}
				class={$page.url.pathname.startsWith(item.href) ? 'text-primary-light dark:text-primary-dark' : undefined}
				aria-current={$page.url.pathname.startsWith(item.href) ? 'page' : undefined}
			>
				{item.label}
			</a>
		{/each}
	</div>
	<div class="site-rail-footer" role="group" aria-label="Secondary links">
		<a href="/protocol/guide">Guides &amp; Support</a>
		<a href="/protocol/user-guide">FAQ</a>
		<a href="/updates">Updates</a>
	</div>
</nav>
