<!-- src/lib/components/project-card.svelte -->
<script lang="ts">
	let { project } = $props();
	const progressPercentage = Math.min((project.current_amount / project.target_amount) * 100, 100);
	
	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-KE', {
			style: 'currency',
			currency: 'KES',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Get category emoji based on category
	function getCategoryEmoji(category: string): string {
		const emojiMap: Record<string, string> = {
			'education': '📚',
			'health': '🏥',
			'environment': '🌱',
			'community': '🤝',
			'emergency': '🚨',
			'children': '👶',
			'elderly': '👴',
			'animals': '🐾',
			'technology': '💻',
			'arts': '🎨',
			'sports': '⚽',
			'default': '💝'
		};
		return emojiMap[category.toLowerCase()] || emojiMap.default;
	}

	// Get progress color based on percentage
	function getProgressColor(percentage: number): string {
		if (percentage >= 80) return 'from-green-400 to-emerald-500';
		if (percentage >= 50) return 'from-yellow-400 to-orange-500';
		if (percentage >= 25) return 'from-blue-400 to-indigo-500';
		return 'from-red-400 to-pink-500';
	}
</script>

<div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
	<!-- Image Container with Overlay -->
	<div class="relative overflow-hidden">
		<img 
			src={project.image_url || "/placeholder.svg"} 
			alt={project.title}
			class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
		/>
		<!-- Gradient overlay -->
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
		
		<!-- Category Badge -->
		<div class="absolute top-4 left-4">
			<span class="inline-flex items-center space-x-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full border border-white/50">
				<span>{getCategoryEmoji(project.category)}</span>
				<span>{project.category}</span>
			</span>
		</div>
		
		<!-- Progress Badge -->
		<div class="absolute top-4 right-4">
			<div class="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 border border-white/50">
				<span class="text-sm font-bold text-gray-800">
					{Math.round(progressPercentage)}% 🎯
				</span>
			</div>
		</div>
	</div>
	
	<div class="p-6">
		<!-- Title -->
		<h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
			{project.title}
		</h3>
		
		<!-- Description -->
		<p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
			{project.description}
		</p>
		
		<!-- Progress Section -->
		<div class="mb-6">
			<div class="flex justify-between items-center text-sm text-gray-600 mb-2">
				<span class="font-medium">💰 {formatCurrency(project.current_amount)}</span>
				<span class="font-medium">🎯 {formatCurrency(project.target_amount)}</span>
			</div>
			
			<!-- Enhanced Progress Bar -->
			<div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
				<div 
					class="h-3 rounded-full bg-gradient-to-r {getProgressColor(progressPercentage)} transition-all duration-1000 ease-out relative overflow-hidden"
					style="width: {progressPercentage}%"
				>
					<!-- Animated shine effect -->
					<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
				</div>
			</div>
			
			<!-- Progress Stats -->
			<div class="flex justify-between items-center mt-2 text-xs text-gray-500">
				<span>🏃‍♂️ {formatCurrency(project.target_amount - project.current_amount)} to go</span>
				<span>📈 {Math.round(progressPercentage)}% complete</span>
			</div>
		</div>
		
		<!-- Donate Button -->
		<a 
			href="/project/{project.id}"
			class="group/btn relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center block font-bold text-lg overflow-hidden hover:shadow-lg hover:scale-105"
		>
			<!-- Button background animation -->
			<div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
			
			<span class="relative flex items-center justify-center space-x-2">
				<span>💖</span>
				<span>Donate Now</span>
				<span class="transform transition-transform group-hover/btn:translate-x-1">→</span>
			</span>
		</a>
		
		<!-- Trust indicators -->
		<div class="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
			<span class="flex items-center space-x-1">
				<span>🔒</span>
				<span>Secure</span>
			</span>
			<span class="flex items-center space-x-1">
				<span>⚡</span>
				<span>Instant</span>
			</span>
			<span class="flex items-center space-x-1">
				<span>🛡️</span>
				<span>Verified</span>
			</span>
		</div>
	</div>
</div>