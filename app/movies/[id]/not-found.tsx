import { ErrorMessage } from '@/components/shared/error-message';

function NotFound() {
    return (
        <ErrorMessage
            error="The requested movie could not be found"
            fullPage
            title="Movie not found"
            actionText="Back to Home"
            actionLink="/"
        />
    );
}

export default NotFound;
