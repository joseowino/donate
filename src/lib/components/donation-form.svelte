<script lang="ts">
	import { db } from '$lib/db.js';
	import { mpesa } from '$lib/mpesa.js';

	let { project } = $props();

	let amount = $state('');
	let phoneNumber = $state('');
	let message = $state('');
	let isProcessing = $state(false);

	type DonationStatus = {
		type: 'success' | 'error';
		message: string;
	} | null;

	let donationStatus = $state<DonationStatus>(null);

	const predefinedAmounts = [500, 1000, 2500, 5000];

	async function handleDonation() {
		if (!amount || !phoneNumber) {
			donationStatus = {
				type: 'error',
				message: 'Please fill in all required fields'
			};
			return;
		}

		if (!/^2547\d{8}$/.test(phoneNumber)) {
			donationStatus = {
				type: 'error',
				message: 'Invalid phone number format. Use 2547XXXXXXXX.'
			};
			return;
		}

		if (parseFloat(amount) < 10) {
			donationStatus = {
				type: 'error',
				message: 'Minimum donation amount is KES 10'
			};
			return;
		}

		if (!project?.id) {
			donationStatus = {
				type: 'error',
				message: 'Invalid project selected.'
			};
			return;
		}

		isProcessing = true;
		donationStatus = null;

		try {
			const donation = await db.donations.create({
				project_id: project.id,
				amount: parseFloat(amount),
				phone_number: phoneNumber,
				donor_message: message,
				status: 'pending'
			});

			const mpesaResponse = await mpesa.initiateSTKPush(
				phoneNumber,
				parseFloat(amount),
				`DONATION-${donation.id}`,
				`Donation to ${project.title}`
			);

			if (mpesaResponse.ResponseCode === '0') {
				donationStatus = {
					type: 'success',
					message: 'Payment request sent! Please check your phone and enter your Mpesa PIN.'
				};

				// Optional reset
				amount = '';
				phoneNumber = '';
				message = '';
			} else {
				donationStatus = {
					type: 'error',
					message: 'Payment failed. Please try again.'
				};
			}
		} catch (error) {
			console.error('Donation error:', error);
			donationStatus = {
				type: 'error',
				message: 'An error occurred. Please try again.'
			};
		} finally {
			isProcessing = false;
		}
	}

	function setAmount(value: number) {
		amount = value.toString();
	}
</script>

<div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
	<div class="flex items-center space-x-3 mb-6">
		<div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
			<span class="text-white text-lg">💚</span>
		</div>
		<h3 class="text-2xl font-bold text-gray-900">Make a Donation</h3>
	</div>

	<!-- Predefined Amounts -->
	<div class="mb-6">
		<label class="block text-sm font-semibold text-gray-700 mb-3">Quick Amount</label>
		<div class="grid grid-cols-2 gap-3">
			{#each predefinedAmounts as presetAmount}
				<button
					onclick={() => setAmount(presetAmount)}
					class="group relative rounded-xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg {amount === presetAmount.toString()
						? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md'
						: 'border-gray-200 hover:border-green-300 bg-white hover:bg-green-50'}"
				>
					<div class="text-center">
						<div class="text-lg font-bold text-gray-900">KES {presetAmount.toLocaleString()}</div>
						{#if amount === presetAmount.toString()}
							<div class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
								<span class="text-white text-xs">✓</span>
							</div>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Custom Amount -->
	<div class="mb-6">
		<label for="amount" class="block text-sm font-semibold text-gray-700 mb-2">
			Custom Amount (KES)
		</label>
		<div class="relative">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<span class="text-gray-500 sm:text-sm">KES</span>
			</div>
			<input
				id="amount"
				type="number"
				bind:value={amount}
				placeholder="Enter amount"
				min="10"
				class="w-full pl-14 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white"
			/>
		</div>
	</div>

	<!-- Phone Number -->
	<div class="mb-6">
		<label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
			<span class="flex items-center space-x-2">
				<span>📱 Mpesa Phone Number</span>
				<span class="text-red-500">*</span>
			</span>
		</label>
		<div class="relative">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<span class="text-gray-500 sm:text-sm">+</span>
			</div>
			<input
				id="phone"
				type="tel"
				bind:value={phoneNumber}
				placeholder="254712345678"
				class="w-full pl-8 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white"
			/>
		</div>
		<p class="mt-2 text-sm text-gray-500 flex items-center space-x-1">
			<span>ℹ️</span>
			<span>Format: 254XXXXXXXXX</span>
		</p>
	</div>

	<!-- Optional Message -->
	<div class="mb-6">
		<label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
			💬 Message (Optional)
		</label>
		<textarea
			id="message"
			bind:value={message}
			placeholder="Leave an encouraging message for the project..."
			rows="4"
			class="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
		></textarea>
	</div>

	<!-- Status Messages -->
	{#if donationStatus}
		<div class="mb-6 p-4 rounded-xl border-l-4 {donationStatus.type === 'success'
			? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800'
			: 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 text-red-800'} animate-in slide-in-from-top duration-300">
			<div class="flex items-center space-x-2">
				<span class="text-lg">{donationStatus.type === 'success' ? '✅' : '⚠️'}</span>
				<span class="font-medium">{donationStatus.message}</span>
			</div>
		</div>
	{/if}

	<!-- Submit Button -->
	<button
		onclick={handleDonation}
		disabled={isProcessing}
		class="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 font-bold text-white transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
	>
		{#if isProcessing}
			<span class="flex items-center justify-center space-x-3">
				<svg
					class="w-6 h-6 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span>Processing Payment...</span>
			</span>
		{:else}
			<span class="flex items-center justify-center space-x-2">
				<span>🚀</span>
				<span>Donate KES {amount || '0'}</span>
			</span>
		{/if}
	</button>

	<div class="mt-6 text-center">
		<p class="text-sm text-gray-500 flex items-center justify-center space-x-2">
			<span>🔐</span>
			<span>Your donation is secure and anonymous. You'll receive SMS confirmation.</span>
		</p>
	</div>
</div>