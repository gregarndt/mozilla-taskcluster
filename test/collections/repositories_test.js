import db from '../../src/db';
import * as Joi from 'joi';
import uuid from 'uuid';
import assert from 'assert';

import Repositories from '../../src/collections/repositories';

suite('collections/repositories', function() {

  let subject;
  setup(function() {
    subject = this.runtime.repositories;
  });

  test('create()', async function() {
    let url = 'https://hg.mozilla.org/wootbar';
    let expected = Repositories.hashUrl(url);
    assert.ok(expected, 'returns hash');

    let doc = { url, alias: 'wootbar' };

    let create = await subject.create(doc);
    let found = await subject.findById(expected);
    assert.equal(create.lastPushId, 0);
    assert.equal(found._self, create._self);
  });
});

