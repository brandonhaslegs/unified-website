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

	let open = false;

	$: selectedLabel = items.find((item) => item.value === value)?.label ?? label;

	function handleSelect(item: DropdownItem) {
		open = false;
		dispatch('change', item.value);
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ change: string }>();
</script>

<div
	class="relative inline-flex"
	on:mouseenter={() => (open = true)}
	on:mouseleave={() => (open = false)}
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
		<div class={menuClass} role="listbox">
			{#each items as item}
				<button
					type="button"
					role="option"
					aria-selected={item.value === value}
					class={`${itemClass} ${item.value === value ? activeClass : ''}`.trim()}
					on:click={() => handleSelect(item)}
				>
					{item.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
