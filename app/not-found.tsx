import { ErrorMessage } from '@/components/shared/error-message';

const NotFound = () => (
    <ErrorMessage
        error="The requested page does not exist or has been moved."
        fullPage
        title="Page not found"
        actionText="Back to Home"
        actionLink="/"
    />
);

export default NotFound;
