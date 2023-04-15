import type PageContent from "@/components/pageContent/index.vue"

const usePageContent = () => {
	const contentRef = ref<InstanceType<typeof PageContent>>()
	const handleQueryClick = (formData: any) => {
		contentRef.value?.getList(formData)
	}

	return {
		contentRef,
		handleQueryClick
	}
}

export default usePageContent
