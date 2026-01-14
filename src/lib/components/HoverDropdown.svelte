<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export type DropdownItem = {
		label: string;
		value: string;
	};

	export let items: DropdownItem[] = [];
	export let value: string;
	export let label = '';
	export let buttonClass = '';
	export let menuClass = '';
	export let itemClass = '';
export let activeClass = '';
export let chevronClass = 'icon-current';
export let chevronSize = 14;
export let ariaLabel = '';
export let immediateClose = false;

	let open = false;
	let closing = false;
	let closeTimeout: ReturnType<typeof setTimeout> | null = null;
	const menuDuration = 140;

	$: selectedLabel = items.find((item) => item.value === value)?.label ?? label;

	function beginClose() {
		if (!open) return;
		if (immediateClose) {
			open = false;
			closing = false;
			return;
		}
		closing = true;
		if (closeTimeout) {
			clearTimeout(closeTimeout);
		}
		closeTimeout = setTimeout(() => {
			open = false;
			closing = false;
		}, items.length * menuDuration);
	}

	function handleSelect(item: DropdownItem) {
		dispatch('change', item.value);
		beginClose();
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ change: string }>();
</script>

<div
	class="relative inline-flex"
	on:mouseenter={() => {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		closing = false;
		open = true;
	}}
	on:mouseleave={beginClose}
>
	<button
		type="button"
		class={buttonClass}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label={ariaLabel || undefined}
		on:click={() => (open = !open)}
	>
		<span>{selectedLabel}</span>
		<Icon name="ChevronDown" size={chevronSize} className={chevronClass} />
	</button>
		{#if open}
			<div class={`${menuClass} ${closing ? 'page-menu-closing' : ''}`.trim()} role="listbox">
				{#each items as item, index}
					<button
						type="button"
						role="option"
						aria-selected={item.value === value}
						class={`${itemClass} ${item.value === value ? activeClass : ''}`.trim()}
						style={`--menu-index: ${index}; --menu-total: ${items.length};`}
						on:click={() => handleSelect(item)}
					>
						{item.label}
					</button>
				{/each}
			</div>
		{/if}
</div>
