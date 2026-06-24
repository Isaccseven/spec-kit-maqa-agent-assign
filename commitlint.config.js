module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Typen die erlaubt sind
    'type-enum': [
      2,
      'always',
      [
        'feat',     // neues Feature  → minor release
        'fix',      // Bugfix          → patch release
        'perf',     // Performance     → patch release
        'refactor', // Refactoring     → patch release
        'revert',   // Revert          → patch release
        'docs',     // Dokumentation   → kein release
        'style',    // Formatierung    → kein release
        'test',     // Tests           → kein release
        'chore',    // Wartung         → kein release
        'ci',       // CI-Konfiguration → kein release
      ],
    ],
    'subject-case': [0], // kein Zwang zu lowercase
  },
};
