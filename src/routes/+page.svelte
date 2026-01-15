<script lang="ts">
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteRail from "$lib/components/SiteRail.svelte";
  import SiteContentHeader from "$lib/components/SiteContentHeader.svelte";
  import heroIllustration from "$lib/../illustrations/Illustration 4.png";
  import contributeIllustration from "$lib/../illustrations/Illustration 10.png";
  import featuresIllustration from "$lib/../illustrations/home-page-features.png";
  import cliIllustration from "$lib/../illustrations/Illustration 1.png";
  import desktopIllustration from "$lib/../illustrations/Illustration 3.png";
</script>

<svelte:head>
  <title>Radicle</title>
</svelte:head>

<div class="site-shell">
  <div class="site-body">
    <SiteRail />
    <div class="home-sections">
      <div class="home-hero-block">
        <SiteContentHeader ctaLabel="Install Radicle 1.5.0" ctaHref="/install" />
        <section class="site-hero">
          <h1 class="hero-title">
            A privacy-preserving, censorship-resistant network for code
            collaboration.
          </h1>
          <div
            class="hero-art"
            style={`background-image: url(${heroIllustration});`}
            aria-hidden="true"
          ></div>
          <p class="hero-subtitle">
            <span style="color: #FFFFFF;"
              >Radicle is a peer-to-peer code collaboration stack built on Git.</span
            > No central servers. No middlemen. Just cryptographic sovereignty and
            full control over your data, identity, and workflow.
          </p>
        </section>
      </div>

      <section class="features-split">
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-dot feature-dot-active" aria-hidden="true"
            ></span>
            <div>
              <h3 class="feature-title">Your data, forever and secure.</h3>
              <p class="feature-text">
                All social artifacts are stored in Git, and signed using
                public-key cryptography. Radicle verifies the authenticity and
                authorship of all data for you.
              </p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-dot" aria-hidden="true"></span>
            <div>
              <h3 class="feature-title">Evolvable &amp; extensible.</h3>
              <p class="feature-text">
                Radicle’s Collaborative Objects (COBs) provide Radicle’s social
                primitive. This enables features such as issues, discussions and
                code review to be implemented as Git objects. Developers can
                extend Radicle’s capabilities to build any kind of collaboration
                flow they see fit.
              </p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-dot" aria-hidden="true"></span>
            <div>
              <h3 class="feature-title">Unparalleled autonomy.</h3>
              <p class="feature-text">
                Radicle enables users to run their own nodes, ensuring
                censorship-resistant code collaboration and fostering a
                resilient network without reliance on third parties.
              </p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-dot" aria-hidden="true"></span>
            <div>
              <h3 class="feature-title">Local-first.</h3>
              <p class="feature-text">
                Radicle is local-first, providing always-available functionality
                even without internet access. Users own their data, making
                migration, backup, and access easy both online and offline.
              </p>
            </div>
          </div>
        </div>
        <div
          class="feature-illustration"
          style={`background-image: url(${featuresIllustration});`}
          aria-hidden="true"
        ></div>
      </section>

      <section class="stack-section home-stack">
        <p class="hero-subtitle">
          <strong>Your sovereign developer stack.</strong> Radicle comes with a CLI,
          web interface and TUI, that are backed by the Radicle Node and HTTP Daemon.
          It’s modular, so any part can be swapped out and other clients can be developed.
        </p>
        <div class="stack-grid">
          <div class="stack-card">
            <div
              class="stack-media"
              style={`background-image: url(${cliIllustration});`}
              aria-hidden="true"
            ></div>
            <h3 class="stack-title">Radicle CLI</h3>
            <p class="stack-copy">
              Work directly from your terminal with Git-native commands.
              Lightweight, scriptable, and built for developers who love the
              command line.
            </p>
            <a class="stack-link" href="/install">Install Radicle 1.5.0 →</a>
          </div>
          <div class="stack-card">
            <div
              class="stack-media"
              style={`background-image: url(${desktopIllustration});`}
              aria-hidden="true"
            ></div>
            <h3 class="stack-title">Desktop</h3>
            <p class="stack-copy">
              Browse, publish, and collaborate through a simple app. A visual
              way to discover projects and contribute without touching the
              terminal.
            </p>
            <a class="stack-link" href="/install">Download app →</a>
          </div>
        </div>
      </section>

      <section class="stack-under-hood home-under-hood">
        <p class="hero-subtitle section-heading">
          <strong>Under the hood.</strong> Radicle Protocol uses cryptographic identities,
          Git for data transfer, and a custom gossip protocol to share repository
          metadata between peers.
        </p>
        <a class="stack-link" href="/guides">Get started with guides →</a>
      </section>

      <section class="updates-section">
        <div class="updates-header">
          <h2 class="section-heading">Recent updates</h2>
          <a class="stack-link updates-link" href="/updates">All updates →</a>
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
            <span class="updates-title"
              >Radicle makes it to the top of hacker news</span
            >
          </div>
        </div>
      </section>

      <section class="contribute-section">
        <div class="contribute-grid">
          <div class="contribute-copy">
            <h2 class="section-heading">Help shape radicle’s future.</h2>
            <p class="hero-subtitle">
              Collaborate, contribute, and help grow the ecosystem — from code
              to culture.
            </p>
            <div class="contribute-links">
              <div class="contribute-link">
                <a href="/guides">Contribute →</a>
                <p>Get involved by contributing code.</p>
              </div>
              <div class="contribute-link">
                <a
                  href="https://radicle.zulipchat.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Community →
                </a>
                <p>Join our community on Zulip.</p>
              </div>
            </div>
          </div>
          <div
            class="contribute-visual"
            style={`background-image: url(${contributeIllustration});`}
            aria-hidden="true"
          ></div>
        </div>
      </section>

      <section class="faq-teaser">
        <h2 class="section-heading">
          <span class="faq-label">FAQ.</span> Answers to common questions.
        </h2>
        <div class="faq-list">
          <div class="faq-item">
            <span>What is Radicle? How is it different from Git/GitHub?</span>
            <span class="faq-chevron" aria-hidden="true">›</span>
          </div>
          <div class="faq-item">
            <span
              >Who is using Radicle currently? How many users does it have?</span
            >
            <span class="faq-chevron" aria-hidden="true">›</span>
          </div>
          <div class="faq-item">
            <span>What do you mean by “peer-to-peer”?</span>
            <span class="faq-chevron" aria-hidden="true">›</span>
          </div>
          <div class="faq-item">
            <span>Isn’t Git already peer-to-peer? Why do I need Radicle?</span>
            <span class="faq-chevron" aria-hidden="true">›</span>
          </div>
          <div class="faq-item">
            <span>Do I need to run a node to use Radicle?</span>
            <span class="faq-chevron" aria-hidden="true">›</span>
          </div>
        </div>
        <a class="stack-link faq-link" href="/faq">All FAQ →</a>
      </section>
    </div>
    <SiteFooter />
  </div>
</div>
