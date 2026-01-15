<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";

  export let nodeId: string;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  }
</script>

<div class="space-y-16">
  <section class="app-panel">
    <h3 class="section-heading">Seeding Private Repositories</h3>
    <div class="mt-6 space-y-6 app-meta">
      <p>
        To seed a private repository, you need to add your Always On Node to the
        repository's allowlist.
      </p>

      <div>
        <p class="app-meta mb-2">1. Get your node ID:</p>
        <div
          class="border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono flex items-center justify-between"
        >
          <span>{nodeId || "Your node ID will appear here"}</span>
          <button
            on:click={() => copyToClipboard(nodeId)}
            class="ml-2 app-meta"
            title="Copy"
          >
            <Icon name="Copy" size={14} className="icon-current" />
          </button>
        </div>
      </div>

      <div>
        <p class="app-meta mb-2">2. Add to repository allowlist:</p>
        <div
          class="border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono"
        >
          <div class="flex items-center justify-between">
            <code>rad remote add --allow hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z</code>
            <button
              on:click={() =>
                copyToClipboard(`rad remote add --allow ${nodeId}`)}
              class="ml-2 app-meta"
              title="Copy"
            >
              <Icon name="Copy" size={14} className="icon-current" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <p class="app-meta mb-2">3. Push changes:</p>
        <div
          class="border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono"
        >
          <div class="flex items-center justify-between">
            <code>rad push</code>
            <button
              on:click={() => copyToClipboard("rad push")}
              class="ml-2 app-meta"
              title="Copy"
            >
              <Icon name="Copy" size={14} className="icon-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="app-panel">
    <h3 class="section-heading">Configure Local Node</h3>
    <div class="mt-6 space-y-6 app-meta">
      <p>
        Add your Always On Node as a preferred seed for faster access to your
        repositories.
      </p>

      <div>
        <p class="app-meta mb-2">Add preferred seed:</p>
        <div
          class="border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono"
        >
          <div class="flex items-center justify-between">
            <code>rad remote add --seed hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z</code>
            <button
              on:click={() =>
                copyToClipboard(`rad remote add --seed ${nodeId}`)}
              class="ml-2 app-meta"
              title="Copy"
            >
              <Icon name="Copy" size={14} className="icon-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
