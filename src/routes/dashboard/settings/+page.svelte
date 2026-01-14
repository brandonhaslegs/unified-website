<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { showToast } from '$lib/stores/toast';
	import Modal from '$lib/components/Modal.svelte';

	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';
	let changePasswordLoading = false;
	let deleteModalOpen = false;
	let deleteLoading = false;

	let errors: Record<string, string> = {};

	function validatePasswordChange(): boolean {
		errors = {};

		if (!currentPassword) {
			errors.currentPassword = 'Current password is required';
		}
		if (!newPassword) {
			errors.newPassword = 'New password is required';
		} else if (newPassword.length < 8) {
			errors.newPassword = 'Password must be at least 8 characters';
		}
		if (newPassword !== confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return Object.keys(errors).length === 0;
	}

	async function handlePasswordChange() {
		if (!validatePasswordChange()) {
			return;
		}

		changePasswordLoading = true;
		try {
			// TODO: Implement password change API call
			showToast('Password changed successfully!', 'success');
			currentPassword = '';
			newPassword = '';
			confirmPassword = '';
		} catch (error: any) {
			showToast(error.message || 'Failed to change password', 'error');
		} finally {
			changePasswordLoading = false;
		}
	}

	async function handleDeleteAccount() {
		deleteLoading = true;
		try {
			// TODO: Implement account deletion API call
			showToast('Account deletion requested', 'info');
			// Redirect to home
		} catch (error: any) {
			showToast(error.message || 'Failed to delete account', 'error');
		} finally {
			deleteLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Account Settings - Radicle Garden</title>
</svelte:head>

<div class="app-content">
	<h1 class="section-heading">Account Settings</h1>

	<div class="space-y-16">
		<!-- Email Section -->
		<div class="app-panel">
			<h2 class="section-heading">Email Address</h2>
			<div class="flex items-center justify-between">
				<p class="app-meta">{$user?.email}</p>
				<button
					disabled
					class="cta-button cta-button-outline opacity-70 text-black dark:text-white cursor-not-allowed"
				>
					Change Email
				</button>
			</div>
			<p class="app-meta mt-2">Email change functionality coming soon</p>
		</div>

		<!-- Password Change Section -->
		<div class="app-panel">
			<h2 class="section-heading">Change Password</h2>
			<form on:submit|preventDefault={handlePasswordChange} class="space-y-6">
				<div class="space-y-2">
					<label for="currentPassword" class="app-meta">Current Password</label>
					<input
						id="currentPassword"
						type="password"
						bind:value={currentPassword}
						class="app-input {errors.currentPassword ? 'border-red-500' : ''}"
					/>
					{#if errors.currentPassword}
						<p class="app-meta text-red-600">{errors.currentPassword}</p>
					{/if}
				</div>

				<div class="space-y-2">
					<label for="newPassword" class="app-meta">New Password</label>
					<input
						id="newPassword"
						type="password"
						bind:value={newPassword}
						class="app-input {errors.newPassword ? 'border-red-500' : ''}"
					/>
					{#if errors.newPassword}
						<p class="app-meta text-red-600">{errors.newPassword}</p>
					{/if}
				</div>

				<div class="space-y-2">
					<label for="confirmPassword" class="app-meta">Confirm New Password</label>
					<input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						class="app-input {errors.confirmPassword ? 'border-red-500' : ''}"
					/>
					{#if errors.confirmPassword}
						<p class="app-meta text-red-600">{errors.confirmPassword}</p>
					{/if}
				</div>

				<button
					type="submit"
					disabled={changePasswordLoading}
					class="cta-button"
				>
					{changePasswordLoading ? 'Changing...' : 'Change Password'}
				</button>
			</form>
		</div>

		<!-- Danger Zone -->
		<div class="app-panel">
			<h2 class="section-heading text-red-600">Danger Zone</h2>
			<div class="flex items-center justify-between">
				<div>
					<p class="app-meta">Delete Account</p>
					<p class="app-meta">Permanently delete your account and all data</p>
				</div>
				<button
					on:click={() => (deleteModalOpen = true)}
					class="cta-button cta-button-danger"
				>
					Delete Account
				</button>
			</div>
		</div>
	</div>
</div>

<Modal open={deleteModalOpen} title="Delete Account" on:close={() => (deleteModalOpen = false)}>
	<p class="app-meta mb-4">
		Are you sure you want to delete your account? This action cannot be undone. All your data,
		repositories, and subscription will be permanently deleted.
	</p>
	<div class="flex gap-3">
		<button
			on:click={() => (deleteModalOpen = false)}
			class="cta-button cta-button-outline flex-1"
		>
			Cancel
		</button>
		<button
			on:click={handleDeleteAccount}
			disabled={deleteLoading}
			class="cta-button cta-button-danger flex-1"
		>
			{deleteLoading ? 'Deleting...' : 'Delete Account'}
		</button>
	</div>
</Modal>
