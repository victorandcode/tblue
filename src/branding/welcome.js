// @flow
import asciiLogo from 'asciiart-logo';

import logger from '~/common/logger';
import packageJson from '../../package.json';

export default () =>
    logger.base(
        asciiLogo({
            name: packageJson.name.toUpperCase(),
            font: 'Alligator',
            lineChars: 15,
            padding: 5,
            margin: 2,
        })
            .emptyLine()
            .right(`version ${packageJson.version}`)
            .emptyLine()
            .wrap(packageJson.description)
            .render()
    );
