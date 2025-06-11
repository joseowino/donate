<script lang="ts">
	import { onMount } from 'svelte';
	import { db } from '$lib/db.js';
	import Header from '$lib/components/header.svelte';

	let projects = $state<any[]>([]);
	let donations = $state<any[]>([]);
	let stats = $state({
		totalProjects: 0,
		totalDonations: 0,
		totalAmount: 0,
		avgDonation: 0
	});

	onMount(() => {
		loadData();
	});

	function loadData() {
		projects = db.projects.getAll();
		donations = db.donations.getAll();

		stats = {
			totalProjects: projects.length,
			totalDonations: donations.length,
			totalAmount: donations.reduce((sum, d) => sum + d.amount, 0),
			avgDonation: donations.length > 0
				? donations.reduce((sum, d) => sum + d.amount, 0) / donations.length
				: 0
		};
	}

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-KE', {
			style: 'currency',
			currency: 'KES',
			minimumFractionDigits: 0
		}).format(amount);
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-KE', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>


<svelte:head>
	<title>Admin Dashboard - Donate</title>
</svelte:head>

<Header />

<div class="container mx-auto px-4 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
		<p class="text-gray-600">Monitor donations and project performance</p>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-blue-100 rounded-lg">
					<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Projects</p>
					<p class="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-green-100 rounded-lg">
					<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Donations</p>
					<p class="text-2xl font-bold text-gray-900">{stats.totalDonations}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-yellow-100 rounded-lg">
					<svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Amount</p>
					<p class="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-purple-100 rounded-lg">
					<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Avg Donation</p>
					<p class="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgDonation)}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Projects Table -->
		<div class="bg-white rounded-lg shadow">
			<div class="px-6 py-4 border-b border-gray-200">
				<h2 class="text-lg font-semibold text-gray-900">Projects Overview</h2>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each projects as project}
							<tr>
								<td class="px-6 py-4 whitespace-nowrap">
									<div>
										<div class="text-sm font-medium text-gray-900">{project.title}</div>
										<div class="text-sm text-gray-500">{project.category}</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="w-full bg-gray-200 rounded-full h-2">
										<div 
											class="bg-green-500 h-2 rounded-full"
											style="width: {Math.min((project.current_amount / project.target_amount) * 100, 100)}%"
										></div>
									</div>
									<div class="text-xs text-gray-500 mt-1">
										{Math.round((project.current_amount / project.target_amount) * 100)}%
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{formatCurrency(project.current_amount)} / {formatCurrency(project.target_amount)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Recent Donations -->
		<div class="bg-white rounded-lg shadow">
			<div class="px-6 py-4 border-b border-gray-200">
				<h2 class="text-lg font-semibold text-gray-900">Recent Donations</h2>
			</div>
			<div class="max-h-96 overflow-y-auto">
				{#if donations.length > 0}
					<div class="divide-y divide-gray-200">
						{#each donations.slice().reverse().slice(0, 10) as donation}
							{@const project = projects.find(p => p.id === donation.project_id)}
							<div class="px-6 py-4">
								<div class="flex items-center justify-between">
									<div>
										<p class="text-sm font-medium text-gray-900">
											{project?.title || 'Unknown Project'}
										</p>
										<p class="text-sm text-gray-500">
											{formatDate(donation.created_at)}
										</p>
										{#if donation.donor_message}
											<p class="text-xs text-gray-400 mt-1 italic">
												"{donation.donor_message}"
											</p>
										{/if}
									</div>
									<div class="text-right">
										<p class="text-sm font-bold text-green-600">
											{formatCurrency(donation.amount)}
										</p>
										<p class="text-xs text-gray-500">
											{donation.phone_number?.slice(-4) || 'Anonymous'}
										</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="px-6 py-8 text-center text-gray-500">
						No donations yet
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
