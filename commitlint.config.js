module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',     // new feature      -> minor release
        'fix',      // bug fix           -> patch release
        'perf',     // performance       -> patch release
        'refactor', // refactoring       -> patch release
        'revert',   // revert            -> patch release
        'docs',     // documentation     -> no release
        'style',    // formatting        -> no release
        'test',     // tests             -> no release
        'chore',    // maintenance       -> no release
        'ci',       // CI configuration  -> no release
      ],
    ],
    'subject-case': [0], // no lowercase enforcement
  },
};
