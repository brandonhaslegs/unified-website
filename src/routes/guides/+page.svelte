<script lang="ts">
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteRail from "$lib/components/SiteRail.svelte";
  import SiteContentHeader from "$lib/components/SiteContentHeader.svelte";
</script>

<svelte:head>
  <title>Guides &amp; Support</title>
</svelte:head>

<div class="site-shell">
  <div class="site-body">
    <SiteRail />
    <div class="space-y-16">
      <SiteContentHeader />
      <section class="space-y-6">
        <h1 class="hero-title">Guides &amp; Support</h1>
        <p class="hero-subtitle">
          Coming soon. I&#39;ll add the guides and support content next.
        </p>
      </section>
    </div>
    <SiteFooter />
  </div>
</div>
