<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Radicle Garden - Always On Node</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
	<!-- Header with Login Button -->
	<header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
		<div class="flex justify-end">
			<button
				on:click={() => goto('/dashboard')}
				class="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
			>
				Log in
			</button>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="text-center">
			<h1 class="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Always On Node</h1>
			<p class="text-xl text-gray-600 dark:text-gray-400 mb-8">24/7 repository availability for your Radicle projects</p>
			<div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-8">$10/month</div>
			<a
				href="/auth/signup"
				class="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
			>
				Get Started
			</a>
		</div>
	</section>

	<!-- Benefits Section -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<h2 class="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">Why Always On Node?</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<div class="text-center">
				<div class="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">24/7 Repository Availability</h3>
				<p class="text-gray-600 dark:text-gray-400">
					Your repositories are always accessible, even when your local machine is offline.
				</p>
			</div>

			<div class="text-center">
				<div class="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Local Resource Usage</h3>
				<p class="text-gray-600 dark:text-gray-400">
					Keep your repositories seeded without using your own bandwidth or storage.
				</p>
			</div>

			<div class="text-center">
				<div class="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Automatic Syncing</h3>
				<p class="text-gray-600 dark:text-gray-400">
					Your repositories stay up-to-date automatically with all the latest changes.
				</p>
			</div>

			<div class="text-center">
				<div class="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Easy Team Sharing</h3>
				<p class="text-gray-600 dark:text-gray-400">
					Share your repositories with team members without requiring them to run their own nodes.
				</p>
			</div>

			<div class="text-center">
				<div class="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Reliable Infrastructure</h3>
				<p class="text-gray-600 dark:text-gray-400">
					Built on Radicle's decentralized network for maximum reliability and uptime.
				</p>
			</div>

			<div class="text-center">
				<div class="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Simple Setup</h3>
				<p class="text-gray-600 dark:text-gray-400">
					Get started in minutes with no complex configuration or hardware requirements.
				</p>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 text-center">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ready to get started?</h2>
			<p class="text-gray-600 dark:text-gray-400 mb-6">Start using Always On Node today</p>
			<a
				href="/auth/signup"
				class="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
			>
				Get Started
			</a>
		</div>
	</section>
</div>
