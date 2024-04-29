import { FormattedMessage } from "react-intl";

export const getTimeSensitiveGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return <FormattedMessage id="greeting.morning" defaultMessage="Good morning," />;
    } else if (hour >= 12 && hour < 17) {
      return <FormattedMessage id="greeting.afternoon" defaultMessage="Good afternoon," />;
    } else {
      return <FormattedMessage id="greeting.evening" defaultMessage="Good evening," />;
    }
  };