<script>
	import { page } from '$app/stores';
</script>

<header class="bg-white shadow-sm border-b">
	<div class="container mx-auto px-4 py-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
					<span class="text-white font-bold text-sm">DK</span>
				</div>
				<a href="/" class="text-xl font-bold text-gray-900">Donate</a>
			</div>
			
			<nav class="hidden md:flex items-center space-x-6">
				<a href="/" class="text-gray-700 hover:text-blue-600 transition-colors">Projects</a>
				<a href="/about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
				<a href="/admin" class="text-gray-700 hover:text-blue-600 transition-colors">Admin</a>
			</nav>

			<div class="flex items-center space-x-4">
				<div class="text-sm text-gray-600">
					<span class="font-medium">Secure</span> • <span class="font-medium">Anonymous</span>
				</div>
			</div>
		</div>
	</div>
</header>
