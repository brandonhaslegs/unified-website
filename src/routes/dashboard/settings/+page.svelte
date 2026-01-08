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

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

	<div class="space-y-6">
		<!-- Email Section -->
		<div class="bg-white shadow rounded-lg p-6">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">Email Address</h2>
			<div class="flex items-center justify-between">
				<p class="text-sm text-gray-600">{$user?.email}</p>
				<button
					disabled
					class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-gray-50 cursor-not-allowed"
				>
					Change Email
				</button>
			</div>
			<p class="mt-2 text-xs text-gray-500">Email change functionality coming soon</p>
		</div>

		<!-- Password Change Section -->
		<div class="bg-white shadow rounded-lg p-6">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
			<form on:submit|preventDefault={handlePasswordChange} class="space-y-4">
				<div>
					<label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">
						Current Password
					</label>
					<input
						id="currentPassword"
						type="password"
						bind:value={currentPassword}
						class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500 {errors.currentPassword
							? 'border-red-500'
							: ''}"
					/>
					{#if errors.currentPassword}
						<p class="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
					{/if}
				</div>

				<div>
					<label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">
						New Password
					</label>
					<input
						id="newPassword"
						type="password"
						bind:value={newPassword}
						class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500 {errors.newPassword
							? 'border-red-500'
							: ''}"
					/>
					{#if errors.newPassword}
						<p class="mt-1 text-sm text-red-600">{errors.newPassword}</p>
					{/if}
				</div>

				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
						Confirm New Password
					</label>
					<input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500 {errors.confirmPassword
							? 'border-red-500'
							: ''}"
					/>
					{#if errors.confirmPassword}
						<p class="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
					{/if}
				</div>

				<button
					type="submit"
					disabled={changePasswordLoading}
					class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
				>
					{changePasswordLoading ? 'Changing...' : 'Change Password'}
				</button>
			</form>
		</div>

		<!-- Danger Zone -->
		<div class="bg-white shadow rounded-lg p-6 border-2 border-red-200">
			<h2 class="text-lg font-semibold text-red-900 mb-4">Danger Zone</h2>
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm font-medium text-gray-900">Delete Account</p>
					<p class="text-sm text-gray-500">Permanently delete your account and all data</p>
				</div>
				<button
					on:click={() => (deleteModalOpen = true)}
					class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
				>
					Delete Account
				</button>
			</div>
		</div>
	</div>
</div>

<Modal open={deleteModalOpen} title="Delete Account" on:close={() => (deleteModalOpen = false)}>
	<p class="text-sm text-gray-600 mb-4">
		Are you sure you want to delete your account? This action cannot be undone. All your data,
		repositories, and subscription will be permanently deleted.
	</p>
	<div class="flex space-x-3">
		<button
			on:click={() => (deleteModalOpen = false)}
			class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
		>
			Cancel
		</button>
		<button
			on:click={handleDeleteAccount}
			disabled={deleteLoading}
			class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
		>
			{deleteLoading ? 'Deleting...' : 'Delete Account'}
		</button>
	</div>
</Modal>

