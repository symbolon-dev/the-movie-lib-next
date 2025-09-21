import { BackButton } from '@/components/common/navigation/BackButton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="min-h-screen px-4 py-10 md:px-8">
            <div className="container mx-auto">
                <BackButton href="/" label="Back" className="mb-6" />

                <div className="mb-8">
                    <Skeleton className="mb-2 h-8 w-3/4 md:h-10" />
                    <Skeleton className="h-5 w-1/2" />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <Skeleton className="relative aspect-[2/3] max-w-sm overflow-hidden rounded-xl" />
                    </div>

                    <div className="md:col-span-2">
                        <div className="mb-6 flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-8" />
                                <Skeleton className="h-4 w-20" />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                                ))}
                            </div>
                        </div>

                        <hr className="border-border mb-8" />

                        <div className="mb-8">
                            <Skeleton className="mb-4 h-6 w-24" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i}>
                                    <Skeleton className="mb-2 h-6 w-28" />
                                    <Skeleton className="h-4 w-44" />
                                </div>
                            ))}
                        </div>

                        <hr className="border-border mt-8 mb-6" />

                        <div className="flex gap-3">
                            <Skeleton className="h-10 w-36" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
