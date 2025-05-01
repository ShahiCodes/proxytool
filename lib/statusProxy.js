import { execSync } from 'child_process';
import chalk from 'chalk';

const safeExec = (command) => {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch {
    return null; 
  }
};

const checkProxyStatus = () => {
  try {
    console.log(chalk.yellow(' Checking proxy status...'));

    const npmProxy = safeExec('npm config get proxy');
    const npmHttpsProxy = safeExec('npm config get https-proxy');

    if (npmProxy && npmProxy !== 'null') {
      console.log(chalk.green(` npm proxy is set: ${npmProxy}`));
    } else if (npmHttpsProxy && npmHttpsProxy !== 'null') {
      console.log(chalk.green(` npm proxy is set via https-proxy: ${npmHttpsProxy}`));
    } else {
      console.log(chalk.red(' npm proxy is not set.'));
    }

    const gitHttpProxy = safeExec('git config --global --get http.proxy');
    const gitHttpsProxy = safeExec('git config --global --get https.proxy');

    if ((gitHttpProxy && gitHttpProxy !== 'null') || (gitHttpsProxy && gitHttpsProxy !== 'null')) {
      console.log(chalk.green(` git proxy is set: ${gitHttpProxy || gitHttpsProxy}`));
    } else {
      console.log(chalk.red(' git proxy is not set.'));
    }

    const envProxy =
      process.env.HTTP_PROXY ||
      process.env.HTTPS_PROXY ||
      process.env.http_proxy ||
      process.env.https_proxy;

    if (envProxy) {
      console.log(chalk.green(` Environment proxy is set: ${envProxy}`));
    } else {
      console.log(chalk.red(' Environment proxy is not set.'));
    }

  } catch (error) {
    console.error(chalk.red(' Unexpected error checking proxy status:'), error.message);
  }
};

export default checkProxyStatus;
