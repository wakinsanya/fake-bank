module.exports = {
  name: 'fake-bank-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/fake-bank-app',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
