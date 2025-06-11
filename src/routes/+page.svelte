<script lang="ts">
	import { onMount } from 'svelte';
	import { db } from '$lib/db.js';
	import ProjectCard from '$lib/components/project-card.svelte';
	import Header from '$lib/components/header.svelte';

	let projects: any[] = [];
	let selectedCategory: string = 'all';
	let categories: string[] = ['all', 'Education', 'Healthcare', 'Technology', 'Agriculture'];

	onMount(() => {
		projects = db.projects.getAll();
	});

	// Reactive derived value
	$: filteredProjects = selectedCategory === 'all'
		? projects
		: projects.filter(p => p.category === selectedCategory);
</script>


<svelte:head>
	<title>Donate - Support Social Projects</title>
	<meta name="description" content="Anonymously donate to social projects in Kenya. Support education, healthcare, technology, and agriculture initiatives." />
</svelte:head>

<Header />

<div class="container mx-auto px-4 py-8">
	<!-- Header -->
	<h1 class="text-4xl font-bold text-center text-gray-900 mb-8">Donate</h1>

	<!-- Category Filter -->
	<div class="flex flex-wrap justify-center gap-2 mb-6">
		{#each categories as category}
			<button
				class="px-3 py-1 rounded-full border text-sm transition-colors {selectedCategory === category 
					? 'bg-blue-600 text-white border-blue-600' 
					: 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'}"
				onclick={() => selectedCategory = category}
			>
				{category}
			</button>
		{/each}
	</div>

	<!-- Projects Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredProjects as project (project.id)}
			<ProjectCard {project} />
		{/each}
	</div>

	{#if filteredProjects.length === 0}
		<p class="text-center text-gray-500 mt-12">No projects found.</p>
	{/if}
</div>

