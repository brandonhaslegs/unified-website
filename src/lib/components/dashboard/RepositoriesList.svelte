<script lang="ts">
  import { onMount } from "svelte";
  import { formatRelativeTime } from "$lib/utils/format";
  import { unseedRepository } from "$lib/utils/api";
  import { showToast } from "$lib/stores/toast";
  import Modal from "../Modal.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import type { Repository } from "$lib/utils/api";
  import { getNodeStatus } from "$lib/utils/api";

  const illustrationModules = import.meta.glob("/src/illustrations/*.png", {
    eager: true,
    import: "default",
  });
  const illustrationUrls = Object.values(illustrationModules) as string[];

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
  let unseedingRepoName: string | null = null;
  let unseedingRepo: Repository | null = null;
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

  function getAvatarUrl(repo: Repository, index: number) {
    if (!illustrationUrls.length) return "";
    const key = repo.rid || repo.id || `${index}`;
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    const safeIndex = Math.abs(hash) % illustrationUrls.length;
    return illustrationUrls[safeIndex];
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

  function formatRidShort(rid: string): string {
    const trimmed = rid.trim();
    const suffix = trimmed.startsWith("rad:git:") ? trimmed.slice("rad:git:".length) : trimmed;
    const head = suffix.slice(0, 4);
    const tail = suffix.slice(-4);
    return `rad:${head}…${tail}`;
  }

  function handleUnseed(rid: string) {
    unseedingRid = rid;
    unseedingRepo = repositories.find((repo) => repo.rid === rid) || null;
    unseedingRepoName = unseedingRepo?.name || null;
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
      unseedingRepoName = null;
      unseedingRepo = null;
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
      {#each filteredRepos as repo, index (repo.id)}
        <div class="repo-card">
          <div class="repo-card-body">
            <div class="repo-card-header">
              <div class="repo-card-main">
                <div class="repo-card-title-row">
                  <div
                    class="repo-card-avatar"
                    style={`background-image: url(${getAvatarUrl(repo, index)});`}
                    aria-hidden="true"
                  ></div>
                  <p class="repo-card-title">
                    {@html highlightText(repo.name || "N/A", searchQuery)}
                  </p>
                  <Icon
                    name={repo.visibility === "public" ? "Eye" : "EyeSlash"}
                    size={20}
                    className="icon-current icon-muted"
                  />
                </div>
                <p class="repo-card-description">
                  {repo.description || "No description provided."}
                </p>
                <div class="repo-card-rid">
                    <code class="app-meta" title={repo.rid}>
                      {formatRidShort(repo.rid)}
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
                <div class="repo-card-stats-row">
                  <div class="repo-card-stats-left">
                    <p class="repo-card-value">
                      <span class="inline-flex items-center gap-2">
                        <Icon name="Issue" size={20} className="icon-current" />
                        {repo.issuesCount}
                        <span class="repo-card-stat-label">issues</span>
                      </span>
                    </p>
                    <p class="repo-card-value">
                      <span class="inline-flex items-center gap-2">
                        <Icon name="Patch" size={20} className="icon-current" />
                        {repo.patchesCount}
                        <span class="repo-card-stat-label">
                          {repo.patchesCount === 1 ? "patch" : "patches"}
                        </span>
                      </span>
                    </p>
                    <p class="repo-card-value">
                      <span class="inline-flex items-center gap-2">
                        <Icon name="Seed" size={20} className="icon-current" />
                        {repo.seedersCount}
                        <span class="repo-card-stat-label">seeders</span>
                      </span>
                    </p>
                  </div>
                  <div class="repo-card-stats-right">
                    <p
                      class="repo-card-value repo-card-updated"
                      title={`Last updated ${new Date(repo.lastUpdated).toLocaleString()}`}
                    >
                      <span class="repo-card-updated-label">Updated</span>
                      {formatRelativeTime(repo.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>
              <div class="repo-card-actions">
                <button
                  type="button"
                  on:click={() => handleUnseed(repo.rid)}
                  class={`cta-button cta-button-muted ${repo.fetchState === "fetching" ? "cta-button-fetching" : "cta-button-seeded"}`}
                >
                  <Icon
                    name={repo.fetchState === "fetching" ? "Hourglass" : "Checkmark"}
                    size={20}
                    className={`icon-current cta-icon-default ${repo.fetchState === "fetching" ? "icon-fetching" : ""}`}
                  />
                  <Icon
                    name="Trash"
                    size={20}
                    className="icon-current cta-icon-hover"
                  />
                  <span class="cta-label-default">
                    {repo.fetchState === "fetching" ? "Fetching" : "Seeded"}
                  </span>
                  <span class="cta-label-hover">Unseed</span>
                </button>
                {#if repo.visibility === "public" && repo.fetchState === "fetched" && nodeId}
                  <a
                    href="https://app.radicle.xyz/{nodeId}/{repo.rid}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cta-button cta-button-outline"
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
                    class="cta-button cta-button-outline"
                    disabled
                    title={repo.fetchState !== "fetched" ? "Still looking for this repo" : "Can't view private repo"}
                  >
                    View
                    <Icon
                      name="OpenExternal"
                      size={20}
                      className="icon-current"
                    />
                  </button>
                {/if}
              </div>
            </div>

          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<Modal
  open={unseedModalOpen}
  title="Unseed repo"
  on:close={() => (unseedModalOpen = false)}
>
  <div class="app-meta mb-4">
    <p>
      Are you sure you want to unseed this repository? This will remove it from
      your Always On Node.
    </p>
    {#if unseedingRepo}
      <div class="repo-unseed-card">
        <p class="repo-unseed-title">{unseedingRepo.name || "Repository"}</p>
        <p class="repo-unseed-rid">
          <code class="font-mono app-meta">{unseedingRepo.rid}</code>
        </p>
        <div class="repo-unseed-stats">
          <p class="repo-card-value">
            <span class="inline-flex items-center gap-2">
              <Icon name="Issue" size={20} className="icon-current" />
              {unseedingRepo.issuesCount} issues
            </span>
          </p>
          <p class="repo-card-value">
            <span class="inline-flex items-center gap-2">
              <Icon name="Patch" size={20} className="icon-current" />
              {unseedingRepo.patchesCount} {unseedingRepo.patchesCount === 1 ? "patch" : "patches"}
            </span>
          </p>
        </div>
      </div>
    {/if}
  </div>
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
