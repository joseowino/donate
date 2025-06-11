<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { db } from '$lib/db.js';
	import { mpesa } from '$lib/mpesa.js';
	import Header from '$lib/components/header.svelte';
	import DonationForm from '$lib/components/donation-form.svelte';

	import { get } from 'svelte/store';

	let project: any = null;
	let donations: any[] = [];
	let showDonationForm = false;

	// Reactive page params
	let projectId: string;

	projectId = $page.params.id;

	onMount(() => {
		project = db.projects.getById(projectId);
		donations = db.donations.getByProject(projectId);
	});

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-KE', {
			style: 'currency',
			currency: 'KES',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Reactive percentage calculation
	$: progressPercentage = project
		? Math.min((project.current_amount / project.target_amount) * 100, 100)
		: 0;
</script>

<svelte:head>
	<title>{project?.title || 'Project'} - Donate</title>
</svelte:head>

<Header />

{#if project}
	<div class="container mx-auto px-4 py-8 max-w-4xl">
		<a href="/" class="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline">
			← Back
		</a>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Main Project Info -->
			<div class="lg:col-span-2">
				<img src={project.image_url || '/placeholder.svg'} alt={project.title} class="mb-4 w-full h-64 object-cover rounded" />

				<h1 class="text-2xl font-semibold mb-2">{project.title}</h1>
				<p class="text-sm text-gray-600 mb-6">{project.description}</p>

				<!-- Donations List -->
				<div class="bg-gray-50 p-4 rounded">
					<h3 class="text-sm font-semibold mb-3">Recent Donations</h3>
					{#if donations.length > 0}
						{#each donations.slice(0, 5) as donation}
							<div class="flex justify-between text-sm py-1 border-b last:border-none">
								<span>Anonymous</span>
								<span>{formatCurrency(donation.amount)}</span>
							</div>
						{/each}
					{:else}
						<p class="text-xs text-gray-500">No donations yet</p>
					{/if}
				</div>
			</div>

			<!-- Donation Box -->
			<div class="lg:col-span-1">
				<div class="bg-white p-4 rounded shadow">
					<div class="mb-3">
						<div class="flex justify-between text-xs text-gray-500">
							<span>Raised</span>
							<span>{Math.round(progressPercentage)}%</span>
						</div>
						<div class="text-lg font-bold">{formatCurrency(project.current_amount)}</div>
						<div class="text-xs text-gray-500">of {formatCurrency(project.target_amount)}</div>
						<div class="h-2 w-full bg-gray-200 rounded mt-1">
							<div class="h-2 bg-green-500 rounded" style="width: {progressPercentage}%"></div>
						</div>
					</div>

					{#if !showDonationForm}
						<button
							onclick={() => (showDonationForm = true)}
							class="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700"
						>
							Donate
						</button>
					{:else}
						<DonationForm {project} />
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="container mx-auto px-4 py-8 text-center">
		<p class="text-gray-700">Project not found</p>
		<a href="/" class="text-blue-600 text-sm mt-2 inline-block hover:underline">Back to projects</a>
	</div>
{/if}
