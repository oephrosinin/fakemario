const tsc = require('typescript');
const tsConfig = require('./tsconfig.json');

// configuration for coverage
const configurationForCoverage = {
  inlineSources: true,
  inlineSourceMap: true,
};

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return tsc.transpile(src, Object.assign(tsConfig.compilerOptions, configurationForCoverage), path, []);
    }
    return src;
  },
};
