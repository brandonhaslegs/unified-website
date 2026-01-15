<script lang="ts">
  export let title = "Recent updates";
  export let linkLabel = "All updates →";
  export let linkHref = "/updates";
  export let items: { time: string; title: string }[] = [];
</script>

<section class="updates-section">
  <div class="updates-header">
    <h2 class="section-heading updates-heading">{title}</h2>
    <a class="stack-link updates-link updates-link-desktop" href={linkHref}>
      {linkLabel}
    </a>
  </div>
  <div class="updates-list">
    {#each items as item}
      <div class="updates-row">
        <span class="updates-time">{item.time}</span>
        <span class="updates-title">{item.title}</span>
      </div>
    {/each}
  </div>
  <a class="stack-link updates-link updates-link-mobile" href={linkHref}>
    {linkLabel}
  </a>
</section>
