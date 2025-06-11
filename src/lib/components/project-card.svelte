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
</script>


<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
	<img 
		src={project.image_url || "/placeholder.svg"} 
		alt={project.title}
		class="w-full h-48 object-cover"
	/>
	
	<div class="p-6">
		<div class="flex items-center justify-between mb-2">
			<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
				{project.category}
			</span>
			<span class="text-sm text-gray-500">
				{Math.round(progressPercentage)}% funded
			</span>
		</div>
		
		<h3 class="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
		<p class="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
		
		<!-- Progress Bar -->
		<div class="mb-4">
			<div class="flex justify-between text-sm text-gray-600 mb-1">
				<span>Raised: {formatCurrency(project.current_amount)}</span>
				<span>Goal: {formatCurrency(project.target_amount)}</span>
			</div>
			<div class="w-full bg-gray-200 rounded-full h-2">
				<div 
					class="bg-green-500 h-2 rounded-full transition-all duration-300"
					style="width: {progressPercentage}%"
				></div>
			</div>
		</div>
		
		<a 
			href="/project/{project.id}"
			class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block font-medium"
		>
			Donate Now
		</a>
	</div>
</div>
