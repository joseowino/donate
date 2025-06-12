<script>
	import { page } from '$app/stores';
</script>

<header class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg">
	<div class="container mx-auto px-4 py-6">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-3">
				<div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
					<span class="text-white font-bold text-lg">❤️</span>
				</div>
				<a href="/" class="text-2xl font-bold text-white hover:text-blue-100 transition-colors">
					Donate
				</a>
			</div>
			
			<nav class="hidden md:flex items-center space-x-8">
				<a href="/" class="text-white/90 hover:text-white transition-colors font-medium relative group">
					Projects
					<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
				</a>
				<a href="/about" class="text-white/90 hover:text-white transition-colors font-medium relative group">
					About
					<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
				</a>
				<a href="/admin" class="text-white/90 hover:text-white transition-colors font-medium relative group">
					Admin
					<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
				</a>
			</nav>
			
			<div class="flex items-center space-x-4">
				<div class="text-sm text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
					<span class="font-medium">🔒 Secure</span> • <span class="font-medium">👤 Anonymous</span>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Decorative gradient line -->
	<div class="h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
</header>