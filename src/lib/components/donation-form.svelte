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


<div class="space-y-4">
	<h3 class="text-lg font-semibold">Make a Donation</h3>

	<!-- Predefined Amounts -->
	<div class="grid grid-cols-2 gap-2">
		{#each predefinedAmounts as presetAmount}
			<button
				onclick={() => setAmount(presetAmount)}
				class="rounded-lg border p-2 transition-colors hover:bg-gray-50 {amount ===
				presetAmount.toString()
					? 'border-blue-500 bg-blue-50'
					: 'border-gray-300'}"
			>
				KES {presetAmount.toLocaleString()}
			</button>
		{/each}
	</div>

	<!-- Custom Amount -->
	<div>
		<label for="amount" class="mb-1 block text-sm font-medium text-gray-700">
			Custom Amount (KES)
		</label>
		<input
			id="amount"
			type="number"
			bind:value={amount}
			placeholder="Enter amount"
			min="10"
			class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
		/>
	</div>

	<!-- Phone Number -->
	<div>
		<label for="phone" class="mb-1 block text-sm font-medium text-gray-700">
			Mpesa Phone Number *
		</label>
		<input
			id="phone"
			type="tel"
			bind:value={phoneNumber}
			placeholder="254712345678"
			class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
		/>
		<p class="mt-1 text-xs text-gray-500">Format: 254XXXXXXXXX</p>
	</div>

	<!-- Optional Message -->
	<div>
		<label for="message" class="mb-1 block text-sm font-medium text-gray-700">
			Message (Optional)
		</label>
		<textarea
			id="message"
			bind:value={message}
			placeholder="Leave an encouraging message..."
			rows="3"
			class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
		></textarea>
	</div>

	<!-- Status Messages -->
	{#if donationStatus}
		<div
			class="rounded-lg p-3 {donationStatus.type === 'success'
				? 'border border-green-200 bg-green-50 text-green-800'
				: 'border border-red-200 bg-red-50 text-red-800'}"
		>
			{donationStatus.message}
		</div>
	{/if}

	<!-- Submit Button -->
	<button
		onclick={handleDonation}
		disabled={isProcessing}
		class="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
	>
		{#if isProcessing}
			<span class="flex items-center justify-center">
				<svg
					class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				Processing...
			</span>
		{:else}
			Donate KES {amount || '0'}
		{/if}
	</button>

	<p class="text-center text-xs text-gray-500">
		Your donation is anonymous and secure. You'll receive an SMS confirmation.
	</p>
</div>
