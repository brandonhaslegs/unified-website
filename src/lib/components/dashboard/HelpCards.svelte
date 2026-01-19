<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import { showToast } from "$lib/stores/toast";

  export let nodeId: string;

  let copiedKey = "";
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard", "success");
    copiedKey = text;
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    copyTimeout = setTimeout(() => {
      copiedKey = "";
    }, 2000);
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
          class="terminal-command border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono"
        >
          <div class="terminal-command-row">
            <span>{nodeId || "Your node ID will appear here"}</span>
            <button
              on:click={() => copyToClipboard(nodeId)}
              class="ml-2 app-meta"
              title="Copy"
            >
            <Icon
              name={copiedKey === nodeId ? "Checkmark" : "Copy"}
              size={14}
              className="icon-current"
            />
          </button>
          </div>
        </div>
      </div>

      <div>
        <p class="app-meta mb-2">2. Add to repository allowlist:</p>
        <div
          class="terminal-command border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono"
        >
          <div class="terminal-command-row">
            <code>rad remote add --allow hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z</code>
            <button
              on:click={() =>
                copyToClipboard(`rad remote add --allow ${nodeId}`)}
              class="ml-2 app-meta"
              title="Copy"
            >
              <Icon
                name={
                  copiedKey === `rad remote add --allow ${nodeId}`
                    ? "Checkmark"
                    : "Copy"
                }
                size={14}
                className="icon-current"
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <p class="app-meta mb-2">3. Push changes:</p>
        <div
          class="terminal-command border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono"
        >
          <div class="terminal-command-row">
            <code>rad push</code>
            <button
              on:click={() => copyToClipboard("rad push")}
              class="ml-2 app-meta"
              title="Copy"
            >
              <Icon
                name={copiedKey === "rad push" ? "Checkmark" : "Copy"}
                size={14}
                className="icon-current"
              />
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
          class="terminal-command border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono"
        >
          <div class="terminal-command-row">
            <code>rad remote add --seed hynmyfz3hqj7wzr8t5k9s2m4p6x8y0z</code>
            <button
              on:click={() =>
                copyToClipboard(`rad remote add --seed ${nodeId}`)}
              class="ml-2 app-meta"
              title="Copy"
            >
              <Icon
                name={
                  copiedKey === `rad remote add --seed ${nodeId}`
                    ? "Checkmark"
                    : "Copy"
                }
                size={14}
                className="icon-current"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
