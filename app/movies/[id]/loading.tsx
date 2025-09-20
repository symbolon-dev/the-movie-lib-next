import { BackButton } from '@/components/common/navigation/BackButton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 py-10 md:px-8">
            <div className="container mx-auto">
                <BackButton href="/" label="Back" className="mb-6" />

                <Skeleton className="relative mb-10 h-[40vh] overflow-hidden rounded-xl md:h-[50vh]">
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                        <Skeleton className="mb-2 h-10 w-3/4" />
                        <Skeleton className="mb-4 h-6 w-1/2" />
                    </div>
                </Skeleton>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <Skeleton className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-xl" />
                    </div>

                    <div className="md:col-span-2">
                        <div className="mb-6 flex flex-wrap items-center gap-6">
                            <div className="flex items-center">
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <Skeleton className="ml-2 h-4 w-16" />
                            </div>

                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-28" />
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <Skeleton className="mb-4 h-6 w-32" />
                            <Skeleton className="mb-2 h-4 w-full" />
                            <Skeleton className="mb-2 h-4 w-full" />
                            <Skeleton className="mb-2 h-4 w-4/5" />
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i}>
                                    <Skeleton className="mb-2 h-6 w-28" />
                                    <Skeleton className="h-4 w-44" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <div className="flex gap-3">
                                <Skeleton className="h-10 w-36" />
                                <Skeleton className="h-10 w-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
