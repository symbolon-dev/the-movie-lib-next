import { ErrorMessage } from '@/components/shared/error-message';

const NotFound = () => (
    <ErrorMessage
        error="The requested movie could not be found"
        fullPage
        title="Movie not found"
        actionText="Back to Home"
        actionLink="/"
    />
);

export default NotFound;
