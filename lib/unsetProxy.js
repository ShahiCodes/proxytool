import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

function unsetProxy() {
  try {
    console.log(chalk.yellow('🔧 Unsetting proxy...'));

    const proxyEnvFile = path.join(process.env.USERPROFILE, '.proxyenv.ps1');
    if (fs.existsSync(proxyEnvFile)) {
      fs.unlinkSync(proxyEnvFile);
      console.log(chalk.green(' Proxy environment file removed.'));
    } else {
      console.log(chalk.yellow(' Proxy environment file does not exist.'));
    }

    try {
      execSync('npm config delete proxy');
      execSync('npm config delete https-proxy');
      console.log(chalk.green(' npm proxy unset.'));
    } catch (npmError) {
      console.log(chalk.yellow(` Error unsetting npm proxy settings: ${npmError.message}`));
    }

    try {
      execSync('git config --global --unset http.proxy');
      execSync('git config --global --unset https.proxy');
      console.log(chalk.green(' git proxy unset.'));
    } catch (gitError) {
      console.log(chalk.yellow(` Error unsetting git proxy settings: ${gitError.message}`));
    }

    console.log(chalk.blue('ℹ. Restart your terminal to apply the changes.'));
  } catch (error) {
    console.error(chalk.red(' Error unsetting proxy:'), error.message);
  }
}

export default unsetProxy;
