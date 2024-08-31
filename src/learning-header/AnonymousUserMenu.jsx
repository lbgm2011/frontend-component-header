import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button } from '@openedx/paragon';

import genericMessages from '../generic/messages';

const currentUrl = new URL(global.location.href); // Get the current URL

const lmsRegisterUrl = new URL(`${getConfig().LMS_BASE_URL}/register`); // Base URL for register
const lmsLoginUrl = new URL(`${getConfig().LMS_BASE_URL}/login`); // Base URL for login

// Preserve existing query parameters from the base URL
const params = new URLSearchParams(global.location.search);

// Add the 'next' parameter with the current URL encoded
params.set('next', currentUrl.href);

lmsRegisterUrl.search = params.toString();
lmsLoginUrl.search = params.toString();

const AnonymousUserMenu = ({ intl }) => (
  <div>
    <Button
      className="mr-3"
      variant="outline-primary"
      href={`${lmsRegisterUrl.toString()}`}
    >
      {intl.formatMessage(genericMessages.registerSentenceCase)}
    </Button>
    <Button
      variant="primary"
      href={`${lmsLoginUrl.toString()}`}
    >
      {intl.formatMessage(genericMessages.signInSentenceCase)}
    </Button>
  </div>
);

AnonymousUserMenu.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AnonymousUserMenu);
