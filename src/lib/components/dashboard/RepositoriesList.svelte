<script lang="ts">
  import { onMount } from "svelte";
  import { formatRelativeTime } from "$lib/utils/format";
  import { unseedRepository } from "$lib/utils/api";
  import { showToast } from "$lib/stores/toast";
  import Modal from "../Modal.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import type { Repository } from "$lib/utils/api";
  import { getNodeStatus } from "$lib/utils/api";

  export let repositories: Repository[];
  export let searchQuery = "";
  export let sortBy:
    | "updatedDesc"
    | "updatedAsc"
    | "sizeDesc"
    | "sizeAsc"
    | "fetchState" = "updatedDesc";

  let nodeId = "";

  function storageToMB(value: string): number {
    const trimmed = value.trim().toUpperCase();
    if (trimmed.endsWith("GB")) {
      return parseFloat(trimmed.replace("GB", "").trim()) * 1024;
    }
    if (trimmed.endsWith("MB")) {
      return parseFloat(trimmed.replace("MB", "").trim());
    }
    return parseFloat(trimmed);
  }

  function fetchStateRank(state: Repository["fetchState"]): number {
    switch (state) {
      case "fetching":
        return 0;
      case "fetched":
        return 1;
      default:
        return 2;
    }
  }

  $: filteredRepos = repositories
    .filter((repo) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        repo.rid.toLowerCase().includes(query) ||
        repo.name?.toLowerCase().includes(query) ||
        false
      );
    })
    .slice()
    .sort((a, b) => {
      if (sortBy === "updatedDesc") {
        return (
          new Date(b.lastUpdated).getTime() -
          new Date(a.lastUpdated).getTime()
        );
      }
      if (sortBy === "updatedAsc") {
        return (
          new Date(a.lastUpdated).getTime() -
          new Date(b.lastUpdated).getTime()
        );
      }
      if (sortBy === "sizeDesc") {
        return storageToMB(b.storageSize) - storageToMB(a.storageSize);
      }
      if (sortBy === "sizeAsc") {
        return storageToMB(a.storageSize) - storageToMB(b.storageSize);
      }
      if (sortBy === "fetchState") {
        return fetchStateRank(a.fetchState) - fetchStateRank(b.fetchState);
      }
      return 0;
    });

  let unseedingRid: string | null = null;
  let unseedModalOpen = false;

  function escapeHtml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function highlightText(value: string | undefined, query: string): string {
    if (!value) return "N/A";
    if (!query.trim()) return escapeHtml(value);
    const escaped = escapeHtml(value);
    const escapedQuery = escapeHtml(query.trim());
    const pattern = new RegExp(`(${escapedQuery})`, "gi");
    return escaped.replace(pattern, '<mark class="repo-highlight">$1</mark>');
  }

  onMount(async () => {
    try {
      const status = await getNodeStatus();
      nodeId = status.nodeId;
    } catch {
      // Ignore error
    }
  });

  let copiedRid: string | null = null;
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard", "success");
    copiedRid = text;
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    copyTimeout = setTimeout(() => {
      copiedRid = null;
    }, 2000);
  }

  function handleUnseed(rid: string) {
    unseedingRid = rid;
    unseedModalOpen = true;
  }

  async function confirmUnseed() {
    if (!unseedingRid) return;

    try {
      const unseededRepo =
        repositories.find((r) => r.rid === unseedingRid)?.name || unseedingRid;
      await unseedRepository(unseedingRid);
      repositories = repositories.filter((r) => r.rid !== unseedingRid);
      showToast(`Unseeded ${unseededRepo}`, "success");
      unseedModalOpen = false;
      unseedingRid = null;
    } catch (error: any) {
      showToast(error.message || "Failed to unseed repository", "error");
    }
  }

  function getStatusBadgeColor(state: string) {
    switch (state) {
      case "fetched":
        return "text-green-600";
      case "fetching":
        return "text-yellow-600";
      default:
        return "app-meta";
    }
  }

</script>

<div class="space-y-4">
  {#if filteredRepos.length === 0 && repositories.length > 0}
    <p class="app-meta text-center py-4">No repositories found</p>
  {:else if repositories.length === 0}
    <div class="text-center py-8">
      <p class="app-meta">No repositories seeded yet.</p>
      <p class="app-meta mt-1">Add your first repository below.</p>
    </div>
  {:else}
    <div class="repo-cards">
      {#each filteredRepos as repo (repo.id)}
        <div class="repo-card">
          <div class="repo-card-header">
            <div>
              <p class="repo-card-title">
                {@html highlightText(repo.name || "N/A", searchQuery)}
              </p>
              <div class="repo-card-rid">
                <code class="font-mono app-meta">
                  {@html highlightText(repo.rid, searchQuery)}
                </code>
                <button
                  on:click={() => copyToClipboard(repo.rid)}
                  class="app-meta"
                  title="Copy RID"
                >
                  <Icon
                    name={copiedRid === repo.rid ? "Checkmark" : "Copy"}
                    size={20}
                    className="icon-current"
                  />
                </button>
              </div>
            </div>
            <div class="repo-card-actions">
              {#if repo.visibility === "public" && repo.fetchState === "fetched" && nodeId}
                <a
                  href="https://app.radicle.xyz/{nodeId}/{repo.rid}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cta-button cta-button-ghost"
                >
                  View
                  <Icon
                    name="OpenExternal"
                    size={20}
                    className="icon-current"
                  />
                </a>
              {:else}
                <button
                  type="button"
                  class="cta-button cta-button-ghost"
                  disabled
                  title={repo.fetchState !== "fetched" ? "Looking for this repo" : "Can't view private repo"}
                >
                  View
                </button>
              {/if}
              <button
                on:click={() => handleUnseed(repo.rid)}
                class="cta-button cta-button-outline cta-button-danger-hover"
              >
                Unseed
              </button>
            </div>
          </div>

          <div class="repo-card-meta">
            <div>
              <p class="repo-card-value repo-card-size">{repo.storageSize}</p>
            </div>
            <div>
              <p class="repo-card-value {getStatusBadgeColor(repo.fetchState)}">
                <span class="inline-flex items-center gap-2">
                  {#if repo.fetchState === "fetched"}
                    <svg
                      class="status-icon"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="8" cy="8" r="6" />
                      <path d="M5.2 8.2L7.2 10.2L11 6.4" />
                    </svg>
                  {:else if repo.fetchState === "fetching"}
                    <svg
                      class="status-icon status-icon-spin"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12.2 6.2A4.5 4.5 0 0 0 4.6 4.4" />
                      <path d="M4.6 4.4H7" />
                      <path d="M3.8 9.8A4.5 4.5 0 0 0 11.4 11.6" />
                      <path d="M11.4 11.6H9" />
                    </svg>
                  {/if}
                  {repo.fetchState.charAt(0).toUpperCase() +
                    repo.fetchState.slice(1)}
                </span>
              </p>
            </div>
            <div>
              <p class="repo-card-value">
                <span class="inline-flex items-center gap-2">
                  <Icon
                    name={repo.visibility === "public" ? "Eye" : "EyeSlash"}
                    size={20}
                    className="icon-current"
                  />
                  {repo.visibility.charAt(0).toUpperCase() +
                    repo.visibility.slice(1)}
                </span>
              </p>
            </div>
            <div class="repo-card-updated-row">
              <p
                class="repo-card-value repo-card-updated"
                title={`Last updated ${new Date(repo.lastUpdated).toLocaleString()}`}
              >
                Last updated {formatRelativeTime(repo.lastUpdated)}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<Modal
  open={unseedModalOpen}
  title="Unseed Repository"
  on:close={() => (unseedModalOpen = false)}
>
  <p class="app-meta mb-4">
    Are you sure you want to unseed this repository? This will remove it from
    your Always On Node.
  </p>
  <div class="flex space-x-3">
    <button
      on:click={() => (unseedModalOpen = false)}
      class="cta-button cta-button-outline flex-1"
    >
      Cancel
    </button>
    <button
      on:click={confirmUnseed}
      class="cta-button cta-button-danger flex-1"
    >
      Unseed
    </button>
  </div>
</Modal>
