<script lang="ts">
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteRail from "$lib/components/SiteRail.svelte";
  import SiteContentHeader from "$lib/components/SiteContentHeader.svelte";
  import GuideCards from "$lib/components/GuideCards.svelte";
  import UpdatesSection from "$lib/components/UpdatesSection.svelte";
</script>

<svelte:head>
  <title>Guides &amp; Support</title>
</svelte:head>

<div class="site-shell">
  <div class="site-body">
    <SiteRail />
    <div class="guides-sections">
      <div class="guides-intro">
        <SiteContentHeader />
        <section class="guides-heading">
          <p class="hero-subtitle text-secondary-light dark:text-secondary-dark">
            Guides &amp; support
          </p>
          <h1 class="hero-title">Everything you need to get started.</h1>
        </section>

        <section>
          <GuideCards />
        </section>
      </div>

      <section class="guides-faq">
        <h2 class="section-heading">FAQ</h2>
        <div class="faq-list">
          <div class="faq-item">What is Radicle? How is it different from Git/GitHub?</div>
          <div class="faq-item">Who is using Radicle currently? How many users does it have?</div>
          <div class="faq-item">What do you mean by “peer‑to‑peer”?</div>
          <div class="faq-item">Isn’t Git already peer‑to‑peer? Why do I need Radicle?</div>
          <div class="faq-item">Do I need to run a node to use Radicle?</div>
        </div>
        <a class="stack-link faq-link" href="/faq">All FAQ →</a>
      </section>

      <UpdatesSection
        title="Recent updates"
        linkLabel="See all updates →"
        items={[
          { time: "4d ago", title: "Radicle 1.4.0 released" },
          { time: "2w ago", title: "Radicle 1.3.0 released" },
          { time: "13.06.25", title: "Radicle Desktop released" },
          { time: "10.09.24", title: "Radicle makes it to the top of hacker news" }
        ]}
      />

      <section class="help-cards">
        <a class="help-card" href="https://radicle.zulipchat.com/" target="_blank" rel="noreferrer">
          <h2>Support</h2>
          <p>Get answers from our community or share your thoughts on Zulip.</p>
          <span>Open Zulip →</span>
        </a>
        <a class="help-card" href="mailto:hello@radicle.xyz">
          <h2>Feedback</h2>
          <p>Feel free to send us an email with any feedback or further queries.</p>
          <span>Get in touch →</span>
        </a>
        <a class="help-card" href="https://github.com/radicle-dev/radicle-node" target="_blank" rel="noreferrer">
          <h2>Contribute</h2>
          <p>Radicle is free and open source, get involved by contributing code.</p>
          <span>More info →</span>
        </a>
      </section>
    </div>
    <SiteFooter />
  </div>
</div>
