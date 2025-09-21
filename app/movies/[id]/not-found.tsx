import { ErrorMessage } from '@/components/common/feedback/ErrorMessage';

export const NotFound = () => {
    return (
        <ErrorMessage
            error="The requested movie could not be found"
            fullPage={true}
            title="Movie not found"
            actionText="Back to Home"
            actionLink="/"
        />
    );
};
