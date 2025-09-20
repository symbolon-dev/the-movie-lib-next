import { ErrorMessage } from '@/components/common/feedback/ErrorMessage';

const NotFound = () => (
    <ErrorMessage
        error="The requested page does not exist or has been moved."
        fullPage={true}
        title="Page not found"
        actionText="Back to Home"
        actionLink="/"
    />
);

export default NotFound;
