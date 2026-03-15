import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import ProjectCard from '../Project/ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProject, searchProject } from '@/Redux/Project/Action'

export const tags = ["all", "react", "nextjs", "springboot", "mysql", "mongodb", "angular", "python", "flask", "django"];

const ProjectList = () => {
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch()
    const { project } = useSelector(store => store);

    const handleFilterCategory = (value) => {
        if (value === "all") {
            dispatch(fetchProject({}))
        } else {
            dispatch(fetchProject({ category: value }))
        }
    }

    const handleFilterTags = (value) => {
        if (value === "all") {
            dispatch(fetchProject({}))
        } else {
            dispatch(fetchProject({ tag: value }))
        }
    }

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
        dispatch(searchProject(e.target.value));
    }

    const displayProjects = keyword 
        ? project.searchProjects 
        : project.projects;

    return (
        <div className='relative px-5 lg:px-0 lg:flex gap-6 justify-center py-6 max-w-7xl mx-auto'>
            {/* Filter Sidebar */}
            <section className='filterSection'>
                <Card className="p-5 sticky top-20 glass-card">
                    <div className='flex justify-between items-center lg:w-[18rem]'>
                        <p className='text-lg font-semibold'>Filters</p>
                        <Button variant="ghost" size="icon" className='text-muted-foreground'>
                            <MixerHorizontalIcon />
                        </Button>
                    </div>
                    <CardContent className="mt-5 px-0">
                        <ScrollArea className='space-y-7 h-[70vh]'>
                            {/* Category Filter */}
                            <div>
                                <h2 className='pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-white/5'>
                                    Category
                                </h2>
                                <div className='pt-4'>
                                    <RadioGroup className='space-y-2.5' defaultValue="all" onValueChange={handleFilterCategory}>
                                        {["all", "fullstack", "frontend", "backend"].map(cat => (
                                            <div key={cat} className='flex items-center gap-2.5 px-2 py-1 rounded-md hover:bg-white/5 transition-colors'>
                                                <RadioGroupItem value={cat} id={`cat-${cat}`} />
                                                <Label htmlFor={`cat-${cat}`} className='cursor-pointer capitalize text-sm'>{cat}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                            {/* Tag Filter */}
                            <div className='pt-6'>
                                <h2 className='pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-white/5'>
                                    Technology
                                </h2>
                                <div className='pt-4'>
                                    <RadioGroup className='space-y-2.5' defaultValue="all" onValueChange={handleFilterTags}>
                                        {tags.map((item) => (
                                            <div key={item} className='flex items-center gap-2.5 px-2 py-1 rounded-md hover:bg-white/5 transition-colors'>
                                                <RadioGroupItem value={item} id={`tag-${item}`} />
                                                <Label htmlFor={`tag-${item}`} className='cursor-pointer capitalize text-sm'>{item}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </section>

            {/* Project List */}
            <section className='projectListSection w-full lg:w-[48rem]'>
                <div className='relative mb-5'>
                    <MagnifyingGlassIcon className='absolute top-3.5 left-4 text-muted-foreground' />
                    <Input 
                        className='pl-10 pr-4 py-5 bg-card border-white/5 focus:border-primary/50 transition-colors'
                        placeholder="Search projects..." 
                        onChange={handleSearchChange} 
                    />
                </div>

                <div className='space-y-4 min-h-[74vh] animate-fade-in'>
                    {displayProjects?.length > 0 ? (
                        displayProjects.map((item, index) => (
                            <ProjectCard item={item} key={item.id || index} />
                        ))
                    ) : (
                        <div className='flex flex-col items-center justify-center py-20 text-muted-foreground'>
                            <p className='text-lg font-medium'>No projects found</p>
                            <p className='text-sm mt-1'>Create a new project to get started</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default ProjectList
