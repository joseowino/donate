<script>
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	<title>About - Donate</title>
</svelte:head>

<Header />

<div class="container mx-auto px-4 py-8 text-center">
	<h1 class="text-3xl font-bold text-gray-900 mb-4">Donate</h1>
	<p class="text-gray-600 mb-6">Donate anonymously to trusted projects.</p>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
		<div>
			<div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
				<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
				</svg>
			</div>
			<p class="text-sm text-gray-700">100% Anonymous</p>
		</div>

		<div>
			<div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
				<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
			</div>
			<p class="text-sm text-gray-700">Secure via Mpesa</p>
		</div>

		<div>
			<div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
				<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
				</svg>
			</div>
			<p class="text-sm text-gray-700">Track Progress</p>
		</div>
	</div>

	<div class="max-w-xl mx-auto">
		<button class="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
			Donate Now
		</button>
	</div>
</div>

