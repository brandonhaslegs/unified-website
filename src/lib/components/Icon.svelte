<script lang="ts">
	export let name: string;
	export let size: number = 16;
	export let className: string = '';
</script>

<img src="/icons/{name}.svg" alt={name} width={size} height={size} class={className} />
