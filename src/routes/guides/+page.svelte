<script lang="ts">
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteRail from "$lib/components/SiteRail.svelte";
  import SiteContentHeader from "$lib/components/SiteContentHeader.svelte";
  import GuideCards from "$lib/components/GuideCards.svelte";
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
        <section class="space-y-6">
          <p class="hero-subtitle text-secondary-light dark:text-secondary-dark">
            Guides &amp; support
          </p>
          <h1 class="hero-title">Everything you need to get started.</h1>
        </section>

        <section>
          <GuideCards />
        </section>
      </div>

      <section class="space-y-8">
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

      <section class="updates-section">
        <div class="updates-header">
          <h2 class="section-heading">Recent updates</h2>
          <a class="stack-link updates-link" href="/updates">See all updates →</a>
        </div>
        <div class="updates-list">
          <div class="updates-row">
            <span class="updates-time">4d ago</span>
            <span class="updates-title">Radicle 1.4.0 released</span>
          </div>
          <div class="updates-row">
            <span class="updates-time">2w ago</span>
            <span class="updates-title">Radicle 1.3.0 released</span>
          </div>
          <div class="updates-row">
            <span class="updates-time">13.06.25</span>
            <span class="updates-title">Radicle Desktop released</span>
          </div>
          <div class="updates-row">
            <span class="updates-time">10.09.24</span>
            <span class="updates-title">Radicle makes it to the top of hacker news</span>
          </div>
        </div>
      </section>

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
