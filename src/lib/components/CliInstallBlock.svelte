<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";

  export let command = "curl -sSLf https://radicle.xyz/install | sh";

  let copied = false;
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  function handleCopy() {
    navigator.clipboard.writeText(command);
    copied = true;
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    copyTimeout = setTimeout(() => {
      copied = false;
    }, 3000);
  }
</script>

<div class="feature-card">
  <p class="text-secondary-light dark:text-secondary-dark mb-3">Install the CLI</p>
  <div class="flex items-center gap-3 bg-black text-white rounded-sm px-4 py-3 font-mono">
    <pre class="truncate whitespace-nowrap overflow-hidden text-ellipsis min-w-0 flex-1">
{command}</pre>
    <button
      type="button"
      class="p-1 rounded-sm bg-white/10 text-white relative overflow-hidden flex items-center justify-center flex-shrink-0"
      aria-label="Copy install command"
      on:click={handleCopy}
    >
      <span class="relative block h-4 w-4 flex items-center justify-center overflow-hidden">
        <Icon
          name="Copy"
          size={20}
          className={`icon-terminal absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${copied ? "top-[120%] opacity-0" : "top-1/2 opacity-100"}`}
        />
        <Icon
          name="Checkmark"
          size={20}
          className={`icon-terminal absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${copied ? "top-1/2 opacity-100" : "top-[-60%] opacity-0"}`}
        />
      </span>
    </button>
  </div>
</div>
